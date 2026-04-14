import Bottle from "../game/bottle";
import Field from "../game/field";
import { createHTMLelement } from "../helpers/createElement";
import removeChildren from "../helpers/removeChildren";
import timeToString from "../helpers/timeToString";
import type { T_InitArgs, T_PageHandler } from "../types";
import PageBase from "./pageBase";

import RESET_SVG from "./../assets/ui/reset.svg";
import BACK_SVG from "./../assets/ui/back.svg";

// get elements from `index.html`
const GAME_TOOLS_WRAPPER = document.getElementById("game-tools-wrapper") as HTMLDivElement;
const GAME_TOOLS_MENU = document.getElementById("game-tools-menu") as HTMLDivElement;
const SOURCE_CODE_LINK = document.getElementById("source-code-link") as HTMLDivElement;

// create tool elements
const VICTORY_CONTAINER = createHTMLelement("div", GAME_TOOLS_MENU, { className: "flex grow" });
const VICTORY_TEXT = createHTMLelement("div", VICTORY_CONTAINER, { text: "Victory!", hidden: true, className: "flex grow text-lg bg-green-400 px-2 rounded-full items-center justify-center" });
const HOME_BUTTON = createHTMLelement("button", GAME_TOOLS_MENU, { className: "w-7 h-7" });
const TIME_DISPLAY = createHTMLelement("div", GAME_TOOLS_MENU, { text: "00 : 00" });
const RESET_BUTTON = createHTMLelement("button", GAME_TOOLS_MENU, { className: "w-8 h-8 disabled:opacity-50" });

// images
createHTMLelement("img", RESET_BUTTON, { src: RESET_SVG });
createHTMLelement("img", HOME_BUTTON, { src: BACK_SVG });

let timerRunning: number = 0;

function startTimer() {
    timerRunning++;
    const start = timerRunning;
    const startTime = new Date().getTime();

    const updateTimer = async () => {
        if (start !== timerRunning) return;

        TIME_DISPLAY.textContent = timeToString(new Date().getTime() - startTime);

        setTimeout(updateTimer, 500);
    }

    updateTimer();
}

function stopTimer() {
    timerRunning++;
}

export default class GamePage extends PageBase {

    private clickFrom: null | Bottle = null;
    private field: null | Field = null;

    private timerRunning: boolean = false;

    constructor(parent: HTMLDivElement, pageHandler: T_PageHandler) {
        super(parent, pageHandler);

        this.element.className = "flex grow";

        HOME_BUTTON.onclick = () => { pageHandler("HOME", {}) }

        stopTimer();
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

        // on win
        if ((this.field as Field).checkForWin()) {
            this.timerRunning = false;
            stopTimer();

            VICTORY_TEXT.hidden = false;
            RESET_BUTTON.disabled = true;
        }

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

        // start time
        if (!this.timerRunning) {
            startTimer();
            this.timerRunning = true;
        }
    }

    /**
     * @override
     */
    show(): void {
        super.show();

        VICTORY_TEXT.hidden = true;
        SOURCE_CODE_LINK.hidden = true;
        GAME_TOOLS_WRAPPER.hidden = false;
        RESET_BUTTON.disabled = false;
    }
    
    /**
     * @override
     */
    hide(): void {
        super.hide();

        GAME_TOOLS_WRAPPER.hidden = true;
        SOURCE_CODE_LINK.hidden = false;

        stopTimer();
        this.timerRunning = false;
    }

}