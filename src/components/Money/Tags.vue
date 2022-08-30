<template>
  <div class="tags">
    <ul class="current">
      <li v-for="(tags,index) in tagSource" :key="index"
          :class="selectedTags.indexOf(tags)>=0 && 'selected'"
          @click="selectToggle(tags)">
        <Icon :name="tags.icon" class="icons"></Icon>
        <span>{{ tags.name }}</span>
      </li>
      <li @click="addTags">
        <Icon name="add" class="icons"></Icon>
        <span>新增标签</span>
      </li>

    </ul>
  </div>
</template>

<script lang="ts">

import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

@Component
export default class Tags extends Vue {
  @Prop(Array) tagSource: string[] | undefined;
  selectedTags: string[] = [];

  selectToggle(tags: string) {
    const len = this.selectedTags.length;
    if (len >= 1)
      this.selectedTags = [];
    this.selectedTags.push(tags);
  }

  addTags() {
    this.$router.replace('/add-tag');
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/helper.scss";

.tags {
  min-height: 38vh;
  max-height: 38vh;
  overflow: scroll;

  .current {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    > li {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      margin-left: 23px;
      margin-top: 16px;
      width: 64px;
      height: 64px;
      font-size: 12px;

      .icons {
        margin-bottom: 2px;
        width: 43px;
        height: 43px;
        padding: 7px;
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
}

.tags::-webkit-scrollbar {
  display: none;
}
</style>