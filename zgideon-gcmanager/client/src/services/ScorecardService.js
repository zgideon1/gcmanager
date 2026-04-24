import Api from '@/services/Api'

export default {
    async createScorecard(sc) {
        return Api.post('/scorecards', sc)
    },
    async getScorecards() {
        return Api.get('/scorecards')
    },
    async getScorecard(id) {
        return Api.get(`/scorecards/${id}`)
    },
    async deleteScorecard(id) {
        return Api.delete(`/scorecards/${id}`)
    },
    async editScorecard(id, newData) {
        return Api.put(`/scorecards/${id}`, newData)
    },
}