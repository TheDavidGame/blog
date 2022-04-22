<template>
  <v-container data-app>
    <v-row v-if="isLoading" justify="center">
      <v-spacer></v-spacer>
      <v-col cols="12" md="6" style="text-align: right">
        <v-btn @click="download()">Загрузить</v-btn>
      </v-col>

      <v-col cols="12" md="6">
        <v-dialog v-model="dialogAddPost" persistent max-width="600px">
          <v-card>
            <v-card-title class="primario white--text">
              <v-textarea
                v-model="title"
                auto-grow
                rows="1"
                label="Заголовок"
              ></v-textarea>
            </v-card-title>
            <v-card-text>
              <v-textarea
                v-model="body"
                auto-grow
                rows="3"
                label="Содержимое поста"
              ></v-textarea
            ></v-card-text>
            <v-card-actions>
              <v-btn style="margin-right: 20px" @click="addNewPost()">
                Добавить
              </v-btn>
              <v-btn @click="dialogAddPost = false"> Отменить </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-btn @click="dialogAddPost = true">Добавить пост</v-btn>
      </v-col>
      <v-col cols="12" md="12">
        <v-divider></v-divider>
      </v-col>
      <v-col cols="12" style="margin-left: 40%">
        <postCard
          v-for="(post, i) in paginatedData"
          :id="post.id"
          :key="i"
          :datapost="post"
          style="margin-bottom: 100px"
        >
        </postCard>
        <!-- <postCard
          v-for="(post, i) in $store.state.storePost.arrayPosts"
          :id="i"
          :key="i"
          :datapost="post"
          style="margin-bottom: 100px"
        >
        </postCard> -->
      </v-col>
    </v-row>
    <v-pagination
      v-model="pageNumber"
      :length="paginationLength"
      @input="nextPage"
    />
  </v-container>
</template>

<script>
import axios from 'axios'
export default {
  name: 'IndexPage',
  data() {
    return {
      isLoading: false,
      dialogAddPost: false,
      title: '',
      body: '',
      paginationLength: 15,
      pageNumber: 1,
    }
  },
  computed: {
    paginatedData() {
      const start =
        this.pageNumber * this.paginationLength - this.paginationLength
      const end = start + this.paginationLength
      return this.$store.state.storePost.arrayPosts.slice(start, end)
    },
  },
  async mounted() {
    await this.validLocalStorage()
    this.isLoading = true
  },
  methods: {
    nextPage(page) {
      this.pageNumber = page
    },
    validLocalStorage() {
      if (localStorage.getItem('posts')) {
        try {
          this.$store.commit(
            'storePost/savePosts',
            JSON.parse(localStorage.getItem('posts'))
          )
        } catch (e) {
          localStorage.removeItem('posts')
        }
      }
    },
    saveLocalStore() {
      const parsed = JSON.stringify(this.$store.state.storePost.arrayPosts)
      localStorage.setItem('posts', parsed)
    },
    async download() {
      await axios
        .get('https://jsonplaceholder.typicode.com/posts')
        .then((res) => {
          this.$store.commit('storePost/savePosts', res.data)
        })
      this.saveLocalStore()
    },
    addNewPost() {
      const obj = {
        title: this.title,
        body: this.body,
        id: this.$store.state.storePost.arrayPosts.length,
      }
      this.$store.commit('storePost/addNewPost', obj)
      this.saveLocalStore()
      this.dialogAddPost = false
    },
  },
}
</script>
