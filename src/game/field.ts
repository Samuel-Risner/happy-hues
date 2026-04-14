import Bottle from "./bottle";
import type { T_BottleClickFunction, T_GameGoal, T_GameJSON } from "../types";
import { createHTMLelement } from "../helpers/createElement";

export default class Field {

    private gameGoal: T_GameGoal;
    private data: T_GameJSON["data"];

    private bottles: Bottle[];

    private element: HTMLDivElement;

    constructor(data: T_GameJSON, onclick: T_BottleClickFunction, parent: HTMLDivElement) {
        this.gameGoal = data.goal;
        this.data = data.data;

        this.bottles = [];

        this.element = createHTMLelement("div", parent, { className: "flex grow gap-2 p-4" });

        this.initField(onclick)
    }

    private initField(onclick: T_BottleClickFunction) {
        const spacings: HTMLDivElement[] = [];

        const addGrowSpacing = () => {
            spacings.push(createHTMLelement("div", this.element, { className: "flex flex-row grow gap-2 flex-wrap justify-center items-center" }));
        }

        const addNormalSpacing = () => {
            spacings.push(createHTMLelement("div", this.element));
        }

        if (this.data.spacings === null) {
            addGrowSpacing();
        } else {
            this.data.spacings.forEach((spacing) => {
                if (spacing === "grow") {
                    addGrowSpacing();
                } else if (spacing === "normal") {
                    addNormalSpacing();
                }
            });
        }

        this.data.bottles.forEach((b) => {
            const bottle = new Bottle(b[0], b[1], b[4], onclick);
            this.bottles.push(bottle);
            bottle.addHTML(spacings[b[3]]);
        });
    }

    // addBottle(bottle: Bottle) {
    //     this.bottles.push(bottle);
    //     bottle.addHTML(this.element);
    // }

    checkForWin(): boolean {
        if (this.gameGoal === "sort-simple") {
            for (const bottle of this.bottles) if (!bottle.containsOnlyOneColor()) return false;
            return true;
        }

        return false;
    }

}