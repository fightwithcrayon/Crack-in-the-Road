<template>
  <div>
    <Cover :image='cover.image' :caption='cover.caption' :title='cover.title' />
    <Nav />
    <main id="thepage" ref="thepage" v-if="!loading">
      <nuxt />
    </main>
  </div>
</template>
<script>
import Cover from '~/components/Cover.vue'
import Nav from '~/components/Nav.vue'

export default {
  data () {
    return {
      coverClosed: true,
      cover: {
        image: '',
        caption: '',
        title: ''
      },
      loading: false
    }
  },
  head () {
    return {
      bodyAttrs: {
        class: this.coverClosed ? 'cover-closed' : ''
      }
    }
  },
  components: {
    Cover, Nav
  },
  created () {
    if (process.browser) {
      window.addEventListener("scroll", this.runScroll, { passive: false })
    }
    this.$root.$on('updateCover', (newValues) => this._updateCover(newValues))
    this.$root.$on('recalculateCover', this._recalculateCover)
    this.$root.$on('loadStatus', (newValue) => this._loadAnimation(newValue))
  },
  methods: {
    _loadAnimation (loading) {
      if (loading) {
      } else {
      }
      this.loading = loading
    },
    _updateCover (newValues) {
      this.cover = newValues
      this._recalculateCover()
    },
    _recalculateCover () {
      if (process.browser && this.$refs.thepage) {
        document.body.style = `padding-bottom: ${this.$refs.thepage.clientHeight}px`
      }
    },
    runScroll () {
      this.coverClosed = window.scrollY <= window.innerHeight ? true : false
    }
  }
}
</script>
<style>
#thepage {
  max-width: 100%;
}
</style>