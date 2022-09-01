<template>
  <div>
    <button @click="$emit('click',$event)">
      <slot/>
    </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component
export default class MyBtn extends Vue {}
</script>

<style lang="scss" scoped>
@import "@/assets/style/helper.scss";

.button {
  width: 100px;
  height: 50px;
  border: none;
  border-radius: 7px;
  background-color: $color-theme;
}
</style>