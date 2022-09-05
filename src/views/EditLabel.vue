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
          <Icon name="ensure" class="ensure icons" @click.native="updatePrompt"/>
        </li>
      </ul>

      <MyInput file-name="标签名"
               placeholder="请输入标签名"
               :value="tag.name"
               @update:value="update"
               class="input"/>

      <TagList class="tagList" @send-tag-icon="updateIcon"></TagList>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
import MyBtn from '@/components/MyBtn.vue';
import MyInput from '@/components/MyInput.vue';
import TagList from '@/components/AddTag/TagList.vue';
import Icon from '@/components/Icon.vue';

@Component({
  components: {TagList, MyInput, MyBtn, Icon},
})
export default class EditLabel extends Vue {
  @Prop({default: ''}) readonly value!: string;
  @Prop() icon!: string;

  get tag() {
    return this.$store.state.currentTag;
  }

  created() {
    const id = this.$route.params.id;
    this.$store.commit('fetchTags');
    this.$store.commit('setCurrentTag', id);
    if (!this.tag) {
      this.$router.replace('/NotFound');
    }
  }

  // 获取用户选择更换的icon
  updateIcon(icon: string) {
    if (this.tag) {
      this.tag.icon = icon;
    }
  }

  // 更新标签信息
  // 监听事件存在问题，只有input产生变化时才会触发update，只修改icon无法触发update
  update(name: string) {
    // console.log(this.tag);
    if (this.tag) {
      this.$store.commit('updateTag', {id: this.tag.id, name, icon: this.tag.icon});
    }
  }

  // 显示提示并跳转
  updatePrompt() {
    alert('修改成功');
    this.$router.replace('/labels');
  }

  // 删除标签
  remove() {
    if (this.tag) {
      this.$store.commit('removeTag', this.tag.id);
    }
  }

  // 返回上一页
  back() {
    this.$router.replace('/labels');
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
    border-bottom: 3px #f5f5f5 solid;

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

    &::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>