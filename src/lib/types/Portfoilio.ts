export type PortfolioCardConfig = {
    name: string,
    description: string,
    image: string,
    roles: Array<string>
    tags: Array<Tags>,
    link: string | undefined
}

export enum Tags {
    PAPER,
    PAPER_FORK,
    JAVA,
    KOTLIN,
    SPRING,
    DATABASE,
}
