<template>
  <div class="tags">
    <ul class="current">
      <li v-for="tag in tagSource" :key="tag.id"
          :class="selectedTags.indexOf(tag)>=0 && 'selected'"
          @click="selectToggle(tag)">
        <Icon :name="tag.icon" class="icons"></Icon>
        <span>{{ tag.name }}</span>
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
  @Prop(Array) tagSource: { name: string, icon: string }[] | undefined;
  selectedTags: { name: string, icon: string }[] = [];

  // tag是数组的一个对象,即{name,icon}
  selectToggle(tag: { name: string, icon: string }) {
    const len = this.selectedTags.length;
    if (len >= 1)
      this.selectedTags = [];
    this.selectedTags.push(tag);
    this.$emit('update:value', this.selectedTags);
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