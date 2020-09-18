<template>
  <div class="shopcar">
    <div class="shopcar-list-container">
      <transition name="mask">
        <div class="mask" v-show="shopcar_Toggle" @click="showShopCar"></div>
      </transition>
      <div class="car-list" :style="shopcar_Toggle?'bottom:46px;':'bottom:-261px;'">
        <div class="list-header">
          <span>购物车</span>
          <span @click="clear_ShopCar">清空</span>
        </div>
        <div class="list-body" ref="shopcarlist">
          <ul ref="list">
            <template v-for="(good,good_index) in shopcar">
              <template v-for="(food,food_index) in good">
                <li :key="good_index+food.name" v-if="food.num>0">
                  <span>{{food.name}}</span>
                  <span>
                    <div
                      class="price"
                      style="color:red;font-size:14px;margin-right:15px;"
                    >￥{{food.num*food.price}}元</div>
                    <div class="control">
                      <div class="control-icon" @click="subItem(good_index,food_index)">-</div>
                      <div style="color:#999999;font-size:14px;margin:0 10px;">{{food.num}}</div>
                      <div class="control-icon" @click="addItem(good_index,food_index,$event)">+</div>
                    </div>
                  </span>
                </li>
              </template>
            </template>
          </ul>
        </div>
      </div>
    </div>
    <div class="icon">
      <div class="total-num" v-show="totalNum>0">{{totalNum}}</div>
      <div
        class="container"
        :style="totalPrice>0?'background:#007fff;':''"
        @click="showShopCar"
        ref="shopcaricon"
      >
        <img src="../icon/shopcar.png" />
      </div>
    </div>
    <div class="totalprice" :style="totalPrice>0?'color:white;':''">￥{{totalPrice}}</div>
    <div class="msg">另需配送费￥4元</div>
    <template>
      <div class="append append-unenough" v-if="totalPrice==0">￥20元起送</div>
      <div
        class="append append-unenough"
        v-else-if="totalPrice>0 && totalPrice<20"
      >还差￥{{20-totalPrice}}元起送</div>
      <div class="append append-enough" v-else-if="totalPrice>=20" @click="pay">去结算</div>
    </template>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import BScroll from "@better-scroll/core";
@Component
export default class ShopCar extends Vue {
  @Prop() private shopcar!: any[];

  shopcar_Toggle = false;
  scroll = {
    refresh: function() {
      return;
    }
  };
  pay() {
    alert("需要支付" + (this.totalPrice + 4) + "元");
  }
  clear_ShopCar() {
    this.showShopCar();
    for (let i = 0; i < this.shopcar.length; i++) {
      for (let j = 0; j < this.shopcar[i].length; j++) {
        this.shopcar[i][j].num = 0;
      }
    }
  }

  showShopCar() {
    if (this.totalNum > 0) {
      this.shopcar_Toggle = !this.shopcar_Toggle;
    } else {
      this.shopcar_Toggle = false;
    }
  }
  addItem(index1: number, index2: number, e: any): void {
    if (this.shopcar[index1][index2].num < 10) {
      this.shopcar[index1][index2].num++;
    } else {
      alert("最多只能购买十份");
    }
  }
  subItem(index1: number, index2: number): void {
    let num = this.shopcar[index1][index2].num;
    if (num > 0) {
      this.shopcar[index1][index2].num--;
    } else {
      this.shopcar[index1][index2].num = 0;
    }
    if (this.totalNum == 0) {
      this.showShopCar();
    }
  }
  mounted() {
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.shopcarlist as HTMLElement, {
        click: true,
        scrollY: true
      });
    });
  }

  @Watch("totalNum")
  numChange() {
    this.$nextTick(() => {
      try {
        this.scroll.refresh();
      } catch {
        //
      }
    });
  }
  get totalNum(): number {
    let totalnum = 0;
    for (let i = 0; i < this.shopcar.length; i++) {
      for (let j = 0; j < this.shopcar[i].length; j++) {
        totalnum += this.shopcar[i][j].num;
      }
    }
    return totalnum;
  }
  get totalPrice(): number {
    let totalprice = 0;
    for (let i = 0; i < this.shopcar.length; i++) {
      for (let j = 0; j < this.shopcar[i].length; j++) {
        totalprice += this.shopcar[i][j].price * this.shopcar[i][j].num;
      }
    }

    return totalprice;
  }
}
</script>

<style scoped lang="less">
@keyframes mask {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
.mask-enter-active {
  animation: mask 0.2s ease reverse;
}
.mask-leave-active {
  animation: mask 0.2s ease;
}
.shopcar-list-container {
  position: absolute;
  width: 100%;
  bottom: 0;
  .mask {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(10px);
    z-index: -1;
  }
  .car-list {
    z-index: -1;
    transition: ease all 0.5s;
    position: absolute;
    width: 100%;
    background: white;
    .list-body {
      max-height: 220px;
      position: relative;
      overflow: hidden;
      ul {
        padding: 0 18px;
        margin: 0;
        li {
          border-bottom: 1px solid #dddddd;
          list-style: none;
          height: 48px;
          position: relative;
          span:nth-child(1) {
            font-size: 14px;
            color: black;
            line-height: 48px;
            float: left;
          }
          span:nth-child(2) {
            div {
              display: inline-block;
            }

            float: right;
            height: 48px;
            .control {
              .control-icon {
                width: 16px;
                height: 16px;
                font-size: 16px;
                border: 2px solid #00a0dc;
                color: #00a0dc;
                line-height: 16px;
                text-align: center;
                border-radius: 100%;
              }
            }
          }
        }
      }
    }
    .list-header {
      height: 40px;
      line-height: 40px;
      padding: 0 18px;
      background: #f3f5f7;
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);
      span {
        display: block;
        height: 40px;
        font-size: 14px;
        color: black;
      }
      span:nth-child(1) {
        float: left;
        color: #07111b;
      }
      span:nth-child(2) {
        float: right;
        color: #00a0dc;
      }
    }
  }
}
.shopcar {
  display: flex;
  background: #141d27;
  color: hsla(0, 0%, 100%, 0.4);
  width: 100%;
  height: 46px;
  .msg,
  .append {
    line-height: 46px;
    font-size: 12px;
    font-weight: bold;
    width: 140px;
  }
  .msg {
    text-align: left;
  }
  .append {
    text-align: center;
    width: 100px;
  }
  .append-unenough {
    background: #2b333b;
  }
  .append-enough {
    background: #00b43c;
    color: white;
  }
  .totalprice {
    font-size: 16px;
    font-weight: bold;
    margin: 10px 10px 10px 5px;
    padding-right: 10px;
    height: 26px;
    line-height: 26px;
    vertical-align: middle;
    border-right: 1px solid hsla(0, 0%, 100%, 0.4);
  }
  .icon {
    position: relative;
    width: 56px;
    height: 56px;
    border-radius: 100%;
    margin: 0 15px;
    background: #141d27;
    transform: translateY(-10px);
    .total-num {
      position: absolute;
      background: red;
      right: 0;
      top: 0;
      width: 24px;
      height: 16px;
      border-radius: 16px;
      z-index: 10;
      color: white;
      text-align: center;
      line-height: 16px;
      font-weight: bold;
      font-size: 9px;
    }
    .container {
      position: absolute;
      width: 44px;
      height: 44px;
      border-radius: 100%;
      background: #2b343c;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;

      img {
        vertical-align: middle;
        width: 50%;
      }
    }
  }
}
</style>
