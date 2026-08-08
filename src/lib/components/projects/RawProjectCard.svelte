<script lang="ts">
    import type {RawProject} from "$lib/types/projects/ProjectData";
    import {resolve} from "$app/paths";
    import {toTitleCase} from "$lib/utils/Utils";

    let {data}: {data: RawProject} = $props();
</script>

<a href={resolve("/downloads/[slug]", {slug: data.id})}
        class="card relative w-full overflow-visible rounded-3xl border border-base-300 bg-base-200/80 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-base-100"
        aria-label={`View ${data.name}`}
>
    <figure class="aspect-video overflow-hidden rounded-t-3xl">
        <img src={data.banner} alt={data.name} class="h-full w-full object-cover transition-transform"/>
    </figure>

    <div class="card-body gap-3 p-5">
        <div>
            <span class="mb-2 text-xs font-semibold uppercase tracking-wide text-accent flex items-center gap-1">
                {data.group}
                <img class="size-5 pixels" src={`/projects/icons/${data.group.toLowerCase()}.png`} alt={data.group}/>
            </span>
            <h2 class="card-title line-clamp-2 text-xl">{data.name}</h2>
        </div>

        <p class="line-clamp-3 text-sm leading-relaxed text-base-content/70">
            {data.overview}
        </p>

        {#if data.tags.length > 0}
            <div class="mt-1 flex flex-wrap gap-2">
                {#each data.tags.slice(0, 3) as tag, index (index)}
                    <span class="badge badge-soft badge-secondary badge-sm">{toTitleCase(tag)}</span>
                {/each}
            </div>
        {/if}
    </div>
</a>