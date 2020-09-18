<template>
  <div id="home">
    <template v-if="flag">
      <Header></Header>
      <div class="item-container">
        <router-link :to="i.path" :style="i.isActive?'color:red;':''" v-for="(i,index) in item" :key="index"
          @click.native="selectItem(index)">
          {{i.text}}
        </router-link>
      </div>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </template>
  </div>
</template>

<script lang="ts">
  import {
    Component,
    Vue
  } from 'vue-property-decorator';
  import Header from '@/components/Header.vue'
  import { getInfo } from '../api/index'
  import axios from 'axios'
  @Component({
    components: {
      Header
    }
  })
  export default class Home extends Vue {
    item: any[] = [{
        text: '商品',
        isActive: true,
        path: "food"
      },
      {
        text: '评价',
        isActive: false,
        path: "comment"
      }, {
        text: '商家',
        isActive: false,
        path: "seller"
      }
    ];
    flag=false
    beforeCreate(){
      let data={
        id:1,
        name:"李达康",
        phone:"",
        idCard:"",
        address:"汉东省京州市",
        corporation:"汉东省京州市市委办公室"
      }
      // axios.post("http://192.168.0.6:8000/users",{data:data}).then(res=>{
      //   console.log(res)
      // })
      getInfo()
      .then((res:any)=>{
        this.$store.dispatch('getGoods',res.data.goods)
        this.$store.dispatch('getSellers',res.data.seller)
        this.$store.dispatch('getRatings',res.data.ratings)
        this.flag=true
      })
    }
    selectItem(val: number): void {
      for (let i = 0; i < this.item.length; i++) {
        i == val ? this.item[i].isActive = true : this.item[i].isActive = false
      }
    }
  }
</script>


<style scoped lang="less">
  .active {
    color: red;
  }

  .item-container {
    display: flex;
    border-bottom: 1px solid #dddddd;

    a {
      display: block;
      width: 125px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      font-size: 16px;
      text-decoration: none;
      color: black;
    }

  }
</style>