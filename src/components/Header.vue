<template>
  <div class="head">
    <transition name="detail">
      <div class="detail-container" v-show="detailShow">
        <div class="detail-head">
          {{seller.name}}
          <div class="star-container">
            <template v-for="i in Math.floor(seller.score)">
              <span class="star" :key="i"></span>
            </template>
            <template v-for="i in (5-Math.floor(seller.score))">
              <span class="star-grey" :key="i+10"></span>
            </template>
          </div>
        </div>
        <div class="detail-coupon">
          <div class="title">
            <span class="line"></span>
            优惠信息
            <span class="line"></span>
          </div>

          <template v-for="support in seller.supports">
            <div class="coupon-list" :key="support.type">
              <span class="support-icon"></span>
              <span>{{support.description}}</span>
            </div>
          </template>
        </div>
        <div class="detail-notice">
          <div class="title">
            <span class="line"></span>
            商家公告
            <span class="line"></span>
          </div>
          <div class="bulletin">
            <span>{{seller.bulletin}}</span>
          </div>
        </div>
        <div class="detail-close">
          <div class="close-icon" @click="detailShow=false">+</div>
        </div>
      </div>
    </transition>
    <div class="content-wapper">
      <div class="avatar">
        <img alt v-bind:src="seller.avatar" />
      </div>
      <div class="seller-info">
        <div class="info-list">
          <img src="../icon/brand@3x.png" />
          <span class="seller-name">{{seller.name}}</span>
        </div>
        <div class="info-list">
          <div class="seller-info-list">{{seller.description}}/ {{seller.deliveryTime}}分钟送达</div>
        </div>
        <div class="info-list">

          <img src="../icon/discount_2@3x.png" class="mini-icon" />

          <span class="seller-info-list" style="margin-left:10px;">{{seller.supports[1].description}}</span>
        </div>
      </div>
      <div class="coupon">
        <div class="coupon-button" @click="detailShow=true">{{seller.supports.length}}个 ></div>
      </div>
    </div>
    <div class="background">
      <img alt v-bind:src="seller.avatar" />
    </div>
    <div class="declear">
      <div class="icon"></div>
      <div class="text">{{seller.bulletin}}</div>
    </div>
  </div>
</template>

<script lang="ts">
  import {
    Vue,
    Component
  } from "vue-property-decorator";

  @Component
  export default class Header extends Vue {
    seller: any = this.$store.state.sellers;
    detailShow = false;
  }
</script>

<style scoped lang="less">
  .detail-enter-active,
  .detail-leave-active {
    transition: .5s all ease;
  }

  .detail-enter,
  .detail-leave-to {
    opacity: 0;
  }

  .title {
    margin: 28px auto 24px;
  }

  .line {
    display: inline-block;
    width: 110px;
    border-bottom: 1px solid hsla(0, 0%, 100%, 0.2);
    transform: translateY(-5px);
  }

  .detail-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    z-index: 999;
    position: fixed;
    max-width: 540px;
    top: 0;
    left: 0;
    right: 0;
    margin: 0 auto;
    width: 100%;
    height: 100%;
    overflow: auto;
    background: rgba(7, 17, 27, 0.8);
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    color: white;

    .detail-close {
      .close-icon {
        width: 48px;
        height: 48px;
        border-radius: 100%;
        margin: 0 auto;
        transform: rotate(45deg);
        line-height: 48px;
        text-align: center;
        font-size: 48px;
        font-weight: normal;
      }
    }

    .detail-notice {
      padding-bottom: 64px;

      .bulletin {
        padding: 0 12px;
        margin: 0 25.5px;
        color: white;
        font-size: 12px;
        line-height: 24px;
        text-align: justify;
      }
    }

    .detail-coupon {
      .coupon-list {
        height: 28px;
        line-height: 28px;
        font-size: 12px;
        text-align: left;
        margin: 0 25px;
        padding: 0 12px;

        span {
          display: inline-block;
          margin: 0 3px;
        }

        .support-icon {
          width: 16px;
          height: 16px;
          background: url("../icon/discount_2@3x.png");
          background-size: 16px 16px;
          line-height: 28px;
          vertical-align: middle;
        }
      }
    }

    [class^="detail"] {
      font-weight: bold;
      font-size: 16px;
    }

    .detail-head {
      margin-top: 36px;
      line-height: 16px;
      text-align: center;
      font-weight: 700;

      .star-container {

        .star,
        .star-grey {
          display: inline-block;
          width: 20px;
          height: 20px;
          margin: 20px 10px 0 10px;
        }

        .star {
          background: url("../icon/star.png");
          background-size: 20px 20px;
        }

        .star-grey {
          background: url("../icon/star_grey.png");
          background-size: 20px 20px;
        }
      }
    }
  }

  .content-wapper {
    padding: 24px 12px 18px 24px;
    display: flex;
    height: 68px;

    .coupon {
      position: relative;
      color: white;
      font-size: 12px;
      width: 70px;

      .coupon-button {
        position: absolute;
        right: 0;
        bottom: 0;
        height: 24px;
        line-height: 24px;
        background: rgba(24, 24, 24, 0.6);
        border-radius: 10px;
        width: 48px;
      }
    }

    .avatar {
      width: 64px;
      height: 64px;

      img {
        width: 100%;
      }
    }

    .seller-info {
      margin-left: 20px;
      .info-list {
        text-align: left;
        font-size: 0;

        .seller-info-list {
          font-size: 12px;
          color: white;
        }

        .seller-info-list>div {
          display: inline-block;
        }

        .seller-name {
          color: white;
          font-size: 16px;
          margin-left: 10px;
          font-weight: bold;
        }

        img {
          width: 30px;
          height: 18px;
          vertical-align: bottom;
        }

        .mini-icon {
          width: 12px;
          height: 12px;
          vertical-align: baseline;
        }


      }
    }
  }

  .info-list:nth-child(2) {
    margin: 8px 0 6px 0;
  }

  .content-wapper::after {
    content: "";
    position: absolute;
    background: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 110px;
    left: 0;
    top: 0;
    z-index: -1;
  }

  .background {
    position: absolute;
    z-index: -2;
    width: 100%;
    height: 110px;
    top: 0;
    left: 0;

    img {
      width: 100%;
      height: 100%;
      filter: blur(10px);
    }
  }

  .declear {
    position: relative;
    width: 100%;
    display: flex;
    height: 26px;
    text-overflow: ellipsis;
    background: rgba(7, 17, 27, 0.8);
    overflow: hidden;

    .icon {
      display: inline-block;
      width: 22px;
      height: 12px;
      margin-left: 10px;
      background: url("../icon/bulletin@3x.png");
      background-size: 22px 12px;
      vertical-align: middle;
      margin-top: 7px;
    }

    .text {
      display: inline-block;
      color: white;
      font-size: 10px;
      width: 338px;
      padding: 0 5px;
      line-height: 26px;
    }
  }
</style>