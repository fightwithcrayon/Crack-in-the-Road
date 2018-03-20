<template>
  <div class="page-content">
    <div class="title">
      <h2 v-html="post.title.rendered"></h2>
    </div>
    <div class="copy" v-html="postContent"></div>
  </div>
</template>

<script>
import Cover from '~/components/Cover.vue'
import Nav from '~/components/Nav.vue'
export default {
  head () {
    return {
      title: `${this.sanitisedTitle} - Crack in the Road`,
      meta: [
        { hid: 'description', name: 'description', content: this.post.custom_excerpt }
      ]
    }
  },
  components: {
    Cover, Nav
  },
  async asyncData ({ app, params }) {
    const postId = params.id.split('-')[0]
    const api = process.server ? 'https://www.crackintheroad.com/wp-json/wp/v2' : '/api'
    try {
      let { data } = await app.$axios.get(`${api}/posts/${postId}`)
      return { post: data }
    } catch (error) {
      console.log(Object.keys(error), error.message)
      return { post: {} }
    }
  },
  computed: {
    postContent () {
      return this.post.content.rendered.replace('.', '.</p><p>')
    },
    sanitisedTitle () {
			return this.post.title.rendered.replace(/&#(\d+);/g, function(match, dec) {
				return String.fromCharCode(dec);
			});
    }
  },
  mounted () {
    this.$root.$emit('updateCover', {
      image: this.post.featured_image_srcset,
      caption: this.post.title.rendered,
      title: this.post.title.rendered
    })
  }
}
</script>
