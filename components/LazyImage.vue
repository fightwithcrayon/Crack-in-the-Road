<template>
  <div class='lazyLoadContainer'>
    <img v-if="!imageLoaded" ref="image" :src="source" :alt="$props.alt" :title="$props.title" class="blur-up" />
    <img v-if="visible"
      :class="{'hidden': !imageLoaded}"
      :src="source" 
      :srcset="sourceset"
      :alt="$props.alt"
      :title="$props.title"
      @load="imageLoaded = true"
    />
  </div>
</template>
<script>
export default {
  props: ['src', 'srcset', 'alt', 'title'],
	data () {
		return {
			io: null,
			visible: false,
			imageLoaded: false
		}
  },
  computed: {
    source () {
      return this.$props.src.replace(/www.crackintheroad.com/g, 'api.crackintheroad.com')
    },
    sourceset () {
      return this.$props.src.replace(/www.crackintheroad.com/g, 'api.crackintheroad.com')
    }
  },
	mounted () {
		this.io = new IntersectionObserver(entries => this._imageVisible(entries), {})
    this.io.observe(this.$refs.image)
	},
	methods: {
		_imageVisible (e) {
      if (e[0].isIntersecting) {
        this.io.unobserve(this.$refs.image)
        this.visible = true
      }
		}
	}
}
</script>
<style>
.lazyLoadContainer {
  height: 100%;
}
</style>