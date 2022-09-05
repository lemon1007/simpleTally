// 声明一个类型
type RecordItem = {
  tag:tag[]
  notes: string
  type: string
  amount: number
  createdAt?: String   // 加？表示可以不存在
}
// 定义单个tag的类型
type tag = {
  id: string;
  name: string;
  icon: string
}

interface Window {
}