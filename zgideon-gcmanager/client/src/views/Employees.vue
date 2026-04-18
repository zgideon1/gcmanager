<template>
    <div class="employees-page">
        <div v-if="$route.path === '/ownerhome/users/employees'" class="menu" id="menuBackground">
                <button type='button' class="menuButton" id="menuEEditingButton"  @click="navigateTo('edit')">
                    <span class="menuButtonText">Edit<br> Employees</span>
                </button>

                <button type='button' class="menuButton" id="menuESchedulesButton" @click="navigateTo('employeeschedules')">
                    <span class="menuButtonText">Schedule <br>Employees</span>
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
        router.push(`./employees/${page}`)
    }

    function confirmLogout() {
        store.dispatch('clearUser', store.state.user)
        router.push('/')
    }
</script>

<style scoped>
.employees-page {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
}
.content {
    display: flex;
    width: 100%;
    height: 100%;
    flex: 1;
}

.menu {
    display: flex;
    width: 100%;
    height: 100%;
    margin-left: 7px;
}
#menuBackground {
    display: flex;
    flex-wrap:wrap;
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
.menuButton:hover {
    transform: scale(1.04);
    box-shadow: 0 12px 30px rgba(0,0,0,0.25);
}

#menuEEditingButton {
    background-image: url('@/imgs/Employees.png');
    background-repeat: no-repeat;
    background-size: 45%;
}

#menuESchedulesButton {
    background-image: url('@/imgs/Calendar_whiteblue.png');
    background-size: 40%;
    background-repeat: no-repeat
}

#menuLogoutButton {
    width: 100%;
    height: 50%;
    background-image: url('@/imgs/Logout_whiteblue.png');
    background-size: 23%;
    background-repeat: no-repeat;
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