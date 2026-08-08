<script lang="ts">
    import type {ProjectBase} from "$lib/types/projects/ProjectData";
    import type {BaseFile} from "$lib/types/projects/FileData";
    import {resolve} from "$app/paths";
    import Icon from "@iconify/svelte";
    import type {ResolvedPathname} from "$app/types";
    import {toTitleCase} from "$lib/utils/Utils";

    function getGroupPath(group: string): ResolvedPathname {
        switch (group) {
            case "MINECRAFT": return "/downloads/minecraft"
            default: return "/downloads"
        }
    }

    let {data, files}: {data: ProjectBase, files: Promise<BaseFile[]>} = $props();

    const latestFile = $derived.by(async () => {
        const fileList = await files;
        return fileList.toSorted((a, b) => Date.parse(b.published) - Date.parse(a.published))[0];
    });
</script>

<header class="overflow-hidden rounded-3xl border border-base-300 bg-linear-to-br from-base-200 to-base-300 shadow-sm">
    <div class="relative p-5 sm:p-6">
        <div class="relative flex flex-col gap-5">
            <div class="breadcrumbs max-w-full overflow-x-auto text-sm text-base-content/70">
                <ul>
                    <li><a class="hover:text-primary" href={resolve("/downloads")}>
                        Downloads
                    </a></li>
                    <li><a class="hover:text-primary" href={getGroupPath(data.group)}>
                        {toTitleCase(data.group)}
                    </a></li>
                    <li>
                        <span class="font-medium text-base-content">{data.name}</span>
                    </li>
                </ul>
            </div>

            <div class="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
                <div class="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-end">
                    <img src={data.icon} alt={data.name} class="size-20 object-cover shadow-lg sm:size-24"/>

                    <div class="min-w-0">
                        <h1 class="text-3xl font-bold tracking-tight sm:text-4xl">
                            {data.name}
                        </h1>

                        <p class="mt-2 max-w-3xl text-sm leading-relaxed text-base-content/75 sm:text-base">
                            {data.overview}
                        </p>

                        <div class="mt-3 flex flex-wrap items-center gap-2">
                            {#each data.tags as tag (tag)}
                                <span class="badge badge-soft badge-secondary badge-sm">
                                    <Icon icon="mdi:tag-multiple-outline" width="1.1em" height="1.1em" />
                                    {toTitleCase(tag)}
                                </span>
                            {/each}
                        </div>
                    </div>
                </div>

                <div class="flex shrink-0 lg:justify-end">
                    {#await latestFile}
                        <button class="btn btn-primary w-full sm:w-auto" disabled>
                            <span class="loading loading-spinner loading-sm"></span>
                            Loading download
                        </button>
                    {:then file}
                        {#if file}
                            <a class="btn btn-primary w-full sm:w-auto" href={file.link}>
                                <Icon icon="material-symbols:download-rounded" width="1.3em" height="1.3em" />
                                Download Latest
                            </a>
                        {:else}
                            <button class="btn btn-disabled w-full sm:w-auto" disabled>
                                <Icon icon="material-symbols:download-rounded" width="1.3em" height="1.3em" />
                                No Downloads
                            </button>
                        {/if}
                    {:catch}
                        <button class="btn btn-disabled w-full sm:w-auto" disabled>
                            <Icon icon="mdi:alert-circle-outline" width="1.3em" height="1.3em" />
                            Download Unavailable
                        </button>
                    {/await}
                </div>
            </div>
        </div>
    </div>
</header>