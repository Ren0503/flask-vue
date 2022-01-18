import api from '@/services/api'

export default {
    item(permalink) {
        return api().get('subs/' + permalink)
    },

    create(post) {
        return api().post('subs', post)
    },

    posts(permalink) {
        return api().get('subs/' + permalink + '/posts')
    },

    subscribe(permalink) {
        return api().post('subs/' + permalink + '/subscribe')
    },

    unsubscribe(permalink) {
        return api().post('subs/' + permalink + '/unsubscribe')
    }
}
