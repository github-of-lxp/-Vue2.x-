<template>
  <div id="seller" ref="seller">
    <div class="seller-wrapper" id="seller-wrapper">
      <div class="seller-top">
        <div style="border-bottom:1px solid #dddddd;">
          <div class="seller-name">{{seller.name}}</div>
          <div class="seller-rating">
            <div>
              <template v-for="i in Math.floor(seller.score)">
                <img src="../../icon/star.png" style="width:15px;height:15px;" :key="i+10" />
              </template>
              <template v-for="i in 5-Math.floor(seller.score)">
                <img src="../../icon/star_grey.png" style="width:15px;height:15px;" :key="i+100" />
              </template>
            </div>
            <span class="el-font-size grey-font-color">({{seller.ratingCount}})</span>
            <span class="el-font-size grey-font-color">月售{{seller.sellCount}}单</span>
          </div>
          <div class="seller-store">
            <div class="heart">
              <img @click="store=!store" src="../../icon/redHeart.png" v-if="store"/>
              <img @click="store=!store" src="../../icon/greyHeart.png" v-else-if="!store"/>
            </div>
            <div class="el-font-size grey-font-color" v-if="store">已收藏</div>
            <div class="el-font-size grey-font-color" v-else-if="!store">收藏</div>
          </div>
        </div>
        <div class="info-item-list">
          <div class="info-item">
            <div class="el-font-size grey-font-color info-title">起送价</div>
            <div class="el-font-size"><span class="el-large-font-size">{{seller.minPrice}}</span>元</div>
          </div>
          <div class="info-item">
            <div class="el-font-size grey-font-color info-title">商家配送</div>
            <div class="el-font-size"><span class="el-large-font-size">{{seller.deliveryPrice}}</span>元</div>
          </div>
          <div class="info-item">
            <div class="el-font-size grey-font-color info-title">平均配送时间</div>
            <div class="el-font-size"><span class="el-large-font-size">{{seller.deliveryTime}}</span>分钟</div>
          </div>
        </div>
      </div>
      <div class="split"></div>
      <div class="seller-middle" style="padding-bottom: 0;">
        <div class="seller-name">公告与活动</div>
        <div class="seller-info el-font-size">{{seller.bulletin}}</div>
        <div class="seller-coupon-container">
          <ul>
            <template v-for="(support,index) in seller.supports">
              <li class="seller-coupon-list el-font-size" :key="index">
                <span>
                  <img src="../../icon/decrease_3@3x.png" v-if="support.type==0"/>
                  <img src="../../icon/discount_2@3x.png" v-else-if="support.type==1" />
                  <img src="../../icon/guarantee_3@3x.png" v-else-if="support.type==2" />
                  <img src="../../icon/invoice_3@3x.png" v-else-if="support.type==3" />
                  <img src="../../icon/special_3@3x.png" v-else-if="support.type==4" />
                </span>
                <span>{{support.description}}</span>
              </li>
            </template>
          </ul>
        </div>
      </div>
      <div class="split"></div>
      <div class="seller-bottom">
        <div class="seller-name">商家实景</div>
        <div class="seller-image" ref="image">
          <ul ref="imageUl">
            <template v-for="(pic,index) in seller.pics">
              <li class="seller-image-list" :key="index"><img  :src="pic" @click="selectImage(pic)"/></li>
            </template>
          </ul>
        </div>
      </div>
      <div class="split"></div>
      <div class="seller-bottom-info" style="padding-bottom:0;">
        <div class="seller-name">商家信息</div>
        <ul>
          <template v-for="(info,index) in seller.infos">
            <li class="el-font-size" :key="index">{{info}}</li>
          </template>
        </ul>
      </div>
    </div>
    <transition name="scala">
      <div class="scalaImage" v-show="showScalaImage" id="scalaImage">
        <img :src="scalaImageSrc">
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
  import {
    Component,
    Vue,
    Watch
  } from 'vue-property-decorator';
  import BScroll from 'better-scroll'
  @Component
  export default class Seller extends Vue {
    seller: any = this.$store.state.sellers;
    store=false
    scalaImageSrc=""
    showScalaImage=false

    selectImage(src:string){
      this.scalaImageSrc=src
      this.showScalaImage=true
    }
    created(){
      this.$nextTick(()=>{
        new BScroll((this.$refs.seller as HTMLElement),{
         click:true,
          scrollY:true
        })
        new BScroll((this.$refs.image as HTMLElement),{
          scrollX:true,
          scrollY:false
        })
      })
    }
    mounted(){
      this.$nextTick(()=>{
        let item:any=document.getElementById("scalaImage");
        item.ontouchstart=(e:any)=>{
          e.stopPropagation();
          let startY=e.changedTouches[0].clientY
          item.ontouchmove=(e:any)=>{
            let clientY=e.changedTouches[0].clientY
            item.style.transform="scale("+(1-(clientY-startY)/500)+")"
            item.style.top=(clientY-startY)*0.5+"px";
            item.ontouchend=(e:any)=>{
              let endY=e.changedTouches[0].clientY
              if(endY-startY>200){
                this.showScalaImage=false
                setTimeout(()=>{
                  item.style.transform="scale(1)"
                },550)
              }else{
                item.style.transform="scale(1)"
              }
              item.style.top=0
            }
        }
        }
      })
    }
  }
</script>


<style scoped lang="less">
.scala-enter-active,
.scala-leave-active {
    transition: ease 0.5s all;
}
.scala-enter,.scala-leave-to{
    opacity:0;
}
.scalaImage{
  position: fixed;
  background: black;
  width: 100%;
  height:100%;
  left: 0;
  top:0;
  img{
    position: absolute;
    top:50%;
    transform: translateY(-50%);
    width:100%;
    left:0;
  }
}
  ul {
    margin: 0;
    padding: 0;

    li {
      list-style: none;
    }
  }
  .seller-bottom-info{
    
    li{
      padding: 16px 12px;
      border-top: 1px solid #dddddd;
      text-align: left;
    }
  }
  .seller-bottom{
    ul{
      display:flex;
      flex-wrap:nowrap;
      width:510px;
    }
    .seller-image-list{
      margin-right: 10px;
      display: inline-block;
      img{
        width:120px;
        height:90px;
      }
    }
  }
  #seller{
    height: calc(100vh - 176px);
    overflow: hidden;
  }
  #seller>div>[class^="seller"] {
    padding: 18px;
    position: relative;
    border-bottom: 1px solid #dddddd;
  }

  .seller-name {
    font-size: 14px;
    font-weight: 700;
    text-align: left;
    margin-bottom: 8px;
  }

  .seller-middle {
    .seller-coupon-container {
      .seller-coupon-list {
        padding: 16px 12px;
        border-bottom: 1px solid #dddddd;
        text-align: left;

        img {
          margin-right: 10px;
          vertical-align:text-bottom;
          width: 16px;
          height: 16px;
        }

      }

      .seller-coupon-list:last-child {
        border: none;
      }
    }

    .seller-info {
      padding: 0 12px 16px 12px;
      color: #f01414;
      text-align: justify;
      line-height: 24px;
      border-bottom: 1px solid #dddddd;
    }

  }

  .seller-top {
    .info-item-list {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

    }

    .info-item {
      margin-top: 18px;
      text-align: center;
      width: 112px;
    }

    .info-item:nth-child(2) {
      border-left: 1px solid #dddddd;
      border-right: 1px solid #dddddd;
    }

    .seller-store {
      position: absolute;
      width: 50px;
      right: 12px;
      top: 18px;
      text-align: center;

      .heart {
        width: 30px;
        height: 30px;
        margin: 0 auto;

        img {
          width: 100%;
        }
      }
    }

    .seller-rating {
      text-align: left;
      line-height: 15px;
      margin-bottom: 18px;

      div {
        display: inline-block;
      }

      span {
        margin-right: 10px;
      }

      img {
        display: inline-block;
        margin-right: 5px;
      }
    }
  }

  .split {
    height: 18px;
    border-top: 1px solid #dddddd;
    border-bottom: 1px solid #dddddd;
    background: #f3f5f7;
  }

  .grey-font-color {
    color: #93999f;
  }

  .el-font-size {
    font-size: 12px;
  }

  .el-large-font-size {
    font-size: 24px;
  }
</style>