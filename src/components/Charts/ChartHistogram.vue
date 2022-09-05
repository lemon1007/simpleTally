<template>
  <div class="wrapper" ref="wrapper"></div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop, Watch} from 'vue-property-decorator';
import echarts, {EChartOption} from 'echarts';

@Component
export default class ChartHistogram extends Vue {
  @Prop() options?: any;
  chart?: any;

  mounted() {
    if (this.options === undefined) {return console.log('options error');}
    this.chart = echarts.init(this.$refs.wrapper as HTMLDivElement);
    this.chart.setOption(this.options);
  }

  @Watch('options')
  onOptionsChange(newValue: EChartOption) {
    this.chart!.setOption(newValue);
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  height: 260px;
}
</style>