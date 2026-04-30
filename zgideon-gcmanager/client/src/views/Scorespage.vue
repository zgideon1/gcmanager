<template>
  <div class="scores-page">
        <div class="menu" id="menuBackground">
                <button type='button' class="menuButton" id="menuVSButton"  @click="navigateTo('scores-view')">
                    <span class="menuButtonText">View <br> Past Scores</span>
                </button>

                <button type='button' class="menuButton" id="menuESButton" @click="navigateTo('scores-post')">
                    <span class="menuButtonText">Post a <br>Score</span>
                </button>

                <button v-if="isOwner" type="button" class="menuButton" id="menuSCButton" @click="navigateTo('scorecards')">
                    <span class="menuButtonText">Create a <br>Scorecard</span>
                </button>

                <button type='button' class="menuButton" :style="logoutStyle" id="menuLogoutButton" :class="{ fullWidth: !isOwner }" @click="showLogoutConfirm = true">
                    <span class="menuButtonText">Logout</span>
                </button>
        </div>

        <div class="content">
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

  function confirmLogout() {
      store.dispatch('clearUser', store.state.user)
      router.push('/')
  }
</script>

<script>
export default{
    data() {
        return {
            isOwner: false,
            rolename: ''
        }
    },
    async mounted() {
        if(this.$store.state.user.role === 3) {
            this.isOwner = true
        }
    },
    methods: {
        navigateTo(page) {
            if(this.$store.state.user.role === 1) {
                this.rolename = "customer"
            }
            else if(this.$store.state.user.role === 2) {
                this.rolename = "employee"
            }
            else {
                this.rolename = "owner"
            }
            this.$router.push({name: `${this.rolename}-${page}`})

            console.log(this.$route)
        }
    },
    computed: {
        logoutStyle() {
            return {
            backgroundSize: this.isOwner ? '35%' : '23%'
            }
        }}
}
</script>

<style scoped>
.scores-page {
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

#menuVSButton {
    width: 50%;
    height: 50%;
    background-image: url('@/imgs/View.png');
    background-repeat: no-repeat;
    background-size: 45%;
}

#menuESButton {
    width: 50%;
    height: 50%;
    background-image: url('@/imgs/Scores.png');
    background-size: 40%;
    background-repeat: no-repeat
}

#menuSCButton {
    width: 50%;
    height: 50%;
    background-image: url('@/imgs/Scorecard.png');
    background-size: 45%;
    background-repeat: no-repeat
}

#menuLogoutButton {
    width: 50%;
    height: 50%;
    background-image: url('@/imgs/Logout_whiteblue.png');
    background-repeat: no-repeat;
}

.fullWidth {
    width: 100% !important;
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