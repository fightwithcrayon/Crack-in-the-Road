<template>
  <div>
    <Cover :image='post.featured_image_srcset' :caption='post.title.rendered' :title='post.title.rendered' />
    <Nav />
    <main class="page-content">
      <div class="title">
        <h2 v-html="post.title.rendered"></h2>
      </div>
      <div class="copy" v-html="postContent"></div>
    </main>
  </div>
</template>

<script>
import Cover from '~/components/Cover.vue'
import Nav from '~/components/Nav.vue'
export default {
  components: {
    Cover, Nav
  },
  async asyncData ({ app, params }) {
    const postId = params.id.split('-')[0]
    let { data } = await app.$axios.get(`posts/${postId}`)
    return { post: data }
  },  
  computed: {
    postContent () {
      return this.post.content.rendered.replace('.', '.</p><p>')
    }
  }
}
</script>
