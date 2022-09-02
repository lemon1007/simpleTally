<template>
  <div>
    <label class="input">
      <span class="name">{{ fileName }}</span>
      <input type="text"
             :value="value"
             @input="onValueChanged($event.target.value)"
             :placeholder="placeholder">
    </label>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

@Component
export default class MyInput extends Vue {
  @Prop({required: true}) fileName!: string;
  @Prop() placeholder?: string;
  @Prop({default: ''}) readonly value!: string;

  onValueChanged(value: string) {
    this.$emit('update:value', value);
  }
}
</script>

<style lang="scss" scoped>
.input {
  padding-left: 20px;
  display: flex;
  align-items: center;

  .name {
    padding-right: 14px;
    padding-left: 3px;
  }

  input {
    width: 200px;
    min-height: 7vh;
    border: none;
    padding-left: 10px;
    flex-grow: 1;
    background-color: transparent;
    padding-right: 10px;
  }
}
</style>