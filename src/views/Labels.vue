<template>
  <Layout>
    <div class="navBar">
      <span>标签管理</span>
    </div>
    <div class="tags">
      <router-link :to="`/labels/edit/${tag.id}`" v-for="tag in  tags" :key="tag.id" class="tagLi">
        <span>{{ tag.name }}</span>
        <Icon name="right"></Icon>
      </router-link>
    </div>
    <div class="createTag-wrapper">
<!--      <MyBtn class="addBtn" @click.native="createTag">新建标签</MyBtn>-->
      <MyBtn class="addBtn" @click="createTag">新建标签</MyBtn>
    </div>
  </Layout>
</template>

<script lang="ts">
import Layout from '@/components/Layout.vue';
import {Component} from 'vue-property-decorator';
import Vue from 'vue';
import tagListModel from '@/models/tagListModel';
import MyBtn from '@/components/MyBtn.vue';

tagListModel.fetch();
@Component({
  components: {MyBtn, Layout}
})
export default class Labels extends Vue {
  tags = tagListModel.data;

  // 新建标签
  createTag() {
    const name = window.prompt('请输入标签名');
    if (name) {
      const message = tagListModel.create(name);
      if (message === 'duplicated') {
        alert('标签已存在');
      }
      tagListModel.create(name);
    }
  }
};
</script>

<style lang="scss" scoped>

@import "@/assets/style/helper.scss";

.navBar {
  background-color: $color-theme;
  text-align: center;
  line-height: 9vh;
  font-size: 18px;
}

.tags {
  height: 50vh;
  overflow: scroll;
  background-color: #f5f5f5;

  .tagLi {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    min-height: 8vh;
    border-bottom: 1px solid #e6e6e6;
    background-color: white;
    padding: 0 27px;

    > span {
      font-size: 15px;
      color: #000;
    }

    svg {
      color: #666;
    }
  }
}

.tags::-webkit-scrollbar {
  display: none;
}

.createTag-wrapper {
  min-height: 32vh;
  background-color: #f5f5f5;

  .addBtn {
    background-color: #f5f5f5;
    margin-left: 50%;
    transform: translateX(-25%);
    padding-top: 10%;
  }
}
</style>