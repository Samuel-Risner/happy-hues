export default function removeChildren(e: HTMLDivElement) {
    while (e.firstChild) e.removeChild(e.firstChild);
}