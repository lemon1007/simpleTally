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
            <ChartOne class="chartOne" :options="chartOptions"></ChartOne>
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
import _ from 'lodash';
import dayjs from 'dayjs';
import clone from '@/lib/clone';

@Component({
  components: {ChartOne, Tabs},
})
export default class Charts extends Vue {
  get recordList() {
    return this.$store.state.recordList;
  }

  type: string = '-';
  typeList = typeList;

  onUpdateType(value: string) {
    this.type = value;
  }

  created() {
    this.$store.commit('fetchRecords');
  }

  mounted() {
    const div = (this.$refs.chartWrapper as HTMLDivElement);
    div.scrollLeft = div.scrollWidth;
  }

  // groupedList获取
  get groupedList() {
    const recordList = this.recordList;
    if (recordList.length === 0) {return []; }
    const newList = clone(recordList)
        .filter((r: any) => r.type === this.type)
        .sort((a: any, b: any) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf());
    if (newList.length === 0) {return [] as Result;}

    type Result = { title: string, total?: number, items: RecordItem[] }[]
    const result: Result = [{title: dayjs(newList[0].createdAt).format('YYYY-MM-DD'), items: [newList[0]]}];
    for (let i = 1; i < newList.length; i++) {
      const current = newList[i];
      const last = result[result.length - 1];
      if (dayjs(last.title).isSame(dayjs(current.createdAt), 'day')) {
        last.items.push(current);
      } else {
        result.push({title: dayjs(current.createdAt).format('YYYY-MM-DD'), items: [current]});
      }
    }

    result.forEach(group => {
      group.total = group.items.reduce((sum, item) => sum + item.amount, 0);
    });

    return result;
  }

  get keyValueList() {
    const today = new Date();
    const array = [];
    for (let i = 0; i <= 29; i++) {
      const date = dayjs(today)
          .subtract(i, 'day')
          .format('YYYY-MM-DD');

      const found = _.find(this.groupedList, {
        title: date
      });
      array.push({
        createdAt: date,
        amount: found ? found.total : 0
      });
    }
    array.sort((a, b) => {
          if (a.createdAt > b.createdAt) {
            return 1;
          } else if (a.createdAt === b.createdAt) {
            return 0;
          } else {
            return -1;
          }
        }
    );
    return array;
  }

  get chartOptions() {
    const keys = this.keyValueList.map(item => item.createdAt);
    const values = this.keyValueList.map(item => item.amount);

    return {
      // 控制图标与包裹图标的div之间的间距
      grid: {
        left: 0,
        right: 0,
        bottom: 40,
      },
      xAxis: {
        type: 'category',
        data: keys,
        axisTick: {
          alignWithLabel: true
        },
        axisLine: {
          lineStyle: {
            color: '#af0a0a'  // 字体颜色
          }
        },
        axisLabel: {
          formatter: function (value: string) {
            return value.substr(5);
          }
        }
      },
      yAxis: {
        type: 'value',
        show: false
      },
      series: [{
        data: values,
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