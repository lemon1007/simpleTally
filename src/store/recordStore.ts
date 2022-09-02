import recordListModel from '@/models/recordListModel';

const recordStore = {
  // record store
  recordList: recordListModel.fetch(),
  createRecord: (record: RecordItem) => recordListModel.create(record),
};

export default recordStore;