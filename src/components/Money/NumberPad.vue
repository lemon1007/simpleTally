<template>
  <div class="numberPad">
    <div class="output">{{ output }}</div>
    <div class="buttons">
      <button @click="inputContent">1</button>
      <button @click="inputContent">2</button>
      <button @click="inputContent">3</button>
      <button @click="inputContent">+</button>
      <button @click="inputContent">4</button>
      <button @click="inputContent">5</button>
      <button @click="inputContent">6</button>
      <button @click="inputContent">-</button>
      <button @click="inputContent">7</button>
      <button @click="inputContent">8</button>
      <button @click="inputContent">9</button>
      <button @click="count">=</button>
      <button @click="inputContent">0</button>
      <button @click="inputContent">.</button>
      <button @click="remove">
        <Icon name="delete" class="deleteFont"/>
      </button>
      <button class="ok" @click="ok">完成</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component
export default class NumberPad extends Vue {
  output: string = '0';

  inputContent(event: MouseEvent) {
    const button = (event.target as HTMLButtonElement);
    const input = button.textContent as string;
    // 初始值为0的相关判定
    if (this.output.length === 16) {return;}
    if (this.output === '0') {
      if ('0123456789'.indexOf(input) >= 0) {
        this.output = input;
      } else {
        this.output += input;
      }
      return;
    }
    if (this.output.indexOf('.') >= 0 && input === '.') {return;}
    this.output += input;
  }

  count() {

  }

  // 回删功能
  remove() {
    const newOutput = this.output.slice(0, -1);
    if (this.output.length === 1) {
      this.output = '0';
    } else {
      this.output = newOutput;
    }
  }

  ok() {

  }
};
</script>

<style lang="scss" scoped>
.numberPad {
  .output {
    height: 7vh;
    font-size: 20px;
    text-align: right;
    padding: 9px 22px;
    font-family: Consolas, monospace;
  }

  .buttons {
    display: flex;
    flex-wrap: wrap;


    > button {
      width: 25%;
      min-height: 7.5vh;
      border: white 1px solid;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #f5f5f5;

      &.ok {
        background-color: #ffe600;
      }

      .deleteFont {
        width: 22px;
        height: 22px;
      }
    }
  }
}

</style>