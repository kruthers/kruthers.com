import {MinecraftPlatform, MinecraftType} from "./MinecraftData";

/** A very basic project */
export interface RawProject {
    group: string
    id: string
    name: string
    overview: string
}

export interface ProjectBase extends RawProject {
    description: string
    changelog: [string, string]
}

/** A minecraft project */
export interface MinecraftProject extends ProjectBase {
    tags: string[]
    gameVersion: string[]
    platforms: MinecraftPlatform[]
    type: MinecraftType
}
