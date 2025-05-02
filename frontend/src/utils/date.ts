import { DateTime } from "luxon";

export function formatDate(dateString: string) {
    return DateTime.fromISO(dateString).toFormat('dd/MM/yy');
}

export function displayDate(date: Date, format?: string) {
    const dateFormat = format ? format : "dd/MM/yyyy"
    return DateTime.fromJSDate(date).toFormat(dateFormat)
}