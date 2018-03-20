<template>
  <aside class="featured_popular">
    <h3 class="entry">Popular today</h3>
    <article class="entry" v-for="(post, i) in topFive" :key="i">
      <a href="permalink" name="title" class="simple">Title</a>
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
  }
}
</script>