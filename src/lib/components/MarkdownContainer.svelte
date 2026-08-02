<script lang="ts">
    import 'carta-md/default.css';
    import '@cartamd/plugin-code/default.css';
    import '@cartamd/plugin-emoji/default.css';

    import {Markdown} from "carta-md";
    import {getCarta} from "$lib/utils/Markdown";

    let { content }: { content: string } = $props();

    const carta = getCarta()
</script>

<div class="prose max-w-none">
    <Markdown {carta} value={content} theme="kruthers" />
</div>