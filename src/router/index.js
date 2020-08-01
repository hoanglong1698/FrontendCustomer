import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: { title: 'LH Bank - Login', },
    component: () =>
      import( /* webpackChunkName: "login" */ '../views/Login.vue'),
  },
  {
    path: '/employee',
    name: 'employee',
    meta: { requiresAuth: true, title: 'LH Bank - Employee', },
    component: () =>
      import( /* webpackChunkName: "employee" */ '../views/Employee/Employee.vue'),
  },
  {
    path: '/admin',
    name: 'admin',
    meta: { requiresAuth: true, title: 'LH Bank - Admin' },
    beforeEnter: checkAdmin,
    component: () =>
      import( /* webpackChunkName: "employee" */ '../views/Admin/Admin.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () =>
      import( /* webpackChunkName: "login" */ '../views/Login.vue'),
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (localStorage.getItem('access_token')) {
      next()
      return
    }
    next('/login')
  }
  next()
})

router.afterEach((to) => {
  Vue.nextTick(() => {
      document.title = to.meta.title || "LH Bank";
  });
});

function checkAdmin(to, from, next) {
  const role = localStorage.role
  if (role == "ADMIN") {
    next();
  }
  next('/login');
}

export default router
