/**
 * Converts a string to title case
 * @param str The input string
 */
function toTitleCase(str: string): string {
    return str.toLowerCase().split(' ').map((word: string) => {
        return (word.charAt(0).toUpperCase() + word.slice(1));
    }).join(' ');
}

/**
 * Returns the number with ordinal attached
 * @param n the number to convert
 */
export function getOrdinal(n: number): string {
    if (n > 3 && n < 21) return `${n}th`;
    switch (n % 10) {
        case 1: return `${n}st`;
        case 2: return `${n}nd`;
        case 3: return `${n}rd`;
        default: return `${n}th`;
    }
}
