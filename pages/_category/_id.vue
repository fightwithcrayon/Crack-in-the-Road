<template>
  <div class="page-content">
    <div class="title">
      <h2 v-html="post.post_title"></h2>
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
    try {
      let { data } = await app.$axios.get(`https://www.crackintheroad.com/endpoint.php?api=post&id=${postId}`)
      return { post: data }
    } catch (error) {
      console.log(error, error.message)
      return { post: {} }
    }
  },
  computed: {
    postContent () {
      return this.post.post_content.replace('.', '.</p><p>')
    },
    sanitisedTitle () {
			return this.post.post_title.replace(/&#(\d+);/g, function(match, dec) {
				return String.fromCharCode(dec);
			});
    }
  },
  mounted () {
    this.$root.$emit('updateCover', {
      image: this.post.featured_image_srcset,
      caption: this.post.post_title,
      title: this.post.post_title
    })
  }
}
</script>
