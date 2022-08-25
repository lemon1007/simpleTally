<template>
  <div>
    <ul class="types">
      <li class="selected">支出</li>
      <li>收入</li>
    </ul>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Types'
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/helper.scss";

.types {
  background-color: $color-theme;
  display: flex;
  font-size: 18px;
  text-align: center;

  > li {
    width: 50%;
    height: 8vh;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    &.selected::after {
      content: '';
      position: absolute;
      bottom: 0;
      width: 50%;
      height: 2px;
      background: #333333;
    }
  }
}
</style>