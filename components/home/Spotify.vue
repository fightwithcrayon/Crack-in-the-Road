<template>
  <article class="playlist block">
    <a :href="permalink" :name="data.name">
      <figure class="image">
        <LazyImage :src="`${this.smallImage}`" :srcset="srcset" :alt="image.name" :title="image.name" />
      </figure>
    </a>
    <div class="info">
      <a :href="permalink" :name="data.name">
        <h4>{{ name }}</h4>
      </a>
      <p v-html="description"></p>
      <a :href="permalink" :alt="`Subscribe to ${name}`"  :name="`Subscribe to ${name}`" class="subscribe">
        Subscribe
      </a>
      <span class="more">Last updated: {{ date }}</span>
    </div>
  </article>
</template>
<script>
  import { format, parse } from 'date-fns'
  import LazyImage from '~/components/LazyImage.vue'

  export default {
    props: ['data'],
    components: {
      LazyImage
    },
    computed: {
      date () {
        return format(parse(this.data.tracks.items[0].added_at), 'Do MMM')
      },
      description () {
        return this.data.description.replace(/<a href="([^"]*?)">Crack in the Road<\/a>/g, 'Crack in the Road')
                                    .replace(/<a href="([^"]*?)">www.crackintheroad.com<\/a>/g, 'Crack in the Road')
      },
      image () {
        return this.data.images[0] || {}
      },
      name () {
        return this.data.name.replace('Crack in the Road ', '')
      },
      permalink () {
        return this.data.external_urls.spotify
      },
      srcset () {
        return `${this.largeImage} 300w, ${this.smallImage} 150w`
      },
      smallImage () {
        return `${this.image.url}_150.jpg`
      },
      largeImage () {
        return `${this.image.url}.jpg`
      }
    }
  }
</script>
<style lang="scss">
.playlists {
  overflow:hidden;
  .block {
    display: flex;
    flex-direction: column;
    width: calc(50vw - 30px);
    @media(min-width:768px) {
      flex-direction: row;
      width: 100%;
      height: auto;
    }
    @media(min-width:1024px) {
      width: calc(50% - 10px);
      text-align:left;
    }
    a {
      border-bottom: none;
    }
    .image {
      width: calc(50vw - 30px);
      height: calc(50vw - 30px);
      @media(min-width:768px) {
        min-width: 25vw;
        width: auto;
        height: 25vw;
      }
      @media(min-width:1024px) {
        min-width: 20vw;
        height: 20vw;
      }
      @media(min-width:1440px) {
        min-width: 50%;
        height:calc((50vw - 120px) / 3);
      }
      @media(min-width:1800px) {
        height:calc(900px / 3);
      }
    }
    .info {
      width: 100%;
      height: auto;
      font-size: 14px;
      @media(min-width:768px) {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
      @media(min-width:1024px) {
        justify-content:center;
      }
    }
    h4 {
      margin-top: 0;
    }
    .subscribe {
      width: 100%;
      background-color: green;
      display:none;
    }
    .more {
      position: relative;
      background-color: transparent;
      display: block;
      bottom: 0;
      padding-bottom: 0;
    }
  }
}
</style>
