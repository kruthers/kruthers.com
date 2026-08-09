<script lang="ts">
    import type {PageProps} from "./$types";
    import {toTitleCase} from "$lib/utils/Utils";
    import Icon from "@iconify/svelte";
    import FormattedDate from "$lib/components/FormattedDate.svelte";
    import MarkdownContainer from "$lib/components/MarkdownContainer.svelte";
    import {resolve} from "$app/paths";

    const { data }: PageProps = $props();

</script>

<main class="mx-auto flex w-full max-w-7xl flex-col gap-4 p-4 sm:p-6">
    {#await data.post}

    {:then post}
        {#if post}
            <header class="overflow-hidden rounded-3xl border border-base-300 bg-linear-to-br from-base-200 to-base-300 shadow-sm">
                <div class="relative p-5 sm:p-6">
                    <div class="relative flex flex-col gap-5">
                        <div class="breadcrumbs max-w-full overflow-x-auto text-sm text-base-content/70">
                            <ul>
                                <li><a class="hover:text-primary" href={resolve("/posts")}>
                                    Posts
                                </a></li>
                                <li>
                                    <span class="font-medium text-base-content">{post.title}</span>
                                </li>
                            </ul>
                        </div>

                        <div class="flex flex-col gap-5 lg:flex-row lg:justify-between">
                            <div class="flex min-w-0 flex-col gap-4 sm:flex-row">
                                {#if post.image}
                                    <img src={post.image} alt="Post Icon" class="size-20 object-cover shadow-lg sm:size-24"/>
                                {/if}

                                <div class="min-w-0">
                                    <h1 class="text-4xl font-bold tracking-tight sm:text-4xl">
                                        {post.title}
                                    </h1>

                                    <div class="mt-3 flex flex-wrap items-center gap-2">
                                        <Icon icon="mdi:tag-multiple-outline" width="1.1em" height="1.1em" />
                                        {#each post.tags as tag (tag)}
                                            <span class="badge badge-soft badge-secondary badge-sm">
                                                {toTitleCase(tag)}
                                            </span>
                                        {/each}
                                    </div>
                                </div>
                            </div>

                            <div class="flex shrink-0 lg:justify-end">
                                <span class="badge badge-outline badge-primary badge-sm">
                                    Posted <FormattedDate date={post.published} includeTime={false} />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {@const hasReferences = post.references.length > 0}
            <div class="grid min-w-0 grid-cols-1 gap-4 {hasReferences ? "lg:grid-cols-[minmax(0,1fr)_18rem]" : ""}">
                <div class="order-1 rounded-3xl border border-base-300 bg-base-200/70 p-4 shadow-sm lg:order-2 lg:self-start" class:hidden={!hasReferences}>
                    <h2 class="mb-3 flex items-center gap-2 text-lg font-bold">
                        <Icon icon="mdi:link-variant" width="1.2em" height="1.2em" />
                        References
                    </h2>
                    <div class="grid gap-5 sm:grid-cols-3 lg:grid-cols-1">
                        {#each post.references as reference (reference.link)}
                            {reference.title}
                            {reference.link}
                            {reference.text}
                            <!-- Todo -->
                        {/each}
                    </div>
                </div>

                <div class="order-2 min-w-0 lg:order-1">
                    <section class="min-w-0 rounded-3xl border border-base-300 bg-base-200/60 p-4 shadow-sm sm:p-6">
                        <MarkdownContainer content={post.content} />
                    </section>
                </div>
            </div>
        {:else}
            <div class="alert alert-warning alert-soft block justify-center">
                <div class="flex w-full flex-col items-center justify-center gap-3 p-14 text-center">
                    <Icon icon="mdi:envelope-open-outline" height="4em" class="opacity-50" />
                    <div>
                        <h2 class="text-xl font-semibold">Post not Found</h2>
                        <p class="text-sm opacity-70">Unable to find the post your looking for</p>
                        <a href={resolve("/posts")} class="btn btn-primary mt-4">
                            <Icon icon="mdi:arrow-left" width="1.2em" height="1.2em" />
                            Browse Posts
                        </a>
                    </div>
                </div>
            </div>
        {/if}
    {:catch}
        <div class="alert alert-error alert-soft block justify-center">
            <div class="flex w-full flex-col items-center justify-center gap-3 p-14 text-center">
                <Icon icon="mdi:alert-circle" height="4em" />
                <div>
                    <h2 class="text-xl font-semibold">Failed to load post</h2>
                    <p class="text-sm opacity-70">An unknown exception occurred loading the post, please try refreshing the page</p>
                </div>
            </div>
        </div>
    {/await}
</main>