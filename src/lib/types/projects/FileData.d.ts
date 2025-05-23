import type {MinecraftPlatform} from "$lib/types/projects/MinecraftData";

export interface BaseFile {
    project: string,
    name: string,
    version: string,
    id: string
}

export interface MinecraftFile extends BaseFile {
    platforms: MinecraftPlatform[]
    gameVersions: string[]
}
