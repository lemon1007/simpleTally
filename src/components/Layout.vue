<template>
  <div class="nav-wrapper">
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
.nav-wrapper {
  border: 1px blue solid;
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.content {
  flex-grow: 0.95;
  overflow: scroll;
}
</style>