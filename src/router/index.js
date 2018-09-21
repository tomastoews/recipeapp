import Vue from 'vue';
import Router from 'vue-router';
import Dashboard from '@/components/Dashboard';
import CreateRecipe from '@/components/CreateRecipe';
import EditRecipe from '@/components/EditRecipe';
import ViewRecipe from '@/components/ViewRecipe';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/recipe/create',
      name: 'createrecipe',
      component: CreateRecipe
    },
    {
      path: '/recipe/edit/:id',
      name: 'editrecipe',
      component: EditRecipe
    },
    {
      path: '/recipe/:id',
      name: 'viewrecipe',
      component: ViewRecipe
    }
  ],
  mode: 'history'
});
