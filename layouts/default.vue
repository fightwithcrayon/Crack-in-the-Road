<template>
  <div>
    <Cover :image='cover.image' :caption='cover.caption' :title='cover.title' />
    <Nav />
    <main id="thepage" ref="thepage">
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
      }
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
  },
  methods: {
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
<style lang="scss">
@import '../styles/reset.scss';
@import '../styles/variables.scss';
@import '../styles/typography.scss';
@import '../styles/style.scss';
</style>
