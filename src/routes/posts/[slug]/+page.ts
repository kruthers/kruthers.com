import {api} from "$lib/utils/api";

export const load = ({ params }) => {

    const post = api.posts.getPost(params.slug)
    return {
        post: post,
        slug: params.slug
    }
}
