<script lang="ts">
    import MarkdownEditorContainer from "$lib/components/MarkdownEditorContainer.svelte";
    import type {FullPost, PostUpdate} from "$lib/types/api";
    import {api, getUploadedFileUrl} from "$lib/utils/api";

    type Props = {
        post: FullPost,
        onSave: (post: FullPost) => void,
        onCancel?: () => void
    }

    const {post, onSave, onCancel}: Props = $props()
    let title = $state(post.title);
    let description = $state(post.description);
    let tags = $state(post.tags.join(", "));
    let content = $state(post.content);
    let image = $state<string | null>(post.image);
    let selectedImage = $state<File | undefined>();
    let saving = $state(false);

    function handleImageChange(event: Event) {
        const input = event.target as HTMLInputElement;
        selectedImage = input.files?.[0];

        if (selectedImage) {
            image = URL.createObjectURL(selectedImage);
        }
    }

    async function savePost(event: SubmitEvent) {
        event.preventDefault();

        if (saving) return;

        saving = true;

        let savedImage = post.image;

        if (selectedImage) {
            const uploaded = await api.cdn.uploadFile(selectedImage, "posts/icons/");

            if (!uploaded) {
                saving = false;
                return;
            }

            savedImage = getUploadedFileUrl("posts/icons/", selectedImage);
        }

        const update: PostUpdate = {
            title,
            description,
            content,
            tags: tags.split(",").map(tag => tag.trim()).filter(Boolean),
            image: savedImage,
            hidden: post.hidden
        };

        const saved = await api.posts.savePost(post.id, update);

        saving = false;

        if (saved) {
            onSave({
                ...post,
                ...update,
                image: savedImage,
                tags: update.tags ?? [],
                content
            });
        }
    }

</script>

<form class="flex flex-col gap-5" onsubmit={savePost}>
    <fieldset class="fieldset">
        <legend class="fieldset-legend">Image</legend>

        {#if image}
            <div class="overflow-hidden rounded-box border border-base-300 bg-base-200">
                <img
                        class="max-h-64 w-full object-cover"
                        src={image}
                        alt={title}
                />
            </div>
        {/if}

        <input
                class="file-input w-full"
                type="file"
                name="image"
                accept="image/*"
                onchange={handleImageChange}
        />

        <p class="text-xs opacity-70">
            Upload a new image to replace the current post image.
        </p>
    </fieldset>

    <fieldset class="fieldset">
        <legend class="fieldset-legend">Title</legend>

        <input
                class="input w-full validator"
                type="text"
                bind:value={title}
                maxlength="128"
                required
                placeholder="Post title"
                pattern="[a-zA-Z0-9 \-_!*'@$%&^£]+"
        />

        <p class="validator-hint">
            Required, must only use letters, numbers and basic special characters
        </p>
    </fieldset>

    <fieldset class="fieldset">
        <legend class="fieldset-legend">Description</legend>

        <textarea
                class="textarea min-h-28 w-full validator"
                bind:value={description}
                maxlength="256"
                required
                placeholder="Short post description"
        ></textarea>

        <p class="validator-hint">Required</p>
    </fieldset>

    <fieldset class="fieldset">
        <legend class="fieldset-legend">Tags</legend>

        <input
                class="input w-full"
                type="text"
                bind:value={tags}
                placeholder="Update, Project, Release"
        />

        <p class="text-xs opacity-70">Separate tags with commas.</p>
    </fieldset>

    <fieldset class="fieldset">
        <legend class="fieldset-legend">Content</legend>

        <MarkdownEditorContainer
                bind:value={content}
                fileUploadPath="posts/content/"
        />
    </fieldset>

    <div class="modal-action">
        {#if onCancel}
            <button
                    class="btn"
                    type="button"
                    onclick={onCancel}
                    disabled={saving}
            >
                Cancel
            </button>
        {/if}

        <button class="btn btn-secondary" type="submit" disabled={saving}>
            {#if saving}
                <span class="loading loading-spinner loading-sm"></span>
                Saving...
            {:else}
                Save post
            {/if}
        </button>
    </div>
</form>
