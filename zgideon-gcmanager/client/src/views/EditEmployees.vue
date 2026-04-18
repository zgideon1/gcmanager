<template>
    <div class="content">
        <div class="sidebar">
            <div class="sidebar-top">
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
            </div> 
            <div class="sidebar-bottom">
                <button type="button" @click="expandAddEmployeePage()">
                    Add Employee
                </button>

                <button type="button" @click="editEmployee(selectedEmployeeId)">
                    Edit Employee Role
                </button>

                <button type="button" @click="promptDeleteEmployee">
                    Delete Employee
                </button>
            </div>
        </div>
        
        <div class="panel" v-if="addEmployeePageExpanded"> 
            <h3>Add Employee</h3>
            <label>User</label>
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
            
            <label>Role</label>
            <select v-model="selectedRoleId">
                <option disabled value="">-- Select Role --</option>
                <option
                    v-for="role in roles"
                    :key="role.id"
                    :value="role.id"
                >
                    {{ role.id }} {{ role.name }}
                </option>
            </select>

            <button type="button" class="panelButton" @click="addEmployee">
                Add Employee
            </button>
        </div>

        <div class="panel" v-if="editEmployeePageExpanded">
            <h3>Edit Employee's Role</h3>
            <p>Current Role: {{ currentEmployeeRole?.name || 'Not assigned' }}</p>

            <label>New Role</label>
            <select v-model="selectedRoleId">
                <option disabled value="">-- Select User --</option>
                <option
                    v-for="role in roles"
                    :key="role.id"
                    :value="role.id"
                >
                    {{ role.id }} {{ role.name }}
                </option>
            </select> 

            <button type="button" class="panelButton" @click="editEmployee(selectedEmployeeId)">
                Edit Employee
            </button>
        </div>

        <div v-if="showDeleteConfirm" class="modal-overlay">
            <div class="modal">
                <p>Are you sure you want to delete 
                    <strong>{{ employeeToDelete?.firstname }} {{ employeeToDelete?.lastname }}</strong>?
                </p>

                <div class="modal-buttons">
                    <button @click="confirmDelete">Yes</button>
                    <button @click="cancelDelete">Cancel</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import EmployeeService from "@/services/EmployeeService"
import UserService from "@/services/UserService"
import EmployeeTypesService from '@/services/EmployeeTypesService'

export default {
    data() {
        return {
            users: [],
            roles:[],
            error: null,
            employees: [],
            selectedEmployeeId: null,
            selectedUserId: null,
            selectedRoleId: null,
            addEmployeePageExpanded: false,
            editEmployeePageExpanded: false,
            showDeleteConfirm: false,
            employeeToDelete: null,
        }
    },
    computed: {
        currentEmployeeRole() {
            const employee = this.employees.find(emp => emp.id === this.selectedEmployeeId)
            if (!employee) return null
            return this.roles.find(role => role.id === employee.type_id) || null
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
            const res3 = await EmployeeTypesService.getEmployeeTypes()
            this.roles = res3.data

            if (this.roles.length > 0) {
                this.selectedRoleId = this.roles[0].id
            }
        } catch(err) {
            this.error = 'Failed to load roles'
        }
    },
    methods: {
        expandAddEmployeePage() {
            this.addEmployeePageExpanded = !this.addEmployeePageExpanded;
            if(this.editEmployeePageExpanded) {
                this.editEmployeePageExpanded = false
            }
        },
        expandEditEmployeePage(){
            this.editEmployeePageExpanded = !this.editEmployeePageExpanded
            if(this.addEmployeePageExpanded) {
                this.addEmployeePageExpanded = false
            }
        },
        async addEmployee() {
            try {  
                const employee = {
                    employee_uid: this.selectedUserId,
                    type_id: this.selectedRoleId
                }
                const res = await EmployeeService.createEmployee(employee);

                const newList = await EmployeeService.getEmployees()
                this.employees = newList.data

                this.selectedEmployeeId = this.employees.length > 0 ? this.employees[0].id : null
            } catch (err) {
                this.error = "Employee could not be created"
            }

            this.expandAddEmployeePage()
        },
        async editEmployee(id) {
            try {
                const newData = {
                    type_id: parseInt(this.selectedRoleId, 10)
                }

                const res = await EmployeeService.editEmployee(id, newData)
            } catch (err) {
                this.error = "Employee could not be edited"
            }

            this.expandEditEmployeePage()
        },
        promptDeleteEmployee() {
            if (!this.selectedEmployeeId) {
                this.error = "Please select an employee to delete.";
                return;
            }

            this.employeeToDelete = this.employees.find(emp => emp.id === this.selectedEmployeeId);
            this.showDeleteConfirm = true;
        },
        async confirmDelete(id) {
           try {
                await EmployeeService.deleteEmployee(this.employeeToDelete.id);

                this.employees = this.employees.filter(emp => emp.id !== this.employeeToDelete.id);

                this.selectedEmployeeId = this.employees.length > 0 ? this.employees[0].id : null;

                this.showDeleteConfirm = false;
                this.employeeToDelete = null;

            } catch (err) {
                this.error = "Employee could not be deleted.";
            }
        },
        cancelDelete() {
            this.showDeleteConfirm = false;
            this.employeeToDelete = null;
        },
    }
}
</script>

<style scoped>
.content {
    flex: 1;
    display: flex;
    height: 100%;
    width: 100%;
}

.sidebar {
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.sidebar-top {
    display: flex;
    flex-direction: column;
    gap: 10px;
    color: white;
}

.sidebar-bottom {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 20px;
}

.panel {
    margin-left: 20px;
    padding: 25px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.15);
    min-width: 300px;

    display: flex;
    flex-direction: column;
    gap: 15px;
}

select {
    padding: 10px;
    border-radius: 8px;
    border: none;
    font-size: 0.95rem;
    outline: none;
}

button {
    padding: 10px;
    border-radius: 8px;
    border: none;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
}

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    background: rgba(0,0,0,0.4);

    display: flex;
    justify-content: center;
    align-items: center;

    z-index: 1000;
}
.modal {
    background: white;
    padding: 25px;
    border-radius: 10px;
    width: 300px;
    text-align: center;
}

.modal-buttons {
    margin-top: 15px;
    display: flex;
    justify-content: space-around;
}

.modal-buttons button {
    padding: 8px 16px;
    cursor: pointer;
}

</style>