<script lang="ts">
    export var title: string
    export var description: string

    import { page } from '$app/state';
</script>

<svelte:head>
    <title>{title} - kruthers.com</title>

    <meta property="og:site_name" content="kruthers.com"/>
    <meta property="og:title" content="{title}"/>
    <meta property="og:type" content="website"/>
    <meta property="og:description" content="{description}"/>
    <meta property="og:image" content="/icon.png"/>
    <meta property="og:url" content="{page.url.toString()}" />
    <meta data-react-helmet="true" name="theme-color" content="#2f3c4f" />
</svelte:head>