import Api from '@/services/Api'

export default {
    async createScorecard(sc) {
        return Api.post('/scorecards', sc)
    },
    async getScorecards() {
        return Api.get('/scorecards')
    },
    async deleteScorecard(id) {
        return Api.delete(`/scorecards/${id}`)
    },
    async editScorecard(id) {
        return Api.put(`/scorecards/${id}`)
    },
}