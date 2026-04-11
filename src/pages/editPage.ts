import CONSTANTS from "../constants";
import { createHTMLelement } from "../createElement";
import Bottle from "../game/bottle";
import Field from "../game/field";
import removeChildren from "../removeChildren";
import type { T_ColorNames, T_InitArgs, T_PageHandler } from "../types";
import PageBase from "./pageBase";

export default class EditPage extends PageBase {

    private gameMode: HTMLDivElement;
    private gameHeight: HTMLDivElement;

    private fieldContainer: HTMLDivElement;

    private jsonContainer: HTMLElement;

    private field: null | Field = null;

    private height: number = 1;

    constructor(parent: HTMLDivElement, pageHandler: T_PageHandler) {
        super(parent, pageHandler);

        this.element.textContent = "edit";

        // edit overview
        const overviewContainer = createHTMLelement("div", this.element);

        this.gameMode = createHTMLelement("div", overviewContainer);
        this.gameHeight = createHTMLelement("div", overviewContainer);

        // edit toolbar
        const toolbar = createHTMLelement("div", this.element);

        // color select
        const colorContainer = createHTMLelement("div", toolbar);

        let selectedColorBtn: HTMLButtonElement | null = null;
        let selectedColor: T_ColorNames | null = null;

        for (const colorName in CONSTANTS.COLORS_HEX) {
            const btn = createHTMLelement("button", colorContainer, {
                bgColorHEX: CONSTANTS.COLORS_HEX[colorName as T_ColorNames]
            });
            btn.textContent = colorName;

            btn.onclick = () => {
                selectedColorBtn = btn;
                selectedColor = (colorName as T_ColorNames);
            }
        }

        const btn = createHTMLelement("button", colorContainer);
        btn.textContent = "REMOVE COLOR";

        btn.onclick = () => {
            selectedColorBtn = btn;
            selectedColor = null;
        }

        // add bottle button
        const addBottle = createHTMLelement("div", toolbar);
        addBottle.textContent = "bOOTLE";
        addBottle.onclick = () => {
            (this.field as Field).addBottle(new Bottle(1, this.height, [], (b: Bottle) => {
                if (selectedColor === null) {
                    b.edit_removeContent();
                    return;
                }

                b.edit_addContent(CONSTANTS.COLORS_HEX[selectedColor]);
                this.updateJSON();
            }));

            this.updateJSON();
        }

        // remove bottle button
        // TODO

        // move/drag bottle
        // TODO

        // field container
        this.fieldContainer = createHTMLelement("div", this.element);

        // json display
        this.jsonContainer = createHTMLelement("code", this.element);        

    }

    init(args: T_InitArgs): void {
        const j = args.levelData;
        if (j === undefined) {
            console.error("Invalid args for edit page init");
            return;
        }

        this.gameMode.textContent = j.goal;

        removeChildren(this.fieldContainer);

        this.field = new Field(j, () => null, this.fieldContainer);

        this.updateJSON();
    }

    private updateJSON() {

    }
}