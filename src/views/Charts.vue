<template>
  <Layout>
    <div class="Charts">
      <Tabs class-prefix="type"
            :data-source="typeList"
            @update:value="onUpdateType"
            :types="this.type"/>

      <ChartOne :options="x"></ChartOne>
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

  get x() {
    return {
      xAxis: {
        type: 'category',
        data: [
          '1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
          '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
          '21', '22', '23', '24', '25', '26', '27', '28', '29', '30',
        ]
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: [
          820, 932, 901, 934, 1290, 1330, 1320, 1242, 976, 1220,
          820, 932, 901, 934, 1290, 1330, 1320, 1242, 976, 1220,
          820, 932, 901, 934, 1290, 1330, 1320, 1242, 976, 1220,
        ],
        type: 'line'
      }],
      tooltip: {show: true}
    };
  }

  type: string = '-';
  typeList = typeList;

  created() {
    this.$store.commit('fetchRecords');
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
}

</style>