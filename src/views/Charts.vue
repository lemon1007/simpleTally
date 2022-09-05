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
          <div class="chartLine-wrapper" ref="chartLineWrapper">
            <ChartLine class="chartLine" :options="chartLineOptions"></ChartLine>
          </div>
        </li>

        <li>
          <span>柱形图</span>
          <div class="chartHistogram-wrapper" ref="chartHistogramWrapper">
            <ChartHistogram class="chartHistogram" :options="chartHistogramOptions"></ChartHistogram>
          </div>
        </li>
        <li>
          <span>扇形图</span>
          <div class="chartSector-wrapper" ref="chartSectorWrapper">
            <ChartSector class="chartSector" :options="chartSectorOptions"></ChartSector>
          </div>
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
import _ from 'lodash';
import dayjs from 'dayjs';
import clone from '@/lib/clone';
import ChartLine from '@/components/Charts/ChartLine.vue';
import ChartHistogram from '@/components/Charts/ChartHistogram.vue';
import ChartSector from '@/components/Charts/ChartSector.vue';

@Component({
  components: {ChartSector, ChartHistogram, ChartLine, Tabs},
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
    const divLine = (this.$refs.chartLineWrapper as HTMLDivElement);
    divLine.scrollLeft = divLine.scrollWidth;

    const divHistogram = (this.$refs.chartHistogramWrapper as HTMLDivElement);
    divHistogram.scrollLeft = divLine.scrollWidth;
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

      const found = _.find(this.groupedList, {title: date});
      array.push({
        createdAt: date,
        amount: found ? found.total : 0,
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


  get NameValueList() {
    const today = new Date();
    const array = [];
    for (let i = 0; i <= 6; i++) {
      const date = dayjs(today)
          .subtract(i, 'day')
          .format('YYYY-MM-DD');

      const found = _.find(this.groupedList, {title: date});
      if (found && found.items[0].amount && found.items[0].tag[0]) {
        array.push({
          amount: found.items[0].amount,
          name: found.items[0].tag[0].name
        });
      }
    }
    return array;
  }

  get chartLineOptions() {
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
            color: 'black'  // 字体颜色
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
          color: '#ffe600'  // 圆点颜色时
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

  get chartHistogramOptions() {
    const keys = this.keyValueList.map(item => item.createdAt);
    const values = this.keyValueList.map(item => item.amount);
    return {
      grid: {
        left: 20,
        right: 0,
        bottom: 40,
        top: 20
      },
      xAxis: {
        type: 'category',
        data: keys,
        axisTick: {
          alignWithLabel: true
        },
        axisLabel: {
          formatter: function (value: string) {
            return value.substr(5);
          },
          textStyle: {
            color: 'black'
          }
        }
      },
      yAxis: {
        type: 'value',
        show: false
      },
      series: [
        {
          data: values,
          type: 'bar',
          itemStyle: {
            color: '#ffe600'
          },
        },
      ],
    };
  }

  get chartSectorOptions() {
    const keys = this.NameValueList.map(item => item.name);
    const values = this.NameValueList.map(item => item.amount);
    return {
      title: {
        text: '近7日各项占比',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      series: [
        {
          type: 'pie',
          radius: '50%',
          data: [
            {value: values[0], name: keys[0]},
            {value: values[1], name: keys[1]},
            {value: values[2], name: keys[2]},
            {value: values[3], name: keys[3]},
            {value: values[4], name: keys[4]},
            {value: values[5], name: keys[5]},
            {value: values[6], name: keys[6]},
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: '#333'
            }
          }
        }
      ]
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
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    height: 82vh;
    overflow: scroll;
    padding-bottom: 30px;

    &::-webkit-scrollbar {
      display: none;
    }

    > li {
      width: 90%;
      background-color: white;
      margin-top: 30px;
      border-radius: 7px;

      .chartLine {
        width: 430%;

        &-wrapper {
          overflow: auto;

          &::-webkit-scrollbar {
            display: none;
          }
        }
      }

      .chartHistogram {
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