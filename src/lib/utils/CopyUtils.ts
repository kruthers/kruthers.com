import {sendToast} from "$lib/store/Toasts";

export async function copyWithAlert(text: string) {
    try {
        await navigator.clipboard.writeText(text)
        sendToast({
            id: 0,
            message: "Copied to clipboard",
            type: "success"
        })
    } catch (e) {
        console.error(`Failed to copy ${text}: ${e}`);
        sendToast({
            id: 0,
            message: `Failed to copy to clipboard. Please try again.`,
            type: "warning"
        })
    }
}
