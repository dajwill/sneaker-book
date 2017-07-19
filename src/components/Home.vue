<template lang="html">
  <div id="home">
    <section class="hero is-primary">
      <span></span>
      <h1 class="title">StockX</h1>
      <span></span>
    </section>
    <div class="columns">
      <div v-for="shoe in sneakers" class="column is-one-third">
        <div class="card" @click="navigate(shoe)">
          <div class="card-image">
            <figure class="image is-4by3">
              <img src="http://bulma.io/images/placeholders/1280x960.png" alt="Image">
            </figure>
          </div>
          <div class="card-content">
            <div class="media">
              <div class="media-content">
                <p class="title is-4">{{shoe.name}}</p>
                <p class="subtitle is-6">adidas</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="column is-one-third">
        <div class="card" @click="showModal = true">
          <div class="card-image">
            <figure class="image is-4by3">
              <img src="http://bulma.io/images/placeholders/1280x960.png" alt="Image">
            </figure>
          </div>
          <div class="card-content">
            <div class="media">
              <div class="media-content">
                <p class="title is-4">Add Shoe</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal" v-bind:class="{ 'is-active': showModal }">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Add New Shoe</p>
          <button class="delete" @click="hideModal"></button>
        </header>
        <section class="modal-card-body">
          <div class="field">
            <label class="label">Name</label>
            <p class="control">
              <input class="input" type="text" placeholder="Vapor Max..." v-model="newShoe.name">
            </p>
          </div>
        </section>
        <footer class="modal-card-foot">
          <a class="button is-success" :disabled="!newShoe.name.length" @click="addSneaker(newShoe)">Save changes</a>
          <a class="button" @click="hideModal">Cancel</a>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import router from '../router'
import axios from 'axios'

export default {
  data() {
    return {
      items: [1,2,3],
      sneakers: null,
      showModal: false,
      newShoe: {
        name: ''
      }
    }
  },
  created () {
    this.fetchSneakers()
  },
  methods: {
    navigate(shoe) {
      router.push({ name: 'Sneaker', params: { id: shoe.id }})
    },
    hideModal() {
      this.showModal = false
      this.shoeName = ''
    },
    isValid() {
      return this.shoeName.length
    },
    addSneaker(shoe) {
      return axios.post('http://localhost:3000/sneakers', this.newShoe)
        .then((success) => {
          this.sneakers.push(success.data)
          this.navigate(success.data)
        })
        .catch((err) => {
          console.log(err);
          this.hideModal()
        })
    },
    fetchSneakers() {
      return axios.get('http://localhost:3000/sneakers.json')
        .then((result) => {
          let data = result.data

          this.sneakers = data.filter(sneaker => !sneaker.parent_id)
              .map((sneaker) => {
                sneaker.inventory = data.filter(s => s.parent_id === sneaker.id)
                return sneaker
              })
        })
        .catch(console.log)
    }
  }
}
</script>

<style lang="css" scoped>
  .columns { margin: 8px 4px; }
</style>
