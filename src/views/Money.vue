<template>
  <Layout>
    <Types></Types>
    <Tags :tag-source="tags"></Tags>
    <Notes></Notes>
    <NumberPad></NumberPad>
  </Layout>
</template>

<script>
import Layout from '@/components/Layout.vue';
import Tags from '@/components/Money/Tags.vue';
import Notes from '@/components/Money/Notes.vue';
import Types from '@/components/Money/Types.vue';
import NumberPad from '@/components/Money/NumberPad.vue';

export default {
  name: 'Money',
  components: {Layout, Tags, Notes, Types, NumberPad},
  data() {
    return {
      tags: [
        {name: '购物消费', icon: 'clothes'},
        {name: '食品餐饮', icon: 'foods'},
        {name: '居家生活', icon: 'houses'},
        {name: '出行交通', icon: 'traffic'},
      ],
    };
  }
};
</script>

<style lang="scss" scoped>
</style>