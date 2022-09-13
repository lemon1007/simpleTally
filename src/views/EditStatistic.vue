<template>
  <Layout>
    <div class="editStatistic">
      <ul class="navBar">
        <Icon name="return" @click.native="back" class="delIcon"/>
        <li>
          <span>编辑账单</span>
        </li>
      </ul>
      <ul class="statisticList">
        <li>
          <span>账单名称：</span>
          <span>
            <Icon class="nameIcon" :name="RecordItem.tag[0].icon"/>
            {{ RecordItem.tag[0].name }}
          </span>
        </li>
        <li>
          <span>账单类型：</span>
          <span>
            <Tabs class-prefix="editStatistic"
                  :data-source="typeList"
                  @update:value="onUpdateType"
                  :types="this.RecordItem.type"/>
          </span>
        </li>
        <li @click="onUpdateAccount">
          <span>账单金额：</span>
          <span>{{ RecordItem.amount }}</span>
        </li>
        <li>
          <span>账单日期：</span>
          <span>
            <MyInput type="date" :value="RecordItem.createdAt"
                     @update:value="onUpdateCreateAt"
                     class="editCreatedAt"/>
          </span>
        </li>
        <li class="noteLi" @click="onUpdateNote">
          <span class="noteLeft">备注：</span>
          <span class="noteRight">{{ RecordItem.notes }}</span>
        </li>
        <div class="buttons">
          <MyBtn class="myBtnChange" @click.native="updateRecord">修改账单</MyBtn>
          <MyBtn class="myBtnDel" @click.native="remove">删除账单</MyBtn>
        </div>
      </ul>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import router from '@/router';
import dayjs from 'dayjs';
import Tabs from '@/components/Tabs.vue';
import MyInput from '@/components/MyInput.vue';
import MyBtn from '@/components/MyBtn.vue';
import typeList from '@/constants/typeList';

@Component({
  components: {MyBtn, MyInput, Tabs}
})
export default class EditStatistic extends Vue {
  get RecordItem() {
    return this.$store.state.currentRecord;
  }

  typeList = typeList;

  onUpdateType(value: string) {
    this.RecordItem.type = value;
  }

  created() {
    const id = this.$route.params.id;
    this.$store.commit('fetchRecords');
    this.$store.commit('setCurrentRecord', id);
    if (!this.RecordItem) {
      this.$router.replace('/NotFound');
    }
  }

  onUpdateNote() {
    const newNote = window.prompt('备注', this.RecordItem.notes);
    if (newNote) {
      this.RecordItem.notes = newNote;
    } else {
      return;
    }
  }

  onUpdateAccount() {
    const newAccount = window.prompt('编辑金额', this.RecordItem.amount);
    if (newAccount) {
      this.RecordItem.amount = parseFloat(newAccount);
    } else {
      return;
    }
  }

  onUpdateCreateAt(value: string) {
    this.RecordItem.createdAt = value;
  }

  updateRecord() {
    this.$store.commit('saveRecord', this.RecordItem);
    window.alert('修改成功');
    router.replace('/statistics')
  }

  remove() {
    if (this.RecordItem) {
      this.$store.commit('removeRecord', this.RecordItem.id);
    }
  }

  back() {
    router.replace('/statistics');
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/style/helper.scss";

.editStatistic {
  min-height: 91vh;
  background-color: #f5f5f5;

  .navBar {
    background-color: $color-theme;
    min-height: 9vh;
    font-size: 18px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    position: relative;

    .delIcon {
      position: absolute;
      top: 50%;
      left: 20px;
      transform: translateY(-50%);
      width: 20px;
      height: 20px;
    }
  }

  .statisticList {
    width: 94%;
    height: 76vh;
    margin-left: 3%;
    background-color: #fff;
    margin-top: 20px;
    border-radius: 7px;
    overflow: scroll;

    &::-webkit-scrollbar {
      display: none;
    }

    > li {
      line-height: 52px;
      border-bottom: 1px darkgray dashed;
      padding-left: 10px;
      font-size: 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;


      > span {
        margin-right: 15px;
        .nameIcon{
          width: 18px;
          height: 18px;
        }

        .editCreatedAt {
          width: 145px;
          margin-right: -10px;
        }
      }

      ::v-deep {
        .editStatistic-tabs {
          background-color: white;
          font-size: 12px;
          width: 60px;
          height: 20px;
          display: flex;
          border: solid 1px #ffe600;
          border-radius: 5px;

          &-item {
            height: 20px;
            margin-top: -1px;

            &.selected {
              background-color: $color-theme;
              border-radius: 5px;
              color: white;

              &::after {
                display: none;
              }
            }
          }
        }
      }
    }

    .noteLi {
      display: flex;
      align-items: center;

      .noteLeft {
        width: 15%;
        font-size: 15px;
      }

      .noteRight {
        width: 85%;
        text-align: right;
        font-size: 13px;
        color: #969696;
        line-height: 20px;
      }
    }
  }

  .buttons {
    display: flex;
    margin-top: 40px;
    justify-content: center;
    align-items: center;
    margin-bottom: 40px;

    .myBtnChange {
      padding-right: 10px;
    }

    .myBtnDel {
      padding-left: 10px;
    }
  }

}
</style>