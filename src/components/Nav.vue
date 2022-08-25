<template>
  <div class="nav">
    <router-link to="/labels" class="item">
      <Icon name="label"/>
      标签
    </router-link>
    <span> | </span>
    <router-link to="/money" class="item">
      <Icon name="money"/>
      记账
    </router-link>
    <span> | </span>
    <router-link to="/statistics" class="item">
      <Icon name="statistics"/>
      统计
    </router-link>
  </div>
</template>

<script lang="ts">
let importAll = (requireContext: __WebpackModuleApi.RequireContext) => {
  requireContext.keys().forEach(requireContext);
};
try {
  importAll(require.context('../assets/icons/', true, /\.svg$/));
} catch (error) {console.log(error);}


export default {
  name: 'nav',
};
</script>

<style lang="scss" scoped>
.nav {
  display: flex;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.25);
  flex-direction: row;

  > .item {
    padding: 2px 0;
    width: 33.33333%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .icon {
      width: 32px;
      height: 32px;
    }
  }
}
</style>