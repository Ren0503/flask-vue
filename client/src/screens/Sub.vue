<template lang="html">
  <div class="sub">
    <div class="container">
      <h1>Recent Posts</h1>
      <PostPreview :hideSub="true" v-for="post in posts" :key="post.id" :post="post">
        {{ post.title }}
      </PostPreview>

      <CreateButton></CreateButton>
    </div>
    
    <SubInfo class="sub-info" v-if="sub" :sub="sub"></SubInfo>
    <!-- Only show it if data was fetched -->
    <div v-else=""></div>
  </div>

</template>

<script>
import SubInfo from '@/components/SubInfo'
import CreateButton from '@/components/CreateButton'
import PostPreview from '@/components/PostPreview'

import subServices from '@/services/subServices'

export default {
    name: 'sub',

    components: { SubInfo, CreateButton, PostPreview },

    data() {
        return {
            permalink: this.$route.params.name,
            posts: [],
            sub: null
        }
    },

    mounted() {
        this.fetchData()
    },

    methods: {
        fetchData() {
            subServices.item(this.permalink)
                .then(response => {
                    this.sub = response.data
                })
            subServices.posts(this.permalink)
                .then(response => {
                    this.posts = response.data
                })
        }
    },

    watch: {
        $route() {
            this.permalink = this.$route.params.name
            this.fetchData()
        }
    }
}
</script>

<style scoped lang="css">
.container {
    width: 80%;
    float: left;
}

.sub-info {
    width: 20%;
    float: right;
}
</style>
