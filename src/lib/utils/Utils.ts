/**
 * Converts a string to title case
 * @param str The input string
 */
export function toTitleCase(str: string): string {
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

export function sanitizeID(input: string): string {
    return input
        .trim() // remove tailing/ leading whitespace
        .replace(/[^a-zA-Z0-9\-_\s]/g, '') //sanitize to just be standard letters/ whitespace
        .replace(/\s+/g, "_") //swap whitespace for underscores
        .toLowerCase()
}

/**
 * Opens a modal by its id
 * @param id
 */
export function openModal(id: string) {
    const modal = document.getElementById(id) as HTMLDialogElement
    modal.showModal()
}

/**
 * Closes a modal by its id
 * @param id
 */
export function closeModal(id: string) {
    const modal = document.getElementById(id) as HTMLDialogElement
    modal.close()
}
