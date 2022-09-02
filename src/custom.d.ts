// 声明一个类型
type RecordItem = {
  tags: {
    id: string
    name: string
    icon: string
  }[]
  notes: string
  type: string
  amount: number
  createAt?: Date   // 加？表示可以不存在
}

// 定义单个tag的类型
type tag = {
  id: string;
  name: string;
  icon: string
}
type TagListModel = {
  data: tag[]
  fetch: () => tag[]
  create: (name: string, icon: string) => 'success' | 'duplicated'   // success表示正常返回，duplicated表示name重复
  update: (id: string, name: string, icon: string) => 'success' | 'not found' | 'duplicated'
  remove: (id: string) => boolean
  save: () => void
}

interface Window {
  // store: {
  //   // tag interface
  //   tagList: tag[];
  //   createTag: (name: string, icon: string) => void;
  //   updateTag: (id: string, name: string, icon: string) => 'success' | 'not found' | 'duplicated';
  //   removeTag: (id: string) => boolean;
  //
  //   // record interface
  //   recordList: RecordItem[];
  //   createRecord: (record: RecordItem) => void;
  // };
}