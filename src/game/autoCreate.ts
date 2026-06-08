import CONSTANTS from "../constants";
import { randomChoice, randomFromRange } from "../helpers/random";
import type { T_BottleWidth, T_ColorNames, T_GameMode, T_GameJSON } from "../types";
import Bottle from "./bottle";

/**
 * 
 * @param gameGoal `null` -> random
 * @param sameHeight only relevant if `height` is `null`
 * @param height `null` -> random
 * @param width `null` -> random
 * @param _difficulty `null` -> random
 * @param amountBottles `null` -> random
 */
export default function autoCreate(
    gameGoal: T_GameMode | null,
    sameHeight: boolean,
    height: number | null,
    width: T_BottleWidth | null,
    _difficulty: null,
    amountBottles: number | null
): T_GameJSON {
    //
    // - randomize
    //

    if (gameGoal === null) gameGoal = CONSTANTS.CUSTOM_DEFAULTS.GAME_MODE; // randomChoice(CONSTANTS.SELECTABLE_GAME_GOALS);

    const randomHeight: boolean = height === null && !sameHeight;
    if (height === null) height = randomFromRange(CONSTANTS.EDIT.MIN_HEIGHT, CONSTANTS.EDIT.MAX_HEIGHT);

    if (width === null) width = randomChoice(CONSTANTS.EDIT.WIDTHS);

    if (amountBottles === null) amountBottles = randomFromRange(CONSTANTS.EDIT.BOTTLES_MIN, CONSTANTS.EDIT.BOTTLES_MAX);

    //
    // - create
    //

    const bottles: Bottle[] = [];
    const emptyBottles: number = 1 + Math.floor(amountBottles * CONSTANTS.GAME.REL_EMPTY_BOTTLES);

    for (let b = 0; b < amountBottles; b++) {
        if (randomHeight) height = randomFromRange(CONSTANTS.EDIT.MIN_HEIGHT, CONSTANTS.EDIT.MAX_HEIGHT);
        const contents: T_ColorNames[] = b < emptyBottles? [] : new Array(height).fill(randomChoice(CONSTANTS.COLOR_NAMES_LIST));

        const bottle = new Bottle(width, height, contents, () => {});
        bottles.push(bottle);
    }

    //
    // - shuffle
    //

    for (let i = 0; i < 100 * bottles.length; i++) {
        const b1 = randomChoice(bottles);
        let b2 = randomChoice(bottles);
        
        while (b1 === b2) b2 = randomChoice(bottles);

        b1.shuffleFrom(b2);
    }

    const bJson: [T_BottleWidth, number, T_ColorNames | null, number, T_ColorNames[]][] = [];
    bottles.forEach((b) => {
        bJson.push(b.getJSON());
    });

    const j: T_GameJSON = {
        goal: gameGoal as T_GameMode,
        data: {
            spacings: null,
            bottles: bJson
        }
    }

    return j;
}