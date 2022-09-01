<template>
  <div class="notes">
    <MyInput file-name="备注"
             placeholder="添加备注"></MyInput>
    <Icon class="timer" name="calendar"/>
    <!--      <input type="datetime-local" id="initTime">-->
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop, Watch} from 'vue-property-decorator';
import MyInput from '@/components/MyInput.vue';

@Component({
  components: {MyInput}
})
export default class Notes extends Vue {
}
</script>

<style lang="scss" scoped>
.notes {
  position: relative;
  background-color: #f5f5f5;
  font-size: 13px;

  .timer {
    position: absolute;
    width: 21px;
    height: 21px;
    top: 30%;
    left: 90%;
  }
}

</style>