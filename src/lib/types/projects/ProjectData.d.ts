import {type MinecraftPlatform, MinecraftType} from "./MinecraftData";

/** A very basic project */
export interface RawProject {
    group: string
    id: string
    name: string
    overview: string
    image: string
    credit: string | undefined | null
    tags: string[]
}

export interface ProjectBase extends RawProject {
    description: string
    changelog: Map<string, string>
    links: Map<string, string>
    created: string
    lastUpdate: string
}

/** A minecraft project */
export interface MinecraftProject extends ProjectBase {
    type: MinecraftType
    gameVersions: string[]
    platforms: MinecraftPlatform[]
}
