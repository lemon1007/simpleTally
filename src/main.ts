import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import Nav from '@/components/Nav.vue';
import Layout from '@/components/Layout.vue';
import Icon from '@/components/Icon.vue';
import tagListModel from '@/models/tagListModel';

Vue.config.productionTip = false;

// 全局注册组件
Vue.component('Nav', Nav);
Vue.component('Layout', Layout);
Vue.component('Icon', Icon);

window.tagList = tagListModel.fetch();
// 创建标签
window.createTag = (name: string, icon: string) => {
  const message = tagListModel.create(name, icon);
  if (message === 'duplicated') {
    window.alert('标签名已存在');
  } else if (message === 'success') {
    window.alert('添加成功');
  }
};

// 更新标签
window.updateTag = (id: string, name: string, icon: string) => {
  return tagListModel.update(id, name, icon);
};

// 删除标签
window.removeTag = (id: string) => {
  return tagListModel.remove(id);
};

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
