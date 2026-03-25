import Api from '@/services/Api'

export default {
    async bookTeeTime(booking) {
        return Api.post('/teetimes', booking)
    },
    async getAvailableTimes() {
        return Api.get('/teetimes')
    },
    async deleteTeeTime(id) {
        return Api.delete(`/teetimes/${id}`)
    }
}