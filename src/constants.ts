import type { T_BottleWidth, T_ColorNames, T_ColorsHEX, T_GameMode } from "./types";

const SIZES = {
    unit_px: 35
}

// const COLORS_HEX: T_ColorsHEX = {
//     RED: "ff0000",
//     GREEN: "9ef01a",
//     BLUE: "0AEFFF",
//     YELLOW: "ffff3f",
//     ORANGE: "ff8700",
//     PINK: "f72585",
//     PURPLE: "7209b7",
// }

// const COLORS_HEX: T_ColorsHEX = {
//     RED:    "ef4444",
//     GREEN:  "84cc16",
//     BLUE:   "38bdf8",
//     YELLOW: "eab308",
//     ORANGE: "f97316",
//     PINK:   "ec4899",
//     PURPLE: "a855f7",
// }

// const COLORS_HEX: T_ColorsHEX = {
//     RED:    "e06c75",
//     GREEN:  "98c379",
//     BLUE:   "61afef",
//     YELLOW: "e5c07b",
//     ORANGE: "d19a66",
//     PINK:   "c678dd",
//     PURPLE: "b294bb",
// }

const COLORS_HEX: T_ColorsHEX = {
    RED:    "ff5a5f",
    GREEN:  "7fff3a",
    BLUE:   "40cfff",
    YELLOW: "ffd93d",
    ORANGE: "ff9f1c",
    PINK:   "ff4fa3",
    PURPLE: "b86cff",
}

// const COLORS_HEX: T_ColorsHEX = {
//     RED:    "ff6b6b",
//     GREEN:  "6eeb83",
//     BLUE:   "4dabf7",
//     YELLOW: "ffd43b",
//     ORANGE: "ff922b",
//     PINK:   "f06595",
//     PURPLE: "9775fa",
// }

const COLOR_NAMES: Record<string, T_ColorNames> = {}
for (const colorName in COLORS_HEX) {
    COLOR_NAMES[COLORS_HEX[colorName as T_ColorNames]] = colorName as T_ColorNames;
}

const COLOR_NAMES_LIST: T_ColorNames[] = [];
for (const colorName in COLORS_HEX) {
    COLOR_NAMES_LIST.push(colorName as T_ColorNames);
}

// const SELECTABLE_GAME_GOALS: T_GameGoal[] = ["sort-simple"];

// `null` -> random
const CUSTOM_DEFAULTS: {
    GAME_MODE: T_GameMode | null,
    AMOUNT_BOTTLES: number | null,
    BOTTLE_WIDTH: 1 | null,
    HEIGHT: number | null,
    SAME_HEIGHT: boolean,
} = {
    GAME_MODE: "sort-simple",
    AMOUNT_BOTTLES: 7,
    BOTTLE_WIDTH: 1,
    HEIGHT: 5,
    SAME_HEIGHT: true,
}

const WIDTHS: T_BottleWidth[] = [1];

const CONSTANTS = {
    SIZES: SIZES,

    COLORS_HEX: COLORS_HEX,
    COLOR_NAMES: COLOR_NAMES,
    COLOR_NAMES_LIST: COLOR_NAMES_LIST,
    COLOR_TO_REPLACE_HEX: "00ffff",

    EDIT: {
        WIDTHS: WIDTHS,
        MIN_HEIGHT: 5,
        MAX_HEIGHT: 18,
        BOTTLES_MIN: 3,
        BOTTLES_MAX: 23,
    },

    // SELECTABLE_GAME_GOALS: SELECTABLE_GAME_GOALS,

    GAME: {
        REL_EMPTY_BOTTLES: 0.15
    },

    CUSTOM_DEFAULTS: CUSTOM_DEFAULTS,
}

export default CONSTANTS;