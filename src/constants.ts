import type { T_BottleWidth, T_ColorNames, T_ColorsHEX, T_GameMode } from "./types";

const SIZES = {
    unit_px: 35
}

const COLORS_HEX: T_ColorsHEX = {
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

    CUSTOM_DEFAULTS: CUSTOM_DEFAULTS,
}

export default CONSTANTS;