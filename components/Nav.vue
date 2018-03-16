<template>
  <div>
    <nav id="nav" class="home">
      <router-link to="/">Crack in the Road</router-link>
      <router-link to="/" v-if="$route.path != '/'"><span class="font_small">Return home<i class="icon-th"></i></span></router-link>
      <a v-on:click.stop="toggleMenu()" href="#">
        <span class="font_small">Menu<i class="icon-menu"></i></span>
      </a>
    </nav>
    <ul id="menu">
      <li><a href="https://www.crackintheroad.com/">Home</a></li>
      <li>&nbsp;</li>
      <li><a href="https://en.wikipedia.org/wiki/Crack_in_the_Road" target="_blank">About</a></li>
      <li class="close" v-on:click.stop="toggleMenu"></li>
    </ul>
  </div>
</template>

<script>
export default {
  methods: {
    toggleMenu () {
      document.body.classList.toggle('menopen')
    }
  }
}
</script>