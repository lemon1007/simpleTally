import recordListModel from '@/models/recordListModel';

const tagStore = {
  // record store
  recordList: recordListModel.fetch(),
  createRecord: (record: RecordItem) => recordListModel.create(record),
};
export default tagStore;