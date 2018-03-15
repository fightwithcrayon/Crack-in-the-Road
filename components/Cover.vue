<template>
  <section id="cover">
    <canvas id="sitetitle"></canvas>
    <figure>
      <img :alt="ttl" :title="ttl" :srcset="srcset">
      <figcaption>
        <h2 v-if="$route.path != '/'">{{ cap }}</h2>
        <h1 v-else>{{ cap }}</h1>
      </figcaption>
    </figure>
  </section>
</template>
<script>
export default {
  props: ['image', 'title', 'caption'],
  computed: {
    cap () {
      return this.$props.caption //|| this.default.title.rendered
    },
    srcset () {
      return this.$props.image //|| this.default.featured_image_srcset
    },
    ttl () {
      return this.$props.title //|| this.default.title.rendered
    }
  }
}
</script>