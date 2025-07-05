<script lang="ts">
    import type {ProjectBase} from "$lib/types/projects/ProjectData";
    import Icon from "@iconify/svelte";
    import MetaDataList from "$lib/components/projects/page/subpart/MetaDataList.svelte";
    import {toTitleCase} from "$lib/utils/Utils";
    import {api, userToken} from "$lib/utils/api";
    import TagSelector from "$lib/components/TagSelector.svelte";
    import {sendToast} from "$lib/store/Toasts";

    export var data: ProjectBase
    let openEdit = false

    function getAvalibleTags(): string[] {
        let tags: string[] = []
        switch (data.group) {
            case "MINECRAFT": {
                tags.push("minigame","map","admin","tools")
            }
        }

        return tags
    }

    function submitEdit(event: SubmitEvent) {
        event.preventDefault()
        const formData = new FormData(event.target as HTMLFormElement)

        const edit = {
            title: formData.get('title'),
            overview: formData.get('overview'),
            description: formData.get('description'),
            tags: formData.getAll('tags')
        }

        openEdit = false

        sendToast({
            message: "Updating project..."
        })

        const proj = data
        if (edit.title) proj.name = edit.title as string
        if (edit.overview) proj.overview = edit.overview as string
        if (edit.description) proj.description = edit.description as string
        if (edit.tags) proj.tags = edit.tags as string[]

        const group = api.projects.getGroup(proj.group.toLowerCase())
        group?.editProject(proj)
    }
</script>

<!-- Banner -->
<div class="space-y-4">

    <!-- Breadcrumbs (Top, Full Width) -->
    <div class="text-sm breadcrumbs">
        <ul>
            <li><a href="/downloads">Downloads</a></li>
            <li><a href="/downloads/{data.group.toLowerCase()}">{toTitleCase(data.group)}</a></li>
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
        </div>

        <!-- Right: Buttons -->
        <div class="flex gap-2 self-start lg:self-center">
            {#if ($userToken)} <button class="btn btn-primary" on:click={() => openEdit = true}><Icon icon="mdi:pen" width="1.2em" height="1.2em" /> Edit</button> {/if}
            <button class="btn btn-outline"><Icon icon="material-symbols:download-rounded" width="1.2em" height="1.2em" /> Download</button>
        </div>

    </div>
</div>

{#if (openEdit)}
    <dialog class="modal modal-open">
        <div class="modal-box max-w-full m-2">
            <form on:submit={submitEdit} class="space-y-4">
                <fieldset class="fieldset">
                    <legend class="fieldset-legend text-lg">Edit Project</legend>

                    <label class="label" for="title">Project Name</label>
                    <input id="title" name="title" type="text" class="input" value={data.name} />

                    <label class="label" for="overview">Overview</label>
                    <input id="overview" name="overview" type="text" class="input w-full" value={data.overview} />

                    <label class="label" for="description">Overview</label>
                    <textarea id="description" name="description" class="textarea textarea-bordered h-28  w-full">{data.description}</textarea>

                    <label class="label" for="tags">Project Tags</label>
                    <TagSelector id="tags" name="Tags" options={getAvalibleTags()} initial={data.tags} />

                    <div class="modal-action">
                        <button type="button" class="btn btn-warning" on:click={() => openEdit = false}>Abandon</button>
                        <button type="submit" class="btn btn-success">Save</button>
                    </div>
                </fieldset>
            </form>
        </div>
    </dialog>
{/if}
