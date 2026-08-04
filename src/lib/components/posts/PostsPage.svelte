<script lang="ts">
    import type {Snippet} from "svelte";
    import type {Post, PostsPage} from "$lib/types/api";
    import PostOverview from "$lib/components/posts/PostOverview.svelte";
    import {resolve} from "$app/paths";
    import {api} from "$lib/utils/api";
    import Icon from "@iconify/svelte";

    type Props = {
        header: Snippet,
        postRender?: Snippet<[Post]>,
        refresh?: () => void,
        includeHidden?: boolean
    }

    let {
        header, postRender, refresh = $bindable(), includeHidden = false
    }: Props = $props()

    const perPageOptions = [10, 20, 50];
    let page = $state(1);
    let perPage = $state(10);
    let posts: Promise<PostsPage> = $derived(api.posts.getPosts(page, perPage, includeHidden));

    function updatePerPage(value: number) {
        perPage = value;
        page = 1;
    }

    refresh = () => {
        posts = api.posts.getPosts(page, perPage, includeHidden);
    }

</script>


<section class="w-full flex flex-col gap-4 px-4 py-6 lg:px-8">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
            {@render header()}
        </div>

        <fieldset class="fieldset w-full sm:w-48">
            <legend class="fieldset-legend">Posts per page</legend>
            <select
                    class="select select-bordered w-full"
                    value={perPage}
                    onchange={(event) => updatePerPage(Number(event.currentTarget.value))}
            >
                {#each perPageOptions as option (option)}
                    <option value={option}>{option}</option>
                {/each}
            </select>
        </fieldset>
    </div>

    {#await posts}
        <div class="flex flex-col gap-4">
            {#each Array(perPage)}
                <div class="skeleton h-40 w-full"></div>
            {/each}
        </div>
    {:then postsPage}
        {#if postsPage.posts.length > 0}
            <div class="flex flex-col gap-4">
                {#each postsPage.posts as post (post.id)}
                    {#if postRender}
                        {@render postRender(post)}
                    {:else}
                        <a href={resolve("/posts/[slug]", { slug: post.quickLink })}>
                            <PostOverview post={post} />
                        </a>
                    {/if}
                {/each}
            </div>

            <div class="flex flex-col items-center gap-3 pt-4">
                <div class="join">
                    {#each Array(postsPage.totalPages) as _, index (index)}
                        {@const pageNumber = index + 1}

                        <input
                                class="join-item btn btn-square"
                                type="radio"
                                name="posts-pagination"
                                aria-label={String(pageNumber)}
                                checked={page === pageNumber}
                                onchange={() => page = pageNumber}
                        />
                    {/each}
                </div>

                <p class="text-center text-sm opacity-70">
                    Showing page {postsPage.page} of {postsPage.totalPages}
                    · {postsPage.totalPosts} total posts
                </p>
            </div>
        {:else}
            <div class="alert alert-warning alert-soft block justify-center">
                <div class="flex w-full flex-col items-center justify-center gap-3 p-14 text-center">
                    <Icon icon="mdi:do-not-enter-outline" height="4em" class="opacity-50" />
                    <div>
                        <h2 class="text-xl font-semibold">No posts found</h2>
                        <p class="text-sm opacity-70">Looks like there is no posts yet</p>
                    </div>
                </div>
            </div>
        {/if}
    {:catch}
        <div class="alert alert-error alert-soft block justify-center">
            <div class="flex w-full flex-col items-center justify-center gap-3 p-14 text-center">
                <Icon icon="mdi:alert-circle" height="4em" />
                <div>
                    <h2 class="text-xl font-semibold">Failed to load posts</h2>
                    <p class="text-sm opacity-70">An unknown exception occurred loading the posts, please try refreshing the page</p>
                </div>
            </div>
        </div>
    {/await}
</section>