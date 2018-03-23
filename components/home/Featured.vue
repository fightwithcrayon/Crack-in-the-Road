<template>
  <article class="featured block">
    <figure class="image">
      <LazyImage :src="data.featured_image_url" :srcset="data.featured_image_srcset" :alt="data.post_title" :title="data.post_title" />
      <figcaption>
        <router-link :to="permalink" :name="data.post_title" data-tracks></router-link>
      </figcaption>
    </figure>
    <div class="info">
      <router-link :to="permalink" :name="data.post_title" class="simple" v-html="featuredTitle"></router-link>
      <p v-html="data.custom_excerpt"></p>
      <span class="more">
          <router-link :to="permalink" :name="data.post_title">Read more</router-link>
      </span> 
    </div>
  </article>
</template>
<script>
import LazyImage from '~/components/LazyImage.vue'
export default {
  props: ['data'],
  computed: {
    featuredTitle () {
      return this.data.custom_title.replace(<div class="tag">.*</div>, '<div class="tag">Featured</div>')
    },
    permalink () {
      return this.data.guid.replace('https://www.crackintheroad.com/', '')
    }
  },
	components: {
		LazyImage
	}
}
</script>