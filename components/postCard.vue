<template>
  <div>
    <v-card class="mx-auto" max-width="344" height="220">
      <v-card-text>
        <div style="font-size: 18px">{{ datapost.title }}</div>
        <div class="text--primary text">
          {{ datapost.body }}
        </div>
      </v-card-text>
      <v-card-actions>
        <v-row>
          <v-col cols="12">
            <v-btn style="background-color: #8a8686" @click="reveal = true">
              Показать текст
            </v-btn>
          </v-col>
          <v-col>
            <v-btn style="background-color: red" @click="confirmDelete = true">
              Удалить
            </v-btn>
          </v-col>
          <v-col>
            <v-btn style="background-color: #8a8686" @click="editPost()">
              Редактировать
            </v-btn>
            <v-dialog v-model="dialogEditPost" persistent max-width="600px">
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
                  <v-btn @click="confirmEditPost()"> Изменить </v-btn>
                  <v-btn @click="dialogEditPost = false"> Отменить </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-col>
        </v-row>

        <v-dialog v-model="confirmDelete" persistent max-width="600px">
          <v-card>
            <v-card-title class="primario white--text">
              Вы точно хотите удалить ?
            </v-card-title>
            <v-card-actions>
              <v-btn @click="deletePost()"> Да </v-btn>
              <v-btn @click="confirmDelete = false"> Нет </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card-actions>

      <v-expand-transition>
        <v-card
          v-if="reveal"
          class="transition-fast-in-fast-out v-card--reveal"
          style="height: 100%"
        >
          <v-card-text class="pb-0">
            <p class="text-h4 text--primary" style="font-size: 18px">
              {{ datapost.title }}
            </p>
            <p>{{ datapost.body }}</p>
          </v-card-text>
          <v-card-actions class="pt-0">
            <v-btn text color="teal accent-4" @click="reveal = false">
              Закрыть
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-expand-transition>
    </v-card>
  </div>
</template>
<script>
export default {
  props: {
    datapost: {
      type: Object,
      required: true,
    },
    id: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      reveal: false,
      confirmDelete: false,
      dialogEditPost: false,
      title: '',
      body: '',
    }
  },
  methods: {
    deletePost() {
      this.$store.commit('storePost/deletePosts', this.id)
      this.saveLocalStore()
      this.confirmDelete = false
    },
    editPost() {
      this.title = this.datapost.title
      this.body = this.datapost.body
      this.dialogEditPost = true
    },
    confirmEditPost() {
      const obj = {
        id: this.id,
        title: this.title,
        body: this.body,
      }
      this.$store.commit('storePost/editPost', obj)

      this.saveLocalStore()
      this.dialogEditPost = false
    },
    saveLocalStore() {
      const parsed = JSON.stringify(this.$store.state.storePost.arrayPosts)
      localStorage.setItem('posts', parsed)
    },
  },
}
</script>
<style>
.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}
.text {
  text-overflow: ellipsis;
  overflow: hidden;
  width: 100%;
  white-space: nowrap;
}
</style>
