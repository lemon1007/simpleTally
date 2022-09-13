<template>
  <div>
    <ul class="nav">
      <li>
        <Icon class="icons" name="return" @click.native="back"/>
      </li>
      <li class="addTitle">新增分类</li>
      <li>
        <Icon @click.native="createTag" class="icons" name="ensure"/>
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
import router from '@/router';

@Component({
  components: {AddTagName, TagList},
})
export default class addTags extends Vue {
  //定义变量
  name: string = '';
  icon: string = '';

  get tagList() {
    return this.$store.state.tagList;
  }

  created() {
    this.$store.commit('fetchTags');
  }

  // 接收新增分类名称
  getTagName(name: string) {
    this.name = name;
  }

  getTagIcon(icon: string) {
    this.icon = icon;
  }

  map: { [key: string]: string } = {
    'tag name duplicated': '标签已存在',
    'create tag success': '添加成功'
  };

  // 添加标签
  createTag() {
    const name = this.name;
    const icon = this.icon;
    if (!name) {
      window.alert('请输入标签名');
      return;
    }
    if (!icon) {
      window.alert('请选择标签');
      return;
    }
    if (name && icon) {
      this.$store.commit('createTag', {name, icon});
      if (this.$store.state.createTagError) {
        window.alert(this.map[this.$store.state.createTagError.message] || '未知错误');
        return;
      }
    }
  }

  back() {
    router.back();
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/style/helper.scss";

.nav {
  width: 100%;
  height: 9vh;
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

.content {
  height: 91vh;
}
</style>