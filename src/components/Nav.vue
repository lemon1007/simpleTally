<template>
  <div class="nav">
    <router-link to="/labels">标签</router-link>
    <span> | </span>
    <router-link to="/money">记账</router-link>
    <span> | </span>
    <router-link to="/statistics">统计</router-link>
  </div>
</template>

<script lang="ts">
export default {
  name: 'nav'
};
</script>

<style lang="scss" scoped>
  .nav{
    border: 1px red solid;
    display: flex;
    justify-content: space-evenly;
  }
</style>