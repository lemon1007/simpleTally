<template>
  <Layout>
    <!--                    {{ recordList }}-->
    <Types :type="record.type"
           @update:value="onUpdateType"></Types>
    <Tags :tag-source.sync="tagList"
          @update:value="onUpdateTags"></Tags>
    <Notes @update:value="onUpdateNotes"></Notes>
    <NumberPad :amount="record.amount"
               @update:value="onUpdateAmount"
               @submit="saveRecord"></NumberPad>

  </Layout>
</template>


<script lang="ts">
import Layout from '@/components/Layout.vue';
import Tags from '@/components/Money/Tags.vue';
import Notes from '@/components/Money/Notes.vue';
import Types from '@/components/Money/Types.vue';
import NumberPad from '@/components/Money/NumberPad.vue';
import {Component, Watch} from 'vue-property-decorator';
import Vue from 'vue';
import Public from '@/public';
import createId from '@/lib/createId';
import store from '@/store';


@Component({
  components: {Layout, Tags, Notes, Types, NumberPad},
})
export default class Money extends Vue {
  // 对象初始化
  record: RecordItem = {
    tag: [],
    notes: '',
    type: '-',
    amount: 0
  };

  get recordList() {
    return this.$store.state.recordList;
  }

  get tagList() {
    return this.$store.state.tagList;
  }

  created() {
    this.$store.commit('fetchRecords');
    this.$store.commit('fetchTags');
  }

  // 储存用户输入的record信息
  saveRecord() {
    this.$store.commit('createRecord', this.record);
  }

  // 获取用户选择的标签
  onUpdateTags(value: { id: string, name: string, icon: string }[]) {
    this.record.tag = value;
  }

  // 获取用户输入备注信息
  onUpdateNotes(value: string) {
    this.record.notes = value;
  }

  // 获取支出收入选项信息
  onUpdateType(value: string) {
    this.record.type = value;     // '+'为收入，'-'为支出
  }

  // 获取计算器数据
  onUpdateAmount(value: string) {
    this.record.amount = parseFloat(value);
  }
};
</script>

<style lang="scss" scoped>
</style>