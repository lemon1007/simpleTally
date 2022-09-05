<template>
  <Layout>
    <div class="Charts">
      <Tabs class-prefix="type"
            :data-source="typeList"
            @update:value="onUpdateType"
            :types="this.type"/>

      <ul class="chartsList">
        <li>
          <span>线形图</span>
          <div class="chartOne-wrapper" ref="chartWrapper">
            <ChartOne class="chartOne" :options="x"></ChartOne>
          </div>
        </li>
        <li>
          <span>柱形图</span>
        </li>
        <li>
          <span>扇形图</span>
        </li>
      </ul>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Tabs from '@/components/Tabs.vue';
import typeList from '@/constants/typeList';
import ChartOne from '@/components/Charts/ChartOne.vue';

@Component({
  components: {ChartOne, Tabs},
})
export default class Charts extends Vue {
  get recordList() {
    return this.$store.state.recordList;
  }

  type: string = '-';
  typeList = typeList;

  created() {
    this.$store.commit('fetchRecords');
  }

  mounted() {
    const div = (this.$refs.chartWrapper as HTMLDivElement);
    div.scrollLeft = div.scrollWidth;
  }

  get x() {
    return {
      // 控制图标与包裹图标的div之间的间距
      grid: {
        left: 0,
        right: 0,
        bottom: 40,
      },
      xAxis: {
        type: 'category',
        data: [
          '1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
          '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
          '21', '22', '23', '24', '25', '26', '27', '28', '29', '30',
        ],
        axisTick: {
          alignWithLabel: true
        },
        axisLine: {
          lineStyle: {
            color: '#af0a0a'  // 字体颜色
          }
        }
      },
      yAxis: {
        type: 'value',
        show: false
      },
      series: [{
        data: [
          80, 92, 91, 94, 129, 133, 132, 124, 97, 122,
          80, 92, 91, 94, 129, 133, 132, 124, 97, 122,
          80, 92, 91, 94, 129, 133, 132, 124, 97, 122,
        ],
        itemStyle: {
          color: '#af0a0a'  // 圆点颜色时
        },
        type: 'line',
        symbolSize: 10, // 圆的大小
        smooth: true,  // 弧度
        symbol: 'circle'  // 实心圆
      }],
      tooltip: {   // 点击后显示的提示内容
        formatter: '{c}',
        position: 'top',
        show: true
      }
    };
  }

  onUpdateType(value: string) {
    this.type = value;
  }
}
</script>

<style lang="scss" scoped>
.Charts {
  min-height: 91vh;
  background-color: #f5f5f5;

  .chartsList {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;

    > li {
      width: 90%;
      background-color: white;
      margin-top: 20px;
      border-radius: 7px;

      .chartOne {
        width: 430%;

        &-wrapper {
          overflow: auto;

          &::-webkit-scrollbar {
            display: none;
          }
        }
      }
    }
  }
}

</style>