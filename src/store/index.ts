import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import { getInfo } from "../api/index"
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
