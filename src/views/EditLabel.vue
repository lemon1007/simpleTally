<template>
  <Layout>
    <div class="editLabel">
      <div class="navBar">
        <Icon name="return" class="backIcon" @click="back"></Icon>
        <span>编辑标签</span>
      </div>

      <label class="notes">
        <span class="name">标签名称</span>
        <input type="text"
               v-model="value"
               placeholder="请输入修改内容">
      </label>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop, Watch} from 'vue-property-decorator';
import tagListModel from '@/models/tagListModel';

@Component
export default class EditLabel extends Vue {
  created() {
    const id = this.$route.params.id;
    tagListModel.fetch();
    const tags = tagListModel.data;
    const tag = tags.filter(item => item.id === id)[0];
    if (tag) {

    } else {
      this.$router.replace('/NotFound');
    }
  }

  back() {
    this.$router.back();
  }

  value = '';

  @Watch('value')
  onValueChanged(value: string) {
    this.$emit('update:value', this.value);
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

.notes {
  background-color: #f5f5f5;
  font-size: 13px;
  padding-left: 20px;
  display: flex;
  align-items: center;

  .name {
    padding-right: 14px;
    padding-left: 3px;
  }

  input {
    width: 100px;
    min-height: 7vh;
    border: none;
    padding-left: 10px;
    flex-grow: 1;
    background-color: transparent;
    padding-right: 10px;
  }
}
</style>