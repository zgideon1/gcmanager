<template>
    <div id="menuBackground">
        <div v-if="$route.path === '/ownerhome/users'" class="menu">
            <button type='button' class="menuButton" id="menuUsersButton" @click="navigateTo('edit')">
                <span class="menuButtonText">Edit <br>Users</span>
            </button>

            <button type='button' class="menuButton" id="menuEmployeesButton"  @click="navigateTo('employees')">
                <span class="menuButtonText">Edit<br> Employees</span>
            </button>

            <button type='button' class="menuButton" id="menuLogoutButton" @click="showLogoutConfirm = true">
                <span class="menuButtonText">Logout</span>
            </button>
        </div>

        <div v-else class="content">
            <router-view />
        </div>

        <div v-if="showLogoutConfirm" class="modal-overlay">
            <div class="modal">
                <p>Are you sure you want to log out?</p>

                <div class="modal-buttons">
                    <button @click="confirmLogout">Yes</button>
                    <button @click="showLogoutConfirm = false">Cancel</button>
                    </div>
            </div>
        </div>
    </div>
</template>
<script setup>
    import {ref} from 'vue'
    import {useRouter} from 'vue-router'
    import {useStore} from 'vuex'

    const isExpanded = ref(false)
    const router = useRouter()
    const store = useStore()
    const showLogoutConfirm = ref(false)

    function toggleSidebar() {
    isExpanded.value = !isExpanded.value
    }   

    function navigateTo(page) {
        router.push(`/ownerhome/users/${page}`)
    }

    function confirmLogout() {
        store.dispatch('clearUser', store.state.user)
        router.push('/')
    }

</script>

<style scoped>
.menu {
    width: 100%;
    height: 100%;
    margin-left: 7px;
    flex-wrap: wrap;
    width:100%;
    height: 100%;
    margin-left: 7px;
    display: flex;
}

.content {
    flex: 1;
    display: flex;
    height: 100%;
    width: 100%;
}


#menuBackground {    
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr; 
    width: 100%;
    height: 100%;

    background-color: rgb(0,0,255, 1);
}


#menuBody {
    display: flex;
    flex-wrap: wrap;
    padding: 20px;
    background-color: blue;
    margin-left: 10px;
}

.menuButton {
    background: linear-gradient(
        135deg,
        #ffffff 0%,
        #dbeafe 35%,
        #3b82f6 100%
    );


    position:relative;
    width: 50%;
    height: 50%;
    border: 2px white solid;
    padding: 10px;
    border-radius: 14px;
    overflow:hidden;
    font-size: 20px;
    background-size: cover;
    background-position: center;
    cursor: pointer;
    font-size: 22px;
    font-weight: 600;
    transition: transform 0.25s ease, box-shadow 0.25s ease;

}

.menuButton:hover {
    transform: scale(1.04);
    box-shadow: 0 12px 30px rgba(0,0,0,0.25);
}

.menuButtonText {
    position: absolute;
    bottom: 15px;
    right: 15px;
    color: white;
    font-size: 22px;
    font-weight: 600;
    text-align: right;
    z-index: 2;
    text-shadow: 0px 2px 6px rgba(0,0,0,0.45);
}

#menuUsersButton {
    background-image: url('@/imgs/Users.png');
    background-size: 50%;
    background-repeat: no-repeat
}

#menuEmployeesButton {
    background-image: url('@/imgs/Employees.png');
    background-size: 50%;
    background-repeat: no-repeat
}

#menuLogoutButton {
    background-image: url('@/imgs/Logout_whiteblue.png');
    background-size: 23%;
    width: 100%;
    height: 50%;
    background-repeat: no-repeat;
    grid-column: span 2;
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

.logout {
    width: 100%;
}
</style>