<template lang="html">
  <div id="sneaker">
    <section class="hero is-primary">
      <h1 class="title">{{sneaker.name}}</h1>
    </section>

    <div class="columns">
      <div class="column is-one-third">
        <div class="card">
          <div class="card-image">
            <figure class="image is-4by3">
              <img src="http://bulma.io/images/placeholders/1280x960.png" alt="Image">
            </figure>
          </div>
          <div class="card-content">
            <div class="media">
              <div class="media-content">
                <p class="title is-4">Haven UltraBoost</p>
                <p class="subtitle is-6">adidas</p>
              </div>
            </div>
          </div>
        </div>

        <ul class="menu-list">
          <li><a>Dashboard</a></li>
          <li><a>Customers</a></li>
        </ul>
      </div>

      <div class="column" id="notes">
        <div id="timeline">
          <article v-for="note in orderedNotes" class="media">
            <div class="media-content">
              <div class="content">
                <p>
                  <strong>@{{note.author_name || 'Anonymous'}}</strong> <small>31m</small>
                  <br>
                  {{note.message}} {{note.created_at}}
                </p>
              </div>
              <p v-if="note.images" @click="note.showPictures = !note.showPictures">{{note.showPictures ? 'Hide Pictures' : 'Show Pictures'}}</p>
              <div v-if="note.showPictures" class="gallery">
                <span class="thumbnail">
                  <img src="http://via.placeholder.com/100x80" alt="Image">
                </span>
              </div>
            </div>
            <div class="media-right">
              <button class="delete" @click="deleteNote(note.id)"></button>
            </div>
          </article>
        </div>

        <div class="field" id="note-form">
          <label class="label">Title</label>
          <p class="control">
            <textarea class="input" placeholder="Title" v-model="newNote.title"></textarea>
          </p>
          <label class="label">Message</label>
          <p class="control">
            <textarea class="textarea" placeholder="Textarea" v-model="newNote.message"></textarea>
          </p>
          <div class="images">
            <input type="file" @change="addImage" multiple>
            <!-- <span class="is-pulled-right">
              <span v-for="file in newNote.files" class="tag is-light">
                {{file.name}}
                <button class="delete is-small"></button>
              </span>
            </span> -->
          </div>
          <a class="post button is-primary is-pulled-right" :disabled="!newNote.message.length" @click="addNote">Save</a>
          <a class="post button is-primary is-pulled-right" @click="login">Login</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      sneaker_id: this.$route.params.id,
      sneaker: {},
      notes: [],
      newNote: {
        message: '',
        title: ''
      }
    }
  },
  created() {
    this.loading = true
    Promise.all([this.fetchSneaker(this.sneaker_id), this.fetchNotes(this.sneaker_id)])
      .then((results) => {
        this.sneaker = results[0].data;
        this.notes = results[1].data;
        this.loading = false;
      })
      .catch(console.log)
  },
  computed: {
    orderedNotes: function () {
      return this.notes.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    }
  },
  methods: {
    initNote() {
      return {
        message: '',
        title: ''
      }
    },
    addNote(){
      if (this.newNote.message.length) {

        let note = {
          title: this.newNote.title,
          message: this.newNote.message,
          author_name: null,
          sneaker_id: this.sneaker_id
        }

        this.postNote(note)
          .then((success) => {
            this.notes.push(success.data)
            this.newNote = this.initNote()
          })
          .catch(console.log)
      }
    },
    deleteNote(id) {
      this.destroyNote(id).then(() => {
        let note = this.notes.find(note => note.id === id)
        let index = this.notes.indexOf(note)
        this.notes.splice(index, 1)
      }).catch(console.log)
    },
    fetchNotes(id) { return axios.get(`http://localhost:3000/sneakers/${id}/notes.json`) },
    fetchSneaker(id) { return axios.get(`http://localhost:3000/sneakers/${id}.json`) },
    postNote(note) { return axios.post(`http://localhost:3000/notes`, note) },
    destroyNote(id) { return axios.delete(`http://localhost:3000/notes/${id}`) },
    login(username) {
        return axios.post('http://localhost:3000/author')
          .then((result) => {
            let author = result.data
            setAuthor(author)
          })
          .catch(console.log)
    }
  }
}
</script>

<style lang="css">
  .columns {
    margin: 8px 4px;
  }

  .delete { visibility: hidden; }
  article:hover .delete { visibility:visible;; }
  #notes {
    height: 90vh;
    max-height: 90vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  /*#notes > div, #notes > article { flex: 0 0 100%; }*/
  #timeline { overflow-y: scroll; }
  /*#message-input {
    align-self: flex-end;
    width: 100%;
  }*/
  .button {
    margin: 4px 2px;
  }
</style>
