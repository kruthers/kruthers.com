import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent, params }) => {
    const parentData = await parent()
    const fileId = params.version

    const file = parentData.files.then( result => {
        const checked = result.filter((file) => file.id === fileId)
        if (checked.length > 0) {
            return checked[0]
        } else {
            return undefined
        }
    })

    return {
        ...parentData,
        fileID: fileId,
        file: file
    }
};