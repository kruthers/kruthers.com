<script>
    import PageInfo from "$lib/components/PageInfo.svelte";
    import RawProjectCard from "$lib/components/projects/RawProjectCard.svelte";

    let { data } = $props();
</script>

<PageInfo title="Downloads" description="Downloads for my projects" />
<div class="min-h-screen bg-base-300 max-w-7xl mx-auto lg:px-8 pt-8">
    <ul>
        {#each data.projects as project}
            <li><RawProjectCard data={project} /></li>
        {/each}
    </ul>
</div>