<template lang="html">
  <div id="sneaker">
    <section class="hero is-primary">
      <h1 class="title">{{sneaker.name}}</h1>
    </section>

    <div class="columns">
      <!-- <div class="column is-one-third">

        <ul class="menu-list">
          <li><a>Dashboard</a></li>
          <li><a>Customers</a></li>
        </ul>
      </div> -->

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
              <p v-if="note.image.content" @click="note.showPictures = !!!note.showPictures">{{note.showPictures ? 'Hide Pictures' : 'Show Pictures'}}</p>
              <div v-if="note.showPictures" class="gallery">
                <img :src="note.image.content" class="thumbnail" alt="Image">
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
            <input type="file" @change="addImage">
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
        title: '',
        image: {}
      },
      file: ''
    }
  },
  created() {
    this.loading = true
    Promise.all([this.fetchSneaker(this.sneaker_id), this.fetchNotes(this.sneaker_id)])
      .then((results) => {
        this.sneaker = results[0].data;
        this.notes = results[1].data.map((n) => {
          n.showPictures = false
          return n
        });
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
        title: '',
        image: {}
      }
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
          title: this.newNote.title,
          message: this.newNote.message,
          sneaker_id: this.sneaker_id,
          image: {
            ...this.newNote.image,
            content: this.file,
            updated_at: new Date().toISOString()
          }
        }

        console.log(note);

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
  .button {
    margin: 4px 2px;
  }
</style>
