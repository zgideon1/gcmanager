import {createStore} from 'vuex'
import createPersistedState from 'vuex-persistedstate'

const getDefaultState = () => ({
    token: null,
    user: null,
    scorecard: null,
    isUserLoggedIn: false
})

export default createStore( {
    plugins: [createPersistedState({
        storage: window.sessionStorage,
    })],
    strict: true,
    state: getDefaultState(),
    mutations: {
        setToken(state, token) {
            state.token = token
            if(token) {
                state.isUserLoggedIn = true
            } else {
                state.isUserLoggedIn = false
            }
        },
        setUser(state, user) {
            state.user = user
        },
        clearUser(state, user) {
            Object.assign(state, getDefaultState())
        },
        setScorecard(state, scorecard) {
            state.scorecard = scorecard
        }
    },
    actions: {
        setToken({commit}, token) {
            commit('setToken', token)
        },
        setUser({commit}, user) {
            commit('setUser', user)
        },
        clearUser({commit}, user){
            commit('clearUser', user)
        },
        async fetchScorecard({ commit, state }) {
            if (!state.user?.scorecard_id) return

            const res = await ScorecardService.getScorecard(state.user.scorecard_id)
            commit('setScorecard', res)
        }
    }
})