<template>
  <Layout>
    <div class="editLabel">
      <ul class="navBar">
        <li>
          <Icon name="return" class="icons" @click.native="back"/>
        </li>
        <li>
          <span>编辑标签</span>
        </li>
        <li>
          <Icon name="del" class="del icons" @click.native="remove"/>
          <Icon name="ensure" class="ensure icons" @click.native="update"/>
        </li>
      </ul>

      <MyInput file-name="标签名"
               :placeholder="tag.name"
               @update:value="update"
               class="input"/>

      <TagList class="tagList"></TagList>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
import tagListModel from '@/models/tagListModel';
import MyBtn from '@/components/MyBtn.vue';
import MyInput from '@/components/MyInput.vue';
import TagList from '@/components/AddTag/TagList.vue';

@Component({
  components: {TagList, MyInput, MyBtn}
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

  // 返回上一页
  back() {
    this.$router.replace('/labels');
  }

  // 更新标签信息
  update(name: string) {
    if (this.tag) {
      tagListModel.update(this.tag.id, name);
    }
  }

  // 删除标签
  remove() {
    if (this.tag) {
      if (tagListModel.remove(this.tag.id)) {
        window.alert('删除成功');
        this.$router.go(-1);
      } else {
        window.alert('删除失败');
      }
    }
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
    min-height: 9vh;
    font-size: 18px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    > li {
      padding: 0 20px;

      .del {
        margin-right: 20px;
      }

      .icons {
        width: 21px;
        height: 21px;
      }

      > span {
        margin-left: 25px;
      }
    }
  }

  .input {
    font-size: 15px;
    padding-left: 20px;
    display: flex;
    align-items: center;
    margin-top: 20px;
    height: 7vh;
    background-color: white;
    border-bottom: 1px #f5f5f5 solid;

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

  .tagList {
    height: 72vh;
    overflow: scroll;
    background-color: white;
  }

  .tagList::-webkit-scrollbar {
    display: none;
  }
}
</style>