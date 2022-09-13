<template>
  <div class="tags">
    <ul class="current">
      <li v-for="tag in tagList" :key="tag.id"
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
import store from '@/store';

@Component
export default class Tags extends Vue {
  selectedTags: { name: string, icon: string }[] = [];

  get tagList() {
    return this.$store.state.tagList;
  }

  create() {
    this.$store.commit('fetchTags');
  }

  // tag是数组的一个对象,即{name,icon}
  selectToggle(tag: { name: string, icon: string }) {
    const index = this.selectedTags.indexOf(tag);
    if (index >= 0) {
      this.selectedTags.splice(index, 1);
    } else {
      if (this.selectedTags.length >= 1) {
        this.selectedTags = [];
      }
      this.selectedTags.push(tag);
    }
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

  &::-webkit-scrollbar {
    display: none;
  }

  .current {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    > li {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      margin-left: 5.5%;
      margin-right: 1.5%;
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
          color: white;
        }
      }
    }
  }
}
</style>