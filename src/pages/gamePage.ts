import Bottle from "../game/bottle";
import Field from "../game/field";
import type { T_InitArgs, T_PageHandler } from "../types";
import PageBase from "./pageBase";

export default class GamePage extends PageBase {

    private clickFrom: null | Bottle = null;
    private field: null | Field = null;

    constructor(parent: HTMLDivElement, pageHandler: T_PageHandler) {
        super(parent, pageHandler);

        this.element.className = "flex grow";
    }

    /**
     * Handles part of the game logic when a bottle is pressed
     *  
     * @returns if contents were moved from one bottle to another
     */
    private onBottleClick(b: Bottle): boolean {
        // select first bottle
        if (this.clickFrom === null) {
            if (b.selectAsFrom()) this.clickFrom = b;
            return false;
        }

        // unselect first bottle
        if (this.clickFrom === b) {
            this.clickFrom.unselect();
            this.clickFrom = null;
            return false;
        }
        
        // select second bottle > game logic
        this.clickFrom.unselect();
        this.clickFrom.moveFrom(b);
        this.clickFrom = null;
        if ((this.field as Field).checkForWin()) this.pageHandler("POST_GAME", {});

        return true;
    }

    /**
     * @override
     * 
     * @param args Requires `levelData` to be set
     */
    init(args: T_InitArgs): void {
        const j = args.levelData;
        
        // error
        if (j === undefined) {
            console.error("Passed invalid args to initialize game");
            return;
        }

        this.field = new Field(j, this.onBottleClick.bind(this), this.element);
    }

}