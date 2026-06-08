import type Bottle from "./game/bottle";

//
// colors
//

export type T_ColorNames = "RED" | "GREEN" | "BLUE" | "YELLOW" | "ORANGE" | "PINK" | "PURPLE";
export type T_ColorsHEX = Record<T_ColorNames, string>;

//
// game
//

export type T_BottleClickFunction = (b: Bottle) => void;

export type T_GameMode = "sort-simple"; // | "sort-exact" | "sort-specific";
type T_Spacing = "grow" | "normal";

export type T_BottleWidth = 1;

export type T_GameJSON = {
    "goal": T_GameMode,
    "data": {
        //          width          height  sort specific        spacing index
        "bottles": [T_BottleWidth, number, T_ColorNames | null, number, T_ColorNames[]][],
        "spacings": null | T_Spacing[]
    }
}

//
// pages
//

export type T_PageID = "HOME" | "GAME";
export type T_InitArgs = {
    levelData?: T_GameJSON,
};
export type T_PageHandlerFunc = (newPageID: T_PageID, args: T_InitArgs) => void;