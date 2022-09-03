<template>
  <Layout>
    <div class="Charts">
      <Tabs class-prefix="type"
            :data-source="typeList"
            @update:value="onUpdateType"
            :types="this.type"/>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Tabs from '@/components/Tabs.vue';
import typeList from '@/constants/typeList';

@Component({
  components: {Tabs}
})
export default class Charts extends Vue {
  get recordList() {
    return this.$store.state.recordList;
  }

  type: string = '-';
  typeList = typeList;

  created() {
    this.$store.commit('fetchRecords');
  }

  onUpdateType(value: string) {
    this.type = value;
  }
}
</script>

<style lang="scss" scoped>
.Charts {
  min-height: 91vh;
  background-color: #f5f5f5;
}

</style>