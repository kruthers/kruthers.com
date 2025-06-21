<script lang="ts">
    import type {BaseFile} from "$lib/types/projects/FileData";
    import {copyWithAlert} from "$lib/systems/CopyUtils";
    import Icon from "@iconify/svelte";

    export let file: BaseFile

    async function copyToClipboard() {
        const link = `https://kruthers.com/downloads/${file.project}/files/${file.id}`
        await copyWithAlert(link)
    }
</script>

<button on:click={copyToClipboard} class="">
    <Icon icon="mdi:content-copy" width="1.2em" height="1.2em" /> Copy to clipboard
</button>