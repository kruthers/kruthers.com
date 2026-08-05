<script lang="ts">
    import type {Snippet} from "svelte";
    import type {ProjectBase} from "$lib/types/projects/ProjectData";
    import {closeModal, sanitizeID, toTitleCase} from "$lib/utils/Utils";

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
            <fieldset class="fieldset">
                <label class="floating-label" for={`${modalID}-name`}>
                    <span>Name</span>
                    <input
                            type="text"
                            class="input validator w-full"
                            id={`${modalID}-name`}
                            name="name"
                            placeholder="Name"
                            required
                    />
                </label>
                <p class="validator-hint hidden">Name is required</p>
            </fieldset>

            <fieldset class="fieldset">
                <label class="floating-label" for={`${modalID}-overview`}>
                    <span>Overview</span>
                    <textarea
                            class="textarea validator w-full"
                            id={`${modalID}-overview`}
                            name="overview"
                            placeholder="Overview"
                            required
                    ></textarea>
                </label>
                <p class="validator-hint hidden">Overview is required</p>
            </fieldset>

            <fieldset class="fieldset">
                <label class="floating-label" for={`${modalID}-credit`}>
                    <span>Credit</span>
                    <input type="text" class="input validator" id={`${modalID}-credit`} name="credit" placeholder="Credit"/>
                </label>
                <p class="label">Optional</p>
            </fieldset>

            <fieldset class="fieldset">
                <label class="floating-label" for={`${modalID}-creation-date`}>
                    <span>Creation date</span>
                    <input
                            type="date"
                            class="input validator w-full"
                            id={`${modalID}-creation-date`}
                            name="creation_date"
                            placeholder="Creation date"
                            required
                    />
                </label>
                <p class="validator-hint hidden">Creation date is required</p>
            </fieldset>

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

