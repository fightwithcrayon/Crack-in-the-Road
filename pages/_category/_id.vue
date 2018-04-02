<template>
  <div class="page-content">
    <div class="title">
      <h2>{{sanitisedTitle}}</h2>
    </div>
    <div class="copy" v-html="post.post_content.rendered"></div>
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
  async asyncData ({ app, params, payload }) {
    if (payload) {
      return { post: payload }
    } else {
      const postId = params.id.split('-')[0]
      try {
        let { data } = await app.$axios.get(`https://api.crackintheroad.com/wp-json/wp/v2/posts/${postId}`)
        return { post: data }
      } catch (error) {
        console.log(error, error.message)
        return { post: {} }
      }
    }
  },
  computed: {
    sanitisedTitle () {
      let title = this.post.title ? this.post.title.rendered : this.post.post_title
      if (title) {
        return title.replace(/&#(\d+);/g, function(match, dec) {
          return String.fromCharCode(dec)
        })
      } else {
        return ''
      }
    }
  },
  mounted () {
    this.$root.$emit('updateCover', {
      image: this.post.featured_image_srcset,
      caption: this.sanitisedTitle,
      title: this.sanitisedTitle
    })
  }
}
</script>
