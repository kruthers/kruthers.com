import {SiteApi} from "$lib/api/SiteApi";
import type {FullPost, Post, PostsPage, PostUpdate} from "$lib/types/api";
import {sendToast} from "$lib/store/Toasts";

export default class PostsAPi {
    private readonly api: SiteApi

    constructor(api: SiteApi) {
        this.api = api
    }

    public async getPosts(page: number = 1, count: number = 10, includeHidden: boolean = false): Promise<PostsPage> {
        const response = await this.api.get(`feed?page=${page}&count=${count}&show_hidden=${includeHidden}`)
        if (response.ok) {
            return await response.json() as PostsPage
        } else {
            console.log("Failed to get posts")
            console.log(await response.json())
            sendToast({
                message: "Failed to get posts",
                type: "error",
            })
            return {posts: [], count: count, page: 0, totalPosts: 0, totalPages: 0}
        }
    }

    public async getPost(id: string): Promise<FullPost | undefined> {
        const response = await this.api.get(`feed/${id}`)
        if (response.ok) {
            return await response.json() as FullPost
        } else {
            console.log("Failed to get post")
            console.log(await response.json())
            sendToast({
                message: "Failed to get post",
                type: "error",
            })
        }
    }

    public errorPost(noPosts: boolean): Post {
        return  {
            id: "null",
            description: noPosts ?
                "This placeholder will show the latest post once the posts API is connected." :
                "An error occurred fetching the latest post. Please try again later.",
            image: null,
            published: new Date().toISOString(),
            quickLink: "null",
            tags: ["General","Error"],
            title: noPosts ? "Latest project update coming soon" : "Failed to fetch latest post",
        }
    }

    public async getLatest(): Promise<Post> {
        try {
            const response = await this.api.get(`feed/latest`)
            if (response.ok) {
                return await response.json() as Post
            } else {
                console.log("Failed to get latest post")
                console.log(await response.text())
                return this.errorPost(response.status === 404)
            }
        } catch (e) {
            console.log("Failed to get latest post")
            console.log(e)
            return this.errorPost(true)
        }
    }

    public async savePost(id: string, data: PostUpdate): Promise<boolean> {
        if (!this.api.hasAuth()) return false
        const response = await this.api.post(`feed/${id}`, data)
        if (response?.ok) {
            sendToast({
                message: "Post saved",
                type: "success",
            })
            return true
        } else {
            console.log(`Failed to save post: ${response?.status}`)
            console.log(await response?.text())
            sendToast({
                message: "Failed to save post",
                type: "error",
            })
            return false
        }
    }

    public async createPost(data: PostUpdate): Promise<boolean> {
        if (!this.api.hasAuth()) return false
        const response = await this.api.put("feed", JSON.stringify(data))
        if (response?.ok) {
            sendToast({
                message: "Post created",
                type: "success",
            })
            return true
        } else {
            console.log("Failed to create post")
            console.log(await response?.text())
            sendToast({
                message: "Failed to create post",
                type: "error",
            })
            return false
        }
    }

    public async deletePost(id: string): Promise<boolean> {
        if (!this.api.hasAuth()) return false
        const response = await this.api.delete(`feed/${id}`)
        if (response?.ok) {
            sendToast({
                message: "Post deleted",
                type: "success",
            })
            return true
        } else {
            console.log("Failed to delete post")
            console.log(await response?.text())
            sendToast({
                message: "Failed to delete post",
                type: "error",
            })
            return false
        }
    }

}