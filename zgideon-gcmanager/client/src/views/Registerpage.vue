<template>
    <link rel="stylesheet" 
    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=settings" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=home" />

    <div class="container" id="loginPage">
        <div id="headerNav">
            <h2 id="gcManager">G.C. Manager</h2>
            <RouterLink to="/" id="routerLink">Login</RouterLink>
        </div>

        <h1>Register User</h1>

        <form class="container" id="loginForm" @submit.prevent="register">
            <div class="formRow">
                <label for="username">Username: </label>
                <input 
                    type="text" 
                    name="username"
                    placeholder="exampleUsername123"
                    v-model="username"/>
            </div>

            <div class="formRow">
                <label for="email">Email: </label>
                <input type="email" name="email" 
                    id="userNameInput" 
                    placeholder="user@gmail.com"
                    v-model="email"/>
            </div>

            <div class="formRow">
                <label for="password">Password: </label>
                <input 
                    type="password" 
                    id="passwordInput" 
                    placeholder="Password123"
                    v-model="password"/>
            </div>

            <div class="formRow">
                <label for="firstname">First Name: </label>
                <input
                    type="text"
                    id="firstnameInput"
                    placeholder="Johnny"
                    v-model="firstname"/>
            </div>

            <div class="formRow">
                <label for="lastname">Last Name: </label>
                <input
                    type="text"
                    id="lastnameInput"
                    placeholder="Appleseed"
                    v-model="lastname"/>
            </div>

        <br>

        <div v-html="error" class="error"></div>

        <br>
        
        
        <div class="container" id="buttonBox">
            <button class="button" @click="register" type="submit">Register</button>
        </div>
        </form>
    </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'

export default {
    data () {
        return {
            email: '',
            password: '',
            username: '',
            error: null,
            firstname: '',
            lastname: ''
        }
    },
    methods: {
        async register() {
            try {
                const response = await AuthenticationService.register({
                username: this.username,
                email: this.email,
                password: this.password,
                firstname: this.firstname,
                lastname: this.lastname
            })
                this.$store.dispatch('setToken', response.data.token)
                this.$store.dispatch('setUser', response.data.user)
                this.$router.push('/userhome')
            } catch (err) {
                console.log(err)
                this.error = err.response?.data?.error || 'Internal Server Error'
            }
        }
    }
}
</script>

<style scoped>
.container{
    height:100%;
    width:100%;
    align-content: center;
    justify-items: center;
    background-color: rgb(10, 240, 240);
}

#headerNav {
    display: flex;
    background-color: blue;
    width:100%;
    color:white;
}

#gcManager {
    padding-left:15px;
}

#routerLink {
    margin-left:auto;
    padding-right:15px;
    padding-top: 20px;
    padding-left: 15px;
    font-size: 1.5em;
    text-decoration: none;
    color:white
}

#routerLink:hover {
    background-color: rgba(255, 255, 255, 0.8);
    color:black;
}

.formRow {
    display:flex;
    align-items: center;
    margin-bottom: 10px;
}

.formRow label {
    width: 100px;
    margin-right: 10px;
}

input {
    min-height: 20px;
    flex: 1;
    min-height:25px;
}

button {
    min-height: 35px;
    min-width: 70px;
    display: flow-root;
    margin-bottom: 75px;
}

button:hover {
    background-color: blue;
}

.error {
    color:red;
}

#loginForm{
    display:inline-block;
}
</style>