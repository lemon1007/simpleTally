<template>
  <Layout>
    <div class="StatisticsContent">

      <Tabs class-prefix="type"
            :data-source="typeList"
            @update:value="onUpdateType"
            :types="this.type"/>

      <Tabs class-prefix="interval"
            :data-source="intervalList"
            @update:value="onUpdateInterval"
            :types="this.interval"/>
      <div class="recordList">
        <ol class="groupList">
          <li class="groupLi" v-for="(group,index) in result" :key="index">
            <ol class="groupLiSpan">
              <li class="groupTitle">
                <span>{{ group.title }}</span>
              </li>
              <li class="totalAmount">
                <span>总金额</span>
              </li>
            </ol>
            <ol class="itemList">
              <li class="itemLi" v-for="item in group.items" :key="item.id">
                <ol class="msgList">
                  <li class="icon">icon</li>
                  <li class="nameAndMsg">
                    <span class="ItemName">name</span>
                    <span class="notes">{{ item.notes }}</span>
                  </li>
                  <li class="totalAmount">
                    <span>{{ item.type }}{{ item.amount }}</span>
                  </li>
                </ol>
              </li>
            </ol>
          </li>
        </ol>
      </div>
    </div>
  </Layout>
</template>

<script lang="ts">
import Layout from '@/components/Layout.vue';
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Tabs from '@/components/Tabs.vue';
import intervalList from '@/constants/intervalList';
import typeList from '@/constants/typeList';

@Component({
  components: {Tabs, Layout},
})
export default class Statistics extends Vue {
  get recordList() {
    return this.$store.state.recordList;
  }

  interval: string = 'day';
  type: string = '-';
  intervalList = intervalList;
  typeList = typeList;

  // tagString(tags: tag[]) {
  //   return tags.length === 0 ? '无' : tags.join(',');
  // }

  get result() {
    const recordList = this.recordList;
    type HashTableValue = { title: string, items: RecordItem[] }
    const hashTable: { [key: string]: HashTableValue } = {};
    for (let i = 0; i < recordList.length; i++) {
      const [date, time] = recordList[i].createAt.split('T');
      hashTable[date] = hashTable[date] || {title: date, items: []};
      hashTable[date].items.push(recordList[i]);
    }
    console.log(hashTable);
    return hashTable;
  }

  created() {
    this.$store.commit('fetchRecords');
  }


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

  ::v-deep {
    .type-tabs-item {
      background-color: white;
      border: none;

      &.selected {
        background-color: $color-theme;

        &::after {
          display: none;
        }
      }
    }

    .interval-tabs-item {
      height: 7vh;
    }
  }


  .recordList {
    height: 75vh;
    overflow: scroll;
    padding-bottom: 15px;
    background-color: #f5f5f5;

    .groupList {
      .groupLi {
        background-color: #f5f5f5;
        margin-left: 7%;
        padding-top: 15px;
        line-height: 40px;

        .groupLiSpan {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          font-weight: bold;
          flex-wrap: wrap;

          .groupTitle {
            padding-left: 1%;
          }

          .totalAmount {
            padding-right: 8%;
          }
        }


        .itemList {
          background-color: white;
          width: 93%;
          border-radius: 5px;

          .itemLi {
            line-height: 7vh;

            .msgList {
              display: flex;
              flex-direction: row;
              justify-content: space-between;

              > li {
                padding: 0 20px;
                height: 9vh;
                border-bottom: 1px solid #f5f5f5;

                &.icon {
                  width: 20%;
                  text-align: center;
                }

                &.nameAndMsg {
                  width: 50%;
                  text-align: left;
                  position: relative;

                  .ItemName {
                    position: absolute;
                    top: -5px;
                    left: 0;
                    width: 89%;
                    overflow: hidden;
                    text-overflow: ellipsis;
                  }

                  .notes {
                    position: absolute;
                    font-size: 13px;
                    color: darkgrey;
                    top: 14px;
                    left:0;
                    width: 89%;
                    overflow: hidden;
                    text-overflow: ellipsis;
                  }
                }

                &.totalAmount {
                  width: 30%;
                  text-align: right;
                  position: relative;

                  > span {
                    position: absolute;
                    top: -5px;
                    left: -10%;
                    width: 90%;
                    text-align: right;
                    font-size: 14px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  .recordList::-webkit-scrollbar {
    display: none;
  }
}
</style>