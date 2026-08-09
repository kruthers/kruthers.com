<script lang="ts">
    import MarkdownEditorContainer from "$lib/components/MarkdownEditorContainer.svelte";
    import type {FullPost, PostUpdate} from "$lib/types/api";
    import {api} from "$lib/utils/api";
    import Icon from "@iconify/svelte";
    import {toTitleCase} from "$lib/utils/Utils";
    import {onDestroy, onMount} from "svelte";

    type Props = {
        post: FullPost,
        onSave: (post: FullPost) => void,
        onCancel?: () => void
        modalID?: string,
    }

    const {post, onSave, onCancel, modalID = "edit-post"}: Props = $props()

    let saving = $state(false);

    let iconPreview: string | null = $state(post.image);
    let content: string = $state(post.content);

    let tags: string[] = $state([...post.tags]);
    let newTag: string = $state("");

    function updateImagePreview(event: Event) {
        const input = event.target as HTMLInputElement;
        const file = input.files?.[0];
        if (!file) return;
        iconPreview = URL.createObjectURL(file);
    }

    function addTag() {
        const tag = newTag.trim();

        if (tag.length === 0 || tags.includes(tag)) {
            newTag = "";
            return;
        }

        tags = [...tags, tag];
        newTag = "";
    }

    function removeTag(tag: string) {
        tags = tags.filter(t => t !== tag);
    }

    async function processForm(event: SubmitEvent) {
        event.preventDefault();
        const data = new FormData(event.currentTarget as HTMLFormElement);
        const post = await savePost(data)
        if (post) {
            onSave(post)
        }
    }

    async function savePost(data: FormData): Promise<FullPost | undefined> {
        if (saving) return;
        saving = true;

        let savedImage = post.image;
        const imageFile = data.get("image");
        if (imageFile instanceof File && imageFile.size > 0) {
            console.log(`Uploading new image...`)
            const fileName = `${post.id}.${imageFile.name.split(".").pop()}`
            const uploadPath = `"posts/icons/"`;
            const result = await api.cdn.uploadFile(imageFile, uploadPath, fileName);
            if (result) {
                console.log(`Uploaded image to ${result}`)
                savedImage = result;
            }
        }

        const update: PostUpdate = {
            title: data.get("title") as string,
            description: data.get("description") as string,
            content,
            tags: tags.filter(Boolean),
            image: savedImage,
            hidden: post.hidden
        };

        const saved = await api.posts.savePost(post.id, update);

        saving = false;

        if (saved) {
            return {
                ...post,
                ...update,
                image: savedImage,
                tags: update.tags ?? [],
                content
            }
        }
    }

    let timeout: ReturnType<typeof setInterval> | null = null;

    onMount(() => {
        timeout = setInterval(() => {
            const element = window.document.getElementById(`${modalID}-form`)
            if (element) {
                const form = element as HTMLFormElement
                const data = new FormData(form)
                savePost(data)
            }
        }, 20000)
    })

    onDestroy(() => {
        if (timeout) {
            clearInterval(timeout)
        }
    })

</script>

<div class="modal-box flex max-h-[92vh] w-11/12 max-w-7xl flex-col overflow-hidden p-0">
    <div class="border-b border-base-300 bg-base-200/80 px-5 py-4 sm:px-6">
        <div class="flex items-start justify-between gap-4">
            <h2 class="text-2xl font-bold">Edit Post</h2>
            <button class="btn btn-circle btn-ghost" type="button" onclick={onCancel}>
                <Icon icon="mdi:close" width="1.4em" height="1.4em" />
            </button>
        </div>
    </div>

    <form class="min-h-0 flex-1 overflow-y-auto" onsubmit={processForm} id="{modalID}-form}">
        <div class="flex flex-col gap-5 p-5 sm:p-6">
            <section class="rounded-3xl border border-base-300 bg-base-200/70 p-4 shadow-sm">
                <h3 class="mb-4 flex items-center gap-2 text-lg font-bold">
                    <Icon icon="mdi:email-newsletter" width="1.2em" height="1.2em" />
                    Basic Details
                </h3>

                <div class="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <fieldset class="fieldset">
                        <legend class="fieldset-legend">Icon</legend>

                        <label
                                class="group relative block size-48 cursor-pointer overflow-hidden rounded-3xl border border-base-300 bg-base-100 shadow-sm transition hover:border-primary hover:shadow-lg"
                                for={`${modalID}-icon`}
                        >
                            {#if iconPreview}
                                <img src={iconPreview} alt="Post preview" class="h-full w-full object-cover transition duration-300"/>
                            {:else}
                                <div class="flex h-full w-full items-center justify-center bg-base-300/50">
                                    <Icon icon="mdi:image" width="2em" height="2em" />
                                </div>
                            {/if}

                            <div class="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-base-300/50 opacity-0 transition-opacity group-hover:opacity-100">
                                <Icon icon="mdi:upload" width="1.8em" height="1.8em" />
                                <span class="text-xs font-semibold">Upload Icon</span>
                            </div>
                        </label>

                        <input id={`${modalID}-icon`} class="hidden" type="file" name="icon" accept="image/*" onchange={(event) => updateImagePreview(event)} disabled={saving}/>
                        <p class="label text-xs text-base-content/60">Click the image to upload a square icon.</p>
                    </fieldset>

                    <div class="w-full">
                        <fieldset class="fieldset">
                            <legend class="fieldset-legend">Title</legend>
                            <input
                                    class="input w-full validator" type="text" maxlength="128" required
                                    placeholder="Post title" value={post.title} name="title"
                            />
                            <p class="validator-hint">Required, must only use letters, numbers and basic special characters</p>
                        </fieldset>

                        <fieldset class="fieldset">
                            <legend class="fieldset-legend">Description</legend>
                            <textarea
                                    class="textarea min-h-18 w-full validator" maxlength="256" required
                                    placeholder="Short post description" name="description"
                            >{post.description}</textarea>
                            <p class="validator-hint">Required</p>
                        </fieldset>
                    </div>
                </div>
            </section>

            <section class="rounded-3xl border border-base-300 bg-base-200/70 p-4 shadow-sm">
                <h3 class="mb-4 flex items-center gap-2 text-lg font-bold">
                    <Icon icon="mdi:tag-multiple-outline" width="1.2em" height="1.2em" />
                    Project Tags
                </h3>

                <div class="flex flex-col gap-3 lg:flex-row lg:items-end">
                    <fieldset class="fieldset shrink-0">
                        <legend class="fieldset-legend">Add Tag</legend>
                        <div class="join w-full sm:w-64">
                            <input
                                    class="input join-item w-full" type="text" placeholder="Tag name" bind:value={newTag}
                                    onkeydown={(event) => {
                                        if (event.key === "Enter") {
                                            event.preventDefault();
                                            addTag();
                                        }
                                    }}
                            />
                            <button class="btn btn-primary join-item" type="button" onclick={addTag}>
                                Add
                            </button>
                        </div>
                    </fieldset>

                    <div class="min-w-0 flex-1 lg:pb-2">
                        {#if tags.length > 0}
                            <div class="flex flex-wrap gap-2">
                                {#each tags as tag (tag)}
                                    <span class="badge badge-secondary badge-soft gap-2">
                                        {toTitleCase(tag)}
                                        <button type="button" class="cursor-pointer" onclick={() => removeTag(tag)} >
                                            <Icon icon="mdi:delete-outline" height="1em" />
                                        </button>
                                    </span>
                                {/each}
                            </div>
                        {:else}
                            <p class="rounded-2xl border border-dashed border-base-300 bg-base-100/50 px-4 py-3 text-center text-sm text-base-content/60 lg:text-left">
                                No tags added yet.
                            </p>
                        {/if}
                    </div>
                </div>
            </section>

            <section class="rounded-3xl border border-base-300 bg-base-200/70 p-4 shadow-sm min-h-120">
                <h3 class="mb-4 flex items-center gap-2 text-lg font-bold">
                    <Icon icon="mdi:newspaper" width="1.2em" height="1.2em" />
                    Post Content
                </h3>
                <MarkdownEditorContainer bind:value={content} fileUploadPath="posts/content/"/>
            </section>
        </div>

        <div class="sticky bottom-0 z-10 border-t border-base-300 bg-base-200/95 px-5 py-4 backdrop-blur sm:px-6">
            <div class="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button class="btn btn-ghost" type="button" onclick={onCancel} disabled={saving}>
                    Cancel
                </button>

                <button class="btn btn-primary" type="submit" disabled={saving}>
                    {#if saving}
                        <span class="loading loading-spinner loading-sm"></span>
                        Saving...
                    {:else}
                        <Icon icon="mdi:content-save-outline" width="1.2em" height="1.2em" />
                        Save Post
                    {/if}
                </button>
            </div>
        </div>
    </form>
</div>
