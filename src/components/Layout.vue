<template>
  <div class="layout-wrapper">
    <div class="content">
      <slot/>
    </div>
    <!--    导航标签引入-->
    <Nav/>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Layout'
};
</script>

<style lang="scss" scoped>
.layout-wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
</style>