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

        <form id="loginForm" @submit.prevent="register">
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

        <div v-html="error" class="error"></div>
        
        <div id="buttonBox">
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
    display: flex;
    flex-direction: column;
    align-items: center;
    align-content: center;
    justify-items: center;
    justify-content: center;
    box-sizing: border-box;
    background-color: rgb(10, 240, 240);
    border: 10px solid blue;
}

#headerNav {
    display: flex;
    background-color: blue;
    width:100%;
    color:white;
    align-items: center;
    box-sizing: border-box;
    padding: 15px 25px;
}

#gcManager {
    font-weight: 600;
    font-size: 24px;
}

#routerLink {
    margin-left:auto;
    padding: 6px 12px;
    font-size: 1.5em;
    text-decoration: none;
    color:white;
    transition: background 0.2s;
}

#routerLink:hover {
    background-color: rgba(255, 255, 255, 0.8);
    color:black;
}

h1 {
    text-align: center;
    color: black;
    margin-bottom: 20px;
}

.formRow {
    display:flex;
    flex-direction: column;
    gap: 5px;
}

.formRow label {
    font-size: 0.9rem;
    color: rgba(66, 66, 66, 0.89)
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

button {
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 8px;
    background: #3b82f6;
    color: white;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s, transform 0.1s;
}

button:hover {
    background-color: blue;
}

button:active {
    transform: scale(0.98);
}

.error {
    color:red;
}

#loginForm{
    background: white;
    padding: 30px;
    border-radius: 12px;
    margin: 0 auto;
    box-shadow: 0 15px 40px rgba(0,0,0,0.2);
    display: flex;
    flex-direction: column;
    gap: 15px;
}
</style>