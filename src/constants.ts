import type { T_ColorNames, T_ColorsTWCSS, T_GameGoal } from "./types";

const SIZES = {
    unit_px: 35
}

const COLORS_HEX: T_ColorsTWCSS = {
    RED: "ff0000",
    GREEN: "9ef01a",
    BLUE: "0AEFFF",
    YELLOW: "ffff3f",
    ORANGE: "ff8700",
    PINK: "f72585",
    PURPLE: "7209b7",
}

const COLOR_NAMES: Record<string, T_ColorNames> = {}
for (const colorName in COLORS_HEX) {
    COLOR_NAMES[COLORS_HEX[colorName as T_ColorNames]] = colorName as T_ColorNames;
}

const COLOR_NAMES_LIST: T_ColorNames[] = [];
for (const colorName in COLORS_HEX) {
    COLOR_NAMES_LIST.push(colorName as T_ColorNames);
}

const SELECTABLE_GAME_GOALS: T_GameGoal[] = ["sort-simple", "sort-exact"];

const CONSTANTS = {
    SIZES: SIZES,

    COLORS_HEX: COLORS_HEX,
    COLOR_NAMES: COLOR_NAMES,
    COLOR_NAMES_LIST: COLOR_NAMES_LIST,
    COLOR_TO_REPLACE_HEX: "00ffff",

    EDIT: {
        WIDTHS: [1],
        MIN_HEIGHT: 3,
        MAX_HEIGHT: 20,
        BOTTLES_MIN: 3,
        BOTTLES_MAX: 24,
    },

    SELECTABLE_GAME_GOALS: SELECTABLE_GAME_GOALS,
}

export default CONSTANTS;