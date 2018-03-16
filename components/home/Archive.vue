<template>
	<article class="archive block">
		<div class="image">
			<router-link :to="permalink" :name="data.title.rendered">
				<LazyImage :src="data.featured_image_url" :srcset="data.featured_image_srcset" :alt="data.title.rendered" :title="data.title.rendered" />
			</router-link>
		</div>
		<div class="info">
      <router-link :to="permalink" :name="data.title.rendered" class="simple" v-html='data.custom_title'></router-link>
			<p v-html='data.custom_excerpt'></p>
			<span class="more">
				<router-link :to="permalink" :name="data.title.rendered">Read more</router-link>
			</span>
		</div>
	</article>
</template>
<script>
import LazyImage from '~/components/LazyImage.vue'
export default {
	props: ['data'],
  computed: {
    permalink () {
      return this.data.link.replace('https://www.crackintheroad.com/', '')
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