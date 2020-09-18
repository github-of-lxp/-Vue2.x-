# my-element

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```


### 项目组件结构
---components  

------Header.vue  

------ShopCar.vue  

------Home.vue 

------goods 

------------Food.vue 

------------Seller.vue 

------------Comment.vue 

### 第一步，配置vue-router
采用路由懒加载方式，动态引入component
```javascript
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

```

### 第二步，配置api
###### 采用本地模拟请求的方式，data.json位于public文件夹
###### 新建api文件夹，新建index.ts文件
```javascript
import axios from 'axios'
const baseUrl="http://localhost:8080/data.json"
export const getInfo = () => {
  return new Promise((resolve, reject) => {
    axios.get(baseUrl)
      .then(res => {
        if(res.status==200){
          resolve(res)
        }else{
          reject(res)
        }
      })
      .catch(err => {
        reject(err)
      })
  })
}
```
### 第三步，配置Vuex,新建store文件，新建index.ts
```javascript
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    goods: [],
    sellers: [],
    shopcar: [],
    ratings:[]
  },
  mutations: {

  },
  actions: {
    getGoods(context: any,goods:any) {
        context.state.goods = goods
        const shopcar: any[] = []
        for (let i = 0; i < goods.length; i++) {
          shopcar.push([])
          for (let j = 0; j < goods[i].foods.length; j++) {
              shopcar[i].push({
                name: goods[i].foods[j].name,
                price: goods[i].foods[j].price,
                num: 0
              })
          }
        }
        context.state.shopcar=shopcar
    },
    getSellers(context:any,sellers:any){
      context.state.sellers = sellers
    },
    getRatings(context:any,ratings:any){
      context.state.ratings = ratings
    },
  },
  modules: {
  }
})

```
### 最后附上app.vue和main.ts的代码
###### app.vue
```javascript
<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
  import { Component,Vue } from 'vue-property-decorator';
  import Home from '@/components/Home.vue'
  
  @Component({
    components:{
      Home
    }
  })
  export default class App extends Vue {
      //创建的时候默认跳转到/home/food
      created(){
       this.$router.replace("/home/food")
      }
  } 

</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

```
###### main.ts
```javascript
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
Vue.prototype.$store=store
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

```
### 最后是项目效果图
