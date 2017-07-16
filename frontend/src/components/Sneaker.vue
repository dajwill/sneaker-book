<template lang="html">
  <div id="sneaker">
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
                  <strong>{{note.author_name}}</strong> <small>31m</small>
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

        <div class="field" id="message-input">
          <label class="label">Message</label>
          <p class="control">
            <textarea class="textarea" placeholder="Textarea" v-model="message"></textarea>
          </p>
          <a class="post button is-primary is-pulled-right" :disabled="!message.length" @click="addNote">Save</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      notes: [{
        id: 1,
        message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.',
        author_name: 'John Smith',
        created_at: Date.now(),
        showPictures: false,
        images: 'poop.png'
      }],
      message: ''
    }
  },
  computed: {
    orderedNotes: function () {
      return this.notes.sort((a, b) => b.created_at - a.created_at)
    }
  },
  methods: {
    addNote(){
      if (this.message.length) {
        let note = {
          message: this.message,
          author_name: 'John Smith',
          id: this.notes.length + 1,
          created_at: Date.now(),
          showPictures: false
        }
        this.notes.push(note)
        this.message = ''
      }
    },
    deleteNote(id) {
      let note = this.notes.find(note => note.id === id)
      let index = this.notes.indexOf(note)
      this.notes.splice(index, 1)
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
    margin: 4px 0;
  }
</style>
