<template>
  <ul class="tabs" :class="{[classPrefix+'-tabs']:classPrefix}">
    <li v-for="item in dataSource" :key="item.value" class="tabs-item"
        :class="{[classPrefix+'-tabs-item']:classPrefix,selected:item.value===types}"
        @click="select(item)">{{ item.text }}
    </li>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

type dataSourceItem = { text: string, value: string }
@Component
export default class Tabs extends Vue {
  @Prop({required: true, type: Array})
  dataSource!: dataSourceItem[];

  @Prop(String) readonly types!: string;
  @Prop(String) classPrefix?: string;

  select(item: dataSourceItem) {
    this.$emit('update:value', item.value);
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/style/helper.scss";

.tabs {
  background-color: $color-theme;
  display: flex;
  font-size: 18px;
  text-align: center;

  &-item {
    width: 50%;
    height: 9vh;
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