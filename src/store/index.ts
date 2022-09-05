import Vue from 'vue';
import Vuex from 'vuex';
import clone from '@/lib/clone';
import createId from '@/lib/createId';
import router from '@/router';

Vue.use(Vuex);

type RootState = {
  recordList: RecordItem[],
  tagList: tag[],
  currentTag?: tag
  // currentRecord?: RecordItem
}
const store = new Vuex.Store({
  state: {
    recordList: [],
    tagList: [],
    currentTag: undefined,
    // currentRecord: undefined
  } as RootState,

  mutations: {
    // record
    fetchRecords(state) {
      state.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]') as RecordItem[];
    },
    createRecord(state, record: RecordItem) {
      const deepRecord = clone(record);
      deepRecord.createdAt = deepRecord.createdAt || new Date().toISOString();
      state.recordList.push(deepRecord);
      store.commit('saveRecord');
      window.alert('添加成功');
    },
    // removeRecord(state, id: string) {
    //   let index = -1;
    //   for (let i = 0; i < state.recordList.length; i++) {
    //     if (state.recordList[i].tag[0].id === id) {
    //       index = i;
    //       break;
    //     }
    //   }
    //   if (index >= 0) {
    //     state.recordList.splice(index, 1);
    //     store.commit('saveRecord');
    //     window.alert('删除成功');
    //     router.back();
    //   } else {
    //     window.alert('删除失败');
    //   }
    // },
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
      } else {
        const id = createId().toString();
        state.tagList.push({id, name: tag.name, icon: tag.icon});
        store.commit('saveTags');
        window.alert('添加成功');
        router.replace('/');
      }
    },

    removeTag(state, id: string) {
      let index = -1;
      for (let i = 0; i < state.tagList.length; i++) {
        if (state.tagList[i].id === id) {
          index = i;
          break;
        }
      }
      if (index >= 0) {
        state.tagList.splice(index, 1);
        store.commit('saveTags');
        window.alert('删除成功');
        router.back();
      } else {
        window.alert('删除失败');
      }
    },

    saveTags(state) {
      window.localStorage.setItem('tagList', JSON.stringify(state.tagList));
    },

    updateTag(state, payload: { id: string, name: string, icon: string }) {
      const {id, name, icon} = payload;
      const idList = state.tagList.map(item => item.id);
      if (idList.indexOf(id) >= 0) {
        const names = state.tagList.map(item => item.name);
        if (names.indexOf(name) >= 0) {
          window.alert('标签名已存在');
        } else {
          const tag = state.tagList.filter(item => item.id === id)[0];
          tag.name = name;
          tag.id = id;
          tag.icon = icon;
          store.commit('saveTags');
        }
      }
    },
  },
});


export default store;