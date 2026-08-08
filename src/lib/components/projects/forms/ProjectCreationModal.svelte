<script lang="ts">
    import type {Snippet} from "svelte";
    import type {ProjectBase} from "$lib/types/projects/ProjectData";
    import {closeModal, sanitizeID, toTitleCase} from "$lib/utils/Utils";
    import CommonProjectFormInputs from "$lib/components/projects/forms/CommonProjectFormInputs.svelte";

    type Props = {
        group: string,
        extraFields: Snippet,
        createProject: (rawData: ProjectBase, formData: FormData) => Promise<boolean>
    }

    let {group, extraFields, createProject}: Props = $props()
    const modalID = $derived(`create-project-${group.toLocaleLowerCase()}`)
    let saving: boolean = $state(false)

    async function handleCreation(event: SubmitEvent) {
        event.preventDefault()
        const element = event.target as HTMLFormElement
        const data = new FormData(element)
        //fields
        const creditData = data.get("credit") as string | null
        const overview = data.get("overview") as string
        const name = data.get("name") as string

        //create raw project
        const rawProject: ProjectBase = {
            banner: "/projects/unknown.png",
            icon: "/projects/unknown.png",
            changeLog: {},
            created: data.get("creation_date") as string,
            credit: creditData == "" ? null : creditData,
            description: overview,
            group: group,
            id: sanitizeID(name),
            image: "/projects/unknown.png",
            lastUpdate: new Date().toISOString(),
            links: {},
            name: name,
            overview: overview,
            tags: []
        }

        saving = true
        //call project creations
        const success = await createProject(rawProject, data)
        saving = false
        //if the project was created, close the modal
        if (success) {
            closeModal(modalID)
            element.reset()
        }
    }
</script>

<dialog id={modalID} class="modal">
    <div class="modal-box">
        <h2 class="text-lg font-bold">Create new {toTitleCase(group)} project</h2>
        <form class="flex flex-col gap-4" onsubmit={handleCreation}>
            <CommonProjectFormInputs {modalID} />

            {@render extraFields()}

            <div class="modal-action">
                <button class="btn btn-primary" type="submit" disabled={saving}>
                    {saving ? "Creating..." : "Create"}
                </button>
                <button class="btn btn-error" type="reset" onclick={() => closeModal(modalID)}>
                    Cancel
                </button>
            </div>
        </form>
    </div>
</dialog>

