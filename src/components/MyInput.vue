<template>
  <div>
    <label class="input">
      <span class="name">{{ fileName }}</span>
      <template v-if="type==='date'">
        <input :type="type||'text'"
               :value="x(value)"
               @input="onValueChanged($event.target.value)"
               :placeholder="placeholder">
      </template>
      <template v-else>
        <input :type="type||'text'"
               :value="value"
               @input="onValueChanged($event.target.value)"
               :placeholder="placeholder">
      </template>
    </label>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';
import dayjs from 'dayjs';

@Component
export default class MyInput extends Vue {
  @Prop({required: true}) fileName!: string;
  @Prop() placeholder?: string;
  @Prop({default: ''}) readonly value!: string;
  @Prop() type?: string;

  x(isoString: string) {
    return dayjs(isoString).format('YYYY-MM-DD');
  }

  onValueChanged(value: string) {
    this.$emit('update:value', value);
  }
}
</script>

<style lang="scss" scoped>
.input {
  padding-left: 15px;
  display: flex;
  align-items: center;

  .name {
    padding-right: 3px;
    padding-left: 3px;
  }

  input {
    min-height: 7vh;
    padding-left: 10px;
    flex-grow: 1;
    background-color: transparent;
    padding-right: 10px;
    border: none;
  }
}
</style>