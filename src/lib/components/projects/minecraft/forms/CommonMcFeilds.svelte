<script lang="ts">
    import type {MinecraftFile} from "$lib/types/projects/FileData";
    import {onMount} from "svelte";
    import {api} from "$lib/utils/api";
    import Icon from "@iconify/svelte";
    import Svelecte from "svelecte";
    import {platforms} from "$lib/utils/MinecraftUtils";
    import PlatformBadge from "$lib/components/projects/minecraft/collection/PlatformBadge.svelte";
    import type {McPlatformData} from "$lib/types/projects/MinecraftData";
    import type {MinecraftProject} from "$lib/types/projects/ProjectData";

    let { file, project }: { file?: MinecraftFile, project: MinecraftProject} = $props();

    let allVersion: string[] = $state([])

    onMount(() => {
        api.getMcCache().then(versions => {
            allVersion = versions.versions
        })
    })

    const defaultPlatforms = $derived(project.type == "MAP" || project.type == "DATAPACK" ? ["VANILLA"] : [])

</script>

<section class="rounded-3xl border border-base-300 bg-base-200/70 p-4 shadow-sm">
    <h3 class="mb-4 flex items-center gap-2 text-lg font-bold">
        <Icon icon="mdi:minecraft" width="1.2em" height="1.2em" />
        Supported by
    </h3>

    <fieldset class="fieldset">
        <legend class="fieldset-legend">Java Versions</legend>
        <Svelecte options={allVersion} name="versions" value={file?.gameVersions ?? []} class="autoSelect validator"
              required={true} multiple={true}
        />
    </fieldset>
    <fieldset class="fieldset">
        <legend class="fieldset-legend">Platforms</legend>
        <Svelecte options={platforms} name="platforms" value={file?.platforms ?? defaultPlatforms} class="autoSelect validator"
                  required={true} multiple={true} valueField="id" labelField="name"
        >
            {#snippet option(opt)}
                {@const platform = opt as McPlatformData}
                <PlatformBadge data={platform} />
            {/snippet}

            {#snippet selection(opt, bindItemAction)}
                {@const platforms = opt as McPlatformData[]}
                {#each platforms as platform (platform.id)}
                    <PlatformBadge data={platform}>
                        <button data-action="deselect" type="button" use:bindItemAction={opt}>
                            <Icon icon="mdi:close" width="1.2em" height="1.2em" />
                        </button>
                    </PlatformBadge>
                {/each}
            {/snippet}

        </Svelecte>
    </fieldset>
</section>