<script lang="ts">
    import type {BaseFile} from "$lib/types/projects/FileData";
    import {sendToast} from "$lib/systems/Toasts";

    export let file: BaseFile

    async function copyToClipboard() {
        const link = `https://kruthers.com/downloads/${file.project}/files/${file.id}`
        try {
            await navigator.clipboard.writeText(link)
            sendToast({
                message: "Copied file link to clipboard",
                type: "success"
            })
        } catch (e) {
            console.error('Failed to copy link:', e);
            sendToast({
                message: `Failed to copy link. Please try again.`,
                type: "warning"
            })
        }
    }
</script>

<button on:click={copyToClipboard} class="">
    Copy to clipboard
</button>