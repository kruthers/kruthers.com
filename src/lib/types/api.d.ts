export type SiteApiOptions = {
    url: string,
    access_token?: string | null,
}


/* CDN API */
export interface CdnFileEntry {
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
