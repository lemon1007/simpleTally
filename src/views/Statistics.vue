<template>
  <Layout>
    <div class="StatisticsContent">

      <Tabs class-prefix="type"
            :data-source="typeList"
            @update:value="onUpdateType"
            :types="this.type"/>
      <div class="recordList">
        <ol class="groupList">
          <li class="groupLi" v-for="(group,index) in groupedList" :key="index">
            <ol class="groupLiSpan">
              <li class="groupTitle">
                <span>{{ beautify(group.title) }}</span>
              </li>
              <li class="totalAmount">
                <span>
                  总额:{{ group.total }}
                </span>
              </li>
            </ol>
            <ol class="itemList">
              <li class="itemLi" v-for="item in group.items" :key="item.id">
                <ol class="msgList">
                  <li class="icon">
                    <span>
                      <Icon name="clothes" class="icons"/>
                    </span>
                  </li>
                  <li class="nameAndMsg">
                    <span class="ItemName">{{ tagString(item.tag) }}</span>
                    <span class="notes">{{ item.notes }}</span>
                  </li>
                  <li class="totalAmount">
                    <span>
                      {{ item.type }}
                      {{ item.amount }}
                    </span>
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
import dayjs from 'dayjs';
import clone from '@/lib/clone';

@Component({
  components: {Tabs, Layout},
})
export default class Statistics extends Vue {
  get recordList() {
    return this.$store.state.recordList;
  }

  type: string = '-';
  typeList = typeList;

  tagString(tags: tag[]) {
    if (tags) {
      return tags.length === 0 ? '无' : tags[0].name;
    }
  }

  tagIcon(tags: tag[]) {
    if (tags) {
      return tags.length === 0 ? 'icon' : tags[0].icon;
    }
  }

  beautify(string: string) {
    const day = dayjs(string);
    const now = dayjs();
    if (day.isSame(now, 'day')) {
      return '今天';
    } else if (day.isSame(now.subtract(1, 'day'), 'day')) {
      return '昨天';
    } else if (day.isSame(now.subtract(2, 'day'), 'day')) {
      return '前天';
    } else if (day.isSame(now, 'year')) {
      return day.format('M月D日');
    } else {
      return day.format('YYYY年M月D日');
    }
  }

  get groupedList() {
    const recordList = this.recordList;
    if (recordList.length === 0) {return []; }
    const newList = clone(recordList)
        .filter((r: any) => r.type === this.type)
        .sort((a: any, b: any) => dayjs(b.createAt).valueOf() - dayjs(a.createAt).valueOf());

    type Result = { title: string, total?: number, items: RecordItem[] }[]
    const result: Result = [{title: dayjs(newList[0].createAt).format('YYYY-MM-DD'), items: [newList[0]]}];
    for (let i = 1; i < newList.length; i++) {
      const current = newList[i];
      const last = result[result.length - 1];
      if (dayjs(last.title).isSame(dayjs(current.createAt), 'day')) {
        last.items.push(current);
      } else {
        result.push({title: dayjs(current.createAt).format('YYYY-MM-DD'), items: [current]});
      }
    }

    result.forEach(group => {
      group.total = group.items.reduce((sum, item) => sum + item.amount, 0);
    });

    return result;
  }

  created() {
    this.$store.commit('fetchRecords');
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
  }


  .recordList {
    height: 82vh;
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
                    left: 0;
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