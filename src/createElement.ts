export function createHTMLelement<T extends keyof HTMLElementTagNameMap>(
    tagName: T,
    parent: HTMLDivElement | null,
    args?: {
        className?: string,
        bgColorHEX?: string,
        onclick?: (() => void),
        text?: string,
        widthPx?: number,
        heightPx?: number,
        disabled?: boolean
        hidden?: boolean
    }
): HTMLElementTagNameMap[T] {
    const e = document.createElement(tagName);
    if (parent) parent.appendChild(e);

    if (args === undefined) return e;

    if (args.bgColorHEX) e.style.backgroundColor = args.bgColorHEX;
    if (args.className) e.className = args.className;
    if (args.onclick) e.addEventListener("click", args.onclick);
    if (args.text) e.textContent = args.text;
    if (args.widthPx) e.style.width = `${args.widthPx}px`;
    if (args.heightPx) e.style.height = `${args.heightPx}px`;
    if (args.disabled === true && tagName === "button") (e as HTMLButtonElement).disabled = true;
    if (args.hidden === true) e.hidden = true;

    return e;
}