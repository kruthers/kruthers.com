<script lang="ts">
    let birthday = new Date("2001-02-01")
    let diff = Date.now() - birthday.getTime()
    let age = new Date(diff)
    let years = $state(Math.abs(age.getUTCFullYear() - 1970))
</script>

{years}