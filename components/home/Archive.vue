<template>
	<article class="archive block">
		<div class="image">
			<a :href="permalink" :name="data.title.rendered">
				<img :src="data.featured_image_url" :data-srcset="data.featured_image_srcset" :alt="data.title.rendered" :title="data.title.rendered" class="lazyload blur-up" />
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
export default {
  props: ['data'],
  computed: {
    permalink () {
      return this.data.link.replace('https://www.crackintheroad.com/', '')
    }
  }
}
</script>