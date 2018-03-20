<template>
  <div class='lazyLoadContainer'>
    <img v-if="!imageLoaded" ref="image" :src="$props.src" :alt="$props.alt" :title="$props.title" class="blur-up" />
    <img v-if="visible"
      :class="{'hidden': !imageLoaded}"
      :src="$props.src" 
      :srcset="$props.srcset"
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