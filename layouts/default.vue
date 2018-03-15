<template>
  <nuxt />
</template>
<script>
  export default {
    data () {
      return {
        coverClosed: true,
        pagePadding: 0
      }
    },
    head () {
      return {
        bodyAttrs: {
          class: this.coverClosed ? 'cover-closed' : '',
          style: this.pagePadding
        }
      }
    },
    created () {
      if (process.browser) {
        window.addEventListener("scroll", this.runScroll, { passive: true })
      }
      this.$root.$on('setupPageHeight', (val) => {
        this.pagePadding = `padding-bottom: ${val}px`
      })
    },
    methods: {
      runScroll () {
        if (this.coverClosed && window.scrollY >= window.innerHeight) {
          this.coverClosed = false
        } else if (window.scrollY <= window.innerHeight) {
          this.coverClosed = true
        }
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
