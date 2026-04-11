import type { T_PageHandler } from "../types";
import PageBase from "./pageBase";

export default class PostGamePage extends PageBase {

    constructor(parent: HTMLDivElement, pageHandler: T_PageHandler) {
        super(parent, pageHandler);

        const goToHomePageButton = document.createElement("button");
        this.element.appendChild(goToHomePageButton);
        goToHomePageButton.textContent = "HOME";
        goToHomePageButton.onclick = () => { pageHandler("HOME", {}) }
    }

}