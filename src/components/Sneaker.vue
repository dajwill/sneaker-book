<template lang="html">
  <div id="sneaker">
    <section class="hero is-primary">
      <div class="">
        <span v-if="user.id">@{{user.username}}</span>  <i class="fa fa-user" @click="showModal = true"></i>
      </div>
      <h1 class="title">{{sneaker.name}}</h1>
      <span> </span>
    </section>

    <div class="columns">
      <div class="column" id="notes">
        <div id="timeline">
          <article v-for="note in orderedNotes" class="media">
            <div class="media-content">
              <div class="content">
                <p>
                  <strong>@{{note.author ? note.author.username : 'Anonymous'}}</strong> <small>{{updatedAt(note)}}</small>
                  <br>
                  <h5 class="subtitle" v-if="note.title">{{note.title}}</h5>
                  {{note.message}}
                </p>
              </div>
              {{note.showPictures}}
              <p v-if="note.image">Image</p>
              <div v-if="note.image" class="gallery">
                <img :src="loadImage(note.image)" class="thumbnail" alt="Image">
              </div>
            </div>
            <div class="media-right">
              <i v-if="true" class="fa fa-edit" @click="edit(note)"></i>
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
            <input type="file" @change="addImage">
          </div>
          <a class="post button is-primary is-pulled-right" :disabled="!newNote.message.length" @click="addNote">Save</a>
          <a class="post button is-primary is-pulled-right" v-if="!user" @click="showModal = true">Login</a>
        </div>
      </div>
    </div>

    <div class="modal" v-bind:class="{ 'is-active': showModal }">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">{{user.id ? 'Logout' : 'Login'}}</p>
          <button class="delete" @click="hideModal"></button>
        </header>
        <section class="modal-card-body" v-if="!user.id">
          <div class="field">
            <label class="label">Name</label>
            <p class="control">
              <input class="input" type="text" placeholder="Username" v-model="username">
            </p>
          </div>
        </section>
        <footer class="modal-card-foot">
          <a class="button is-success" v-if="!user.id" :disabled="!username" @click="updateSession(username)">Login</a>
          <a class="button is-success" v-if="user.id" @click="updateSession(username)">Logout</a>
          <a class="button" @click="hideModal">Cancel</a>
        </footer>
      </div>
    </div>
  </div>

</template>

<script>
import axios from 'axios'
import moment from 'moment'

export default {
  data() {
    return {
      showModal: false,
      user: null,
      username: this.$session.get('user') ? this.$session.get('user').username : null,
      sneaker_id: this.$route.params.id,
      sneaker: {},
      notes: [],
      newNote: {
        message: '',
        title: '',
        image: {}
      },
      file: ''
    }
  },
  created() {
    this.user = this.$session.get('user') || {}
    this.loading = true
    this.fetchSneaker(this.sneaker_id)
      .then((result) => {
        this.sneaker = result.data
        this.notes = this.sneaker.notes
      })
      .catch(console.log)
  },
  computed: {
    orderedNotes: function () {
      return this.notes.sort((a, b) => moment(b.updated_at) - moment(a.updated_at))
    }
  },
  methods: {
    initNote() {
      return {
        message: '',
        title: '',
        image: {}
      }
    },
    editable(note) {
      return note.author_id || note.id === this.user.id
    },
    loadImage(image) {
      return note.image ? note.image.content : null
    },
    hideModal() {
      this.showModal = false,
      this.username = ''
    },
    edit(note) {
      Object.assign(this.newNote, note)
    },
    updatedAt: (note) => {
      return moment(note.updated_at).fromNow()
    },
    addImage(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return
      this.newNote.image = {
        file_name: files[0].name,
        file_size: files[0].size,
        content_type: files[0].type,
      }
      this.createImage(files[0])
    },
    createImage(file) {
      var image = new Image();
      var reader = new FileReader();
      var vm = this;

      reader.onload = (e) => vm.file = e.target.result;
      reader.readAsDataURL(file);
    },
    addNote(){
      if (this.newNote.message.length) {

        let note = {
          ...this.newNote,
          sneaker_id: this.sneaker_id,
          author_id: this.user.id,
          image: {
            ...this.newNote.image,
            content: this.file,
            updated_at: new Date().toISOString()
          }
        }

        if (!this.file.length) delete note.image

        let action = (note) => {
          return note.id ? this.putNote(note) : this.postNote(note)
        }

        action(note)
          .then((success) => {
            let index = this.notes.findIndex(n => n.id === success.data.id)
            if (parseInt(index) > -1) this.notes.splice(index, 1)
            this.notes.push(success.data)
            this.newNote = this.initNote()
            this.file = ''
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
    updateSession(username) {
      if (this.user.id) {
        this.user = {}
        this.$session.set('user', this.user)
        this.hideModal()
      } else {
        this.login(username).then((result) => {
          this.user = result.data
          this.$session.set('user', this.user)
          this.showModal = false;
          console.log('showModal', this.showModal);
        })
        .catch(console.log)
      }
    },
    fetchNotes(id) { return axios.get(`http://localhost:3000/sneakers/${id}/notes.json`) },
    fetchSneaker(id) { return axios.get(`http://localhost:3000/sneakers/${id}.json`) },
    postNote(note) { return axios.post(`http://localhost:3000/notes`, note) },
    putNote(note) { return axios.put(`http://localhost:3000/notes/${note.id}`, note) },
    destroyNote(id) { return axios.delete(`http://localhost:3000/notes/${id}`) },
    login(username) { return axios.post('http://localhost:3000/login', { username: username }) }
  }
}
</script>

<style lang="css">
  h5 { margin-bottom: 2px !important; }
  .columns { margin: 8px 4px; }
  .thumbnail { max-height: 80px;}
  .delete { visibility: hidden; }
  article:hover .delete { visibility:visible;; }
  #notes {
    height: 90vh;
    max-height: 90vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  #timeline { overflow-y: scroll; }
  .button { margin: 4px 2px; }
</style>
