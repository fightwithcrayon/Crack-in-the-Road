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

export default {
  async asyncData ({ app }) {
    let posts = await app.$axios.get(`/api/posts`)
    let featured = await app.$axios.get(`/api/posts?sticky=true&per_page=3`)
    let spotify = await app.$axios.get(`/custom/spotify`)
    let popular = await app.$axios.get(`/custom/stats`)
    return { posts: posts.data, featured: featured.data, spotify: JSON.parse(spotify.data), popular: popular.data }
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
      loading: false
    }
  },
  mounted () {
    this.$root.$emit('updateCover', {
      image: this.posts[0].featured_image_srcset,
      caption: this.posts[0].title.rendered,
      title: this.posts[0].title.rendered
    })
    window.addEventListener('scroll', this._handleInfiniteScroll)
  },
  methods: {
    _handleInfiniteScroll () {
      if (!this.loading && window.scrollY > (document.body.clientHeight - (window.screen.height * 2))) {
        this.loading = true
        this.$axios.get(`/api/posts?page=${this.page}`).then((response) => {
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