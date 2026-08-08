/** A very basic project */
export interface RawProject {
    group: string
    id: string
    name: string
    overview: string
    /** @deprecated */
    image: string
    icon: string,
    banner: string,
    credit: string | undefined | null
    tags: string[]
}

export interface ProjectBase extends RawProject {
    description: string
    changeLog: object
    links: object
    created: string
    lastUpdate: string
}

/** A minecraft project */
export interface MinecraftProject extends ProjectBase {
    type: MinecraftType
    gameVersions: string[]
    platforms: MinecraftPlatform[]
}
