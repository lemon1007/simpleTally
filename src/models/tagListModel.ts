const localStorageKeyName = 'tagList';
type TagListModel = {
  data: string[]
  fetch: () => string[]
  create: (name: string) => string   // success表示正常返回，duplicated表示name重复
  save: () => void
}


const tagListModel: TagListModel = {
  data: [],
  fetch() {
    this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]');
    return this.data;
  },

  create(name) {
    if (this.data.indexOf(name) >= 0) {
      return 'duplicated';
    } else {
      this.data.push(name);
      this.save();
      return 'success';
    }
  },

  save() {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
  },
};

export default tagListModel;