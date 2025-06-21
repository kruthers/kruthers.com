<script lang="ts">
    import type {ProjectBase} from "$lib/types/projects/ProjectData";
    import {FontAwesomeIcon} from "@fortawesome/svelte-fontawesome";
    import {faDownload, faPen, faTags} from "@fortawesome/free-solid-svg-icons"

    export var data: ProjectBase
</script>

<style>
    /* Auto-insert vertical dividers between list items */
    .meta-list li + li::before {
        content: "|";
        margin: 0 0.75rem;
        color: #9ca3af; /* Optional: match Tailwind's neutral tone */
    }
</style>

<!-- Banner -->
<div class="space-y-4">

    <!-- Breadcrumbs (Top, Full Width) -->
    <div class="text-sm breadcrumbs">
        <ul>
            <li><a href="/downloads">Downloads</a></li>
            <li><a href="/downloads/minecraft">Minecraft</a></li>
            <li>{data.id}</li>
        </ul>
    </div>

    <!-- Main Content -->
    <div class="flex flex-col lg:flex-row items-start lg:items-center gap-6">

        <!-- Left: Image -->
        <div class="flex-shrink-0">
            <img src={data.image} alt="{data.id}" class="rounded-lg w-48 object-cover" />
        </div>

        <!-- Middle: Title, Description, Meta -->
        <div class="flex-1">
            <h1 class="text-3xl font-bold mb-2">{data.name}</h1>
            <p class="text-base-content/70 mb-4">
                {data.overview}
            </p>
            <!-- Meta Info with Dividers -->
            <ul class="meta-list flex flex-wrap items-center text-sm text-base-content/50">
                {#if (data.credit)}
                    <li>By {data.credit}</li>
                {/if}
                {#if (data)}
                    <FontAwesomeIcon icon={faTags} />
                    {#each data.tags as tag}
                        <div class="badge badge-soft badge-info">{tag}</div>
                    {/each}
                {/if}
            </ul>
        </div>

        <!-- Right: Buttons -->
        <div class="flex gap-2 self-start lg:self-center">
            <button class="btn btn-primary"><FontAwesomeIcon icon={faPen} /> Edit</button>
            <button class="btn btn-outline"><FontAwesomeIcon icon={faDownload} /> Download</button>
        </div>

    </div>
</div>