type MinecraftPlatform =
    "VANILLA" | "FABRIC" | "FORGE" | "NEO_FORGE" | "BUKKIT" | "SPIGOT" | "PAPER" | "FOLIA" | "SPONGE" | "VELOCITY"

type MinecraftGroup = "all" | "map" | "plugin" | "mod" | "datapack"

type MinecraftType =
    "MAP" | "JAR" | "DATAPACK"

type McPlatformData = {
    id: MinecraftPlatform,
    icon?: string
    name: string,
    color: string,
    type: "vanilla" | "mod" | "plugin",
}
