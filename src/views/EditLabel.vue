<template>
  <Layout>
    <div class="editLabel">
      <div class="navBar">
        <span>编辑标签</span>
      </div>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component
export default class EditLabel extends Vue {}
</script>

<style lang="scss" scoped>
@import "@/assets/style/helper.scss";

.editLabel {
  min-height: 91vh;
  background-color: #f5f5f5;

  .navBar {
    background-color: $color-theme;
    text-align: center;
    line-height: 9vh;
    font-size: 18px;
  }
}
</style>