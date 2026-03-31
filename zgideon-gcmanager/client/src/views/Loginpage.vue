<template>
    <link rel="stylesheet" 
    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=settings" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=home" />

    <div class="container" id="loginPage">
        <div id="headerNav">
            <h2 id="gcManager">G.C. Manager</h2>
            <RouterLink to="/register" id="routerLink">Register</RouterLink>
        </div>

        <h1>Welcome</h1>

        <form  id="loginForm" @submit.prevent="login">
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

        <div v-html="error" class="error"></div>
        <br>
        
        <div id="buttonBox">
            <button class="button" @click="login" type="submit">Login</button>
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
            error: null
        }
    },
    methods: {
        async login() {
            try {
                const response = await AuthenticationService.login({
                email: this.email,
                password: this.password
            })
                this.$store.dispatch('setToken', response.data.token)
                this.$store.dispatch('setUser', response.data.user)

                if(response.data.user.role === 2) {
                    this.$router.push('/employeehome')
                }
                if(response.data.user.role === 3) {
                    this.$router.push('/ownerhome')
                }
                else this.$router.push('/userhome')
            } catch (err) {
                this.error = err.response?.data?.error || 'Server is not responding'
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
    box-sizing: border-box;
    background-color: rgba(84, 231, 241, 0.815);
    border: 10px solid blue;
}

#headerNav {
    display: flex;
    align-items: center;
    box-sizing:border-box;
    padding: 15px 25px;
    background-color: blue;
    width:100%;
    color:white;
}

#gcManager {
    font-weight: 600;
    font-size: 24px;
}

#routerLink {
    margin-left:auto;
    padding: 6px 12px;
    font-size: 1.5em;
    border-radius: 6px;
    text-decoration: none;
    height: 100%;
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
    font-size: 40px;
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

.formRow {
    display:flex;
    flex-direction: column;
    gap: 5px;
}

.formRow label {
    font-size: 0.9rem;
    color: rgba(66, 66, 66, 0.89)
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
    background: #2563eb;
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