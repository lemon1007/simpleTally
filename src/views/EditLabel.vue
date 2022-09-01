<template>
  <Layout>
    <div class="editLabel">
      <div class="navBar">
        <Icon name="return" class="backIcon" @click="back"></Icon>
        <span>编辑标签</span>
      </div>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import tagListModel from '@/models/tagListModel';

@Component
export default class EditLabel extends Vue {
  created() {
    const id = this.$route.params.id;
    tagListModel.fetch();
    const tags = tagListModel.data;
    const tag = tags.filter(item => item.id === id)[0];
    if (tag) {
      console.log(tag);
    } else {
      this.$router.replace('/NotFound');
    }
  }

  back() {
    this.$router.back();
  }

}
</script>

<style lang="scss" scoped>
@import "@/assets/style/helper.scss";

.editLabel {
  min-height: 91vh;
  background-color: #f5f5f5;

  .navBar {
    background-color: $color-theme;
    line-height: 9vh;
    font-size: 18px;

    .backIcon {
      margin-left: 5%;
    }

    > span {
      margin-left: 30%;
    }
  }
}
</style>