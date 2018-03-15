<template>
  <article class="featured block">
    <figure class="image">
      <img :src="data.featured_image_url" :data-srcset="data.featured_image_srcset" :alt="data.title.rendered" :title="data.title.rendered" class="lazyload blur-up" />
      <figcaption>
        <a href="#" :name="data.title.rendered" data-tracks=""></a>
        <a :href="permalink" :name="data.title.rendered" data-tracks></a>
      </figcaption>
    </figure>
    <div class="info">
      <a :href="permalink" :name="data.title.rendered" class="simple" v-html="featuredTitle"></a>
      <p v-html="data.custom_excerpt"></p>
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
    featuredTitle () {
      return this.data.custom_title.replace(<div class="tag">.*</div>, '<div class="tag">Featured</div>')
    },
    permalink () {
      return this.data.link.replace('https://www.crackintheroad.com/', '')
    }
  }
}
</script>