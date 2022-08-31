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
      <!--      <Icon class="timer" name="calendar"/>-->
      <input type="datetime-local" id="initTime">
    </label>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Watch} from 'vue-property-decorator';

@Component
export default class Notes extends Vue {
  value = '';

  // notes 发生变化时触发
  @Watch('value')
  onValueChanged(value: string) {
    this.$emit('update:value', this.value);
  }

  onInput(event: KeyboardEvent) {
    const input = (event.target as HTMLInputElement);
    this.value = input.value;
  }

  // 初始化时间组件
  // format: string = '';
  //
  // getFormat() {
  //   const nTime = new Date();
  //   this.format += nTime.getFullYear() + '-';
  //   this.format += (nTime.getMonth() + 1) < 10 ? '0' + (nTime.getMonth() + 1) : (nTime.getMonth() + 1);
  //   this.format += '-';
  //   this.format += nTime.getDate() < 10 ? '0' + (nTime.getDate()) : (nTime.getDate());
  //   this.format += 'T';
  //   this.format += nTime.getHours() < 10 ? '0' + (nTime.getHours()) : (nTime.getHours());
  //   this.format += ':';
  //   this.format += nTime.getMinutes() < 10 ? '0' + (nTime.getMinutes()) : (nTime.getMinutes());
  //   this.format += ':00';
  // }
  //
  // created() {
  //   const initTime = document.getElementById('initTime')!;
  //   this.getFormat();
  //   initTime.value = this.format;
  // }


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
    width: 100px;
    min-height: 7vh;
    border: none;
    padding-left: 10px;
    flex-grow: 1;
    background-color: transparent;
    padding-right: 10px;
  }

  .timer {
    width: 21px;
    height: 21px;
    margin-right: 20px;
  }
}
</style>