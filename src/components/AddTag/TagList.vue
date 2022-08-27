<template>
  <div>
    <ul class="tags">
      <li v-for="(tags,index) in tagList"
          :key="index">
        <Icon :name="tags" class="icons"></Icon>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component
export default class TagList extends Vue {
  // 循环获取图标
  tagList = ['clothes', 'foods', 'houses', 'traffic', 'baby', 'cart', 'dog', 'game', 'heart', 'kefu', 'medicine', 'milktea', 'phone', 'qiche', 'qq', 'shoe', 'smoke', 'tie', 'to', 'touzi', 'umbrella', 'chair', 'liqing', 'caibo', 'weibo', 'dianying', 'shoucang', 'cosmetic', 'change', 'camer', 'keys', 'tags', 'clock', 'collect', 'lock', 'safe', 'shanzi'];

  // 选中图标
}
</script>

<style lang="scss" scoped>
@import "@/assets/style/helper.scss";

.tags {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 8px 10px 8px 10px;
  overflow: scroll;

  > li {
    margin: 5px 10px;

    .icons {
      margin-bottom: 2px;
      width: 50px;
      height: 50px;
      padding: 10px;
      border-radius: 50%;
      background-color: #f5f5f5;

      &.selected {
        background-color: $color-theme;
      }
    }
  }
}
</style>