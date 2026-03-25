import Api from "@/services/Api"

export default {
    async getRoles() {
        return Api.get('/roles')
    },
    async getRole(id) {
        return Api.get(`/roles/${id}`)
    },
    async createRole(id) {
        return Api.post(`/roles/${id}`, credentials)
    },
    async deleteRole(id) {
        return Api.delete(`/roles/${id}`, credentials)
    }
}