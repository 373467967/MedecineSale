import Vue           from 'vue'
import Router        from 'vue-router'
import store         from '@/store'
import ShoppingCar   from '@/pages/shoppingcar'
import Mine          from '@/pages/mine'
import Classify      from '@/pages/classify'
import Home          from '@/pages/home'
import Details       from '@/pages/details'
import LoginRegister from '@/pages/login-register'
import Personal      from '@/pages/personal'
import Address       from '@/pages/address'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      beforeEnter:(to, from, next) => {
        store.commit('changeTitle','我在卖药');
        store.commit('changeLeft','0');
        next();
      }
    },
    {
      path: '/classify',
      name: 'Classify',
      component: Classify,
      beforeEnter:(to, from, next) => {
        store.commit('changeTitle','分类');
        store.commit('changeLeft','25%');
        next();
      }
    },
    {
      path: '/shoppingCar',
      name: 'ShoppingCar',
      component: ShoppingCar,
      beforeEnter:(to, from, next) => {
        store.commit('changeTitle','购物车');
        store.commit('changeLeft','50%');
        next();
      }
    },
    {
      path: '/mine',
      name: 'Mine',
      component: Mine,
      beforeEnter:(to, from, next) => {
        store.commit('changeTitle','个人中心');
        store.commit('changeLeft','75%');
        next();
      }
    },
    {
      path:'/details',
      name:'Details',
      component:Details,
      beforeEnter:(to, from, next) => {
        store.commit('changeTitle','详情页');
        next();
      }
    },
    {
      path:'/login-register',
      name:'LoginRegister',
      component:LoginRegister,
      beforeEnter:(to, from, next) => {
        store.commit('changeTitle','登录');
        next();
      }
    },
    {
      path:'/personal',
      name:'Personal',
      component:Personal,
      beforeEnter:(to, from, next) => {
        store.commit('changeTitle','个人资料修改');
        next();
      }
    },
    {
      path:'/address',
      name:'Address',
      component:Address,
      beforeEnter:(to, from, next) => {
        store.commit('changeTitle','收货地址');
        next();
      }
    }
  ]
})
