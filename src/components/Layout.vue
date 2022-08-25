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
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.content {
  flex-grow: 1;
  overflow: scroll;
  padding-bottom: 20px;
}

.content::-webkit-scrollbar {
  display: none;
}
</style>