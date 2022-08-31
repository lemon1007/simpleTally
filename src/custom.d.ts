// 声明一个类型
type RecordItem = {
  tags: {
    name: string
    icon: string
  }[]
  notes: string
  type: string
  amount: number
  createAt?: Date   // 加？表示可以不存在
}