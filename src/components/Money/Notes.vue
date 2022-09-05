<template>
  <div class="notes">
    <MyInput class="input"
             file-name="备注"
             placeholder="添加备注"
             @update:value="getNotes"/>
    <!--    <Icon class="timer" name="calendar"/>-->
<!--    <input type="datetime-local" class="createdAt">-->
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import MyInput from '@/components/MyInput.vue';

@Component({
  components: {MyInput}
})
export default class Notes extends Vue {
  value: string = '';
  // createdAt = new Date().toISOString();

  getNotes(notes: string) {
    this.value = notes;
    this.$emit('update:value', this.value);
  }
}
</script>

<style lang="scss" scoped>
.notes {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f5f5f5;
  font-size: 13px;
}

</style>