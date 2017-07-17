<template lang="html">
  <div id="sneaker">
    {{sneaker_id}}
    <section class="hero is-primary">
      <h1 class="title">Ultraboost</h1>
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
                  {{note.message}}
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
export default {
  props: {
    query: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      sneaker_id: this.$route.params.id,
      sneaker: null,
      notes: [{
        id: 1,
        message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.',
        author_name: null,
        created_at: Date.now(),
        showPictures: false,
        images: 'poop.png'
      }],
      newNote: {
        message: '',
        title: ''
      }
    }
  },
  created() {
    console.log(this.$route);
  },
  computed: {
    orderedNotes: function () {
      return this.notes.sort((a, b) => b.created_at - a.created_at)
    }
  },
  methods: {
    addNote(){
      if (this.newNote.message.length) {

        this.notes.push(newNote)
        this.newNote.message = ''
      }
    },
    deleteNote(id) {
      let note = this.notes.find(note => note.id === id)
      let index = this.notes.indexOf(note)
      this.notes.splice(index, 1)
    },
    addImage(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) {
        this.newNote.files = null;
        return;
      }
      console.log(files);
      this.newNote.files = files
    },
    fetchShoe(id) {
      return axios.get(`http://localhost:3000/sneakers/${id}`)
        .then((result) => this.sneaker = result.data)
        .catch(console.log)
    },
    fetchNotes(id) {
        return axios.get('http://localhost:3000/api/notes.json')
          .then((result) => {
            // this.notes = result.data
          })
          .catch(console.log)
    },
    login(username) {
        return axios.post('http://localhost:3000/api/author')
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
