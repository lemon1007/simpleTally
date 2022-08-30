<template>
  <div>
    <ul class="nav">
      <li @click="returnTags">
        <Icon class="icons" name="return"/>
      </li>
      <li class="addTitle">新增分类</li>
      <li @click="sendNewTag">
        <Icon class="icons" name="ensure"/>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Public from '@/public';

@Component
export default class NavBar extends Vue {
  name = '';
  icon = '';

  // 返回主页
  returnTags() {
    this.$router.replace('/');
  }

  mounted() {
    // 接收新增分类名称
    Public.$on('send-tag-name', (val: string) => {
      this.name = val;
    });

    // 接收新增分类图标
    Public.$on('send-tag-icon', (selectedTags: string) => {
      this.icon = selectedTags[0];
    });
  }

  // 将数据发送给AddTag
  sendNewTag() {
    this.$emit('send-new-tag', [this.name, this.icon]);
    alert('添加成功');
  }
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