import Bottle from "../game/bottle";
import Field from "../game/field";
import { createHTMLelement } from "../helpers/createElement";
import removeChildren from "../helpers/removeChildren";
import type { T_InitArgs, T_PageHandler } from "../types";
import PageBase from "./pageBase";

const GAME_TOOLS_WRAPPER = document.getElementById("game-tools-wrapper") as HTMLDivElement;
const GAME_TOOLS_MENU = document.getElementById("game-tools-menu") as HTMLDivElement;
const SOURCE_CODE_LINK = document.getElementById("source-code-link") as HTMLDivElement;

const HOME_BUTTON = createHTMLelement("button", GAME_TOOLS_MENU, { text: "home" });
const RESET_BUTTON = createHTMLelement("button", GAME_TOOLS_MENU, { text: "reset" });

export default class GamePage extends PageBase {

    private clickFrom: null | Bottle = null;
    private field: null | Field = null;

    constructor(parent: HTMLDivElement, pageHandler: T_PageHandler) {
        super(parent, pageHandler);

        this.element.className = "flex grow";

        HOME_BUTTON.onclick = () => { pageHandler("HOME", {}) }
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
        removeChildren(this.element);

        const j = args.levelData;
        
        // error
        if (j === undefined) {
            console.error("Passed invalid args to initialize game");
            return;
        }

        this.field = new Field(j, this.onBottleClick.bind(this), this.element);

        RESET_BUTTON.onclick = () => { this.init(args) }
    }

    show(): void {
        super.show();
        SOURCE_CODE_LINK.hidden = true;
        GAME_TOOLS_WRAPPER.hidden = false;
    }
    
    hide(): void {
        super.hide();
        GAME_TOOLS_WRAPPER.hidden = true;
        SOURCE_CODE_LINK.hidden = false;
    }

}