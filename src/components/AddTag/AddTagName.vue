<template>
  <div>
    <label class="tagName">
      <Icon name="tagName" class="icons"/>
      <span class="name">标签名称</span>
      <input type="text"
             :value="value"
             @input="onInput"
             placeholder="请输入标签名称">
    </label>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Public from '@/public';

@Component
export default class AddTagName extends Vue {
  // 添加标签名称
  value = '';

  onInput(event: KeyboardEvent) {
    const input = (event.target as HTMLInputElement);
    this.value = input.value;

    // 将用户输入信息传给NavBar页面
    Public.$emit('send-tag-name', this.value);
  }
}
</script>

<style lang="scss" scoped>
.tagName {
  font-size: 14px;
  padding-left: 20px;
  display: flex;
  align-items: center;
  border-bottom: 1px #eae5e5 solid;

  .name {
    padding-right: 14px;
    padding-left: 3px;
  }

  input {
    min-height: 8vh;
    border: none;
    padding-left: 10px;
    flex-grow: 1;
    background-color: transparent;
    padding-right: 16px;
  }
}
</style>