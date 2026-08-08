export type ProjectTag = {
    id: string,
    name: string,
    show: boolean,
    icon?: string,
    color?: string
}

export const commonTags: ProjectTag[] = [
    {id: "minigame", name: "Minigame", show: true, icon: "mdi:gamepad-variant"},
    {id: "pvp", name: "PvP", show: true, icon: "mdi:sword-cross"},
]
