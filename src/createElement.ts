export function createHTMLelement<T extends keyof HTMLElementTagNameMap>(
    tagName: T,
    parent: HTMLElement | null,
    args?: {
        className?: string,
        bgColorHEX?: string,
        onclick?: (() => void),
        text?: string,
        widthPx?: number,
        heightPx?: number,
        hidden?: boolean,
        disabled?: boolean
        checkbox?: true,
        checked?: true,
        onchange?: (this: HTMLInputElement, e: Event) => void
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
    if (args.hidden === true) e.hidden = true;

    if (args.disabled === true && tagName === "button") (e as HTMLButtonElement).disabled = true;
    
    if (args.checkbox === true && tagName === "input") (e as HTMLInputElement).type = "checkbox";
    if (args.checked === true && tagName === "input") (e as HTMLInputElement).checked = true;
    if (args.onchange && tagName === "input") (e as HTMLInputElement).addEventListener("change", args.onchange);

    return e;
}

// console.log((e.target as HTMLInputElement).checked)