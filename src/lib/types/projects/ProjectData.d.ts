import {MinecraftType} from "./MinecraftData";

/** A very basic project */
interface RawProject {
    group: string
    id: string
    name: string
    overview: string
}

interface ProjectBase extends RawProject {
    description: string
    changelog: [string, string]
}

/** A minecraft project */
interface MinecraftProject extends ProjectBase {
    tags: string[],
    gameVersion: string[],
    platforms: MinecraftType[]
}
