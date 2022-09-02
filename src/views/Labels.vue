<template>
  <Layout>
    <div class="navBar">
      <span>标签管理</span>
    </div>
    <div class="tags">
      <router-link :to="`/labels/edit/${tag.id}`" v-for="tag in tagList" :key="tag.id" class="tagLi">
        <Icon :name="tag.icon" class="icon"></Icon>
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
import Icon from '@/components/Icon.vue';
import MyBtn from '@/components/MyBtn.vue';

@Component({
  components: {MyBtn, Layout, Icon},
})
export default class Labels extends Vue {

  get tagList() {
    return this.$store.state.tagList;
  }

  created() {
    this.$store.commit('fetchTags');
  }

  // 新建标签
  createTag() {
    this.$router.replace('/add-tag');
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

    .icon {
      width: 22px;
      height: 22px;
    }

    > span {
      font-size: 15px;
      color: #000;
      margin-left: -63%;
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