<script lang="ts">
    import type { LayoutProps } from './$types';
    const { data, children } : LayoutProps  = $props();
</script>

<div role="tablist" class="tabs tabs-lift tabs-lg">
    <a role="tab" class="tab" href="./">Description</a>
    <a role="tab" class="tab" href="./changelog">Changelog</a>
    <a role="tab" class="tab tab-active" href="./files">Files</a>
</div>
<div class="bg-base-300 border-base-300 p-6 w-full h-full">
    {@render children()}
</div>
