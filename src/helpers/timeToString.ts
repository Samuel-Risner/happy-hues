export default function timeToString(time_ms: number): string {
    const secondsTotal = Math.floor(time_ms / 1000);
    const minutesTotal = Math.floor(secondsTotal / 60);
    const hoursTotal = Math.floor(minutesTotal / 60);

    const seconds = secondsTotal - hoursTotal * 60 * 60 - minutesTotal * 60;
    const minutes = minutesTotal - hoursTotal * 60;

    let secondsString = `${seconds}`;
    if (secondsString.length === 1) secondsString = "0" + secondsString;

    let minutesString = `${minutes}`;
    if (minutesString.length === 1) minutesString = "0" + minutesString;

    return `${minutesString} : ${secondsString}`;
}