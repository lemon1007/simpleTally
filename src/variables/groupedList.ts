import clone from '@/lib/clone';
import dayjs from 'dayjs';
import store from '@/store';

function groupedList() {
  const recordList = store.state.recordList;
  if (recordList.length === 0) {return []; }
  const newList = clone(recordList);
  console.log('newList')
  console.log(newList);

  // .filter((r: any) => r.type === this.type)
  // .sort((a: any, b: any) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf());
  // if (newList.length === 0) {return [] as Result;}

  // type Result = { title: string, total?: number, items: RecordItem[] }[]
  // const result: Result = [{title: dayjs(newList[0].createdAt).format('YYYY-MM-DD'), items: [newList[0]]}];
  // for (let i = 1; i < newList.length; i++) {
  //   const current = newList[i];
  //   const last = result[result.length - 1];
  //   if (dayjs(last.title).isSame(dayjs(current.createdAt), 'day')) {
  //     last.items.push(current);
  //   } else {
  //     result.push({title: dayjs(current.createdAt).format('YYYY-MM-DD'), items: [current]});
  //   }
  // }

  // result.forEach(group => {
  //   group.total = group.items.reduce((sum, item) => sum + item.amount, 0);
  // });
  //
  // return result;
};

export default groupedList;