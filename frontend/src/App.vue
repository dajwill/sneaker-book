<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
  #app { height: 100vh; }
  .hero.is-primary {
    height: 10vh;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 15px;
  }
</style>
