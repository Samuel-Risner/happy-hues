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