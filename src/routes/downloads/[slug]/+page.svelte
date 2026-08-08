<script lang="ts">
    import MarkdownContainer from "$lib/components/MarkdownContainer.svelte";
    import {getProjectPageContext} from "$lib/utils/ProjectContext";

    const {project} = getProjectPageContext();
</script>

<section class="min-w-0 rounded-3xl border border-base-300 bg-base-200/60 p-4 shadow-sm sm:p-6">
    <MarkdownContainer content={project.description} />
</section>