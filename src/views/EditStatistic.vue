<template>
  <Layout>
    <div class="editStatistic">
      <ul class="navBar">
        <li>
          <Icon name="return" @click.native="back" class="icons"/>
        </li>
        <li>
          <span>编辑标签</span>
        </li>
        <li>
          <Icon name="del" @click.native="remove" class="del icons"/>
          <Icon name="ensure" class="ensure icons"/>
        </li>
      </ul>
      <ul>
        <li>
          <!--          <span>{{ recordList }}</span>-->
          <span>recordName：{{ RecordItem.tag[0].name }}</span>
        </li>
      </ul>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import router from '@/router';

@Component
export default class EditStatistic extends Vue {
  get RecordItem() {
    return this.$store.state.currentRecord;
  }

  created() {
    const id = this.$route.params.id;
    this.$store.commit('fetchRecords');
    this.$store.commit('setCurrentRecord', id);
    if (!this.RecordItem) {
      this.$router.replace('/NotFound');
    }
  }

  remove() {
    if (this.RecordItem) {
      this.$store.commit('removeRecord', this.RecordItem.id);
    }
  }

  back() {
    router.replace('/statistics');
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/style/helper.scss";

.editStatistic {
  min-height: 91vh;
  background-color: #f5f5f5;

  .navBar {
    background-color: $color-theme;
    min-height: 9vh;
    font-size: 18px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    > li {
      padding: 0 20px;

      .del {
        margin-right: 20px;
      }

      .icons {
        width: 21px;
        height: 21px;
      }

      > span {
        margin-left: 25px;
      }
    }
  }
}
</style>