import recordListModel from '@/models/recordListModel';
import clone from '@/lib/clone';

const localStorageKeyName = 'recordList';
let data: RecordItem[] | undefined = undefined;

const recordStore = {
  recordList: data,
  fetchRecords() {
    data = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]') as RecordItem[];
    return data;
  },
  saveRecord() {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(data));
  },
  createRecord: (record: RecordItem) => {
    const deepRecord: RecordItem = clone(record);
    deepRecord.createAt = new Date();
    data && data.push(deepRecord);
    recordStore.saveRecord();
  },
};

recordStore.fetchRecords();

export default recordStore;