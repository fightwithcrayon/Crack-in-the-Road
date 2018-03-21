<template lang="html">
  <div></div>
</template>

<script>
export default {
  methods: {
    start () {
      this.$root.$emit('loadStatus', true)
    },
    finish () {
      this.$root.$emit('loadStatus', false)
    }
  }
}
</script>