import Bottle from "./bottle";
import type { T_BottleClickFunction, T_GameJSON } from "../types";
import { createHTMLelement } from "../helpers/createElement";

export default class Field {

    private data: T_GameJSON;
    private bottles: Bottle[];
    private element: HTMLDivElement;

    constructor(data: T_GameJSON, onclick: T_BottleClickFunction, parent: HTMLDivElement) {
        this.data = data;
        this.bottles = [];
        this.element = createHTMLelement("div", parent, { className: "flex grow gap-2 p-4" });

        this.initField(onclick)
    }

    private initField(onclick: T_BottleClickFunction) {
        for (const clusterData of this.data) {
            const cluster = createHTMLelement("div", this.element, { className: "flex flex-row grow gap-2 flex-wrap justify-center items-center" });
            
            for (const bottleData of clusterData[1]) {
                const bottle = new Bottle(bottleData[0], bottleData[1], bottleData[2], onclick);
                this.bottles.push(bottle);
                bottle.addHTML(cluster);
            }
        }
    }

    checkForWin(): boolean {
        for (const bottle of this.bottles) if (!bottle.containsOnlyOneColor()) return false;
        return true;
    }

}