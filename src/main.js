import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

let app = Vue.extend(App);

let router = new VueRouter({
  linkActiveClass: 'active',
});

router.start(app, '#app');

