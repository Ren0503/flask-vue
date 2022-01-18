import api from '@/services/api'

export default {
    index() {
        return api().get('posts')
    },

    create(post) {
        return api().post('posts', post)
    },

    delete(id) {
        return api().delete('posts/id/' + id)
    },

    item(id) {
        return api().get('posts/id/' + id)
    },

    user(username) {
        return api().get('posts/user/' + username)
    },

    addComment(postId, commentContent) {
        return api().post('posts/' + postId + '/comments', { content: commentContent })
    },

    upVote(postId) {
        return api().post('posts/' + postId + '/upvote')
    },

    downVote(postId) {
        return api().post('posts/' + postId + '/downvote')
    }
}
