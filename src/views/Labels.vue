<template>
  <Layout>
    <ol class="tags">
      <li v-for="tag in  tags" :key="tag">
        <span>{{ tag }}</span>
        <Icon name="right"></Icon>
      </li>
      <!--      <li>-->
      <!--        <span>食品餐饮</span>-->
      <!--        <Icon name="right"></Icon>-->
      <!--      </li>-->
      <!--      <li>-->
      <!--        <span>居家生活</span>-->
      <!--        <Icon name="right"></Icon>-->
      <!--      </li>-->
      <!--      <li>-->
      <!--        <span>出行交通</span>-->
      <!--        <Icon name="right"></Icon>-->
      <!--      </li>-->
      <!--      <li>-->
      <!--        <span>虚拟充值</span>-->
      <!--        <Icon name="right"></Icon>-->
      <!--      </li>-->
      <!--      <li>-->
      <!--        <span>休闲娱乐</span>-->
      <!--        <Icon name="right"></Icon>-->
      <!--      </li>-->
    </ol>
    <div class="createTag-wrapper">
      <button @click="createTag">新建标签</button>
    </div>
  </Layout>
</template>

<script lang="ts">
import Layout from '@/components/Layout.vue';
import {Component} from 'vue-property-decorator';
import Vue from 'vue';
import tagListModel from '@/models/tagListModel';

tagListModel.fetch();
@Component({
  components: {Layout}
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

.tags {
  height: 60vh;
  background-color: #f5f5f5;

  > li {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    min-height: 10vh;
    border-bottom: 1px solid #e6e6e6;
    padding: 0 27px;
    background-color: white;

    > span {
      font-size: 15px;
      color: #000;
    }

    svg {
      color: #666;
    }
  }
}

//隐藏滚动条
.tags::-webkit-scrollbar {
  display: none;
}

.createTag-wrapper {
  min-height: 31vh;
  background-color: #f5f5f5;

  > button {
    margin-left: 50%;
    transform: translateX(-50%);
    margin-top: 20%;
    width: 100px;
    height: 50px;
    border: none;
    background-color: $color-theme;
    border-radius: 7px;
  }
}
</style>