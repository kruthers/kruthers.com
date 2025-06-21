import type {MinecraftPlatform} from "$lib/types/projects/MinecraftData";

export interface BaseFile {
    project: string,
    name: string,
    version: string,
    link: string,
    id: string,
    published: string,
}

export interface MinecraftFile extends BaseFile {
    platforms: MinecraftPlatform[]
    gameVersions: string[]
}
