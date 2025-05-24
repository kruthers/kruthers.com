<script lang="ts">
    import {FontAwesomeIcon} from "@fortawesome/svelte-fontawesome";
    import { faMap, faPlug, faBoxOpen, faBoxArchive } from "@fortawesome/free-solid-svg-icons"
</script>

<ul class="p-2 z-40 bg-primary">
    <li><a href="/downloads">All Projects</a></li>
    <li>
        Minecraft
        <ul>
            <li><a href="/downloads/minecraft?type=map"><FontAwesomeIcon icon={faMap} /> Maps</a></li>
            <li><a href="/downloads/minecraft?type=mod"><FontAwesomeIcon icon={faBoxOpen} /> Mods</a></li>
            <li><a href="/downloads/minecraft?type=plugin"><FontAwesomeIcon icon={faPlug} /> Plugins</a></li>
            <li><a href="/downloads/minecraft?type=datapack"><FontAwesomeIcon icon={faBoxArchive} /> Datapacks</a></li>
        </ul>
    </li>
</ul>
