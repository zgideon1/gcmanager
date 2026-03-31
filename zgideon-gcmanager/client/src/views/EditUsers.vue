<template>
    <div class="content">
        <div class="sidebar">
            <div class="sidebar-top">
                <h2>Edit Users</h2>
                <select v-model="selectedUserId">
                <option disabled value="">-- Select User --</option>
                <option
                    v-for="use in users"
                    :key="use.uid"
                    :value="use.uid"
                >
                    {{ use.uid }} {{ use.firstname }} {{ use.lastname }}
                </option>
            </select>
            </div> 
            <div class="sidebar-bottom">
                <button type="button" @click="expandAddUserPage()">
                    Add User
                </button>

                <button type="button" @click="editUser(selectedUserId)">
                    Edit User
                </button>

                <button type="button" @click="promptDeleteUser">
                    Delete User
                </button>
            </div>
        </div>
        
        <div class="panel" v-if="addEmployeePageExpanded"> 
            <h3>Add User</h3>
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

            <button type="button" class="panelButton" @click="addUser">
                Add User
            </button>
        </div>

        <div class="panel" v-if="editEmployeePageExpanded">
            <h3>Edit User's Information</h3>
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

            <button type="button" class="panelButton" @click="editUser(selectedUserId)">
                Edit User
            </button>
        </div>

        <div v-if="showDeleteConfirm" class="modal-overlay">
            <div class="modal">
                <p>Are you sure you want to delete 
                    <strong>{{ userToDelete?.firstname }} {{ userToDelete?.lastname }}</strong>?
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
import UserService from "@/services/UserService"
import RoleService from "@/services/RoleService"

export default {
    data() {
        return {
            users: [],
            roles:[],
            error: null,
            selectedUserId: null,
            selectedRoleId: null,
            addUserPageExpanded: false,
            editUserPageExpanded: false,
            showDeleteConfirm: false,
            userToDelete: null,
        }
    },

    async mounted() {
        // Retrieve Users
        try {
            const res1 = await UserService.getUsers()
            this.users = res1.data

            if (this.users.length > 0) {
            this.selectedUserId = this.users[0].uid
            }

        } catch (err) {
            this.error = "Failed to load users"
        }

        // Retrieve Privileges (or Roles)
        try {
            const res2 = await RoleService.getRoles()
            this.roles = res2.data

            if (this.roles.length > 0) {
                this.selectedRoleId = this.roles[0].id
            }
        } catch(err) {
            this.error = 'Failed to load roles'
        }
    },
    methods: {
        expandAddUserPage() {
            this.addUserPageExpanded = !this.addUserPageExpanded;
            if(this.editUserPageExpanded) {
                this.editUserPageExpanded = false
            }
        },
        expandEditUserPage(){
            this.editUserPageExpanded = !this.editUserPageExpanded
            if(this.addUserPageExpanded) {
                this.addUserPageExpanded = false
            }
        },
        async addUser() {
            try {  
                const user = {
                    employee_uid: this.selectedUserId,
                    type_id: this.selectedRoleId
                }
                const res = await UserService.createUser(user);

                const newList = await UserService.getUsers()
                this.users = newList.data

                this.selectedUserId = this.users.length > 0 ? this.users[0].id : null
            } catch (err) {
                this.error = "User could not be created"
            }

            this.expandAddUserPage()
        },
        async editUser(id) {
            try {
                const newData = {
                    type_id: parseInt(this.selectedRoleId, 10)
                }

                const res = await UserService.editUser(id, newData)
            } catch (err) {
                this.error = "User could not be edited"
            }

            this.expandEditUserPage()
        },
        promptDeleteUser() {
            if (!this.selectedUserId) {
                this.error = "Please select a user to delete.";
                return;
            }

            this.userToDelete = this.users.find(use => use.id === this.selectedUserId);
            this.showDeleteConfirm = true;
        },
        async confirmDelete(id) {
           try {
                await UserService.deleteUser(this.userToDelete.id);

                this.users = this.users.filter(use => use.id !== this.userToDelete.id);

                this.selectedUserId = this.users.length > 0 ? this.users[0].id : null;

                this.showDeleteConfirm = false;
                this.userToDelete = null;
            } catch (err) {
                this.error = "User could not be deleted.";
            }
        },
        cancelDelete() {
            this.showDeleteConfirm = false;
            this.userToDelete = null;
        },
    }
}
</script>

<style scoped>
.content {
    display: flex;
    padding-left: 10px;
    gap: 20px;
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