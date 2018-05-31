<template>
  <div class="singlePage">
    <div class="page-content">
      <portal to="cover">
        <figure>
          <img :alt="sanitisedTitle" :title="sanitisedTitle" :srcset="post.featured_image_srcset">
          <figcaption>
            <h2 v-html="sanitisedTitle"></h2>
          </figcaption>
        </figure>
      </portal>
      <div class="title">
        <h2>{{sanitisedTitle}}</h2>
      </div>
      <main class="copy" v-html="bodyContent"></main>
    </div>
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
  async asyncData ({ app, params, payload, error}) {
    if (payload) {
      return { post: payload }
    } else if (params && params.id) {
      const postId = params.id.split('-')[0]
      try {
        let { data } = await app.$axios.get(`https://admin.crackintheroad.com/wp-json/wp/v2/posts/${postId}`)
        return { post: data }
      } catch (e) {
        console.log(e, e.message)
        return { post: {} }
      }
    } else {
      return error({ statusCode: 404, message: 'Post not found' })
    }
  },
  computed: {
    bodyContent () {
      return this.post.content ? this.post.content.rendered : this.post.post_content
    },
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
    this.$root.$emit('recalculateCover')
  }
}
</script>
