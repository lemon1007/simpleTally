<template>
  <div>
    <ul class="nav">
      <li>
        <Icon class="icons" name="return" @click.native="back"/>
      </li>
      <li class="addTitle">新增分类</li>
      <li @click="createTag">
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
import store from '@/store/index';

@Component({
  components: {AddTagName, TagList},
  computed: {
    tagList() {
      return this.$store.state.tagList;
    }
  }
})
export default class addTags extends Vue {
  //定义变量
  name: string = '';
  icon: string = '';

  create() {
    this.$store.commit('fetchTags');
  }

  // 接收新增分类名称
  getTagName(name: string) {
    this.name = name;
  }

  getTagIcon(icon: string) {
    this.icon = icon;
  }

  // 添加标签
  createTag() {
    const name = this.name;
    const icon = this.icon;
    if (name && icon) {
      this.$store.commit('createTag', {name, icon});
    }
    this.$router.replace('/');
  }

  back() {
    this.$router.go(-1);
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