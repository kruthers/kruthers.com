<script lang="ts">
    import toasts from '$lib/store/Toasts';
    import Info from "$lib/components/alerts/Info.svelte";
    import Success from "$lib/components/alerts/Success.svelte";
    import Warning from "$lib/components/alerts/Warning.svelte";
    import Error from "$lib/components/alerts/Error.svelte";
    import Verbose from "$lib/components/alerts/Verbose.svelte";

    $: $toasts = $toasts;
</script>

<div class="toast">
    {#each $toasts as toast (toast.id)}
        {#if (toast.type === "info")}
            <Info>{toast.message}</Info>
        {:else if (toast.type === "success")}
            <Success>{toast.message}</Success>
        {:else if (toast.type === "warning")}
            <Warning>{toast.message}</Warning>
        {:else if (toast.type === "error")}
            <Error>{toast.message}</Error>
        {:else}
            <Verbose>{toast.message}</Verbose>
        {/if}
    {/each}
</div>