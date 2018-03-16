<template>
	<article class="archive block">
		<div class="image">
			<a :href="permalink" :name="data.title.rendered">
				<LazyImage :src="data.featured_image_url" :srcset="data.featured_image_srcset" :alt="data.title.rendered" :title="data.title.rendered" />
			</a>
		</div>
		<div class="info">
      <a :href="permalink" :name="data.title.rendered" class="simple" v-html='data.custom_title'></a>
			<p v-html='data.custom_excerpt'></p>
			<span class="more">
				<a :href="permalink" :name="data.title.rendered">Read more</a>
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