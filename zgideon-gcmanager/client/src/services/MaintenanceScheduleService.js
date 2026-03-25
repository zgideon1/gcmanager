import Api from "@/services/Api"

export default {
    async getSchedules() {
        return Api.get('/maintenanceschedules')
    },
    async getSchedule(id) {
        return Api.get(`/maintenanceschedules/${id}`)
    },
    async createSchedule(schedule) {
        return Api.post(`/maintenanceschedules/${id}`, schedule)
    },
    async deleteSchedule(id) {
        return Api.delete(`/maintenanceschedules/${id}`)
    }
}