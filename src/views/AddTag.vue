<template>
  <div>
    <ul class="nav">
      <li>
        <Icon class="icons" name="return" @click.native="back"/>
      </li>
      <li class="addTitle">新增分类</li>
      <li @click="onSubmit">
        <Icon class="icons" name="ensure"/>
      </li>
    </ul>
    <AddTagName @send-tag-name="getTagName"></AddTagName>
    <TagList @send-tag-icon="getTagIcon"></TagList>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import AddTagName from '@/components/AddTag/AddTagName.vue';
import TagList from '@/components/AddTag/TagList.vue';
import Public from '@/public';
import tagListModel from '@/models/tagListModel';

@Component({
  components: {AddTagName, TagList}
})
export default class addTags extends Vue {

  tags = tagListModel.data;

  //定义变量
  name: string = '';
  icon: string = '';

  // 接收新增分类名称
  getTagName(name: string) {
    this.name = name;
  }

  getTagIcon(icon: string) {
    this.icon = icon;
  }

  onSubmit() {
    // 将值传给Money组件
    alert('添加成功');
    this.$router.replace('/');
    Public.$emit('send-new-tag', [this.name, this.icon[0]]);
  }


  back() {
    this.$router.replace('/');
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/style/helper.scss";

.nav {
  width: 100%;
  min-height: 9vh;
  background-color: $color-theme;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  padding: 0 15px;
  line-height: 8vh;

  > li {
    &.addTitle {
      font-size: 18px;
    }

    .icons {
      width: 22px;
      height: 22px;
    }
  }
}
</style>