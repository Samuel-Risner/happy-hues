import type PageBase from "./pages/pageBase";
import GamePage from "./pages/gamePage";
import HomePage from "./pages/homePage";
import type { T_InitArgs, T_PageHandlerFunc, T_PageID } from "./types";

const appElement = document.getElementById("app") as HTMLDivElement;

/**
 * Hides all visible pages and initializes and shoes the specified one
 * 
 * @param pageID ID of the page that will be shown next
 */
const pageHandler: T_PageHandlerFunc = (pageID: T_PageID, args: T_InitArgs) => {
    for (const p in pages) pages[p as T_PageID].hide();
    pages[pageID].init(args);
    pages[pageID].show();
}

const pages: Record<T_PageID, PageBase> = {
    HOME: new HomePage(appElement, pageHandler),
    GAME: new GamePage(appElement, pageHandler),
};

pages.HOME.show();