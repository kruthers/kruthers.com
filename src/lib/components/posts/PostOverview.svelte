<script lang="ts">

    import type {Post} from "$lib/types/api";
    import FormattedDate from "$lib/components/FormattedDate.svelte";
    import type {Snippet} from "svelte";
    import type {ClassValue} from "svelte/elements";

    type Props = {
        post: Post,
        showDate?: boolean,
        header?: Snippet,
        class?: ClassValue,
        actions?: Snippet
    }

    const {
        post, showDate = true, header, actions,
        class: linkClass = "transition hover:-translate-y-1 hover:shadow-md"
    }: Props = $props();

</script>

<div class="card overflow-hidden bg-primary text-primary-content shadow-sm {linkClass}">
    <div class="flex flex-col md:flex-row">
        {#if post.image}
            <figure class="relative h-48 w-full shrink-0 md:h-auto md:w-52 lg:w-64">
                <img
                    class="h-full w-full object-cover"
                    src={post.image}
                    alt={post.title}
                />

                {#if showDate}
                    <div class="absolute right-3 top-3 md:hidden">
                        <span class="badge badge-secondary shadow">
                            Posted <FormattedDate date={post.published} includeTime={false} />
                        </span>
                    </div>
                {/if}
            </figure>
        {/if}

        <div class="card-body min-w-0 flex-1">
            {@render header?.()}

            <div class="flex items-start gap-4">
                <h2 class="card-title min-w-0 flex-1">{post.title}</h2>

                {#if showDate}
                    <div class:hidden={post.image} class="ml-auto shrink-0 text-right text-sm opacity-90 md:block">
                        <span class="badge badge-accent badge-soft shadow">
                            Posted <FormattedDate date={post.published} includeTime={false} />
                        </span>
                    </div>
                {/if}
            </div>

            <p class="text-sm opacity-90">{post.description}</p>

            <div class="mt-auto flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                {#if actions}
                    <div class="order-2 md:order-1">
                        {@render actions?.()}
                    </div>
                {/if}

                {#if post.tags.length > 0}
                    <div class="order-1 flex min-w-0 flex-wrap gap-2 md:order-2 md:justify-end">
                        {#each post.tags as tag (tag)}
                            <span class="badge badge-outline border-primary-content/50 text-primary-content">
                                {tag}
                            </span>
                        {/each}
                    </div>
                {/if}
            </div>
        </div>
    </div>
</div>
