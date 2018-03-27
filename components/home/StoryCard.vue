<template>
	<article :class="type + ' block'">
		<div class="image">
			<nuxt-link :to="permalink" :name="data.title">
				<LazyImage :src="data.featured_image_url" :srcset="data.featured_image_srcset" :alt="data.title" :title="data.title" />
			</nuxt-link>
		</div>
		<div class="info">
      <nuxt-link :to="permalink" :name="data.title" class="simple" v-html='data.custom_title'></nuxt-link>
			<p v-html='data.custom_excerpt'></p>
			<span class="more">
				<nuxt-link :to="permalink" :name="data.title">Read more</nuxt-link>
			</span>
		</div>
	</article>
</template>
<script>
import LazyImage from '~/components/LazyImage.vue'
export default {
	props: ['data', 'type'],
  computed: {
    permalink () {
      return this.data.link ? this.data.link.replace('https://www.crackintheroad.com/', '') : ''
    }
	},
	components: {
		LazyImage
	}
}
</script>
<style>
.archive img.hidden {
	opacity:0;
}
</style>