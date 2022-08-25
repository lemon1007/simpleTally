<template>
  <div id="tabControl">
    <router-link to="/labels">labels</router-link>
    <span> | </span>
    <router-link to="/money">money</router-link>
    <span> | </span>
    <router-link to="/statistics">statistics</router-link>
    <hr>
  </div>
</template>

<script lang="ts">
export default {
  name: 'nav'
};
</script>

<style lang="css" scoped>

</style>