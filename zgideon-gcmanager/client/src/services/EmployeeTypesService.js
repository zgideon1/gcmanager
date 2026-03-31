import Api from "@/services/Api"

export default {
    async getEmployeeTypes() {
        return Api.get('/employee_types')
    },
    async getEmployeeType(id) {
        return Api.get(`/employee_types/${id}`)
    },
    async createEmployeeType(type) {
        return Api.post(`/employee_types`, type)
    },
    async editEmployeeType(id, newType) {
        return Api.put(`/employee_types/${id}`, newType)
    },
    async deleteEmployeeType(id) {
        return Api.delete(`/employee_types/${id}/delete`)
    }
}