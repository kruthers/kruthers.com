<script lang="ts">
    import type {ProjectBase} from "$lib/types/projects/ProjectData";
    import Icon from "@iconify/svelte";
    import MetaDataList from "$lib/components/projects/page/subpart/MetaDataList.svelte";

    export var data: ProjectBase
</script>

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
            <MetaDataList>
                {#if (data.credit)}
                    <li>By {data.credit}</li>
                {/if}
                {#if (data)}
                    <li class="flex items-center gap-1 px-2">
                        <Icon icon="mdi:tag-multiple-outline" width="1.2em" height="1.2em" />
                        {#each data.tags as tag}
                            <div class="badge badge-soft badge-info">{tag}</div>
                        {/each}
                    </li>
                {/if}
            </MetaDataList>
            <ul class="meta-list flex flex-wrap items-center text-sm max-w-xs text-base-content/50">

            </ul>
        </div>

        <!-- Right: Buttons -->
        <div class="flex gap-2 self-start lg:self-center">
            <button class="btn btn-primary"><Icon icon="mdi:pen" width="1.2em" height="1.2em" /> Edit</button>
            <button class="btn btn-outline"><Icon icon="material-symbols:download-rounded" width="1.2em" height="1.2em" /> Download</button>
        </div>

    </div>
</div>
