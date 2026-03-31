import Api from "@/services/Api"

export default {
    async getUsers() {
        return Api.get('/users')
    },
    async getUser(id) {
        return Api.get(`/users/${id}`)
    },
    async createUser(user) {
        return Api.post(`/users/`, user)
    },
    async editUser(id, newUser) {
        return Api.put(`/users/${id}`, newUser)
    },
    async deleteUser(id) {
        return Api.delete(`/users/${id}`)
    }
}