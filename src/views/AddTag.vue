<template>
  <div>
    <NavBar @send-new-tag="getNewMsg"></NavBar>
    <AddTagName></AddTagName>
    <TagList></TagList>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import NavBar from '@/components/AddTag/NavBar.vue';
import AddTagName from '@/components/AddTag/AddTagName.vue';
import TagList from '@/components/AddTag/TagList.vue';
import Public from '@/public';

@Component({
  components: {NavBar, AddTagName, TagList}
})
export default class addTags extends Vue {
  msgFromNavBar = '';

  // 接收新增分类名称
  getNewMsg(val: string) {
    this.msgFromNavBar = val;


    // 将值传给Money组件
    // this.$router.push({
    //   path: '/',
    //   query: {newMsg: deepCloneMsg}
    // });
    this.$router.replace('/')
    Public.$emit('xxx', this.msgFromNavBar);
  }
}
</script>

<style lang="scss" scoped>

</style>