<template>
  <aside class="featured_popular">
    <h3 class="entry">Popular today</h3>
    <article class="entry" v-for="(post, i) in topFive" :key="i">
      <router-link :to="permalink(post.link)" name="title" class="simple">{{ post.post_title }}</router-link>
    </article>
  </aside>
</template>
<script>
export default {
  props: ['data'],
  computed: {
    topFive () {
      return this.data.slice(0, 5)
    }
  },
  methods: {
    permalink (link) {
      return link.replace('https://www.crackintheroad.com/', '')
    }
  }
}
</script>