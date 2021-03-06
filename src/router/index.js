import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Register from '@/components/register'
import UserList from '@/components/UserList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path:"/register",
      name:"Register",
      component:Register
    },
    {
      path:'/userlist',
      name:"UserList",
      component:UserList
    }
  ]
})
