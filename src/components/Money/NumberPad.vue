<template>
  <div class="numberPad">
    <div class="output">100</div>
    <div class="buttons">
      <button>1</button>
      <button>2</button>
      <button>3</button>
      <button>+</button>
      <button>4</button>
      <button>5</button>
      <button>6</button>
      <button>-</button>
      <button>7</button>
      <button>8</button>
      <button>9</button>
      <button class="ok">
        <Icon name="equal" class="equalFont"/>
      </button>
      <button class="specialBtn">.</button>
      <button class="specialBtn">0</button>
      <button class="specialBtn">
        <Icon name="delete" class="deleteFont"/>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'NumberPad'
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
      height: 7.5vh;
      border: white 1px solid;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #f5f5f5;

      &.ok {
        height: 7.5*2vh;
        .equalFont{
          width: 35px;
          height: 35px;
        }
      }

      &.specialBtn {
        margin-top: -7.5vh;

        .deleteFont {
          width: 22px;
          height: 22px;
        }
      }
    }
  }
}

</style>