<script lang="ts">
    import { marked } from 'marked';

    export let content: string;

    // Convert Markdown to HTML
    const html = marked(content);
</script>

{@html html}
