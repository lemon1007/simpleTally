<template>
  <div id="app">
    <div id="tabControl">
      <router-link to="/labels">labels</router-link>
      <span> | </span>
      <router-link to="/money">money</router-link>
      <span> | </span>
      <router-link to="/statistics">statistics</router-link>
      <hr>
    </div>
    <router-view/>
  </div>
</template>

<script lang="ts">

</script>

<style lang="scss" scoped>

</style>
