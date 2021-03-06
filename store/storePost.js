
export const state = () => ({
  arrayPosts: []
})

export const mutations = {
  savePosts(state, data) {
    state.arrayPosts = data
  },
  deletePosts(state, i) {
    state.arrayPosts.splice(i - 1, 1)
  },
  addNewPost(state, obj) {
    state.arrayPosts.push({
      title: obj.title,
      body: obj.body,
      id: obj.id + 1
    });
  },
  editPost(state, obj) {
    state.arrayPosts.splice(obj.id - 1, 1, obj);
  }
}