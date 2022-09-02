<template>
  <div>
    <ul class="types">
      <li :class="{selected:type === '-',[classPrefix+'-item']:classPrefix}"
          @click="selectType('-')">
        <span>支出</span>
      </li>
      <li :class="{selected:type === '+',[classPrefix+'-item']:classPrefix}"
          @click="selectType('+')">
        <span>收入</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">

import Vue from 'vue';
import {Component, Prop, Watch} from 'vue-property-decorator';

@Component
export default class Types extends Vue {
  @Prop({default: '-'}) readonly type!: string;
  @Prop(String) classPrefix?: string;

  selectType(type: string) {
    if (type !== '-' && type !== '+') {
      throw new Error('type is unknown');
    }
    this.$emit('update:value', type);
  }
}
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
    min-height: 9vh;
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