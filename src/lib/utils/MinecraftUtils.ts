import {type McPlatformData, type MinecraftPlatform} from "$lib/types/projects/MinecraftData";

const unknownPlatform: McPlatformData = {
    id: "VANILLA",
    name: "Unknown",
    color: "#ff0000",
    type: "vanilla"
}

export const platforms: McPlatformData[] = [
    {id: "VANILLA", name: "Vanilla", icon: "mdi:minecraft", color: "#8eb920", type: "vanilla"},
    {id: "FABRIC", name: "Fabric", icon: "file-icons:fabric", color: "#dbd0b4", type: "mod"},
    {id: "FORGE", name: "Forge", icon: "cib:conda-forge", color: "#dfa86a", type: "mod"},
    {id: "NEO_FORGE", name: "Neo Forge", icon: "dinkie-icons:fox-face", color: "#a94e0d", type: "mod"},
    {id: "BUKKIT", name: "Bukkit", icon: "tabler:bucket", color: "#949494", type: "plugin"},
    {id: "SPIGOT", name: "Spigot", icon: "simple-icons:spigotmc", color: "#ef8e21", type: "plugin"},
    {id: "PAPER", name: "Paper", icon: "fa:paper-plane", color: "#635027", type: "plugin"},
    {id: "FOLIA", name: "Folia", icon: "mdi:leaf", color: "#304e22", type: "plugin"},
    {id: "SPONGE", name: "Sponge", color: "#f7cf0d", type: "plugin"},
    {id: "VELOCITY", name: "Velocity", icon: "simple-icons:velocity", color: "#40224e", type: "plugin"},
]

export function isModded(plat: MinecraftPlatform) {
    return getPlatformData(plat).type == "mod"
}

export function isPluginLoader(plat: MinecraftPlatform) {
    return getPlatformData(plat).type == "plugin"
}

export function getPlatformData(plat: MinecraftPlatform): McPlatformData {
    const options = platforms.filter((p) => p.id === plat)
    return options.length > 0 ? options[0] : unknownPlatform
}

