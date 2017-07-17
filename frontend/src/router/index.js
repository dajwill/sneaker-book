import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Sneaker from '@/components/Sneaker'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', name: 'Home', component: Home },
    { path: '/sneaker/:id', name: 'Sneaker', component: Sneaker }
  ]
})
