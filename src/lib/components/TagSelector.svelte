<script lang="ts">
    import Icon from "@iconify/svelte";

    type properties = {
        change?: (opts: string[]) => void
        name: string
        id: string
        options: string[]
        initial?: string[]
    }

    let { change = () => {}, name, id, options, initial = [] }: properties = $props();

    // let showOptions = $state(false);
    let selected: string[] = $state([...initial]);

    function toggleOption(opt: string) {
        if (selected.includes(opt)) {
            selected = selected.filter(o => o !== opt);
        } else {
            selected.push(opt)
        }
        change(selected)
    }

    function removeTag(opt: string) {
        selected = selected.filter(o => o !== opt);
        change(selected)
    }
</script>

<div class="form-control" id="{id}">
    <details class="dropdown">
        <summary class="btn m-1 input-bordered min-h-[3rem] flex flex-wrap items-center gap-2">
            {#if selected.length === 0}
                <span class="text-gray-400">Select {name}...</span>
            {/if}
            {#each selected as tag}
                <div class="badge badge-neutral gap-1 rounded-full">
                    {tag}
                    <button type="button" class="ml-1 text-warning" onclick={(e) => { e.stopPropagation(); removeTag(tag); }}>
                        ✕
                    </button>
                </div>
            {/each}
            <Icon icon="mdi:arrow-down-drop" width="1.2em" height="1.2em" />
        </summary>
        <ul class="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
            {#each options as opt}
                {#if !selected.includes(opt)}
                    <li>
                        <button type="button" class="w-full text-left px-4 py-2 hover:bg-base-200" onclick={() => toggleOption(opt)}>
                            {opt}
                        </button>
                    </li>
                {/if}
            {/each}
        </ul>
    </details>

    <!-- Hidden inputs for native form submission -->
    {#each selected as val}
        <input type="hidden" name="{id}" value={val} />
    {/each}
</div>