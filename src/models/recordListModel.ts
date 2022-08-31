const localStorageKeyName = 'recordList';

const recordListModel = {
  fetch() {
    return JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]') as RecordItem[];
  },

  save(data: RecordItem[] | RecordItem) {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(data));
  },
  clone(data: RecordItem[]) {
    return JSON.parse(JSON.stringify(data));
  }
};

export default recordListModel;