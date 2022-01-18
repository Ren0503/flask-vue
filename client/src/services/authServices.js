import api from '@/services/api'

export default {
    signup(credentials) {
        return api().post('signup', credentials)
    },

    login(credentials) {
        return api().post('login', credentials)
    }
}
