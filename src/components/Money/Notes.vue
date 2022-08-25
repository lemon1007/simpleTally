<template>
  <div>
    <label class="notes">
      <Icon name="notes" class="icons"/>
      <span class="name">备注</span>
      <input type="text" placeholder="添加备注">
    </label>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Notes'
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
    height: 7vh;
    border: none;
    padding-left: 10px;
    flex-grow: 1;
    background-color: transparent;
    padding-right: 16px;
  }
}
</style>