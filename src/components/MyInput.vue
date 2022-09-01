<template>
  <div>
    <label class="input">
      <span class="name">{{ fileName }}</span>
      <input type="text"
             @input="onValueChanged"
             v-model="value"
             :placeholder="this.placeholder">
    </label>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop, Watch} from 'vue-property-decorator';

@Component
export default class MyInput extends Vue {
  @Prop({required: true}) fileName!: string;
  @Prop() placeholder?: string;
  value = '';

  @Watch('value')
  onValueChanged(value: string) {
    this.$emit('update:value', this.value);
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