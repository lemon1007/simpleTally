<template>
  <div>
    <ul class="tags">
      <li v-for="(tags,index) in tagList" :key="index"
          :class="selectedTags.indexOf(tags)>=0 && 'selected'"
          @click="selectToggle(tags)">
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
  // 变量定义
  selectedTags: string[] = [];

  // 循环获取图标
  tagList = ['shoucang', 'cosmetic', 'change', 'camer', 'keys', 'clothes', 'foods', 'houses', 'traffic', 'baby', 'cart', 'dog', 'game', 'heart', 'kefu', 'medicine', 'milktea', 'phone', 'qiche', 'qq', 'shoe', 'smoke', 'tie', 'to', 'touzi', 'umbrella', 'chair', 'liqing', 'caibo', 'weibo', 'dianying', 'tags', 'clock', 'collect', 'lock', 'safe', 'shanzi'];

  // 选中图标
  selectToggle(tags: string) {
    const index = this.selectedTags.length;
    if (index >= 1)
      this.selectedTags = [];
    this.selectedTags.push(tags);
    this.$emit('send-tag-icon', this.selectedTags);
  }
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
    }

    &.selected {
      .icons {
        background-color: $color-theme;
      }
    }
  }
}
</style>