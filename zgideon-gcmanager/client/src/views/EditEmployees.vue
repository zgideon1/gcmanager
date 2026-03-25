<template>
    <div class="content">
        <h2>Edit Employees</h2>
        <select v-model="selectedEmployeeId">
          <option disabled value="">-- Select Employee --</option>
          <option
              v-for="emp in employees"
              :key="emp.id"
              :value="emp.id"
          >
              {{ emp.id }} {{ emp.firstname }} {{ emp.lastname }}
          </option>
      </select>
      <button type="button" @click="addEmployee(selectedUserId)">
        Add Employee
      </button>

      <select v-model="selectedUserId">
          <option disabled value="">-- Select User --</option>
          <option
              v-for="user in users"
              :key="user.uid"
              :value="user.uid"
          >
              {{ user.uid }} {{ user.firstname }} {{ user.lastname }}
          </option>
      </select> 

      <select v-model="selectedRoleId">
          <option disabled value="">-- Select Role --</option>
          <option
              v-for="role in roles"
              :key="role.id"
              :value="role.id"
          >
              {{ role.id }} {{ role.rolename }}
          </option>
        </select>

      <button type="button" @click="deleteEmployee(selectedEmployeeId)">
        Delete Employee
      </button>
      <button type="button" @click="editEmployee(selectedEmployeeId)">
        Edit Employee Role
      </button>
    </div>
</template>

<script>
import EmployeeService from "@/services/EmployeeService"
import UserService from "@/services/UserService"
import RoleService from '@/services/RoleService'

export default {
    data() {
        return {
            error: null,
            employees: [],
            selectedEmployeeId: null,
            selectedUserId: null,
            selectedRoleId: null
        }
    },
    async mounted() {
        // Retrieve Employees
        try {
            const res1 = await EmployeeService.getEmployees()
            this.employees = res1.data

            if (this.employees.length > 0) {
            this.selectedEmployeeId = this.employees[0].id
            }

        } catch (err) {
            this.error = "Failed to load employees"
        }

        // Retrieve Users
        try {
            const res2 = await UserService.getUsers()
            this.users = res2.data

            if (this.users.length > 0) {
                this.selectedUserId = this.users[0].uid
            }
        } catch(err) {
            this.error = 'Failed to load users'
        }

        // Retrieve Roles
        try {
            const res3 = await RoleService.getRoles()
            this.roles = res3.data

            if (this.roles.length > 0) {
                this.selectedRoleId = this.roles[0].id
            }
        } catch(err) {
            this.error = 'Failed to load roles'
        }
    },
    methods: {
        async addEmployee(id) {

        },
        async editEmployee(id, newData) {
            try {
                const res = await EmployeeService.editEmployee(id, newData)
            } catch (err) {

            }
        },
        async deleteEmployee(id) {

        }
    }
}
</script>

<style>
.content {
    display: flex;
}
</style>