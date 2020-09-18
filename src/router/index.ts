import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from "@/components/Home.vue"

Vue.use(VueRouter)

  const routes: Array<RouteConfig> = [
    {
      name:"home",
      path:"/home",
      component:Home,
      children:[
        {
          name:"food",
          path:"food",
          component:()=>import("@/components/goods/Food.vue"),
          meta: { requireAuth: true, keepAlive: true }
        },
        {
          name:"seller",
          path:"seller",
          component:()=>import("@/components/goods/Seller.vue"),
          meta: { requireAuth: true, keepAlive: true }
        },
        {
          name:"comment",
          path:"comment",
          component:()=>import("@/components/goods/Comment.vue"),
          meta: { requireAuth: true, keepAlive: true }
        },
      ]
    },
    
]

const router = new VueRouter({
  mode:"history",
  routes
})

export default router
