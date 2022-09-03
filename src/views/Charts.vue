<template>
  <Layout>
    <div class="Charts">
      charts.vue
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component
export default class Charts extends Vue {}
</script>

<style lang="scss" scoped>
.Charts {
  min-height: 91vh;
  background-color: #f5f5f5;
}

</style>