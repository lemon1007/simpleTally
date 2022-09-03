<template>
  <div class="wrapper" ref="wrapper">

  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
import * as echarts from 'echarts';
import {EChartOption} from 'echarts';

@Component
export default class ChartOne extends Vue {
  @Prop() options?: any;

  mounted() {
    if (this.options === undefined) {return console.log('options error');}
    const chart = echarts.init(this.$refs.wrapper as HTMLDivElement);
    chart.setOption(this.options);
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  height: 400px;
}

</style>