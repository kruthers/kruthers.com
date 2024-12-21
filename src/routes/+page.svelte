<script>
    import Age from "$lib/components/Age.svelte";
</script>

<div class="hero bg-base-200 min-h-screen">
    <div class="hero-content flex-col lg:flex-row">
        <img src="/icon.png" class="max-w-sm rounded-lg shadow-2xl" alt="Logo"/>
        <div>
            <h1 class="text-5xl font-bold">Hello</h1>
            <p class="py-6">
                Hello, im Jordan a <Age/> year old Project Manager, Developer and Systems Administrator based in the UK
                <br/>
                I am currently Project Lead and a Sr' Dev for <a class="link" href="https://www.blockwars.games">BlockWars</a> and Developer/ System admin for Tubbo
            </p>
            <a role="button" class="btn btn-primary" href="portfolio">Full Portfolio</a>
            <a role="button" class="btn btn-secondary" href="downloads">Downloads</a>
        </div>
    </div>
</div>