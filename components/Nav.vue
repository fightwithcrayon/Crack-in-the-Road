<template>
  <div>
    <nav id="nav" class="home">
      <nuxt-link to="/">Crack in the Road</nuxt-link>
      <nuxt-link to="/" v-if="$route.path != '/'"><span class="font_small">Return home<i class="icon-th"></i></span></nuxt-link>
      <a href="https://en.wikipedia.org/wiki/Crack_in_the_Road" target="_blank" class="font_small">
        About<i class="icon-info-circled"></i>
      </a>
    </nav>
  </div>
</template>

<script>
export default {
  methods: {
    toggleMenu () {
      document.body.classList.toggle('menuopen')
    }
  }
}
</script>