<template lang="html">
  <div id="home">
    <section class="hero is-primary">
      <h1 class="title">StockX</h1>
    </section>

    <div class="columns">
      <div v-for="i in items" class="column is-one-third">
        <div class="card" @click="navigate">
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
      </div>
    </div>
  </div>
</template>

<script>
import router from '../router'

export default {
  data() {
    return {
      items: [1,2,3]
    }
  },
  methods: {
    navigate(e) {
      console.log(e);
      router.push({ name: 'Sneaker', params: { id: 1 }})
    }
  }
}
</script>

<style lang="css" scoped>
  .hero.is-primary {
    padding: 10px 0;
    margin-bottom: 15px;
  }
  .hero .title { margin: 0 auto; }
</style>
