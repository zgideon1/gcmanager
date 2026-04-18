<template>
    <div class="content">
        <div class="sidebar">
            <div class="sidebar-top">
                <h2>Edit User: </h2>
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

                <button type="button" @click="expandEditUserPage()">
                    Edit User
                </button>

                <button type="button" @click="promptDeleteUser">
                    Delete User
                </button>
            </div>
        </div>

        <div class="upanel user-info" v-if="editUserPageExpanded && selectedUser">
            <h2 class="info-title">Current User</h2>

            <div class="infoGrid">
                <div class="infoRow">
                    <span class="label">ID</span>
                    <span class="value">{{ selectedUser.uid }}</span>
                </div>

                <div class="infoRow">
                    <span class="label">Email</span>
                    <span class="value">{{ selectedUser.email }}</span>
                </div>

                <div class="infoRow">
                    <span class="label">Username</span>
                    <span class="value">{{ selectedUser.username }}</span>
                </div>

                <div class="infoRow">
                    <span class="label">Name</span>
                    <span class="value">
                        {{ selectedUser.firstname }} {{ selectedUser.lastname }}
                    </span>
                </div>

                <div class="infoRow">
                    <span class="label">Phone Number</span>
                    <span class="value">{{ selectedUser.phoneNum }}</span>
                </div>

                <div class="infoRow">
                    <span class="label">Address</span>
                    <span class="value">{{ selectedUser.address }}</span>
                </div>

                <div class="infoRow">
                    <span class="label">Role</span>
                    <span class="value role-badge"
                        :class="selectedUser.role === 2 ? 'employee' : 'user'">
                        {{ selectedUser.role === 2 ? "Employee" : "User" }}
                    </span>
                </div>

                <div class="infoRow">
                    <span class="label">Handicap</span>
                    <span class="value">{{ selectedUser.handicap }}</span>
                </div>
            </div>
        </div>
        
        <div class="upanel" v-if="addUserPageExpanded"> 
            <div class="upanel-top">
                <h2>Add User</h2>
                <div class="formRow">
                    <label for="email">Email: </label>
                    <input type="email" name="email" 
                    id="userNameInput" 
                    placeholder="user@gmail.com"
                    v-model="email"/>
                </div>

                <div class="formRow">
                    <label for="username">Username: </label>
                    <input type="text" name="username"
                    placeholder="exampleUsername123"
                    v-model="username"/>
                </div>

                <div class="formRow">
                    <label>First Name:</label>
                    <input type="text" name="firstName" 
                    id="userFirstNameInput" 
                    placeholder="Name"
                    v-model="firstname"/>
                </div>

                <div class="formRow">
                    <label>Last Name:</label>
                    <input type="text" name="firstName" 
                    id="userFirstNameInput" 
                    placeholder="Name"
                    v-model="lastname"/>
                </div>

                <div class="formRow">
                    <label>Set Password: </label>
                    <input type="password"
                    placeholder="examplePassword&62430$"
                    v-model="password"/>
                </div>

                <div class="formRow">
                    <label>Is Employee?:</label>
                    <select v-model="isEmployee">
                        <option disabled value="">Is Employee?</option>
                        <option :value="false">No</option>
                        <option :value="true">Yes</option>
                    </select>
                </div>
            </div>
            <div class="upanel-bottom">
                 <button type="button" class="panelButton" @click="addUser">
                    Add User
                </button>
            </div>
        </div>

        <div class="upanel" v-if="editUserPageExpanded">
            <div class="upanel-top">
                <h2>Edit User's Information</h2>

                <div class="section">
                    <div class="section-header" @click="expandDropdown('contact')">
                        <h4>Edit Contact Information</h4>
                    </div>      
                    
                    <div v-if="activeDropdown === 'contact'" class="section-body">
                        <div class="formRow">
                            <label for="email">Email: </label>
                            <input type="email" name="email" 
                            id="userNameInput" 
                            placeholder="user@gmail.com"
                            v-model="email"/>
                        </div>

                        <div class="formRow">
                            <label for="username">Username: </label>
                            <input type="text" name="username"
                            placeholder="exampleUsername123"
                            v-model="username">
                        </div>

                        <div class="formRow">
                            <label>First Name:</label>
                            <input type="text" name="firstName" 
                            id="userFirstNameInput" 
                            placeholder="Berry"
                            v-model="firstname"/>
                        </div>

                        <div class="formRow">
                            <label>Last Name:</label>
                            <input type="text" name="firstName" 
                            id="userFirstNameInput" 
                            placeholder="Benson"
                            v-model="lastname"/>
                        </div>

                        <div class="formRow">
                            <label>Phone Number: </label>
                            <input type="text"
                            placeholder="(123)-456-7890"
                            v-model="phoneNum"/>
                        </div>

                        <div class="formRow">
                            <label>Address: </label>
                            <input type="text"
                            placeholder="123 Golf Range Rd, IN 46071"
                            v-model="address"
                            />
                        </div>
                    </div>
                </div>

                <div class="section">
                    <div class="section-header" @click="expandDropdown('role')">
                        <h4>Edit Privilege</h4>
                    </div>

                    <div v-if="activeDropdown === 'role'" class="section-body">
                        <div class="formRow">
                            <label>Is Employee?:</label>
                            <select v-model="isEmployee">
                                <option :value="false">No</option>
                                <option :value="true">Yes</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="section">
                    <div class="section-header" @click="expandDropdown('golf')">
                        <h4>Edit Golf Statistics</h4>
                    </div>

                    <div v-if="activeDropdown === 'golf'" class="section-body">
                        <div class="formRow">
                            <label>Handicap: </label>
                            <input type="text"
                            v-model="handicap"
                            />
                        </div>

                        <div class="formRow">
                            <label>Using Scorecard: </label>
                            <select v-model="selectedScorecardId">
                                <option disabled value="">-- Select Scorecard --</option>
                                <option
                                    v-for="sc in scorecards"
                                    :key="sc.id"
                                    :value="sc.name_id"
                                >
                                    {{ sc.id }} {{ sc.name }}
                                </option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div class="upanel-bottom">
                <button type="button" class="panelButton" @click="promptEdit()">
                    Edit User
                </button>
            </div>
        </div>

        <div v-if="showDeleteConfirm" class="modal-overlay">
            <div class="modal">
                <p>Are you sure you want to delete user with
                    <strong>id# {{selectedUserId}}</strong>?
                </p>

                <div class="modal-buttons">
                    <button @click="confirmDelete">Yes</button>
                    <button @click="cancelDelete">Cancel</button>
                </div>
            </div>
        </div>

        <div v-if="showEditConfirm" class="modal-overlay">
            <div class="modal">
                <p>Edited Information:
                    <strong>id# {{selectedUserId}}</strong>?
                </p>

                <div class="modal-buttons">
                    <button @click="editUser(selectedUserId)">Yes</button>
                    <button @click="cancelEdit">Cancel</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import UserService from "@/services/UserService"
import RoleService from "@/services/RoleService"
import ScorecardService from "@/services/ScorecardService";

export default {
    data() {
        return {
            users: [],
            roles:[],
            error: null,
            selectedUserId: null,
            selectedRoleId: null,
            selectedScorecardId: null,
            addUserPageExpanded: false,
            editUserPageExpanded: false,
            showEditConfirm: false,
            showDeleteConfirm: false,
            email: null,
            username: null,
            firstname: null,
            lastname: null,
            address: null,
            phoneNum: null,
            handicap: null,
            isEmployee: false,
            activeDropdown: '',
            selectedUser: null,
        }
    },

    watch: {
        selectedUserId(newId) {
            this.selectedUser = this.users.find(u => u.uid === newId) || null
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
            
            this.selectedUser = this.users[0]
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
        expandDropdown(section) {
            this.activeDropdown = this.activeDropdown === section ? null : section;
        },
        async addUser() {
            try {  
                let role = 1
                if(this.isEmployee) {
                    role = 2
                }

                const user = {
                    email: this.email,
                    username: this.username,
                    firstname: this.firstname,
                    lastname: this.lastname,
                    password: this.password,
                    role: role
                }

                const res = await UserService.createUser(user);

                const newList = await UserService.getUsers()
                this.users = newList.data

                this.selectedUserId = this.users.length > 0 ? this.users[0].uid : null
            } catch (err) {
                this.error = "User could not be created"
            }

            this.email = null
            this.username = null
            this.firstname = null
            this.lastname = null 
            this.password = null
            this.address = null
            this.role = null
            this.isEmployee = false
            this.expandAddUserPage()
        },
        promptEdit() {
            if (!this.selectedUserId) {
                this.error = "Please select a user to edit.";
                return;
            }
            this.showEditConfirm = true;
        },
        cancelEdit() {
            this.showEditConfirm = false;
        },
        async editUser(id) {
            try {
                let role = 1
                if(this.isEmployee) {
                    role = 2
                }

                if(this.username == null) {
                    this.username = this.selectedUser.username
                }

                if(this.email == null) {
                    this.email = this.selectedUser.email
                }

                if(this.phoneNum == null) {
                    this.phoneNum = this.selectedUser.phoneNum
                }

                if(this.address == null) {
                    this.address = this.selectedUser.address
                }

                if(this.firstname == null) {
                    this.firstname = this.selectedUser.firstname
                }

                if(this.lastname == null) {
                    this.lastname = this.selectedUser.lastname
                }

                if(this.handicap == null) {
                    this.handicap = this.selectedUser.handicap
                }

                const newData = {
                    email: this.email,
                    username: this.username,
                    firstname: this.firstname,
                    lastname: this.lastname,
                    phoneNum: this.phoneNum,
                    address: this.address,
                    role: role,
                    handicap: this.handicap,
                    scorecard_id: this.selectedScorecardId
                }

                const res = await UserService.editUser(id, newData)
            } catch (err) {
                this.error = "User could not be edited"
            }

            this.email = null
            this.username = null
            this.firstname = null
            this.lastname = null 
            this.address = null
            this.phoneNum = null
            this.role = null
            this.isEmployee = false
            this.showEditConfirm = false
        },
        promptDeleteUser() {
            if (!this.selectedUserId) {
                this.error = "Please select a user to delete.";
                return;
            }
            this.showDeleteConfirm = true;
        },
        async confirmDelete() {
           try {
                await UserService.deleteUser(this.selectedUserId);

                this.showDeleteConfirm = false;

                const res = await UserService.getUsers();
                this.users = res.data;  
            } catch (err) {
                this.error = "User could not be deleted.";
            }
        },
        cancelDelete() {
            this.showDeleteConfirm = false;
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
    padding-left: 20px;
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

.upanel {
    margin-left: 20px;
    padding: 30px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.15);
    min-width: 300px;

    display: flex;
    flex-direction: column;
    height: 90%;
}

.upanel-top {
    justify-content: space-between;
    flex: 1;
    overflow-y: auto;
}

.upanel-bottom {
    justify-content: center;
    display: flex;
    padding-top: 10px;
}

.user-info {
    background: #ffffff;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    transition: 0.2s ease;
    overflow-y: auto;
}

.user-info:hover {
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.12);
}

.info-title {
    margin-bottom: 16px;
}

.infoGrid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 12px 20px;
}

.infoRow {
    display: flex;
    flex-direction: column;
    padding: 10px 12px;
    border-radius: 8px;
    background: #f8f9fb;
}

.label {
    font-size: 0.86rem;
    font-weight: 600;
    margin-bottom: 4px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.value {
    font-size: 0.95rem;
    color: #2c3e50;
    word-break: break-word;
}

.role-badge {
    display: inline-block;
    padding: 4px 10px;
    border-radius: 999px;
    font-size: 0.8rem;
    font-weight: 600;
    width: fit-content;
}

.role-badge.employee {
    background: #e6f4ea;
    color: #2e7d32;
}

.role-badge.user {
    background: #e3f2fd;
    color: #1565c0;
}

.section {
    margin-bottom: 15px;
    border-radius: 8px;
    overflow: hidden;
}

.section-header {
    background: #f3f4f6;
    padding: 2px;
    cursor: pointer;
    border-radius: 8px;
    align-content: center;
    transition: background 0.2s;
}

.section-header:hover {
    background: #e5e7eb;
}

.section-body {
    padding: 10px 5px;
}

.formRow {
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
    gap: 5px;
}

input {
    padding: 10px;
    border-radius: 8px;
    border: 1px solid #ccc;
    font-size: 1rem;
    transition: border 0.2s, box-shadow 0.2s;;
}

input:focus {
    outline: none;
    border-color: blue;
    box-shadow: 0 0 0 2px rgba(59,130,246,0.2);
}

select {
    padding: 10px;
    border-radius: 8px;
    border: none;
    font-size: 0.95rem;
    outline: none;
    border: 2px solid blue;
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