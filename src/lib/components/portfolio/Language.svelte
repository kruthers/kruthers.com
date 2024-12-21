<script lang="ts">
    export let name: string
    export let link: string
    export let icon: string
</script>


<div class="tooltip" data-tip="{name}">
    <a href="{link}" aria-label="{name}">
        <i class="text-5xl devicon-{icon}"></i>
    </a>
</div>