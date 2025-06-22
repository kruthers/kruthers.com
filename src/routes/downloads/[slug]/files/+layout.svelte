<script lang="ts">
    import type { LayoutProps } from './$types';
    const { data, children } : LayoutProps  = $props();
</script>

<div role="tablist" class="tabs tabs-lift tabs-lg">
    <a role="tab" class="tab" href="/downloads/{data.id}">Description</a>
    <a role="tab" class="tab" href="/downloads/{data.id}/changelog">Changelog</a>
    <a role="tab" class="tab tab-active" href="/downloads/{data.id}/files">Files</a>
</div>
{@render children()}
