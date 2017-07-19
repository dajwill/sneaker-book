<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
}
</script>

<style>
  #app { height: 100vh; }
  .hero.is-primary {
    height: 10vh;
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    justify-content: space-between;
    /*margin-bottom: 15px;*/
  }
  .hero h1 { margin-bottom: 0 !important; }
  .hero i {
    margin-right: 15px;
    font-size: 24px;
  }
</style>
