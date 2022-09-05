<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script lang="ts">

</script>

<style lang="scss">
@import "@/assets/style/reset.scss";
@import "@/assets/style/helper.scss";

body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333;
  line-height: 1.5;
  font-family: $font-hei;
}

#app {
  max-width: 500px;
  margin: auto;
}
</style>
