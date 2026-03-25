import Api from "@/services/Api"

export default {
    async getSchedules() {
        return Api.get('/employeeschedules')
    },
    async getSchedule(id) {
        return Api.get(`/employeeschedules/${id}`)
    },
    async createSchedule(schedule) {
        return Api.post(`/employeeschedules`, schedule)
    },
    async updateSchedule(id, newSchedule) {
        return Api.put(`/employeeschedules/${id}`, newSchedule)
    },
    async deleteSchedule(id) {
        return Api.delete(`/employeeschedules/${id}`)
    }
}