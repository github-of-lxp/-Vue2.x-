<template>
  <div id="comment" ref="comment">
    <div class="comment-wrapper">
      <div class="comment-head">
        <div class="left-rating">
          <div class="rating-font-color" style="font-size:24px;">{{sellers.score}}</div>
          <div class="el-font-size" style="margin-bottom:8px;">综合评分</div>
          <div class="el-font-size grey-font-color">高于周边商家{{sellers.rankRate}}%</div>
        </div>
        <div class="right-rating">
          <div class="rank-rating">
            <span class="el-font-size">服务态度</span>
            <span class="rating-star-wrapper">
              <template v-for="(i,index) in Math.floor(sellers.serviceScore)">
                <img :key="(i+index+10)" src="../../icon/star.png" />
              </template>
              <template v-for="i in 5-Math.floor(sellers.serviceScore)">
                <img :key="(i+100)" src="../../icon/star_grey.png" />
              </template>
            </span>
            <span class="el-font-size rating-font-color">{{sellers.serviceScore}}</span>
          </div>
          <div class="rank-rating">
            <span class="el-font-size">商品评分</span>
            <span class="rating-star-wrapper">
              <template v-for="(i,index) in Math.floor(sellers.foodScore)">
                <img :key="(i+index+10)" src="../../icon/star.png" />
              </template>
              <template v-for="i in 5-Math.floor(sellers.foodScore)">
                <img :key="(i+100)" src="../../icon/star_grey.png" />
              </template>
            </span>
            <span class="el-font-size rating-font-color">{{sellers.foodScore}}</span>
          </div>
          <div class="rank-rating">
            <span class="el-font-size">送达时间</span>
            <span class="el-font-size grey-font-color">{{sellers.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>

      <div class="split"></div>

      <div class="detail-food-rating">
        <div class="rating-select-container">
          <div class="rating-select" style="background:#00a0dc;color:white;" data-name="all" @click="selectRatingType">
            全部{{ratingType.all}}</div>
          <div class="rating-select black-font" style="background:rgba(0,160,220,0.2);" data-name="agree"
            @click="selectRatingType">满意{{ratingType.agree}}</div>
          <div class="rating-select black-font" style="background:rgba(77,85,93,0.2);" data-name="disagree"
            @click="selectRatingType">不满意{{ratingType.disagree}}</div>
        </div>
        <div class="rating-select-btn el-font-size">
          <img v-if="onlyRating" src="../../icon/onClick.png" @click="selectOnlyRating" />
          <img v-else-if="!onlyRating" src="../../icon/unonClick.png" @click="selectOnlyRating" />
          只看有内容的评价
        </div>
      </div>

      <div class="user-rating-container">
        <ul>
          <template v-for="(rating,index) in ratings">
            <li class="user-rating-list" :key="index" v-show="rating.typeshow&&rating.contentshow">
              <div class="user-avatar">
                <img :src="rating.avatar" />
              </div>
              <div class="user-rating-info">
                <div style="display:flex;justify-content: space-between;margin-bottom:4px;">
                  <span class="el-font-size">{{rating.username}}</span>
                  <span class="el-font-size grey-font-color">{{dateFormat(rating.rateTime)}}</span>
                </div>
                <div class="user-rating-score">
                  <span>
                    <template v-for="i in rating.score">
                      <img src="../../icon/star.png" style="width:10px;height:10px;" :key="i+10" />
                    </template>
                    <template v-for="i in 5-rating.score">
                      <img src="../../icon/star_grey.png" style="width:10px;height:10px;" :key="i+100" />
                    </template>
                  </span>
                  <span class="el-font-size grey-font-color" style="margin-left:5px;"
                    v-show="rating.deliveryTime!=''">{{rating.deliveryTime}}分钟送达</span>
                </div>
                <div class="user-rating-content el-font-size">{{rating.text}}</div>
                <div class="user-rating-recommend">
                  <span class="agree-icon" v-show="rating.recommend.length>0">
                    <img src="../../icon/agree.png" />
                  </span>

                  <template v-for="(recommend,index) in rating.recommend">
                    <span class="recommend-list el-font-size grey-font-color" :key="index">{{recommend}}</span>
                  </template>
                    <span v-show="myFlag"></span>
                </div>
              </div>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import {
    Component,
    Vue
  } from "vue-property-decorator";
  import BScroll from "better-scroll";
  @Component
  export default class Comment extends Vue {
    sellers = [];
    sellerRating = [];
    ratings = [{
      username: "",
      rateTime: 0,
      deliveryTime: 0,
      score: 0,
      rateType: 0,
      text: "",
      avatar: "",
      recommend: [],
      contentshow: true,
      typeshow: true
    }];
    ratingType = {
      all: 0,
      agree: 0,
      disagree: 0
    };
    onlyRating = false;
    myFlag=true
    
    selectRatingType(e: any) {
       this.myFlag=!this.myFlag
      let name = e.target.dataset.name;
      for (let i = 0; i < this.ratings.length; i++) {
        this.ratings[i].typeshow=false
        if (name == "all") {
          this.ratings[i].typeshow = true;
          
        } else if (name == "agree") {
          if (this.ratings[i].rateType == 0) {
            this.ratings[i].typeshow = true;
          } else {
            this.ratings[i].typeshow = false;
          }
        } else if (name == "disagree") {
          if (this.ratings[i].rateType == 1) {
            this.ratings[i].typeshow = true;
          } else {
            this.ratings[i].typeshow = false;
          }
        }
      }
    }

    selectOnlyRating() {
      this.onlyRating = !this.onlyRating;
      for (let i = 0; i < this.ratings.length; i++) {
        if (this.onlyRating) {
          if (this.ratings[i].text != "") {
            this.ratings[i].contentshow = true;
          } else {
            this.ratings[i].contentshow = false;
          }
        } else {
          this.ratings[i].contentshow = true;
        }
      }
    }
    dateFormat(timestamp: number): string {
      let date = new Date(timestamp);
      let year = date.getFullYear();
      let month: any = date.getMonth() + 1;
      let day: any = date.getDate();

      let hour = date.getHours();
      let minute:any = date.getMinutes();
      let second:any = date.getSeconds();

      if (month < 10) {
        month = "" + "0" + month;
      }
      if (day < 10) {
        day = "" + "0" + day;
      }
      if (minute < 10) {
        minute = "" + "0" + minute;
      }
      if (second < 10) {
        second = "" + "0" + second;
      }
      return (
        "" +
        year +
        "-" +
        month +
        "-" +
        day +
        " " +
        hour +
        ":" +
        minute +
        ":" +
        second
      );
    }
    
    created() {
      this.sellers = this.$store.state.sellers;
      let ratings = this.$store.state.ratings;
      this.ratingType.all = ratings.length;
      for (let i = 0; i < ratings.length; i++) {
        if (ratings[i].rateType == 0) {
          this.ratingType.agree += 1;
        } else {
          this.ratingType.disagree += 1;
        }
        ratings[i].contentshow = true;
        ratings[i].typeshow = true;
      }

      this.ratings = ratings;
    }
    mounted() {
      new BScroll(this.$refs.comment as HTMLElement, {
        click: true
      });
    }
  }
</script>


<style scoped lang="less">
  #comment {
    height: calc(100vh - 176px);
    overflow: hidden;
  }
  .user-rating-container {
    ul {
      margin: 0;
      padding: 0 18px;

      .user-rating-list {
        display: flex;
        padding: 18px 0;
        border-bottom: 1px solid #dddddd;

        .user-rating-info {
          width: 299px;

          .user-rating-recommend {
            text-align: left;
            display: flex;
            word-break: break-all;
            flex-wrap: wrap;

            span {
              display: block;
              height: 18px;
            }

            .recommend-list {
              border: 1px solid #93999f;
              border-radius: 3px;
              margin: 0 0 4px 8px;
              padding: 0 6px;
            }

            .agree-icon {
              line-height: 10px;

              img {
                display: inline-block;
                width: 12px;
                height: 12px;
              }
            }
          }

          .user-rating-content {
            font-weight: bold;
            text-align: left;
            margin-bottom: 8px;
          }

          .user-rating-score {
            text-align: left;
            line-height: 0;
            margin-bottom: 8px;

            img {
              margin-right: 3px;
            }
          }
        }

        .user-avatar {
          width: 28px;
          margin-right: 12px;

          img {
            width: 100%;
            border-radius: 100%;
          }
        }
      }

      li {
        list-style: none;
      }
    }
  }

  .split {
    height: 18px;
    border-top: 1px solid #dddddd;
    border-bottom: 1px solid #dddddd;
    background: #f3f5f7;
  }

  .rating-font-color {
    color: #ff9900;
  }

  .grey-font-color {
    color: #93999f;
  }

  .el-font-size {
    font-size: 12px;
  }

  .detail-food-rating {
    background: white;
    padding: 18px;
    border-bottom: 1px solid #dddddd;

    .rating-select-btn {
      color: #93999f;
      padding-top: 12px;
      text-align: left;
      line-height: 24px;

      img {
        display: inline-block;
        width: 24px;
        height: 24px;
        vertical-align: middle;
      }
    }

    .rating-select-container {
      display: flex;
      justify-content: left;
      border-bottom: 1px solid #dddddd;
      padding: 12px 0 18px 0;

      .rating-select {
        width: 57px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        font-size: 12px;
        margin-right: 8px;
        border-radius: 5px;
      }
    }
  }

  .comment-head {
    padding: 18px 0;
    display: flex;

    .right-rating {
      padding-left: 12px;

      .rank-rating {
        margin-bottom: 8px;
        text-align: left;
        line-height: 11px;

        span {
          margin-left: 12px;
        }
      }

      .rating-star-wrapper {
        img {
          height: 10px;
          width: 10px;
          display: inline-block;
          margin-right: 3px;
        }
      }
    }

    .left-rating {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 126px;
      padding: 0 6px;
      border-right: 1px solid #dddddd;
    }
  }
</style>