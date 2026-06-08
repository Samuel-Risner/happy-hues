import { expandOrCollapse } from "../helpers/animations";
import CONSTANTS from "../constants";
import { createHTMLelement } from "../helpers/createElement";
import autoCreate from "../game/autoCreate";
import LEVEL_DATA from "../levels/levelData";
import type { T_BottleWidth, T_GameMode, T_PageHandlerFunc } from "../types";
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
            expandOrCollapse(wrapper, wrapper.clientHeight, 0);
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

function initLevelMode(parent: HTMLDivElement, pageHandler: T_PageHandlerFunc): void {
    const menu = createDropdownMenu(parent, "Level Mode");

    const levelElements: HTMLDivElement[] = [];

    for (let i = 0; i < LEVEL_DATA.length; i++) {
        const level = createHTMLelement("div", menu, { hidden: true, className: "flex flex-col text-xl justify-center items-center" });
        levelElements.push(level);

        // level name
        createHTMLelement("div", level, { text: `Level ${i + 1}` });

        const levelContainer = createHTMLelement("div", level, { className: "grid grid-cols-6 py-4 gap-2 justify-center items-center" });

        for (let j = 0; j < LEVEL_DATA[i].length; j++) {
            const enterLevelBtn = createHTMLelement("button", levelContainer, {
                text: `${j + 1}`,
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

function initCustom(parent: HTMLDivElement, pageHandler: T_PageHandlerFunc): void {
    let gameGoal: T_GameMode | null = CONSTANTS.CUSTOM_DEFAULTS.GAME_MODE;
    let amountBottles: number | null = CONSTANTS.CUSTOM_DEFAULTS.AMOUNT_BOTTLES;
    let width: T_BottleWidth | null = CONSTANTS.CUSTOM_DEFAULTS.BOTTLE_WIDTH;
    let height: number | null = CONSTANTS.CUSTOM_DEFAULTS.HEIGHT;
    let sameHeight: boolean = CONSTANTS.CUSTOM_DEFAULTS.SAME_HEIGHT;

    const menu = createDropdownMenu(parent, "Custom");
    menu.className = "flex flex-col grow text-lg justify-center items-center";

    // function createGameModeMenu() {
    //     // title
    //     createHTMLelement("div", menu, { text: "Select game mode", className: "pb-4 text-xl" });

    //     let lastClicked: HTMLButtonElement | null = null;

    //     for (const mode of [null, ...CONSTANTS.SELECTABLE_GAME_GOALS]) {
    //         const btn = createHTMLelement("button", menu, {
    //             text: mode || "Random",
    //             disabled: mode === gameGoal,
    //             className: "text-anti-space/50 disabled:text-anti-space",
    //             onclick: () => {
    //                 gameGoal = mode;
    //                 btn.disabled = true;
    //                 (lastClicked as HTMLButtonElement).disabled = false;
    //                 lastClicked = btn;
    //             }
    //         });

    //         if (mode === gameGoal) lastClicked = btn;
    //     }
    // }

    // difficulty

    function createAmountBottlesMenu() {
        // title
        createHTMLelement("div", menu, { text: "Select amount bottles", className: "text-xl py-4" });

        const allButtons: HTMLButtonElement[] = [];
        
        // random
        const random = createHTMLelement("button", menu, {
            text: "Random",
            className: "text-anti-space/50 disabled:text-anti-space",
            onclick: () => {
                if (amountBottles !== null) allButtons[amountBottles - CONSTANTS.EDIT.BOTTLES_MIN].disabled = false;
                random.disabled = true;
                amountBottles = null;
            }
        });

        // buttons for selecting amount

        const btnContainer = createHTMLelement("div", menu, { className: "grid grid-cols-7 gap-1 pt-1 justify-center items-center" });
    
        for (let i = CONSTANTS.EDIT.BOTTLES_MIN; i < 1 + CONSTANTS.EDIT.BOTTLES_MAX; i++) allButtons.push(createHTMLelement("button", btnContainer, {
            text: `${i}`,
            disabled: i === amountBottles,
            className: "w-9 h-9 rounded-lg border-2 disabled:border-anti-space disabled:text-anti-space border-transparent text-anti-space/50",
            onclick: () => {
                if (amountBottles !== null) allButtons[amountBottles - CONSTANTS.EDIT.BOTTLES_MIN].disabled = false;
                random.disabled = false;
                allButtons[i - CONSTANTS.EDIT.BOTTLES_MIN].disabled = true;
                amountBottles = i;
            }
        }));
    }

    function createWidthMenu() {
        // title
        createHTMLelement("div", menu, { text: "Select bottle width", className: "py-4 text-xl" });

        let lastClicked: HTMLButtonElement | null = null;
        
        for (const w of [null, ...CONSTANTS.EDIT.WIDTHS]) {
            const btn = createHTMLelement("button", menu, {
                text: w === null? "Random" : `width: ${w}`,
                disabled: w === width,
                className: "text-anti-space/50 disabled:text-anti-space",
                onclick: () => {
                    width = w;
                    btn.disabled = true;
                    (lastClicked as HTMLButtonElement).disabled = false;
                    lastClicked = btn;
                }
            });

            if (w === width) lastClicked = btn;
        }
    }

    function createHeightMenu() {
        // title
        createHTMLelement("div", menu, { text: "Select bottle height", className: "py-4 text-xl" });

        // random

        const randomLabel = createHTMLelement("label", menu, { className: "flex flex-row justify-center items-center gap-2" });
        const randomCheckbox = createHTMLelement("input", randomLabel, { checkbox: true, checked: height === null, onchange: (e) =>  {
            if ((e.target as HTMLInputElement).checked) {
                // checked
                heightSelectContainer.disabled = false;
                sameHeightCheckbox.disabled = false;
                if (height !== null) allButtons[height - CONSTANTS.EDIT.MIN_HEIGHT].disabled = false;
                height = null;
            } else {
                // unchecked
                heightSelectContainer.disabled = true;
                sameHeightCheckbox.disabled = true;
                
            }
        }, className: "peer appearance-none w-4 h-4 bg-anti-space/50 checked:bg-anti-space rounded-sm" });
        createHTMLelement("div", randomLabel, { text: "Random", className: "text-anti-space/50 peer-checked:text-anti-space" }); // text

        // same height
        // checked: same height

        const text_same = "Same height";
        const text_different = "Different height";

        const sameHeightLabel = createHTMLelement("label", menu, { className: "flex flex-row justify-center items-center gap-2" });
        const sameHeightCheckbox = createHTMLelement("input", sameHeightLabel, { checkbox: true, disabled: height !== null, checked: sameHeight, onchange: (e) =>  {
            if ((e.target as HTMLInputElement).checked) {
                // checked
                sameHeightText.textContent = text_same;
                sameHeight = true;
            } else {
                // unchecked
                sameHeightText.textContent = text_different;
                sameHeight = false;
            }
        }, className: "peer appearance-none w-4 h-4 disabled:bg-anti-space/50 bg-anti-space rounded-sm" });
        const sameHeightText = createHTMLelement("div", sameHeightLabel, { text: sameHeight? text_same : text_different, className: "peer-disabled:text-anti-space/50 text-anti-space" });

        // specific heights
        const allButtons: HTMLButtonElement[] = [];

        const heightSelectContainer = createHTMLelement("button", menu, { className: "grid grid-cols-7 gap-1 pt-1 text-anti-space/50 disabled:text-anti-space", disabled: height !== null, onclick: () => { 
            randomCheckbox.checked = false;
            sameHeightCheckbox.disabled = true;
            heightSelectContainer.disabled = true;
        } });

        for (let i = CONSTANTS.EDIT.MIN_HEIGHT; i < 1 + CONSTANTS.EDIT.MAX_HEIGHT; i++) {
            const btn = createHTMLelement("button", heightSelectContainer, {
                text: `${i}`,
                className: "border-2 border-transparent disabled:border-anti-space rounded-lg w-9 h-9",
                onclick: () => {
                    if (height !== null) allButtons[height - CONSTANTS.EDIT.MIN_HEIGHT].disabled = false;
                    height = i;
                    btn.disabled = true;
                }
            });

            allButtons.push(btn);
        }

        // default height
        if (height !== null) allButtons[height - CONSTANTS.EDIT.MIN_HEIGHT].disabled = true;
    }

    // createGameModeMenu();
    createAmountBottlesMenu();
    createWidthMenu();
    createHeightMenu();

    // start
    createHTMLelement("button", menu, {
        text: "Start",
        className: "m-4 mt-8 px-2 pb-2 pt-1 rounded-lg border-2",
        onclick: () => {
            pageHandler("GAME", { levelData: autoCreate(gameGoal, sameHeight, height, width, null, amountBottles) });
            // console.log(`Game goal: ${gameGoal} Amount bottles: ${amountBottles} Width: ${width}, Height: ${height} Same height: ${sameHeight}`);
        }
    });
}

export default class HomePage extends PageBase {

    constructor(parent: HTMLDivElement, pageHandler: T_PageHandlerFunc) {
        super(parent, pageHandler);

        this.element.className = "flex grow flex-col p-4 gap-4 text-2xl overflow-y-auto";

        initLevelMode(this.element, pageHandler);
        initCustom(this.element, pageHandler);
    }

}