import type { T_InitArgs, T_PageHandlerFunc } from "../types";

export default abstract class PageBase {

    protected element: HTMLDivElement;

    protected pageHandler: T_PageHandlerFunc;

    constructor(parent: HTMLDivElement, pageHandler: T_PageHandlerFunc) {
        this.element = document.createElement("div");
        this.element.hidden = true;
        parent.appendChild(this.element);

        this.pageHandler = pageHandler;
    }

    show() {
        this.element.hidden = false;
    }

    hide() {
        this.element.hidden = true;
    }

    init(_args: T_InitArgs) {}

}