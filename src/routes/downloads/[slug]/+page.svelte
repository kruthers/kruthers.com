<script lang="ts">
    import MarkdownContainer from "$lib/components/MarkdownContainer.svelte";
    import type {PageProps} from "./$types";

    const { data }: PageProps = $props();
</script>

{#await data.project then project}
    {#if project}
        <section class="min-w-0 rounded-3xl border border-base-300 bg-base-200/60 p-4 shadow-sm sm:p-6">
            <MarkdownContainer content={project.description} />
        </section>
    {/if}
{/await}