<template>
  <Layout>
    <div class="StatisticsContent">

      <Tabs class-prefix="navBar"
            :data-source="arrayMoney"
            @update:value="onUpdateType2"
            :types="this.typesMoney"/>

      <Tabs :data-source="arrayTimer"
            @update:value="onUpdateType"
            :types="this.typesTimer"/>
    </div>
  </Layout>
</template>

<script lang="ts">
import Layout from '@/components/Layout.vue';
import Types from '@/components/Money/Types.vue';
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Tabs from '@/components/Tabs.vue';

@Component({
  components: {Tabs, Layout, Types},
})
export default class Statistics extends Vue {
  typesTimer: string = 'day';
  typesMoney: string = '-';

  onUpdateType(value: string) {
    this.typesTimer = value;
  }

  onUpdateType2(value: string) {
    this.typesMoney = value;
  }

  arrayTimer = [
    {text: '按天', value: 'day'},
    {text: '按周', value: 'week'},
    {text: '按月', value: 'month'}
  ];

  arrayMoney = [
    {text: '支出', value: '-'},
    {text: '收入', value: '+'},
  ];
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/helper.scss";

.StatisticsContent {
  min-height: 91vh;
  background-color: #f5f5f5;

  ::v-deep .navBar-tabs-item {
    background-color: white;
    border: none;

    &.selected {
      background-color: $color-theme;

      &::after {
        display: none;
      }
    }
  }
}
</style>