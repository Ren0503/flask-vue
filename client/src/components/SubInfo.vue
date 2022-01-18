<template lang="html">
  <div class="sub-info">
    <router-link class="heading" :to="{ name: 'Sub', params: {name: sub.permalink} }"><h2>{{ sub.name }}</h2></router-link>
    <p>{{ sub.description }}</p>

    <button @click="subscribe" v-if="!subscribed" class="subscribe-button">Subscribe</button>
    <button @click="unsubscribe" v-if="subscribed" class="subscribe-button">Unsubscibe</button>

    <p><strong>Moderators</strong></p>
    <ul>
      <li v-for="moderator in sub.moderators" :key="moderator.username">
        <router-link :to="{ name: 'User', params: {username: moderator.username} }">{{ moderator.username }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import subServices from '@/services/subServices'
import userServices from '@/services/userServices'

export default {
    name: 'sub-info',

    props: ['sub'],

    data() {
        return {
            subscribed: false
        }
    },

    methods: {
        subscribe() {
            if (!this.$store.state.isUserLoggedIn) {
                this.$router.push({ name: 'Login' });
                return false
            }

            subServices.subscribe(this.sub.permalink)
                .then(response => {
                    // Save data in store for navbar
                    this.$store.dispatch('updateSubscribedSubs', response.data.subscribed)

                    // Check button
                    this.checkSubscribed();
                })
        },

        unsubscribe() {
            if (!this.$store.state.isUserLoggedIn) {
                this.$router.push({ name: 'Login' });
                return false
            }

            subServices.unsubscribe(this.sub.permalink)
                .then(response => {
                    // Save data in store for navbar
                    this.$store.dispatch('updateSubscribedSubs', response.data.subscribed)

                    // Check button
                    this.checkSubscribed();
                })
        },

        checkSubscribed() {
            if (!this.$store.state.isUserLoggedIn) {
                return false
            }

            userServices.username(this.$store.state.user.username)
                .then(response => {
                    var filteredSubscribedSubs = response.data.subscribed.filter(s => {
                        return s.permalink == this.sub.permalink
                    });
                    this.subscribed = filteredSubscribedSubs.length > 0
                })
        }
    },

    mounted() {
        this.checkSubscribed()
    },

    watch: {
        sub() {
            this.checkSubscribed()
        }
    }
}
</script>

<style lang="css">
.heading {
    color: black;
}

.heading:hover {
    color: rgb(48, 99, 219);
}

.sub-info {
    padding: 10px;
}

.subscribe-button {
    background-color: rgb(23, 92, 93);
    color: white;
    border: 0;
    padding: 10px 25px;
    cursor: pointer;
}

.subscribe-button:hover {
    background-color: rgb(19, 112, 113);
}

.moderator {
    color: rgb(48, 99, 219);
    cursor: pointer;
}
</style>
