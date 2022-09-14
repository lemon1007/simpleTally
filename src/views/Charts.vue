<template>
  <Layout>
    <div class="Charts">
      <Tabs class-prefix="type"
            :data-source="typeList"
            @update:value="onUpdateType"
            :types="this.type"/>

      <ul class="chartsList">
        <li>
          <span>近30日收支走势</span>
          <div class="chartLine-wrapper" ref="chartLineWrapper">
            <Chart class="chartLine" :options="chartLineOptions"></Chart>
          </div>
        </li>

        <li>
          <span>近30日收支统计</span>
          <div class="chartHistogram-wrapper" ref="chartHistogramWrapper">
            <Chart class="chartHistogram" :options="chartHistogramOptions"></Chart>
          </div>
        </li>
        <li>
          <span>近30日收支占比</span>
          <div class="chartSector-wrapper" ref="chartSectorWrapper">
            <Chart class="chartSector" :options="chartSectorOptions"></Chart>
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
import Chart from '@/components/Chart.vue';

@Component({
  components: {Chart, Tabs},
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

  get chartLineOptions() {
    const keys = this.keyValueList.map(item => item.createdAt);
    const values = this.keyValueList.map(item => item.amount);
    return {
      // 控制图标与包裹图标的div之间的间距
      grid: {
        left: 0,
        right: 0,
        bottom: 50,
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
        areaStyle: {
          color: {              // 颜色过渡
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: '#ffe600'
            }, {
              offset: 1, color: '#ffffff'
            }],
            global: false
          }
        },

        symbolSize: 8, // 圆的大小
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
        bottom: 50,
        top: 70,
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
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'none'
        }
      },
      series: [
        {
          data: values,
          type: 'bar',
          itemStyle: {
            normal: {
              color: '#ffe600',
              label: {
                show: true,
                position: 'top',
                textStyle: {
                  color: 'black',
                  fontSize: 12
                }
              }
            }
          },
        },
      ],
    };
  }

  get chartSectorOptions() {
    const today = new Date();
    const tempArr: any[] = [];
    for (let i = 0; i <= 29; i++) {
      const date = dayjs(today)
          .subtract(i, 'day')
          .format('YYYY-MM-DD');
      const found = _.find(this.groupedList, {title: date});
      if (found) {
        for (let j = 0; j <= found.items.length; j++) {
          if (found.items[j]) {
            tempArr.push({
              name: found.items[j].tag[0].name,
              value: found.items[j].amount
            });
          }
        }
      }
    }
    // key相同时，value相加
    let targetArr: any[] = [];
    let keysArr = [...new Set(tempArr.map(item => item.name))];
    keysArr.forEach(item => {
      const arr = tempArr.filter(keys => keys.name == item);
      const sum = arr.reduce((a, b) => a + b.value, 0);
      targetArr.push({
        name: item,
        value: sum
      });
    });


    return {
      tooltip: {
        trigger: 'item',
      },
      series: [
        {
          type: 'pie',
          radius: '50%',
          colorBy: 'series',   // series按系列配色，data按数据配色
          data: targetArr,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: '#333',
            }
          },
          itemStyle: {
            normal: {
              color: function (colors: any) {
                const colorList = ['#fae100', '#ffcd00', '#ffbe4d', '#f9ae08', '#f1a308', '#dbb76b'];
                return colorList[colors.dataIndex];
              }
            }
          },
          center: ['50%', '53%'],
        },
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
      position: relative;

      > span {
        font-size: 15px;
        top: 13px;
        left: 18px;
        position: absolute;
        font-weight: 800;
      }

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