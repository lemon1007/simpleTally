<template>
  <Layout>
    <div class="tags">
      <ul class="current">
        <li>衣</li>
        <li>食</li>
        <li>住</li>
        <li>行</li>
      </ul>
      <div>
        <button>新增标签</button>
      </div>
    </div>

    <div>
      <label class="notes">
        <span class="name">备注</span>
        <input type="text">
      </label>
    </div>

    <div>
      <ul class="types">
        <li class="selected">支出</li>
        <li>收入</li>
      </ul>
    </div>

    <div class="numberPad">
      <div class="output"></div>
      <ul class="buttons">
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>删除</li>
        <li>4</li>
        <li>5</li>
        <li>6</li>
        <li>清空</li>
        <li>7</li>
        <li>8</li>
        <li>9</li>
        <li>OK</li>
        <li>0</li>
        <li>.</li>
      </ul>
    </div>
  </Layout>
</template>

<script lang="ts">
import Layout from '@/components/Layout.vue';

export default {
  name: 'Money',
  components: {Layout}
};
</script>

<style lang="scss" scoped>
</style>