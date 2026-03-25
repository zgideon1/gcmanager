import Api from "@/services/Api"

export default {
    async getEmployees() {
        return Api.get('/employees')
    },
    async getEmployee(id) {
        return Api.get(`/employees/${id}`)
    },
    async createEmployee(employee) {
        return Api.post(`/employees`, employee)
    },
    async editEmployee(id, newEmployee) {
        return Api.put(`/employees/${id}`, newEmployee)
    },
    async deleteEmployee(id) {
        return Api.delete(`/employees/${id}/delete`)
    }
}