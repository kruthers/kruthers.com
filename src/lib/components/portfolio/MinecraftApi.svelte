<script lang="ts">
    export let name: string
    export let link: string
</script>

<div class="tooltip" data-tip="{name}">
    <a href="{link}" aria-label="{name}">
        <slot/>
    </a>
</div>