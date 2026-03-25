<template>
</template>

<sript setup>
    import { ref, onMounted } from "vue"
    import { getTournaments } from "@/services/tournamentService"

    const tournaments = ref([])

    onMounted(async () => {
        const res = await getTournaments()
        tournaments.value = res.data
    })
</sript>