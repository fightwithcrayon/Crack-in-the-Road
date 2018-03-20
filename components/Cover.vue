<template>
  <section id="cover">
    <canvas id="sitetitle" ref="sitetitle"></canvas>
    <figure>
      <img :alt="ttl" :title="ttl" :srcset="srcset">
      <figcaption>
        <h2 v-if="$route.path != '/'" v-html="cap"></h2>
        <h1 v-else v-html="cap"></h1>
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
  },
  mounted () {
    if (this.$refs.sitetitle) {
      this.scribbleTitle()
    }
  },
  methods: {
    scribbleTitle(){
      var ctx = this.$refs.sitetitle.getContext("2d"),
        dashLen = 50, dashOffset = dashLen, speed = 10,
        txt = "CITR", x = 30, i = 0;

      ctx.font = "92px Rock Salt, sans-serif"; 
      ctx.lineWidth = 1; ctx.lineJoin = "round"; ctx.globalAlpha = 1;
      ctx.strokeStyle = ctx.fillStyle = "white";

      (function loop() {
        ctx.setLineDash([dashLen - dashOffset, dashOffset - speed]); // create a long dash mask
        dashOffset -= speed;                                         // reduce dash length
        ctx.strokeText(txt[i], x, 90);                               // stroke letter

        if (dashOffset > 0) requestAnimationFrame(loop);             // animate
        else {
          ctx.fillText(txt[i], x, 90);                               // fill final letter
          dashOffset = dashLen;                                      // prep next char
          x += ctx.measureText(txt[i++]).width + ctx.lineWidth * Math.random();
          ctx.setTransform(1, 0, 0, 1, 0, 3 * Math.random());        // random y-delta
          ctx.rotate(Math.random() * 0.005);                         // random rotation
          if (i < txt.length) requestAnimationFrame(loop);
        }
      })()
    }
  }
}
</script>