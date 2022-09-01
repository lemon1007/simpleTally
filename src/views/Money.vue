<template>
  <Layout>
    <Types :type="record.type"
           @update:value="onUpdateType"></Types>
    <Tags :tag-source.sync="tags"
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
import recordListModel from '@/models/recordListModel';
import tagListModel from '@/models/tagListModel';

const model = require('@/models/recordListModel').default;

const recordList = recordListModel.fetch();
const tagList = tagListModel.fetch();

@Component({
  components: {Layout, Tags, Notes, Types, NumberPad}
})
export default class Money extends Vue {
  // tags: {
  //   name: string
  //   icon: string
  // }[] = [
  //   {name: '购物消费', icon: 'clothes'},
  //   {name: '食品餐饮', icon: 'foods'},
  //   {name: '居家生活', icon: 'houses'},
  //   {name: '出行交通', icon: 'traffic'},
  //   {name: '虚拟充值', icon: 'game'},
  //   {name: '休闲娱乐', icon: 'dianying'},
  // ];
  tags = tagList;

  recordList: RecordItem[] = recordList;

  // 对象初始化
  record: RecordItem = {
    tags: [],
    notes: '',
    type: '-',
    amount: 0
  };

  // 获取用户选择的标签
  onUpdateTags(value: { name: string, icon: string }[]) {
    this.record.tags = value;
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

  // 储存用户输入record信息
  saveRecord() {
    const deepRecord = model.clone(this.record);
    deepRecord.createAt = new Date();
    this.recordList.push(deepRecord);
    console.log(this.recordList);
  }

  @Watch('recordList')
  onRecordChange() {
    model.save(this.recordList);
  }

  // 获取用户新增标签信息
  created() {
    // const msgFromAddTag = this.$route.query.newMsg as string;
    // this.tags = [...this.tags, {name: msgFromAddTag[0], icon: msgFromAddTag[1]}];
    Public.$on('send-new-tag', (val: string) => {
      this.tags.push({id: val[0], name: val[0], icon: val[1]});
      console.log(this.tags);
    });
  }
};
</script>

<style lang="scss" scoped>
</style>