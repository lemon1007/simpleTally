<template>
  <div class="nav">
    <router-link to="/labels">
      <Icon name="label"/>
      标签
    </router-link>
    <span> | </span>
    <router-link to="/money">
      <Icon name="money"/>
      记账
    </router-link>
    <span> | </span>
    <router-link to="/statistics">
      <Icon name="statistics"/>
      统计
    </router-link>
  </div>
</template>

<script lang="ts">
let importAll = (requireContext: __WebpackModuleApi.RequireContext) => {
  requireContext.keys().forEach(requireContext);
}
try {
  importAll(require.context('../assets/icons/', true, /\.svg$/));
} catch (error) {console.log(error)}


export default {
  name: 'nav',
};
</script>

<style lang="scss" scoped>
.nav {
  border: 1px red solid;
  display: flex;
  justify-content: space-evenly;
}
</style>