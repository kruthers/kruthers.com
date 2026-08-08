export type MinecraftPlatform =
    "VANILLA" | "FABRIC" | "FORGE" | "NEO_FORGE" | "BUKKIT" | "SPIGOT" | "PAPER" | "FOLIA" | "SPONGE" | "VELOCITY"

export type MinecraftGroup = "all" | "map" | "plugin" | "mod" | "datapack"

export type MinecraftType =
    "MAP" | "JAR" | "DATAPACK"

export type McPlatformData = {
    id: MinecraftPlatform,
    icon?: string
    name: string,
    color: string,
    type: "vanilla" | "mod" | "plugin",
}
