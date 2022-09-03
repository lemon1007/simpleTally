<template>
  <nav>
    <router-link to="/labels" class="item" active-class="selected">
      <Icon name="label"/>
    </router-link>

    <router-link to="/money" class="item" active-class="selected">
      <Icon name="money"/>
    </router-link>

    <router-link to="/statistics" class="item" active-class="selected">
      <Icon name="statistics"/>
    </router-link>

    <router-link to="/charts" class="item" active-class="selected">
      <Icon name ='foods'/>
    </router-link>
  </nav>
</template>

<script lang="ts">
let importAll = (requireContext: __WebpackModuleApi.RequireContext) => {
  requireContext.keys().forEach(requireContext);
};
try {
  importAll(require.context('../assets/icons/', true, /\.svg$/));
} catch (error) {console.log(error);}


export default {
  name: 'MyNav',
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/helper.scss";

nav {
  display: flex;
  flex-direction: row;
  padding-bottom: 2px;
  height: 9vh;
  box-shadow: 0 0 0 0.5px rgba(0,0,0,0.25);

  > .item {
    padding: 7px 0;
    width: 25%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .icon {
      width: 32px;
      height: 32px;
    }
  }

  > .item.selected {
    color: $color-highlight;
  }
}
</style>