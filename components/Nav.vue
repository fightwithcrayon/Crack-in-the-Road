<template>
  <div>
    <nav id="nav" class="home">
      <router-link to="/">Crack in the Road</router-link>
      <router-link to="/" v-if="$route.path != '/'"><span class="font_small">Return home<i class="icon-th"></i></span></router-link>
      <a href="#" data-action="openMenu">
        <span class="font_small">Menu<i class="icon-menu"></i></span>
      </a>
    </nav>
    <ul id="menu">
      <li><a href="https://www.crackintheroad.com/">Home</a></li>
      <li>&nbsp;</li>
      <li><a href="https://en.wikipedia.org/wiki/Crack_in_the_Road" target="_blank">About</a></li>
      <li class="close"></li>
    </ul>
  </div>
</template>

<script>
export default {

}
</script>