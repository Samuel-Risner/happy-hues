import CONSTANTS from "../constants";

import SVG_BOTTLE_W1_BOTTOM from "./../assets/bottles/width_1/bottom.svg";
import SVG_BOTTLE_W1_MIDDLE from "./../assets/bottles/width_1/middle.svg";
import SVG_BOTTLE_W1_TOP from "./../assets/bottles/width_1/top.svg";

import SVG_CONTENTS_W1_BOTTOM from "./../assets/contents/width_1/bottom.svg";
import SVG_CONTENTS_W1_MIDDLE from "./../assets/contents/width_1/middle.svg";

import type { T_BottleClickFunction, T_ColorNames } from "../types";
import { createHTMLelement } from "../createElement";
import { animationScale } from "../animations";

const BG_SELECTED = " scale-75";
const SCALE_SELECTED = 75;

export default class Bottle {

    private w: number;
    private h: number;

    /**
     * string of colors
     */
    private contents: T_ColorNames[];

    private element: HTMLDivElement;

    constructor(w: number, h: number, contents: T_ColorNames[], onClickFunction: T_BottleClickFunction) {
        this.w = w;
        this.h = h + 1;

        this.contents = contents;


        this.element = createHTMLelement("div", null, {
            widthPx: CONSTANTS.SIZES.unit_px * this.w,
            heightPx: CONSTANTS.SIZES.unit_px * this.h,
            onclick: () => { onClickFunction(this) }
        });

        this.setMainElementClassName(false);

        this.updateView();
    }

    /**
     * @param imgType `0` > bottom `1` > middle `2` > top
     */
    private addSVGs(imgType: 0 | 1 | 2, y: number, contents: null | T_ColorNames) {
        /**
         * @param imgTypeContents `0` > bottom `1` > middle
         */
        const addBottleSVG = (imgTypeContents: 0 | 1) => {
            const iC = document.createElement("img");
            iC.className = iB.className;
            iC.style.top = iB.style.top;

            if (contents !== null) {
                if (imgTypeContents === 1) {
                    iC.src = SVG_CONTENTS_W1_MIDDLE.replace(CONSTANTS.COLOR_TO_REPLACE_HEX, CONSTANTS.COLORS_HEX[contents]);
                } else {
                    iC.src = SVG_CONTENTS_W1_BOTTOM.replaceAll(CONSTANTS.COLOR_TO_REPLACE_HEX, CONSTANTS.COLORS_HEX[contents]);
                }
            }

            this.element.appendChild(iC);
        }
        
        const iB = document.createElement("img");
        iB.className = `absolute top-0 left-0`;
        iB.style.top = `${CONSTANTS.SIZES.unit_px * y}px`;

        if (imgType === 0) {
            iB.src = SVG_BOTTLE_W1_TOP;
        } else if (imgType === 1) {
            iB.src = SVG_BOTTLE_W1_MIDDLE;
        } else {
            iB.src = SVG_BOTTLE_W1_BOTTOM
        }

        if (contents !== null) addBottleSVG(imgType as 0 | 1);
        this.element.appendChild(iB);
    }

    private updateView() {
        // remove previous contents
        while (this.element.firstChild) this.element.removeChild(this.element.firstChild);

        // add bottle

        // bottom
        this.addSVGs(0, 0, this.contents.at(this.h - 1) || null);

        // middle
        for (let i = 1; i < this.h - 1; i++) this.addSVGs(1, i, this.contents.at(this.h - i - 1) || null);

        // top
        this.addSVGs(2, this.h - 1, this.contents.at(0) || null);
    }

    addHTML(parent: HTMLDivElement) {
        parent.appendChild(this.element);
    }

    private setMainElementClassName(selected: boolean) {
        this.element.className = "relative ";

        if (selected) {
            this.element.className += BG_SELECTED;
            animationScale(this.element, 100, SCALE_SELECTED);
        } else {
            this.element.className = this.element.className.replace(BG_SELECTED, "");
            animationScale(this.element, SCALE_SELECTED, 100);
        }
    }

    selectAsFrom(): boolean {
        if (this.contents.length === 0) return false;
        this.setMainElementClassName(true);
        return true;
    }

    unselect() {
        this.setMainElementClassName(false);
    }

    moveTo(color: T_ColorNames, amount: number): number {
        // colors do not match
        if (color != (this.contents.at(-1) || color)) return 0;

        // completely full
        if (this.contents.length >= this.h - 1) return 0;

        // how many contents can be moved
        let amountThatWillBeMoved = this.h - 1 - this.contents.length; // max amount that can be moved
        if (amount < amountThatWillBeMoved) amountThatWillBeMoved = amount;

        // add contents
        for (let i = 0; i < amountThatWillBeMoved; i++) this.contents.push(color);

        this.updateView();

        return amountThatWillBeMoved;
    }

    moveFrom(to: Bottle) {
        if (this.contents.length === 0) return;

        let color: T_ColorNames = this.contents.at(-1) as T_ColorNames;
        let amount = 1;

        for (let i = this.contents.length - 2; i >= 0; i--) {
            if (this.contents[i] === color) {
                amount++;
            } else {
                break;
            }
        }

        let amountMoved = to.moveTo(color, amount);
        for (let i = 0; i < amountMoved; i++) this.contents.pop();

        this.updateView();
    }

    containsOnlyOneColor(): boolean {
        const initialColor = this.contents[0];

        for (const color of this.contents) if (color !== initialColor) return false;
    
        return true;
    }

    edit_addContent(color: T_ColorNames) {
        // already full
        if (this.contents.length >= this.h - 1) return 0;

        this.contents.push(color);

        this.updateView();
    }

    edit_removeContent() {
        this.contents.pop();

        this.updateView();
    }

    edit_getContents(): T_ColorNames[] {
        const c: T_ColorNames[] = [];
        this.contents.forEach((x) => {
            c.push(CONSTANTS.COLOR_NAMES[x]);
        })
        return c;
    }

    shuffleFrom(b: Bottle): boolean {
        if (this.contents.length === 0) return false;

        if (b.shuffleTo(this.contents.at(-1) as T_ColorNames)) {
            this.contents.pop();
            return true;
        } else {
            return false;
        }
    }

    shuffleTo(color: T_ColorNames): boolean {
        // completely full
        if (this.contents.length >= this.h - 1) return false;

        this.contents.push(color);
        return true;
    }

    getJSON(): [number, number, T_ColorNames | null, number, T_ColorNames[]] {
        return [this.w, this.h, null, 0, this.contents];
    }

}