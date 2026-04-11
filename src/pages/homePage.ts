import { expandOrCollapse } from "../animations";
import CONSTANTS from "../constants";
import { createHTMLelement } from "../createElement";
import autoCreate from "../game/autoCreate";
import LEVEL_DATA from "../levels/levelData";
import type { T_GameGoal, T_PageHandler } from "../types";
import PageBase from "./pageBase";

let closeLast: null | (() => void) = null;

/**
 * Creates a clickable button that will show an animated dropdown menu when clicked
 * 
 * @returns The part of the dropdown menu that can be changed
 */
function createDropdownMenu(parent: HTMLDivElement, text: string): HTMLDivElement {
    const container = createHTMLelement("div", parent, { className: "flex flex-col min-h-20 w-full p-2 justify-center items-center rounded-xl font-semibold text-menu-title border-4 border-anti-space text-anti-space" });
    const btn = createHTMLelement("button", container, { text: text, className: "h-20 w-full" });
    const wrapper = createHTMLelement("div", container, { className: "h-0 overflow-hidden" });

    // dropdown menu
    const menu = createHTMLelement("div", wrapper);

    btn.onclick = () => {
        if (wrapper.clientHeight > 0) {
            // collapse
            expandOrCollapse(wrapper, menu.clientHeight, 0);
            closeLast = null;

        } else {
            // expand
            if (closeLast) closeLast();
            expandOrCollapse(wrapper, 0, menu.clientHeight);
            closeLast = () => { expandOrCollapse(wrapper, menu.clientHeight, 0) }
        }
    }

    return menu;
}

function initLevelMode(parent: HTMLDivElement, pageHandler: T_PageHandler): void {
    const menu = createDropdownMenu(parent, "Level Mode");

    // const btnPrevious = document.createElement("button");
    // const btnNext = document.createElement("button");

    const levelElements: HTMLDivElement[] = [];
    // const currentLevelIndex: number = 0;

    for (let i = 0; i < LEVEL_DATA.length; i++) {
        const level = createHTMLelement("div", menu, { hidden: true, className: "flex flex-col text-xl justify-center items-center" });
        levelElements.push(level);

        // level name
        createHTMLelement("div", level, { text: `Level ${i + 1}` });

        const levelContainer = createHTMLelement("div", level, { className: "grid grid-cols-6 py-4 gap-2 justify-center items-center" });

        for (let j = 0; j < LEVEL_DATA[i].length; j++) {
            const enterLevelBtn = createHTMLelement("button", levelContainer, {
                text: `${j}`,
                disabled: j > 5,
                className: "w-9 h-9 rounded-lg border-2 border-anti-space disabled:border-transparent disabled:text-anti-space/50"
            });

            enterLevelBtn.onclick = () => {
                pageHandler("GAME", { levelData: LEVEL_DATA[i][j] });
            }
        }
    }

    levelElements[0].hidden = false;
}

function initCustom(parent: HTMLDivElement, pageHandler: T_PageHandler): void {
    let gameGoal: T_GameGoal | null = null;
    let width: number | null = null;

    const menu = createDropdownMenu(parent, "Custom");
    menu.className = "flex flex-col text-xl justify-center items-center";
    
    // game mode menu title
    createHTMLelement("div", menu, { text: "Select game mode", className: "pb-4" });

        // game mode options
        let gmButton: HTMLButtonElement | null = null;

        for (const gm of [null, ...CONSTANTS.SELECTABLE_GAME_GOALS]) {
            const btn = createHTMLelement("button", menu, {
                text: gm || "Random",
                disabled: gm === null,
                className: "text-lg text-anti-space/50 disabled:text-anti-space",
                onclick: () => {
                    gameGoal = gm;
                    btn.disabled = true;
                    (gmButton as HTMLButtonElement).disabled = false;
                    gmButton = btn;
                }
            });

            if (gm === null) gmButton = btn;
        }

    // height menu

        // fixed

        // from x to y

        // random fixed

        // random x to y

        // completely random
    
    // width menu title
    createHTMLelement("div", menu, { text: "Select bottle width", className: "py-4" });

    // width options
    let widthButton: HTMLButtonElement | null = null;
    
    for (const w of [null, ...CONSTANTS.EDIT.WIDTHS]) {
        const btn = createHTMLelement("button", menu, {
            text: w === null? "Random" : `width: ${w}`,
            disabled: w === null,
            className: "text-lg text-anti-space/50 disabled:text-anti-space",
            onclick: () => {
                width = w;
                btn.disabled = true;
                (widthButton as HTMLButtonElement).disabled = false;
                widthButton = btn;
            }
        });

        if (widthButton === null) widthButton = btn;
    }
    
    // difficulty

    // start
    createHTMLelement("button", menu, {
        text: "Start",
        className: "m-4 px-2 pb-2 pt-1 rounded-lg border-2",
        onclick: () => {
            pageHandler("GAME", { levelData: autoCreate(gameGoal, true, [5, 5], width, null, null) });
        }
    });
}

function initEdit(parent: HTMLDivElement, pageHandler: T_PageHandler): void {
    const menu = createDropdownMenu(parent, "Edit");
    menu.className = "flex flex-col gap-2"

    createHTMLelement("button", menu, {
        className: "bg-gray-400 p-1 rounded-lg",
        text: "new",
        onclick: () => { pageHandler("EDIT_PRE_SELECT", {}) },
    });

    createHTMLelement("button", menu, {
        className: "bg-gray-400 p-1 rounded-lg",
        text: "edit",
        onclick: () => { pageHandler("EDIT_PRE_SELECT", {}) },
    });
}

export default class HomePage extends PageBase {

    constructor(parent: HTMLDivElement, pageHandler: T_PageHandler) {
        super(parent, pageHandler);

        this.element.className = "flex grow flex-col p-4 gap-4 text-2xl";

        initLevelMode(this.element, pageHandler);
        initCustom(this.element, pageHandler);
        // initEdit(this.element, pageHandler);
    }

}