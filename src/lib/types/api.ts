export type SiteApiOptions = {
    url: string,
    access_token?: string | null,
}

/* Auth API */
export interface Token {
    tokenId: string,
    expires: string,
    name: string
}

/* CDN API */
export interface CdnFileEntry {
    /** The Path of the file */
    name: string,
    type: FileType,
    size: number
}

export enum FileType {
    UPLOADING = "UPLOADING",
    FOLDER = "FOLDER",
    FILE = "FILE",
}

export interface CdnUploadURL {
    fileID: string,
    url: string,
    auth: string
}

/* Posts API */
export interface Post {
    id: string,
    title: string,
    tags: string[],
    image: string | null,
    description: string,
    published: string,
}

export interface PostReference {
    type: "project" | "github" | "link" | "youtube",
    link: string,
    text?: string,
    title?: string,
}

export interface FullPost extends Post {
    content: string,
    lastEdit: string | null,
    references: PostReference[]
}

export interface PostsPage {
    posts: Post[],
    page: number,
    count: number,
    totalPages: number,
    totalPosts: number,
}


