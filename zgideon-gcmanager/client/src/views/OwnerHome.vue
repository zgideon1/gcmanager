<template>
    <link rel="stylesheet" 
    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=settings" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=home" />
    <div id="containerBackground">
        <div class="container">
            <div :class="['sidebar', {expanded: isExpanded}]">
                <div class="sidebar-top">
                    <button class="expand-btn" @click="toggleSidebar">☰</button>

                    <button class="button sidebarButton" @click="navigateTo('')" id="homeButton">
                        <span class="sideBarText"> Home
                        </span>
                    </button>
                </div>

                <div class="sidebar-main">
                    <button type='button' class="button sidebarButton" @click="navigateTo('teetimes')">
                        <span class="sideBarText">Tee-Times</span>
                    </button>

                    <button type='button' class="button sidebarButton" @click="navigateTo('tournaments')">
                        <span class="sideBarText">Tournaments Editor</span>
                    </button>

                    <button type="button" class="button sidebarButton" @click="navigateTo('employees')">
                        <span class="sideBarText">Employees</span>
                    </button>

                    <button type="button" class="button sidebarButton" @click="navigateTo('inventory')">
                        <span class="sideBarText">Inventory Management</span>
                    </button>

                    <button type='button' class="button sidebarButton" @click="navigateTo('scores')">
                        <span class="sideBarText">View Scores</span>
                    </button>
                </div>

                <div class="sidebar-bottom">
                    <button type='button' class="button sidebarButton" id="settingsButton">
                    <span class="material-symbols-outlined">
                    settings
                    </span>
                    </button>
                    <br>
                    <button type='button' class="button sidebarButton" id="logoutButton" @click="showLogoutConfirm = true">
                        <span class="sideBarText">Logout</span>
                    </button>
                </div>
            </div>
            <div class="content">
                <router-view />
            </div>
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
    const showLogoutConfirm = ref(false)
    const router = useRouter()
    const store = useStore()

    function toggleSidebar() {
    isExpanded.value = !isExpanded.value
    }   

    function navigateTo(page) {
        router.push(`/ownerhome/${page}`)
    }

    function confirmLogout() {
        store.dispatch('clearUser', store.state.user)
        router.push('/')
    }
</script>

<style scoped>
#containerBackground {
    background-color: blue;
}
.container {
    display: flex;
    height: 100vh;
    width:100%;
}

.content {
    flex: 1;
    display: flex;
    width: 100%;
    height: 100%;
}

.sidebar {
    width: 5%;
    min-width: 60px;
    background-color: blue;
    color: white;
    transition: width 0.3s ease;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height:100%;
}

.sidebar.expanded {
    width: 220px;
}

.sidebar-top {
    display: flex;
    flex-direction: column;
}

.sidebar-main {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.sidebar-bottom {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
}

.sidebarButton {
    width: 100%;
    height: 45px;
    border: 6px;
    color: white;
    margin-bottom: 5px;
    background-color: blue;
    text-align: left;
    cursor: pointer;
    font-size: 16px;
}

.sidebarButton:hover {
    border:2px solid white;
}

.expand-btn {
    background: none;
    border: none;
    color: white;
    font-size: 20px;
    cursor: pointer;
    padding: 15px;
    width: 100%;
    text-align: left;
}

.material-symbols-outlined {
  font-variation-settings:
  'FILL' 0,
  'wght' 400,
  'GRAD' 0,
  'opsz' 24
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