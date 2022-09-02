<template>
  <Layout>
    <div class="StatisticsContent">

      <Tabs class-prefix="navBar"
            :data-source="typeList"
            @update:value="onUpdateType"
            :types="this.type"/>

      <Tabs :data-source="intervalList"
            @update:value="onUpdateInterval"
            :types="this.interval"/>
    </div>
  </Layout>
</template>

<script lang="ts">
import Layout from '@/components/Layout.vue';
import Types from '@/components/Money/Types.vue';
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Tabs from '@/components/Tabs.vue';
import intervalList from '@/constants/intervalList';
import typeList from '@/constants/typeList';

@Component({
  components: {Tabs, Layout, Types},
})
export default class Statistics extends Vue {
  interval: string = 'day';
  type: string = '-';

  intervalList = intervalList;
  typeList = typeList;

  onUpdateInterval(value: string) {
    this.interval = value;
  }

  onUpdateType(value: string) {
    this.type = value;
  }
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