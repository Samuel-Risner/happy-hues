import CONSTANTS from "../constants";
import { createHTMLelement } from "../createElement";
import type { T_GameGoal, T_PageHandler } from "../types";
import PageBase from "./pageBase";

export default class EditPagePreSelect extends PageBase {

    constructor(parent: HTMLDivElement, pageHandler: T_PageHandler) {
        super(parent, pageHandler);

        this.element.className = "flex flex-col w-full p-2 text-lg font-semibold";

        let selectedGamGoal: null | T_GameGoal = null;

        const options = ["same width and height and no spacings"]

        for (const o of options) {
            // menu container
            const menu = createHTMLelement("div", this.element, { className: "bg-red-400 flex flex-row w-full p-2 gap-2" });

            // menu name
            const menuName = createHTMLelement("button", menu, {
                className: "bg-blue-400 [writing-mode:vertical-rl] tracking-widest p-2 text-center",
                text: o,
                onclick: () => {
                    if (selectedGamGoal !== null) {
                        pageHandler("EDIT", { levelData: {
                            goal: selectedGamGoal,
                            data: {
                                bottles: [],
                                spacings: null,
                            }
                        }});
                    }
                }
            });

            // game type container
            const gameTypeContainer = createHTMLelement("div", menu, { className: "flex flex-col grow" });

            // game types
            let allGameTypeBtns: HTMLButtonElement[] = [];

            // for (const s of o[1]) {
            //     const btn = createHTMLelement("button", gameTypeContainer);
            //     allGameTypeBtns.push(btn);
            //     btn.textContent = s;
            //     btn.className = "bg-gray-300 p-2 rounded-lg disabled:bg-transparent border-2 border-transparent disabled:border-black m-auto";
            //     btn.onclick = () => {
            //         for (const b of allGameTypeBtns) b.disabled = false;
            //         btn.disabled = true;
            //         selectedGamGoal = s;
            //     }
            // }

            // height select container
            const heightSelect = document.createElement("div");
            menu.appendChild(heightSelect);
            heightSelect.className = "grid grid-cols-4 gap-2"

            // height select

            const allHeightBtns: HTMLButtonElement[] = [];

            for (let i = CONSTANTS.EDIT.MIN_HEIGHT; i < CONSTANTS.EDIT.MAX_HEIGHT + 1; i++) {
                const height = document.createElement("button");
                heightSelect.appendChild(height);
                allHeightBtns.push(height);
                height.textContent = `${i}`;
                height.className = "bg-gray-300 p-2 w-11 h-11 rounded-lg disabled:bg-transparent border-2 border-transparent disabled:border-black";
                height.onclick = () => {
                    for (const b of allHeightBtns) b.disabled = false;
                    height.disabled = true;
                    // selectedHeight = i;
                }
            }
        }
    }
}