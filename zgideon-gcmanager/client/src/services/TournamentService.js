import Api from "@/services/Api"

export default {
    async getTournaments() {
        return Api.get('/tournaments')
    },
    async getTournament(id) {
        return Api.get(`/tournaments/${id}`)
    },
    async createTournament(tournament) {
        return Api.post(`/tournaments/`, tournament)
    },
    async editTournament(id, newTournament) {
        return Api.put(`/tournaments/${id}`, newTournament)
    },
    async deleteTournament(id) {
        return Api.delete(`/tournaments/${id}`)
    }
}