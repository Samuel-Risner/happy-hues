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