import icon from '@/components/Icon.vue';

const localStorageKeyName = 'tagList';
// 定义单个tag的类型
type tag = {
  id: string;
  name: string;
  icon: string
}
type TagListModel = {
  data: tag[]
  fetch: () => tag[]
  create: (name: string) => string   // success表示正常返回，duplicated表示name重复
  save: () => void
}


const tagListModel: TagListModel = {
  data: [],
  fetch() {
    this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]');
    return this.data;
  },

  create(name) {
    const names = this.data.map(item => item.name);
    if (names.indexOf(name) >= 0) {
      return 'duplicated';
    } else {
      this.data.push({id: name, name: name, icon: name});
      this.save();
      return 'success';
    }
  },

  // update() {
  //
  // },

  save() {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
  },
};

export default tagListModel;