<template>
  <div class="tags">
    <ul class="current">
      <li class="selected">
        <Icon name="clothes" class="icons"/>
        <span>购物消费</span>
      </li>
      <li>
        <Icon name="foods" class="icons"/>
        <span>食品餐饮</span>
      </li>
      <li>
        <Icon name="houses" class="icons"/>
        <span>居家生活</span>
      </li>
      <li>
        <Icon name="traffic" class="icons"/>
        <span>出行交通</span>
      </li>
      <li class="addBtn">
        <Icon name="add" class="icons"/>
        <span>新增标签</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">

export default {
  name: 'Tags'
};
</script>

<style lang="scss" scoped>
@import "@/assets/style/helper.scss";

.tags {
  min-height: 38vh;
  max-height: 38vh;
  overflow: scroll;

  .current {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    > li {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      margin-left: 23px;
      margin-top: 16px;
      width: 64px;
      height: 64px;
      font-size: 12px;

      .icons {
        margin-bottom: 2px;
        width: 43px;
        height: 43px;
        padding: 7px;
        border-radius: 50%;
        background-color: #f5f5f5;
      }

      &.selected {
        .icons {
          background-color: $color-theme;
        }
      }
    }
  }
}

.tags::-webkit-scrollbar {
  display: none;
}
</style>