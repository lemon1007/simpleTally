<template>
  <div>
    <ul class="nav">
      <li @click="returnTags">
        <Icon class="icons" name="return"/>
      </li>
      <li class="addTitle">新增分类</li>
      <li>
        <Icon class="icons" name="ensure"/>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component
export default class NavBar extends Vue {
  // 返回主页
  returnTags() {
    this.$router.replace('/');
  }

  // 信息提交

}
</script>

<style lang="scss" scoped>
@import "@/assets/style/helper.scss";

.nav {
  width: 100%;
  min-height: 9vh;
  background-color: $color-theme;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  padding: 0 15px;
  line-height: 8vh;

  > li {
    &.addTitle {
      font-size: 18px;
    }

    .icons {
      width: 22px;
      height: 22px;
    }
  }
}
</style>