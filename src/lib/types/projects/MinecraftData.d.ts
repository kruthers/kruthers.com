export enum MinecraftPlatform {
    VANILLA = "Vanilla",
    FABRIC = "Fabric",
    FORGE = "Forge",
    NEO_FORGE = "NeoForge",
    BUKKIT = "Bukkit",
    SPIGOT = "Spigot",
    PAPER = "PaperMC",
    FOLIA = "Folia",
    SPONGE = "Sponge",
    VELOCITY = "Velocity"
}

const modded = [MinecraftPlatform.FABRIC, MinecraftPlatform.FORGE, MinecraftPlatform.NEO_FORGE]
const loader = [
    MinecraftPlatform.BUKKIT, MinecraftPlatform.SPIGOT, MinecraftPlatform.PAPER, MinecraftPlatform.FOLIA,
    MinecraftPlatform.SPONGE, MinecraftPlatform.VELOCITY
]

export function isModded(plat: MinecraftPlatform) {
    return plat in modded
}

export function isPluginLoader(plat: MinecraftPlatform) {
    return plat in loader
}

export enum MinecraftType {
    MAP,
    JAR,
    DATAPACK
}
