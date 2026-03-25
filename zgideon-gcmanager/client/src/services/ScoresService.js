import Api from '@/services/Api'

export default {
    async postScore(score) {
        return Api.post('/scores', score)
    },
    async getScores(credentials) {
        return Api.get('/scores', credentials)
    },
    async deleteScore(id) {
        return Api.delete(`/scores/${id}`)
    },
    async editScore(id) {
        return Api.put(`/scores/${id}`)
    }
}