import Vue from 'vue';
import Vuex from 'vuex';
import clone from '@/lib/clone';
import createId from '@/lib/createId';
import router from '@/router';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    recordList: [],
    createRecordError: null,
    createTagError: null,
    tagList: [],
    currentTag: undefined,
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
    },
    saveRecord(state) {
      window.localStorage.setItem('recordList', JSON.stringify(state.recordList));
    },

    // tag
    setCurrentTag(state, id: string) {
      state.currentTag = state.tagList.filter(t => t.id === id)[0];
    },
    fetchTags(state) {
      state.tagList = JSON.parse(window.localStorage.getItem('tagList') || '[]');
      if (!state.tagList || state.tagList.length === 0) {
        store.commit('createTag', {name: '其他', icon: 'star'});
        store.commit('createTag', {name: '购物消费', icon: 'cart'});
        store.commit('createTag', {name: '食品餐饮', icon: 'foods'});
        store.commit('createTag', {name: '交通出行', icon: 'traffic'});
      }
    },
    createTag(state, tag) {
      state.createTagError = null;
      const names = state.tagList.map(item => item.name);
      if (names.indexOf(tag.name) >= 0) {
        state.createTagError = new Error('tag name duplicated');
        return;
      } else {
        const id = createId().toString();
        state.tagList.push({id, name: tag.name, icon: tag.icon});
        store.commit('saveTags');
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