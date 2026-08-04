<script lang="ts">
    import {getOrdinal} from "$lib/utils/Utils";

    type Props = {
        date: string,
        includeTime?: boolean
    }

    let { date, includeTime = true }: Props = $props()

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

        return includeTime ? `${day} ${month} ${year} at ${time}` : `${day} ${month} ${year}`
    }
</script>

<span>{formatDate(date)}</span>