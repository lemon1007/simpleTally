import Vue from 'vue';
import VueRouter from 'vue-router';
import Money from '@/views/Money.vue';
import Labels from '@/views/Labels.vue';
import Statistics from '@/views/Statistics.vue';
import NotFound from '@/views/NotFound.vue';
import AddTag from '@/views/AddTag.vue';
import EditLabel from '@/views/EditLabel.vue';
import Charts from '@/views/Charts.vue';


Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/money'
  },
  {
    path: '/money',
    name: 'money',
    component: Money
  },
  {
    path: '/add-tag',
    name: 'add-tag',
    component: AddTag
  },
  {
    path: '/labels',
    name: 'labels',
    component: Labels
  },
  {
    path: '/labels/edit/:id',
    component: EditLabel
  },
  {
    path: '/statistics',
    name: 'statistics',
    component: Statistics
  },
  {
    path: '/charts',
    name: 'charts',
    component: Charts
  },
  {
    path: '*',
    name: 'notfound',
    component: NotFound
  }
];

const router = new VueRouter({
  routes
});

export default router;
