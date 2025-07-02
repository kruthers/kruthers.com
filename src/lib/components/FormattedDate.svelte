<script lang="ts">
    import {getOrdinal} from "$lib/utils/Utils";

    export var date: string

    function formatDate(dateString: string): string {
        const date = new Date(dateString)
        const day = getOrdinal(date.getDate())
        const month = date.toLocaleString(undefined, { month: 'long' })
        const year = date.getFullYear()
        const time = date.toLocaleTimeString(undefined, {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
        }).toLowerCase()

        return `${month} ${day}, ${year} at ${time}`
    }
</script>

<span>{formatDate(date)}</span>