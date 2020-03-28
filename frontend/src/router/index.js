import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home.vue'
import Login from '@/pages/auth/Login.vue'
import Register from '@/pages/auth/Register.vue'
import Profile from '@/pages/auth/Profile.vue'
import NotFound from '@/pages/misc/NotFound.vue'
import auth from '@/middleware/auth'
import admin from '@/middleware/admin'
Vue.use(Router)

let router

router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      meta: {
        middleware: auth
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    { path: '/404', component: NotFound },
    { path: '*', redirect: '/404' }
  ]
})

// Creates a `nextMiddleware()` function which not only
// runs the default `next()` callback but also triggers
// the subsequent Middleware function.
function nextFactory(context, middleware, index) {
  const subsequentMiddleware = middleware[index]
  // If no subsequent Middleware exists,
  // the default `next()` callback is returned.
  if (!subsequentMiddleware) return context.next

  return (...parameters) => {
    // Run the default Vue Router `next()` callback first.
    context.next(...parameters)
    // Then run the subsequent Middleware with a new
    // `nextMiddleware()` callback.
    const nextMiddleware = nextFactory(context, middleware, index + 1)
    subsequentMiddleware({ ...context,
      next: nextMiddleware
    })
  }
}

router.beforeEach((to, from, next) => {
  if (to.meta.middleware) {
    const middleware = Array.isArray(to.meta.middleware) ?
      to.meta.middleware :
      [to.meta.middleware]

    const context = {
      from,
      next,
      router,
      to,
    }
    const nextMiddleware = nextFactory(context, middleware, 1)

    return middleware[0]({ ...context,
      next: nextMiddleware
    })
  }

  return next()
})

export default router
