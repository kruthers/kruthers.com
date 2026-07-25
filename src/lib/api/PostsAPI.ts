import {SiteApi} from "$lib/api/SiteApi";
import type {FullPost, PostsPage} from "$lib/types/api";
import {sendToast} from "$lib/store/Toasts";

export default class PostsAPi {
    private readonly api: SiteApi

    constructor(api: SiteApi) {
        this.api = api
    }

    public async getPosts(page: number = 1, count: number = 10): Promise<PostsPage> {
        const response = await this.api.get(`feed?page=${page}&count=${count}`)
        if (response.ok) {
            return await response.json() as PostsPage
        } else {
            console.log("Failed to get posts")
            console.log(await response.text())
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
            console.log(await response.text())
            sendToast({
                message: "Failed to get post",
                type: "error",
            })
        }
    }

    public async savePost(post: FullPost): Promise<boolean> {
        if (!this.api.hasAuth()) return false
        post.lastEdit = new Date().toISOString()
        const response = await this.api.post("feed", post)
        if (response?.ok) {
            sendToast({
                message: "Post saved",
                type: "success",
            })
            return true
        } else {
            console.log("Failed to save post")
            console.log(await response?.text())
            sendToast({
                message: "Failed to save post",
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