import type {MinecraftPlatform} from "$lib/types/projects/MinecraftData";

export interface RawFile {
    name: string,
    version: string,
}

export interface BaseFile extends RawFile {
    project: string,
    link: string,
    id: string,
    published: string,
}

export interface MinecraftFile extends BaseFile {
    platforms: MinecraftPlatform[]
    gameVersions: string[]
}

export interface MinecraftFileCreation extends RawFile {
    platforms: MinecraftPlatform[]
    gameVersions: string[]
}
