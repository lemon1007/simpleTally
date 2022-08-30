<template>
  <Layout>
    <Types></Types>
    <Tags :tag-source="tags"></Tags>
    <Notes></Notes>
    <NumberPad></NumberPad>
  </Layout>
</template>


<script lang="ts">
import Layout from '@/components/Layout.vue';
import Tags from '@/components/Money/Tags.vue';
import Notes from '@/components/Money/Notes.vue';
import Types from '@/components/Money/Types.vue';
import NumberPad from '@/components/Money/NumberPad.vue';
import {Component} from 'vue-property-decorator';
import Vue from 'vue';
import Public from '@/public';

@Component({
  components: {Layout, Tags, Notes, Types, NumberPad}
})
export default class Money extends Vue {
  // newMsg = '';
  tags = [
    {name: '购物消费', icon: 'clothes'},
    {name: '食品餐饮', icon: 'foods'},
    {name: '居家生活', icon: 'houses'},
    {name: '出行交通', icon: 'traffic'},
  ];

  created() {
    // const newMsg = this.$route.query.newMsg;
    // this.newMsg = newMsg;
    // this.tags = [...this.tags,{name: this.newMsg[0], icon: this.newMsg[1]}];
    Public.$on('xxx', (val: string) => {
      this.tags = [...this.tags, {name: val[0], icon: val[1]}];
      console.log(this.tags);
    });
  }
};
</script>

<style lang="scss" scoped>
</style>