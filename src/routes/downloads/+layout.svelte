<script lang="ts">
    import {FontAwesomeIcon} from "@fortawesome/svelte-fontawesome";
    import { faMap, faPlug, faBoxOpen } from "@fortawesome/free-solid-svg-icons"

    let { children } = $props();
</script>

<div class="bg-base-200">
    <div class="max-w-7xl mx-auto px-2 lg:px-8 bg-accent h-14">
        <ul class="menu lg:menu-horizontal rounded-box lg:mb-64">
            <li><a href="/downloads" >All Projects</a></li>
            <li>
                <details>
                    <summary>Minecraft</summary>
                    <ul class="z-40">
                        <li><a href="/downloads/minecraft?type=maps"><FontAwesomeIcon icon={faMap}/> Maps</a></li>
                        <li><a href="/downloads/minecraft?type=plugins"><FontAwesomeIcon icon={faPlug}/> Plugins</a></li>
                        <li><a href="/downloads/minecraft?type=mods"><FontAwesomeIcon icon={faBoxOpen}/> Mods</a></li>
                    </ul>
                </details>
            </li>
        </ul>
    </div>

    {@render children()}
</div>