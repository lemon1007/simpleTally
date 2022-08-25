<template>
  <div class="nav-wrapper">
    <div class="content">
      <p>记账页面</p>
    </div>

    <Nav/>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Money',
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
  flex-grow:0.9;
  overflow: scroll;
}
</style>