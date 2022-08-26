<template>
  <div>
    <label class="notes">
      <Icon name="notes" class="icons"/>
      <span class="name">备注</span>
<!--:value="value" @input="$event.target.value"可以简写为v-model="value"-->
<!--这样写时，在下面script中只需要再定义value初始值即value = ""即可-->
      <input type="text"
             :value="value"
             @input="onInput"
             placeholder="添加备注">
    </label>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component
export default class Notes extends Vue {
  value = '';

  onInput(event: KeyboardEvent) {
    const input = (event.target as HTMLInputElement);
    this.value = input.value;
  }
};
</script>

<style lang="scss" scoped>
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
    min-height: 7vh;
    border: none;
    padding-left: 10px;
    flex-grow: 1;
    background-color: transparent;
    padding-right: 16px;
  }
}
</style>