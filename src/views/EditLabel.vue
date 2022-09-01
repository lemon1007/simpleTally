<template>
  <Layout>
    <div class="editLabel">
      <div class="navBar">
        <Icon name="return" class="backIcon" @click="back"></Icon>
        <span>编辑标签</span>
      </div>

      <label class="input">
        <span class="name">标签名</span>
        <input type="text"
               @input="onValueChanged"
               :value="tag.name"
               placeholder="请输入修改内容">
      </label>

      <div class="delBtnWrapper">
        <MyBtn class="delBtn">删除标签</MyBtn>
      </div>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop, Watch} from 'vue-property-decorator';
import tagListModel from '@/models/tagListModel';
import MyBtn from '@/components/MyBtn.vue';

@Component({
  components: {MyBtn}
})
export default class EditLabel extends Vue {
  @Prop({default: ''}) readonly value!: string;

  tag?: { id: string, name: string, icon: string } = undefined;

  created() {
    const id = this.$route.params.id;
    tagListModel.fetch();
    const tags = tagListModel.data;
    const tag = tags.filter(item => item.id === id)[0];
    if (tag) {
      this.tag = tag;
    } else {
      this.$router.replace('/NotFound');
    }
  }

  back() {
    this.$router.back();
  }

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
    position: relative;
    text-align: center;

    .backIcon {
      position: absolute;
      left: 5%;
      top: 50%;
      transform: translateY(-50%);
    }
  }

  .delBtnWrapper {
    display: flex;
    justify-content: center;

    .delBtn {
      margin-top: 40%;
    }
  }
}

.input {
  font-size: 14px;
  padding-left: 20px;
  display: flex;
  align-items: center;
  margin-top: 20px;
  background-color: white;

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