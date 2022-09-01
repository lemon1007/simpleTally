import createId from '@/lib/createId';

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
  create: (name: string) => 'success' | 'duplicated'   // success表示正常返回，duplicated表示name重复
  update: (id: string, name: string) => 'success' | 'not found' | 'duplicated'
  remove: (id: string) => boolean
  save: () => void
}


const tagListModel: TagListModel = {
  data: [],

  // 从localStorage读取数据
  fetch() {
    this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]');
    return this.data;
  },

  // tag内容拷贝
  // clone(data: tag) {
  //   return JSON.parse(JSON.stringify(data));
  // },

  // 添加标签-Label
  create(name) {
    const names = this.data.map(item => item.name);
    if (names.indexOf(name) >= 0) {return 'duplicated';}
    const id = createId().toString();
    this.data.push({id, name: name, icon: name});
    this.save();
    return 'success';
  },

  // 更新标签
  update(id: string, name: string) {
    const idList = this.data.map(item => item.id);
    if (idList.indexOf(id) >= 0) {
      const names = this.data.map(item => item.name);
      if (names.indexOf(name) >= 0) {
        return 'duplicated';
      } else {
        const tag = this.data.filter(item => item.id === id)[0];
        tag.name = name;
        tag.id = id;
        this.save();
        return 'success';
      }
    } else {
      return 'not found';
    }
  },

  // 删除标签
  remove(id: string) {
    let index = -1;
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i].id === id) {
        index = i;
        break;
      }
    }
    this.data.splice(index, 1);
    this.save();
    return true;
  },

  // 存储数据到localStorage
  save() {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
  },
};

export default tagListModel;