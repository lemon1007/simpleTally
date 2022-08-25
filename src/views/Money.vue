<template>
  <Layout>
    <Types></Types>
    <Tags></Tags>
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

export default {
  name: 'Money',
  components: {Layout, Tags, Notes, Types, NumberPad}
};
</script>

<style lang="scss" scoped>
</style>