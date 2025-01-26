import { DateTime } from "luxon";

export function formatDate(dateString: string) {
    return DateTime.fromISO(dateString).toFormat('dd/MM/yy');
}