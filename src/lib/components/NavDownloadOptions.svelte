<script lang="ts">

import Icon from "@iconify/svelte";
</script>

<ul class="p-2 z-40 bg-primary">
    <li><a href="/downloads">All Projects</a></li>
    <li>
        Minecraft
        <ul>
            <li><a href="/downloads/minecraft?type=map"><Icon icon="mdi:map" width="1.2em" height="1.2em" /> Maps</a></li>
            <li><a href="/downloads/minecraft?type=mod"><Icon icon="mdi:gear-box" width="1.2em" height="1.2em" /> Mods</a></li>
            <li><a href="/downloads/minecraft?type=plugin"><Icon icon="material-symbols:power-plug-rounded" width="1.2em" height="1.2em" /> Plugins</a></li>
            <li><a href="/downloads/minecraft?type=datapack"><Icon icon="mdi:box-variant" width="1.2em" height="1.2em" /> Datapacks</a></li>
        </ul>
    </li>
</ul>
