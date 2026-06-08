// used for the menus on the home page
export function expandOrCollapse(targetElement: HTMLDivElement, fromHeight: number, toHeight: number) {
    targetElement.animate(
        [
            { height: `${fromHeight}px` },
            { height: `${toHeight}px` }
        ],
        {
            duration: 300,
            easing: "ease-out",
            fill: "forwards"
        }
    );
}

// used for the bottles when starting a game or when (un)selecting them
export function animationScale(targetElement: HTMLDivElement, from: number, to: number) {
    targetElement.animate(
        [
            { scale: `${from}%` },
            { scale: `${to}%` }
        ],
        {
            duration: 300,
            easing: "ease-out",
            fill: "forwards"
        }
    );
}