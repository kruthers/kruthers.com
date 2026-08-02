<script lang="ts">
    import {MarkdownEditor} from 'carta-md';
    import {getCarta} from "$lib/utils/Markdown";

    //default theming
    import 'carta-md/default.css';
    import '@cartamd/plugin-code/default.css';
    import '@cartamd/plugin-emoji/default.css';

    type Props = {
        value: string
        fileUploadPath?: string
    }

    let { value = $bindable(), fileUploadPath}: Props = $props();

    // svelte-ignore state_referenced_locally
    const carta = getCarta(fileUploadPath != undefined, fileUploadPath)
</script>

<MarkdownEditor bind:value {carta} mode="tabs" theme="kruthers"/>
