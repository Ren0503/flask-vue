import api from '@/services/api'

export default {
    username(username) {
        return api().get('users/' + username)
    }
}
