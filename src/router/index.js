import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Login from '@/components/Login';
import Cockpit from '@/components/Cockpit';
import Tree from '@/components/Tree';
import Newtree from '@/components/Newtree';
import Tab from '@/components/Tab';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/cockpit',
      name: 'Cockpit',
      component: Cockpit,
    },
    {
      path: '/tree',
      name: 'Tree',
      component: Tree,
    },
    {
      path: '/newtree',
      name: 'Newtree',
      component: Newtree,
    },
    {
      path: '/tab',
      name: 'Tab',
      component: Tab,
    },
  ],
});
