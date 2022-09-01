const localStorageKeyName = 'recordList';

const recordListModel = {
  data: [] as RecordItem[],

  // 从localStorage读取数据
  fetch() {
    this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]') as RecordItem[];
    return this.data;
  },

  // 拷贝数据
  clone(data: RecordItem[] | RecordItem) {
    return JSON.parse(JSON.stringify(data));
  },

  // 数据存储到localStorage
  save() {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
  },
};

export default recordListModel;