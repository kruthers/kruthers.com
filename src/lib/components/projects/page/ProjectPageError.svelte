<script lang="ts">
    import Icon from "@iconify/svelte";

    let {
        title = "Unable to load project",
        message = "An unknown error occurred while loading this project. Please try refreshing the page."
    }: { title?: string, message?: string } = $props();
</script>

<div class="alert alert-error alert-soft block rounded-3xl">
    <div class="flex w-full flex-col items-center justify-center gap-3 p-10 text-center">
        <Icon icon="mdi:alert-circle" height="4em" />
        <div>
            <h2 class="text-xl font-semibold">{title}</h2>
            <p class="text-sm opacity-70">{message}</p>
        </div>
    </div>
</div>