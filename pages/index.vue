<template>
  <div>
    <section class="featured divider">
      <StoryCard v-for="(post, i) in featured" :data="post" :key="i" v-if="i < 3" />
      <PopularCard :data="popular" type="popular" />
    </section>
    <section class="playlists wide-content">
      <h2>Playlists</h2>
      <h3>Latest updates</h3>
      <SpotifyCard v-for="(playlist, i) in spotify" :data="playlist" :key="i" />
    </section>
    <section class="archives infinitescroll full-content">
      <h2>Latest stories</h2>
      <h3>Everything we've written about</h3>
      <StoryCard v-for="(post, i) in posts" :data="post" :key="i" v-if="post.link && post.link != '/%category%/%post_id%-%postname%'" />
      <div class="load-more"></div>
    </section>
  </div>
</template>

<script>
import Cover from '~/components/Cover.vue'
import Nav from '~/components/Nav.vue'

import PopularCard from '~/components/home/Popular.vue'
import SpotifyCard from '~/components/home/Spotify.vue'
import StoryCard from '~/components/home/StoryCard.vue'

const api = 'https://www.crackintheroad.com/endpoint.php?api='

export default {
  async asyncData ({ app }) {
    const home = await app.$axios.get(`${api}home`)
    return { posts: home.data.posts, featured: home.data.featured, spotify: home.data.spotify, popular: home.data.stats }
  },
  components: {
    Cover,
    Nav,
    StoryCard,
    PopularCard,
    SpotifyCard
  },
  data () {
    return {
      page: 2,
      loading: true
    }
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this._handleInfiniteScroll)
  },
  mounted () {
    this.$root.$emit('updateCover', {
      image: this.featured[0].featured_image_srcset,
      caption: this.featured[0].post_title,
      title: this.featured[0].post_title
    })
    window.addEventListener('scroll', this._handleInfiniteScroll)
    this.loading = false
  },
  methods: {
    _handleInfiniteScroll () {
      if (!this.loading && window.scrollY > (document.body.clientHeight - (window.screen.height * 2))) {
        this.loading = true
        this.$axios.get(`${api}posts&page=${this.page}`).then((response) => {
          this.posts = this.posts.concat(response.data)
          this.page++
          this.loading = false
          this.$root.$emit('recalculateCover')
        }).catch((e) => { this.loading = false })
      }
    }
  }
}
</script>