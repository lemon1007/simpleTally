<template>
  <div class="numberPad">
    <div class="output" id="inp">{{ output }}</div>
    <div class="buttons">
      <button @click="inputContent">1</button>
      <button @click="inputContent">2</button>
      <button @click="inputContent">3</button>
      <button @click="remove" data-type="remove">
        <Icon name="delete" class="deleteFont"/>
      </button>
      <button @click="inputContent">4</button>
      <button @click="inputContent">5</button>
      <button @click="inputContent">6</button>
      <button @click="inputContent" data-type="add">+</button>
      <button @click="inputContent">7</button>
      <button @click="inputContent">8</button>
      <button @click="inputContent">9</button>
      <button @click="inputContent" data-type="sub">-</button>
      <button @click="inputContent">0</button>
      <button @click="inputContent">.</button>
      <button @click="count" data-type="count">=</button>
      <button class="ok" @click="ok">完成</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

@Component
export default class NumberPad extends Vue {
  @Prop({default: 0}) readonly amount!: number;
  output = this.amount.toString();

  inputContent(event: MouseEvent) {
    const button = (event.target as HTMLButtonElement);
    const input = button.textContent as string;
    const len = this.output.length;
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
    // 标点符号的相关判定
    // if ((this.output[len - 1] === '.' || '+' || '-') &&
    //     (input === '.' || '+' || '-')) {
    //   return;
    // }
    this.output += input;
  }

  // 加减计算,待完善
  count() {
    const addIndex = this.output.indexOf('+');
    const subIndex = this.output.indexOf('-');
    const num1 = parseFloat(this.output.slice(0, addIndex));
    const num2 = parseFloat(this.output.slice(addIndex + 1));
    const num3 = parseFloat(this.output.slice(0, subIndex));
    const num4 = parseFloat(this.output.slice(subIndex + 1));
    if (addIndex >= 0) {
      this.output = (num1 + num2).toString();
    }
    if (subIndex >= 0) {
      this.output = (num3 - num4).toString();
    } else {
      return;
    }
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

  // 确认完成功能，待完善
  ok() {
    this.$emit('update:value', this.output);
  }
}


</script>

<style lang="scss" scoped>
@import "@/assets/style/helper.scss";

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
        background-color: $color-theme;
      }

      .deleteFont {
        width: 22px;
        height: 22px;
      }
    }
  }
}

</style>