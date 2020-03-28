import store from '@/store'
import router from '@/router'
export default async function auth({ next, router }) {
  try {
    let token = await store.dispatch('user/checkToken')
    if(!token.user.isAdmin) {
      return router.push({ name: 'Home' })
    }
    return next()
  } catch (e) {
    return router.push({ name: 'Home' })
  }
}
