<template>
  <div>
    <section class="featured divider">
      <FeaturedCard v-for="(post, i) in featured" :data="post" :key="i" />
      <PopularCard :data="popular" />
    </section>
    <section class="playlists wide-content">
      <h2>Playlists</h2>
      <h3>Latest updates</h3>
      <SpotifyCard v-for="(playlist, i) in spotify" :data="playlist" :key="i" />
    </section>
    <section class="archives infinitescroll full-content">
      <h2>Latest stories</h2>
      <h3>Everything we've written about</h3>
      <ArchiveCard v-for="(post, i) in posts" :data="post" :key="i" />
      <div class="load-more"></div>
    </section>
  </div>
</template>

<script>
import Cover from '~/components/Cover.vue'
import Nav from '~/components/Nav.vue'

import FeaturedCard from '~/components/home/Featured.vue'
import PopularCard from '~/components/home/Popular.vue'
import SpotifyCard from '~/components/home/Spotify.vue'
import ArchiveCard from '~/components/home/Archive.vue'

const api = 'https://www.crackintheroad.com/endpoint.php?api='

export default {
  async asyncData ({ app }) {
    const home = await app.$axios.get(`${api}home`)
    return { posts: home.data.posts.posts, featured: home.data.featured.posts, spotify: JSON.parse(home.data.spotify), popular: home.data.stats }
  },
  components: {
    Cover,
    Nav,
    ArchiveCard,
    FeaturedCard,
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
        this.$axios.get(`${api}post&page=${this.page}`).then((response) => {
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