import Api from '@/services/Api'

export default {
    async postScore(score) {
        return Api.post('/scores', score)
    },
    async getScores() {
        return Api.get('/scores', uid)
    },
    async getScore(uid) {
        return Api.get(`/scores/${uid}`)
    },
    async deleteScore(id) {
        return Api.delete(`/scores/${id}`)
    },
    async editScore(id) {
        return Api.put(`/scores/${id}`)
    }
}