<script lang="ts">
    import {api} from "$lib/utils/api";
    import PageInfo from "$lib/components/PageInfo.svelte";
    import PostsPage from "$lib/components/posts/PostsPage.svelte";
    import {resolve} from "$app/paths";
    import {openModal, closeModal} from "$lib/utils/Utils";
    import PostOverview from "$lib/components/posts/PostOverview.svelte";
    import type {FullPost, Post} from "$lib/types/api";
    import Icon from "@iconify/svelte";
    import PostEditor from "$lib/components/posts/PostEditor.svelte";
    import {adminMeta} from "$lib/store/AdminStore";

    adminMeta.set({
        pages: [
            { name: "Posts", path: "/admin/posts", icon: "mdi:file-tree" },
        ]
    });

    let refresh: () => void = $state(() => {})
    let postToDelete: Post | undefined = $state();
    let creatingPost = $state(false)
    let editingPost: Promise<FullPost> | undefined = $state();

    async function deletePost() {
        if (!postToDelete) return;
        const deleted = await api.posts.deletePost(postToDelete.id);
        postToDelete = undefined;
        if (deleted) refresh()
    }

    async function editPost(post: Post) {
        editingPost = api.posts.getPost(post.id).then((result: FullPost | undefined) => {
            if (result) return result;
            editingPost = undefined;
            return {
                ...api.posts.errorPost(false),
                content: "Missing",
                lastEdit: null,
                references: []
            }
        })
    }

    async function cancelEdit() {
        editingPost = undefined
    }

    async function savedPost() {
        editingPost = undefined
        refresh()
    }

    async function createPost(event: SubmitEvent) {
        event.preventDefault()
        if (creatingPost) return;
        const data = new FormData(event.target as HTMLFormElement)
        const imageFile = data.get("image");

        creatingPost = true;

        let image: string | null = null;

        if (imageFile instanceof File && imageFile.size > 0) {
            const result = await api.cdn.uploadFile(imageFile, "posts/icons/");

            if (result == null) {
                creatingPost = false;
                return;
            }

            image = result
        }

        const created = await api.posts.createPost({
            title: String(data.get("title") ?? ""),
            description: String(data.get("description") ?? ""),
            content: "",
            tags: (data.get("tags") as string).split(",").map(tag => tag.trim()).filter(Boolean),
            image,
            hidden: true
        });

        creatingPost = false;

        if (created) {
            closeModal("new-post");
            refresh();
        }
    }
</script>

<PageInfo title="Manage Posts" description="Manage posts" />

<main class="w-full">
    <div class="mx-auto flex w-full max-w-7xl lg:shadow-xl">
        <PostsPage bind:refresh includeHidden={true}>
            {#snippet header()}
                <h1 class="text-3xl font-bold">Posts</h1>
                <p class="text-sm opacity-70">Manage all posts.</p>
            {/snippet}

            {#snippet postRender(post: Post)}
                <PostOverview {post} class="">
                    {#snippet actions()}
                        <div class="flex w-full flex-row gap-2 sm:w-auto flex-wrap justify-end md:justify-normal">
                            <a class="btn btn-sm btn-secondary btn-outline max-md:w-16" href={resolve("/posts/[slug]", { slug: post.quickLink })}>
                                <Icon icon="mdi:print-preview"/> <span class="hidden lg:block">View</span>
                            </a>
                            <button class="btn btn-sm btn-accent btn-outline max-md:w-16" onclick={() => editPost(post)}>
                                <Icon icon="mdi:pencil" /> <span class="hidden lg:block">Edit</span>
                            </button>
                            <button
                                    class="btn btn-sm {post.hidden ? "btn-success" : "btn-info"} btn-outline max-md:w-16"
                                    onclick={() => api.posts.setVisibility(post.id, post.hidden ?? true).then(() => refresh())}>
                                <Icon icon={post.hidden ? "mdi:visibility" : "mdi:visibility-off"} />
                                <span class="hidden lg:block">{post.hidden ? "Publish" : "Hide"}</span>
                            </button>
                            <button class="btn btn-sm btn-error max-md:w-16" onclick={() => postToDelete = post}>
                                 <Icon icon="mdi:trash-can" /> <span class="hidden lg:block">Delete</span>
                            </button>
                        </div>
                    {/snippet}
                </PostOverview>
            {/snippet}
        </PostsPage>
    </div>
</main>

<div class="fab">
    <button class="btn btn-lg rounded-box btn-secondary" onclick={() => openModal("new-post")}>
        <Icon icon="mdi:newspaper-plus" height="1.2em" /> New Post
    </button>
</div>

{#if postToDelete}
    <dialog id="delete-post" class="modal modal-open">
        <div class="modal-box">
            <h3 class="text-lg font-bold">Delete post?</h3>

            <p class="py-4">
                Are you sure you want to delete “{postToDelete.title}”? This action cannot be undone.
            </p>

            <div class="modal-action">
                <form method="dialog" class="flex flex-col gap-2 sm:flex-row">
                    <button class="btn" type="submit">
                        Cancel
                    </button>

                    <button class="btn btn-error" type="submit" onclick={() => deletePost()}>
                        Delete
                    </button>
                </form>
            </div>
        </div>

        <form method="dialog" class="modal-backdrop">
            <button type="submit">close</button>
        </form>
    </dialog>
{/if}

{#if editingPost}
    <dialog id="edit-post" class="modal modal-open">
        {#await editingPost}
            <div class="modal-box flex max-h-[92vh] w-11/12 max-w-7xl flex-col overflow-hidden p-0">
                <span class="loading loading-spinner w-3xl"></span>
            </div>
        {:then post}
            <PostEditor {post} onSave={savedPost} onCancel={cancelEdit} />
        {/await}
    </dialog>
{/if}

<dialog id="new-post" class="modal">
    <div class="modal-box max-w-2xl">
        <h3 class="text-lg font-bold">Create new post</h3>

        <form class="mt-6 flex flex-col gap-2" onsubmit={createPost}>
            <fieldset class="fieldset">
                <legend class="fieldset-legend">Image</legend>
                <input class="file-input w-full" type="file" name="image" accept="image/*"/>
            </fieldset>

            <fieldset class="fieldset">
                <legend class="fieldset-legend">Title</legend>
                <input
                    class="input w-full validator" type="text" name="title" maxlength="128"
                    required placeholder="Post title"
                />
                <p class="validator-hint">Required, must only use letters, numbers and basic special characters</p>
            </fieldset>

            <fieldset class="fieldset">
                <legend class="fieldset-legend">Description</legend>
                <textarea class="textarea min-h-28 w-full validator" name="description" maxlength="256"
                          required placeholder="Short post description"
                ></textarea>
                <p class="validator-hint ">Required</p>
            </fieldset>

            <fieldset class="fieldset">
                <legend class="fieldset-legend">Tags</legend>
                <input class="input w-full" type="text" name="tags" placeholder="Update, Project, Release"/>
                <p class="text-xs opacity-70">Separate tags with commas.</p>
            </fieldset>

            <div class="modal-action">
                <button class="btn" type="button" onclick={() => closeModal("new-post")} disabled={creatingPost}>
                    Cancel
                </button>

                <button class="btn btn-secondary" type="submit" disabled={creatingPost}>
                    {#if creatingPost}
                        <span class="loading loading-spinner loading-sm"></span>
                        Creating...
                    {:else}
                        Create post
                    {/if}
                </button>
            </div>
        </form>
    </div>

    <form method="dialog" class="modal-backdrop">
        <button type="submit">close</button>
    </form>
</dialog>
