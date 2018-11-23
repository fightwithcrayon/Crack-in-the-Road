<template>
  <div>
    <portal to="cover">
      <figure>
        <img :alt="featured[0].post_title" :title="featured[0].post_title" :srcset="featured[0].featured_image_srcset">
        <figcaption>
          <h1 v-html="featured[0].post_title"></h1>
        </figcaption>
      </figure>
    </portal>
    <section class="featured divider">
      <StoryCard v-for="(post, i) in featured" type="featured" :data="post" :key="i" v-if="i < 3" />
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
      <StoryCard v-for="(post, i) in posts" :data="post" type="archive" :key="i" v-if="post.link && post.link != '/%category%/%post_id%-%postname%'" />
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

const api = 'https://admin.crackintheroad.com/wp-json/'

export default {
  async asyncData ({ app }) {
    const home = await app.$axios.get(`${api}custom/home`)
    return { posts: home.data.posts, featured: home.data.featured, spotify: home.data.spotify, popular: home.data.stats }
  },
  head () {
    return {
      title: 'Crack in the Road',
      meta: [
        { hid: 'og:title', name: 'og:title', content: 'Crack in the Road' },
        { hid: 'og:image', name: 'og:image', content: this.featured[0].social_image_url },
        { hid: 'og:url', name: 'og:url', content: 'https://www.crackintheroad.com' },
        { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
        { hid: 'og:site_name', name: '', content: 'Crack in the Road' },
        { hid: 'twitter:image:alt', name: '', content: 'Crack in the Road' },
        { hid: 'twitter:site', name: '', content: '@crackintheroad' }
      ]
    }
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
    this.$root.$emit('recalculateCover')
    window.addEventListener('scroll', this._handleInfiniteScroll)
    this.loading = false
  },
  methods: {
    _handleInfiniteScroll () {
      if (!this.loading && window.scrollY > (document.body.clientHeight - (window.screen.height * 2))) {
        this.loading = true
        this.$axios.get(`${api}wp/v2/posts?page=${this.page}&post_per_page=30`).then((response) => {
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