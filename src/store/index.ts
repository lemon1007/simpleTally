import Vue from 'vue';
import Vuex from 'vuex';
import clone from '@/lib/clone';
import createId from '@/lib/createId';

Vue.use(Vuex);

// @ts-ignore
const store = new Vuex.Store({
  state: {
    recordList: [] as RecordItem[],
    tagList: [] as tag[],
  },

  mutations: {
    fetchRecords(state) {
      state.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]') as RecordItem[];
    },
    createRecord(state, record) {
      const deepRecord: RecordItem = clone(record);
      deepRecord.createAt = new Date();
      state.recordList.push(deepRecord);
      store.commit('saveRecord');
    },
    saveRecord(state) {
      window.localStorage.setItem('recordList', JSON.stringify(state.recordList));
    },


    fetchTags(state) {
      return state.tagList = JSON.parse(window.localStorage.getItem('tagList') || '[]');
    },
    createTag(state, tag) {
      const names = state.tagList.map(item => item.name);
      if (names.indexOf(tag.name) >= 0) {
        window.alert('标签名已存在');
        return 'duplicated';
      }
      const id = createId().toString();
      state.tagList.push({id, name: tag.name, icon: tag.icon});
      store.commit('saveTags');
      window.alert('添加成功');
      return 'success';
    },

    saveTags(state) {
      window.localStorage.setItem('tagList', JSON.stringify(state.tagList));
    }

  },
});


export default store;