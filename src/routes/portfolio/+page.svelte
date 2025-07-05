<script lang="ts">
    import {type PortfolioCardConfig} from "$lib/types/Portfoilio";
    import PortfolioCard from "$lib/components/portfolio/PortfolioCard.svelte";
    import Skill from "$lib/components/portfolio/Skill.svelte";
    import Language from "$lib/components/portfolio/Language.svelte";
    import SingleRow from "$lib/components/SingleRow.svelte";
    import MinecraftApi from "$lib/components/portfolio/MinecraftApi.svelte";
    import PageInfo from "$lib/components/PageInfo.svelte";

    const pages: Array<PortfolioCardConfig> = [
        {
            name: "Block Wars",
            description: "A monthly minecraft event hosting a range of streamers from CaptainSparklez, Hannahxxrose to JoeBard & Papalatte. Previously has partnered with Twitch and Chipotle",
            roles: [ "Project Lead & Manager", "Developer", "Game Designer" ],
            tags: [],
            image: "blockwars.png",
            link: "https://blockwars.games"
        },
        {
            name: "Gamemode 4",
            description: "A public SMP running on paper using custom Datapack Modification to create a vanilla + experience. Has a range of custom plugins to assist with management and moderation",
            roles: [ "System & Server Admin", "Plugin Developer" ],
            tags: [],
            image: "gm4_logo.svg",
            link: "https://gm4.co"
        },
        {
            name: "Bolt & Random PVP",
            description: "2 minecraft minigame maps that were published to minecraft realms. This maps were made using 100% vanilla and a range of custom systems within data packs to manipulate the gameplay",
            roles: [ "Developer", "Game Designer", "Project Leads" ],
            tags: [],
            image: "bolt.png",
            link: "https://kruthers.com/downloads/bolt"
        }
    ]
</script>

<svelte:head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css">
</svelte:head>
<PageInfo title="Portfolio" description="A full developer, project manager and systems administrator working on technical projects and in Java & Kotlin with experience in making websites, servers, plugins and mods" />

<div class="min-h-full">
    <header class="bg-secondary shadow">
        <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 class="text-3xl font-bold tracking-tight text-gray-900">Portfolio</h1>
        </div>
    </header>
    <main>
        <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <SingleRow clazz="mx-auto">
                <Skill skill="ProjectManager"/>
                <Skill skill="Developer"/>
                <Skill skill="Systems Administrator"/>
            </SingleRow>
            <br/>
            <h1 class="text-xl font-semibold">Languages</h1>
            <Language name="Kotlin" link="https://kotlinlang.org/" icon="kotlin-plain colored"/>
            <Language name="Java" link="https://www.oracle.com/uk/java/technologies/downloads/" icon="java-plain-wordmark colored"/>
            <Language name="Java Script / Node" link="https://www.javascript.com/" icon="javascript-plain colored"/>
            <Language name="Type Script" link="https://www.typescriptlang.org/" icon="typescript-plain colored"/>
            <Language name="Python" link="https://www.python.org/" icon="python-plain colored"/>
            <br/>
            <h1 class="text-xl font-semibold">Libraries & Frameworks</h1>
            <Language name="Ubuntu" link="https://ubuntu.com/" icon="ubuntu-plain colored"/>
            <Language name="Spring Boot" link="https://spring.io/" icon="spring-plain colored"/>
            <Language name="Ktor" link="https://ktor.io/" icon="ktor-plain colored"/>
            <Language name="SQL" link="" icon="sqldeveloper-plain"/>
            <Language name="MongoDB" link="https://www.mongodb.com/" icon="mongodb-plain colored"/>
            <MinecraftApi name="Paper" link="https://papermc.io/">
                <img alt="paper" height="48" src="https://cdn.jsdelivr.net/npm/@intergrav/devins-badges@3/assets/cozy-minimal/supported/paper_vector.svg">
            </MinecraftApi>
            <MinecraftApi name="Velocity" link="https://papermc.io/">
                <img alt="velocity" height="48" src="https://cdn.jsdelivr.net/npm/@intergrav/devins-badges@3/assets/cozy-minimal/supported/velocity_vector.svg">
            </MinecraftApi>
            <MinecraftApi name="Fabric API" link="https://fabricmc.net/">
                <img alt="fabric-api" height="48" src="https://cdn.jsdelivr.net/npm/@intergrav/devins-badges@3/assets/cozy-minimal/requires/fabric-api_vector.svg">
            </MinecraftApi>
            <br/>
            <h1 class="text-xl font-semibold">Tools</h1>
            <Language name="Git" link="https://git-scm.com/" icon="git-plain colored"/>
            <Language name="Docker" link="https://www.docker.com/" icon="docker-plain colored"/>
            <Language name="Gradle (Kotlin)" link="https://gradle.org/" icon="gradle-plain colored"/>
        </div>
    </main>
    <header class="bg-secondary shadow">
        <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 class="text-3xl font-bold tracking-tight text-gray-900">Previous Work</h1>
        </div>
    </header>

    {#each pages as card, index}
        <PortfolioCard config={card} left="{index % 2 === 1}" />
    {/each}
</div>