<template>
  <div>
    <label class="notes">
      <Icon name="notes" class="icons"/>
      <span class="name">{{ fileName }}</span>
      <input type="text"
             v-model="value"
             :placeholder="this.placeholder">
      <Icon class="timer" name="calendar"/>
      <!--      <input type="datetime-local" id="initTime">-->
    </label>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop, Watch} from 'vue-property-decorator';

@Component
export default class Notes extends Vue {
  @Prop({required: true}) fileName!: string;
  @Prop() placeholder?: string;
  value = '';

  // notes 发生变化时触发
  @Watch('value')
  onValueChanged(value: string) {
    this.$emit('update:value', this.value);
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