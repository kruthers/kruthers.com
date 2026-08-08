<script lang="ts">
    import type {ProjectBase} from "$lib/types/projects/ProjectData";

    const {
        modalID,
        project
    }: {
        modalID: string,
        project?: ProjectBase
    } = $props();
</script>

<fieldset class="fieldset">
    <label class="floating-label" for={`${modalID}-name`}>
        <span>Name</span>
        <input
                type="text"
                class="input validator w-full"
                id={`${modalID}-name`}
                name="name"
                placeholder="Name"
                value={project?.name ?? ""}
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
        >{project?.overview ?? ""}</textarea>
    </label>
    <p class="validator-hint hidden">Overview is required</p>
</fieldset>

<fieldset class="fieldset">
    <label class="floating-label" for={`${modalID}-credit`}>
        <span>Credit</span>
        <input
                type="text"
                class="input validator w-full"
                id={`${modalID}-credit`}
                name="credit"
                placeholder="Credit"
                value={project?.credit ?? ""}
        />
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
                value={project?.created?.split("T")[0] ?? ""}
                required
        />
    </label>
    <p class="validator-hint hidden">Creation date is required</p>
</fieldset>