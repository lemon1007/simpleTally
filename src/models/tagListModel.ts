import createId from '@/lib/createId';

const localStorageKeyName = 'tagList';

const tagListModel: TagListModel = {
  data: [],

  // 从localStorage读取数据
  fetch() {
    this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]');
    return this.data;
  },

  // 新增标签
  create(name, icon) {
    const names = this.data.map(item => item.name);
    if (names.indexOf(name) >= 0) {return 'duplicated';}
    const id = createId().toString();
    this.data.push({id, name: name, icon: icon});
    this.save();
    return 'success';
  },

  // 更新标签
  update(id: string, name: string, icon: string) {
    const idList = this.data.map(item => item.id);
    if (idList.indexOf(id) >= 0) {
      const names = this.data.map(item => item.name);
      if (names.indexOf(name) >= 0) {
        return 'duplicated';
      } else {
        const tag = this.data.filter(item => item.id === id)[0];
        tag.name = name;
        tag.id = id;
        tag.icon = icon;
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