<script lang="ts">
    import { onDestroy } from 'svelte';
    import toasts from '$lib/systems/Toasts';
    import Info from "$lib/components/alerts/Info.svelte";
    import Success from "$lib/components/alerts/Success.svelte";
    import Warning from "$lib/components/alerts/Warning.svelte";
    import Error from "$lib/components/alerts/Error.svelte";
    import Verbose from "$lib/components/alerts/Verbose.svelte";

    // let $toasts;
    const unsubscribe = toasts.subscribe((value) => ($toasts = value));
    onDestroy(unsubscribe);
</script>

<div class="fixed top-4 right-4 z-50 space-y-2">
    {#each $toasts as toast}
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