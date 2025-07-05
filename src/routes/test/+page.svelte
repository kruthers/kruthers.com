<script lang="ts">
    import Markdown from "$lib/components/Markdown.svelte";

    async function getData(): Promise<string> {
        let response = await fetch("markdown-cheat-sheet.md");
        return response.text()
    }
</script>

<div class="min-h-screen max-w-7xl mx-auto">
    {#await getData()}
        <span class="loading loading-spinner loading-xl"></span>
    {:then markdown}
        <Markdown content={markdown} />
    {/await}
</div>