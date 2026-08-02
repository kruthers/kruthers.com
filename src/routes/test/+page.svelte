<script lang="ts">
    import MarkdownContainer from "$lib/components/MarkdownContainer.svelte";

    async function getData(): Promise<string> {
        let response = await fetch("markdown-cheat-sheet.md");
        return response.text()
    }
</script>

<div class="min-h-screen max-w-7xl mx-auto">
    {#await getData()}
        <span class="loading loading-spinner loading-xl"></span>
    {:then markdown}
        <MarkdownContainer content={markdown} />
    {/await}
</div>