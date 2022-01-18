import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import userServices from '@/services/userServices'

Vue.use(Vuex)

export default new Vuex.Store({
    plugins: [createPersistedState()],

    state: {
        token: null,
        user: null,
        isUserLoggedIn: false,
        subscribedSubs: []
    },

    mutations: {
        setToken(state, token) {
            state.token = token
            if (token) {
                state.isUserLoggedIn = true
            } else {
                state.isUserLoggedIn = false
            }
        },
        setUser(state, user) {
            state.user = user
        },
        setSubscribedSubs(state, subs) {
            state.subscribedSubs = subs
        }
    },

    actions: {
        setToken({ commit }, token) {
            commit('setToken', token)
        },
        setUser({ commit }, user) {
            commit('setUser', user)
        },
        updateSubscribedSubs({ commit, state }, subscribedOptional) {
            if (state.isUserLoggedIn) {
                if (subscribedOptional) {
                    // If data was provided
                    commit('setSubscribedSubs', subscribedOptional)
                } else {
                    userServices.username(state.user.username)
                        .then(response => {
                            commit('setSubscribedSubs', response.data.subscribed)
                        })
                        .catch(() => {
                            // console.error(e)
                        })
                }
            }
        }
    },

    modules: {
    }
})
