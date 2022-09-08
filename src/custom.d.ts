type RootState = {
  recordList: RecordItem[],
  createRecordError: Error | null,
  createTagError: Error | null,
  tagList: tag[],
  currentTag?: tag,
  currentRecord?: RecordItem
}
// 声明一个类型
type RecordItem = {
  id: string
  tag: tag[]
  notes: string
  type: string
  amount: number
  createdAt?: string   // 加？表示可以不存在
}
// 定义单个tag的类型
type tag = {
  id: string;
  name: string;
  icon: string
}

interface Window {
}