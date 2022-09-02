import Vue from 'vue';
import Vuex from 'vuex';
import clone from '@/lib/clone';
import createId from '@/lib/createId';

Vue.use(Vuex);

type RootState = {
  recordList: RecordItem[],
  tagList: tag[],
  currentTag?: tag
}
const store = new Vuex.Store({
  state: {
    recordList: [],
    tagList: [],
    currentTag: undefined
  } as RootState,

  mutations: {
    // record
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

    // tag
    setCurrentTag(state, id: string) {
      state.currentTag = state.tagList.filter(t => t.id === id)[0];
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

    removeTag(state, id: string) {
      let index = -1;
      for (let i = 0; i < this.tagList.length; i++) {
        if (state.tagList[i].id === id) {
          index = i;
          break;
        }
      }
      state.tagList.splice(index, 1);
      store.commit('saveTags');
      return true;
    },

    saveTags(state) {
      window.localStorage.setItem('tagList', JSON.stringify(state.tagList));
    },
  },
});


export default store;