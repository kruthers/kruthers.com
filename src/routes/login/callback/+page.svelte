<script lang="ts">
    import {onMount} from "svelte";
    import type { PageProps } from './$types';
    import {api, userToken} from "$lib/systems/api";
    import { faTriangleExclamation, faCheckDouble } from "@fortawesome/free-solid-svg-icons"
    import {FontAwesomeIcon} from "@fortawesome/svelte-fontawesome";

    let title = $state("Authenticating...")
    let loading = $state(true)
    let failed = $state(false)

    let { data }: PageProps = $props()

    onMount(async () => {
        await api.auth.authorize(data.code)
            .then((authData) => {
                if (authData != null) {
                    userToken.set(authData)
                    window.location.href = "/"
                    loading = false
                } else {
                    userToken.set(null)
                    loading = false
                    failed = true
                    title = "Authentication Failed."
                }
            })
    })
</script>

<div class="hero bg-base-200 min-h-screen">
    <div class="hero-content text-center">
        <div class="max-w-md">
            <h1 class="text-5xl">{title}</h1>
            <br />
            {#if (loading)}
                <span class="loading loading-spinner w-20"></span>
            {:else}
                <p>
                    {#if (failed)}
                        <FontAwesomeIcon icon={faTriangleExclamation} style="color: #E50006FF; height: auto; width: calc(var(--size-selector, 0.25rem) * 20);" />
                    {:else}
                        <FontAwesomeIcon icon={faCheckDouble} style="color: #00C850FF; height: auto; width: calc(var(--size-selector, 0.25rem) * 20);" />
                    {/if}
                </p>

                <br />
                <a role="button" class="btn btn-warning" href="/login">Login</a>
            {/if}
        </div>
    </div>
</div>