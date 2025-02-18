export function truncateString(text: string, maxLength: number, ellipsis: string = "…"): string {
    if (text.length <= maxLength) return text; // Return original string if it's already short enough
    return text.slice(0, maxLength - ellipsis.length) + ellipsis;
}

export function generateInitials (fullname: string): string {
    const names = fullname.split(' ');
    return names[0][0] + names[1][0]
}