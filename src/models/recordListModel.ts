import clone from '@/lib/clone';

const localStorageKeyName = 'recordList';

const recordListModel = {
  data: [] as RecordItem[],

  // 从localStorage读取数据
  fetch() {
    this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]') as RecordItem[];
    return this.data;
  },

  // 将用户输入record的信息存进List
  create(record: RecordItem) {
    const deepRecord: RecordItem = clone(record);
    deepRecord.createAt = new Date();
    this.data.push(deepRecord);
    this.save();
  },

  // 数据存储到localStorage
  save() {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
  },
};

export default recordListModel;