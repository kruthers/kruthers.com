<script>
    import Age from "$lib/components/Age.svelte";
    import PageInfo from "$lib/components/PageInfo.svelte";
</script>

<head>
    <title>Home - kruthers.com</title>
</head>

<PageInfo title="Home" description="kruthers' personal site"/>

<div class="hero bg-base-100 min-h-screen">
    <div class="hero-content flex-col lg:flex-row">
        <img src="/icon.png" class="max-w-sm rounded-lg shadow-2xl" alt="Logo"/>
        <div>
            <h1 class="text-5xl font-bold">Hello</h1>
            <p class="py-6">
                Hello, I'm Jordan a <Age/> year old Project Manager, Developer and Systems Administrator based in the UK
            </p>
            <a role="button" class="btn btn-primary" href="portfolio">Full Portfolio</a>
            <a role="button" class="btn btn-secondary" href="downloads">Downloads</a>
        </div>
    </div>
</div>