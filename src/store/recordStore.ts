import tagListModel from '@/models/tagListModel';

const recordStore = {
  // tag store
  tagList: tagListModel.fetch(),
  createTag: (name: string, icon: string) => {
    const message = tagListModel.create(name, icon);
    if (message === 'duplicated') {
      window.alert('标签名已存在');
    } else if (message === 'success') {
      window.alert('添加成功');
    }
  },
  updateTag: (id: string, name: string, icon: string) => {
    return tagListModel.update(id, name, icon);
  },
  removeTag: (id: string) => {
    return tagListModel.remove(id);
  },
};

export default recordStore;