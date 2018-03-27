<template>
  <div>
    <Cover :image='cover.image' ref="cover" :caption='cover.caption' :title='cover.title' aria-hidden="true" />
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
  beforeDestroy () {
    window.removeEventListener('scroll', this.runScroll)
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
        console.log('loading')
        if (process.browser && this.$refs.cover) {
          console.log(this.$refs.cover)
          this.$refs.cover.$el.scrollIntoView({behavior:'smooth'})
        }
      } else {
        console.log('loaded')
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
#pixel {
  height: 1px;
  width: 1px;
  position: absolute;
  top:0;
  left:0;
  visibility:hidden;
}
</style>