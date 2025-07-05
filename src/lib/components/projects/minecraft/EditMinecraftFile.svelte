<script lang="ts">
    import type {BaseFile, MinecraftFile} from "$lib/types/projects/FileData";
    import {api} from "$lib/utils/api";
    import TagSelector from "$lib/components/TagSelector.svelte";
    import {platforms} from "$lib/utils/MinecraftUtils";
    import {sendToast} from "$lib/store/Toasts";

    type properties = {
        close: () => void
        abandon: () => void
        file: BaseFile
    }

    let { close, abandon, file }: properties = $props()

    const versionsPromise = api.getMcCache().then((r) => r.versions)

    let mcFile = file as MinecraftFile

    function save(event: SubmitEvent) {
        event.preventDefault()
        const formData = new FormData(event.target as HTMLFormElement)

        const name = formData.get("title") as string
        const versions = formData.getAll('versions') as string[]
        const platforms = formData.getAll('platforms') as string[]

        sendToast({
            message: `Updating file ${file.project}/${file.id}...`
        })

        api.projects.minecraft.editFile(file.project, file.id, {
            name: name,
            platforms: platforms,
            gameVersions: versions
        })

        close()
    }
</script>


<dialog class="modal modal-open">
    <div class="modal-box max-w-2xl m-2">
        <form onsubmit={save} class="space-y-4">
            <fieldset class="fieldset">
                <legend class="fieldset-legend text-lg">Edit File Data</legend>
                <label class="label" for="title">File Name</label>
                <input id="title" name="title" type="text" class="input" value={file.name} />

                <label class="label" for="versions">Supported Versions</label>
                {#await versionsPromise}
                    <div class="skeleton min-h-[3rem] w-full"></div>
                {:then versions}
                    <TagSelector id={"versions"} name={"MC Versions"} options={versions} initial={mcFile.gameVersions} />
                {/await}


                <label class="label" for="platforms">Supported Platforms</label>
                <TagSelector id="platforms" name="Platforms" options={platforms.map(p => p.id)} initial={mcFile.platforms} />

                <div class="modal-action">
                    <button type="button" class="btn btn-warning" onclick={abandon}>Abandon</button>
                    <button type="submit" class="btn btn-success">Save</button>
                </div>
            </fieldset>
        </form>
    </div>
</dialog>