<template>
    <div id="food">
        <div class="body" ref="body">
            <div class="nav-list-wrapper" ref="menuWrapper">
                <ul>
                    <template v-for="(good,index) in goods">
                        <li :key="index" class="menu-list" @click="selectItem(index)"
                            :style="getPos==index?'font-weight:bold;background:white;':''">
                            <span class="text">
                                <img src="../../icon/special_3@3x.png" v-if="good.type>=1" />
                                {{good.name}}
                            </span>
                        </li>
                    </template>
                </ul>
            </div>

            <div class="food-list-wrapper" ref="foodsWrapper">
                <ul>
                    <template v-for="(good,good_index) in goods">
                        <div class="lists" :key="good.name" ref="foodList">
                            <div class="foot-class">{{good.name}}</div>
                            <template v-for="(food,food_index) in good.foods">
                                <li class="food-list" :key="good.name+food.name">
                                    <div class="food-img" @click="showFood(good_index,food_index)">
                                        <img alt="food" :src="food.image" />
                                    </div>
                                    <div class="food-info">
                                        <div class="food-name">{{food.name}}</div>
                                        <div class="food-description" v-if="food.description!=''">{{food.description}}
                                        </div>
                                        <div class="food-rate">
                                            <span>月售{{food.sellCount}}份</span>
                                            <span>好评率{{food.rating}}%</span>
                                        </div>
                                        <div class="food-price">
                                            <div class="price">￥{{food.price}}</div>
                                            <div class="number" v-if="(typeof shopcar[good_index][food_index].num)=='number'">
                                                <div class="symbol-add" @click="subItem(good_index,food_index)">-</div>
                                                <div class="number-text" >{{shopcar[good_index][food_index].num}}</div>
                                                
                                                <div class="symbol-sub" @click="addItem(good_index,food_index,$event)">+
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            </template>
                        </div>
                    </template>
                </ul>
            </div>
        </div>
        <div class="foot">
            <ShopCar :shopcar="shopcar"></ShopCar>
        </div>
        <transition name="food">
            <div class="detail-food-contaienr" v-show="foodShow" ref="detail">

                <div>
                    <div class="close-btn" @click="foodShow = false">+</div>
                    <div class="food-image-l">
                        <img :src="detail.path" />
                    </div>
                    <div class="detail-food-info">
                        <div class="el-info">
                            <h1>{{detail.name}}</h1>
                            <div style="margin-bottom:18px;height:10px;line-height:10px;">
                                <span>月售{{detail.sellCount}}份</span>
                                <span style="margin-left:15px;">好评率{{detail.rating}}%</span>
                            </div>
                        </div>
                        <div class="el-price-info">
                            <span style="color:red;font-size:14px;display:block;">￥{{detail.price}}</span>

                            <button style="position:absolute;right:18px;" @click="addFood(detail.index)"
                                v-show="shopcar[detail.index[0]][detail.index[1]].num==0">加入购物车</button>

                            <div class="detail-operation" v-show="shopcar[detail.index[0]][detail.index[1]].num>0">
                                <div class="symbol-add" @click="subItem(detail.index[0],detail.index[1])">-</div>
                                <div class="el-font-size" style="line-height:20px;margin:0 10px;width:14px;">
                                        {{shopcar[detail.index[0]][detail.index[1]].num}}</div>
                                <div class="symbol-sub" @click="addItem(detail.index[0],detail.index[1],$event)">+</div>
                            </div>

                        </div>
                        
                    </div>

                    <div class="detail-food-introduction">
                        <h1>商品介绍</h1>
                        <div class="food-introduction">{{detail.info}}</div>
                    </div>
                    <div class="detail-food-rating">
                        <h1>商品评价</h1>
                        <div class="rating-select-container">
                            <div class="rating-select white-font" style="background:#00a0dc;" @click="selectRatingType"
                                data-name="all">全部{{ratingType.all}}</div>
                            <div class="rating-select black-font" style="background:rgba(0,160,220,0.2);"
                                @click="selectRatingType" data-name="agree">推荐{{ratingType.agree}}</div>
                            <div class="rating-select black-font" style="background:rgba(77,85,93,0.2);"
                                @click="selectRatingType" data-name="disagree">吐槽{{ratingType.disagree}}</div>
                        </div>
                        <div class="rating-select-btn el-font-size">
                            <img v-if="onlyRating" src="../../icon/onClick.png" @click="selectOnlyRating" />
                            <img v-else-if="!onlyRating" src="../../icon/unonClick.png" @click="selectOnlyRating" />
                            只看有内容的评价
                        </div>
                    </div>
                    <div class="rating-wapper el-font-size">
                        <ul>
                            <template v-for="(rating,index) in ratings">
                                <li class="rating-list" :key="index" v-show="rating.contentShow&&rating.typeShow">
                                    <div class="rating-title">
                                        <div class="rating-date">{{dataFormat(rating.rateTime)}}</div>
                                        <div class="rating-user">
                                            {{rating.username}}
                                            <span
                                                :style='"background:url("+rating.avatar+");background-size:12px 12px;"'></span>
                                        </div>
                                    </div>
                                    <div class="rating-content black-font">
                                        <template>
                                            <img v-if="rating.rateType==0" src="../../icon/agree.png" />
                                            <img v-else-if="rating.rateType==1" src="../../icon/disagree.png" />
                                        </template>
                                        {{rating.text}}
                                    </div>
                                </li>
                            </template>
                        </ul>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script lang="ts">
    import {
        Component,
        Vue
    } from "vue-property-decorator";
    import ShopCar from "@/components/ShopCar.vue";
    import BScroll from "@better-scroll/core";

    @Component({
        components: {
            ShopCar
        }
    })
    export default class Food extends Vue {
        goods: any[] = this.$store.state.goods;
        scrollY = 0;
        listHeight:Array<number>=[]
        foodShow = false;
        shopcar: any[] = [
            [{num:0}]
        ];
        onlyRating = false
        detail_scroll = {
            refresh:function(){
                return
            }
        };
        food_scroll={
            refresh:function():void{
                //
            },
            scrollTo:function(x:number,y:number,t:number):void{
                //
            },
            on:function(methods:string,fun:any):void{
                //
            }
        };
        detail = {
            name: "",
            sellCount: 0,
            rating: 0,
            path: "",
            info: "",
            price: 0,
            index: [0,0]
        };
        ratings: Array < any > = []
        ratingType = {
            all: 0,
            agree: 0,
            disagree: 0
        }
        get getPos(){
            for(let i=0;i<this.listHeight.length;i++){
                if(this.scrollY<this.listHeight[i]){
                    return i-1
                }
            }
            return this.listHeight.length-1
        }
        addFood(index: Array < number > ) {
            let num = this.shopcar[index[0]][index[1]].num;
            if (num < 10) {
                this.shopcar[index[0]][index[1]].num++;
            } else {
                alert("最多只能购买十份");
            }
        }
        selectRatingType(e: any) {
            let name = e.target.dataset.name
            for (let i = 0; i < this.ratings.length; i++) {
                if (name == "all") {
                    this.ratings[i].typeShow = true
                } else if (name == "agree") {
                    if (this.ratings[i].rateType == 0) {
                        this.ratings[i].typeShow = true
                    } else {
                        this.ratings[i].typeShow = false
                    }
                } else if (name == "disagree") {
                    if (this.ratings[i].rateType == 1) {
                        this.ratings[i].typeShow = true
                    } else {
                        this.ratings[i].typeShow = false
                    }
                }
            }
        }

        selectOnlyRating() {
            this.onlyRating = !this.onlyRating
            for (let i = 0; i < this.ratings.length; i++) {
                if (this.onlyRating) {
                    if (this.ratings[i].text != "") {
                        this.ratings[i].contentShow = true
                    } else {
                        this.ratings[i].contentShow = false
                    }
                } else {
                    this.ratings[i].contentShow = true
                }
            }
        }
        dataFormat(timestamp: number): string {
            let date = new Date(timestamp)
            let year = date.getFullYear()
            let month: any = date.getMonth() + 1;
            let day: any = date.getDate();

            let hour = date.getHours();
            let minute = date.getMinutes();
            let second = date.getSeconds();

            if (month < 10) {
                month = "" + "0" + month
            }
            if (day < 10) {
                day = "" + "0" + day
            }
            return "" + year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second
        }
        showFood(index1: number, index2: number) {
            let tempRatings = []
            let ratingType = {
                all: this.goods[index1].foods[index2].ratings.length,
                agree: 0,
                disagree: 0
            }
            this.foodShow = true;
            for (let i = 0; i < this.goods[index1].foods[index2].ratings.length; i++) {
                tempRatings.push({
                    contentShow: true,
                    typeShow:true,
                    ...this.goods[index1].foods[index2].ratings[i]
                })
                if (this.goods[index1].foods[index2].ratings[i].rateType == 0) {
                    ratingType.agree += 1
                } else {
                    ratingType.disagree += 1
                }
            }
            this.ratings = tempRatings
            this.ratingType = ratingType
            this.detail = {
                name: this.goods[index1].foods[index2].name,
                sellCount: this.goods[index1].foods[index2].sellCount,
                rating: this.goods[index1].foods[index2].rating,
                path: this.goods[index1].foods[index2].image,
                info: this.goods[index1].foods[index2].info,
                price: this.goods[index1].foods[index2].price,
                index: [index1, index2]
            };
            this.$nextTick(() => {
                try {
                    this.detail_scroll.refresh();
                } catch {
                    //
                }
            });
        }

        createBox(X: number, Y: number) {
            var box = document.createElement("div");
            box.setAttribute("class", "box");
            box.style.top = Y + "px";
            box.style.left = X + "px";
            (this.$refs.body as HTMLElement).appendChild(box);

            setTimeout(() => {
                // box.style.left=30+'px';
                // box.style.top=(this.$refs.body as HTMLElement).offsetHeight+"px";
                // box.style.transform='rotateY(15deg) rotateX(15deg) translate('+((this.$refs.body as HTMLElement).offsetWidth-X)+'px'+','+((this.$refs.body as HTMLElement).offsetHeight-Y)+'px'+')';
                box.style.transform = "rotate(-120deg) translateY(" + -X + "px" + ")";
            }, 0);
            setTimeout(() => {
                box.remove();
            }, 500);
        }
        created() {
            this.shopcar = this.$store.state.shopcar;
        }
        addItem(index1: number, index2: number, e: any): void {
            let num = this.shopcar[index1][index2].num;
            if (num < 10) {
                this.shopcar[index1][index2].num++;
                this.createBox(327, e.pageY - 184);
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
        }
        mounted() {
            this.$nextTick(() => {
                let list=[]
                this._initScroll();
                for(let i=0;i<this.$refs.foodList.length;i++){
                    list.push(this.$refs.foodList[i].offsetTop)
                }
                this.listHeight=list
            });
        }
        selectItem(index: number) {
            let top=(this.$refs.foodList[index] as HTMLElement).offsetTop
            this.food_scroll.scrollTo(0,-top,500)
        }
        _initScroll() {
            new BScroll(this.$refs.menuWrapper as HTMLElement, {
                click: true
            });
            this.food_scroll=new BScroll(this.$refs.foodsWrapper as HTMLElement, {
                click: true, //取消默认阻止事件
                probeType: 3 //监听事件的触发时间，1为即时触发，3为延迟到事件完毕后触发
            });
            this.detail_scroll = new BScroll(this.$refs.detail as HTMLElement, {
                click: true
            });
            this.food_scroll.on('scroll',(pos:any) => {
              this.scrollY = Math.abs(pos.y);
              
            });
        }
    }
</script>


<style lang="less">
    .white-font {
        color: white;
    }

    .black-font {
        color: black;
    }

    .el-font-size {
        font-size: 12px;
    }

    .detail-food-contaienr {
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background: #f3f5f7;
        z-index: 10;

        .close-btn {
            position: absolute;
            width: 36px;
            height: 36px;
            color: white;
            line-height: 36px;
            text-align: center;
            transform: rotate(45deg);
            left: 18px;
            top: 18px;
        }

        h1 {
            font-size: 14px;
            color: #07111b;
            text-align: left;
            margin: 0 0 8px 0;
        }

        .rating-wapper {
            background: white;
            padding-bottom: 46px;

            ul {
                padding: 0;
                margin: 0;

                li {
                    list-style: none;
                    padding: 16px;
                    border-bottom: 1px solid #dddddd;
                }

                .rating-content {
                    font-weight: bold;
                    margin-top: 6px;
                    text-align: left;

                    img {
                        display: inline-block;
                        width: 12px;
                        height: 12px;
                    }
                }

                .rating-title {
                    color: #93999f;
                    display: flex;
                    justify-content: space-between;

                    .rating-user {
                        span {
                            display: inline-block;
                            margin-left: 5px;
                            vertical-align: middle;
                            width: 12px;
                            height: 12px;
                            border-radius: 100%;
                            background: url("http://static.galileo.xiaojukeji.com/static/tms/default_header.png");
                            background-size: 12px 12px;
                        }
                    }
                }
            }
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

        .detail-food-introduction {
            padding: 18px;
            margin: 18px 0;
            background: white;
            border-bottom: 1px solid #dddddd;

            .food-introduction {
                padding: 0 4px;
                font-size: 12px;
                color: #4d555d;
                text-align: justify;
                line-height: 24px;
            }
        }

        .food-image-l {
            width: 100%;
            height: 375px;

            img {
                width: 100%;
                height: 100%;
            }
        }

        .detail-food-info {
            padding: 18px;
            background: white;
            border-bottom: 1px solid #dddddd;

            .el-info {
                span {
                    font-size: 12px;
                    color: #93999f;
                    float: left;
                }
            }

            .el-price-info {
                display: flex;
                justify-content: space-between;
                height: 24px;

                .detail-operation {
                    display: flex;

                    [class^="symbol"] {
                        width: 16px;
                        height: 16px;
                        border: 2px solid lightskyblue;
                        border-radius: 100%;
                        font-size: 24px;
                        line-height: 14px;
                        color: lightskyblue;
                        text-align: center;
                    }
                }

                button {
                    vertical-align: center;
                    padding: 0 12px;
                    height: 24px;
                    line-height: 24px;
                    background: #00a0dc;
                    font-size: 10px;
                    color: #fff;
                    border-radius: 12px;
                    opacity: 1;
                    border: none;
                    outline: none;
                }
            }
        }
    }

    .food-enter-active,
    .food-leave-active {
        transition: ease 0.5s all;
    }

    .food-enter,
    .food-leave-to {
        transform: scale(0);
    }

    .box {
        position: absolute;
        width: 16px;
        height: 16px;
        border-radius: 100%;
        background: #00a0dc;
        z-index: 999;
        transition: linear 0.5s;
    }

    .active {
        font-weight: bold;
        background: white;
    }

    .body {
        position: absolute;
        display: flex;
        overflow: hidden;
        width: 100%;
        top: 177px;
        bottom: 46px;

        ul {
            padding: 0;
            margin: 0;

            .menu-list {
                display: table;
                width: 56px;
                height: 54px;
                padding: 0 12px;
                border-bottom: 1px solid #dddddd;

                list-style: none;
                font-size: 12px;

                .text {
                    display: table-cell;
                    vertical-align: middle;
                    text-align: left;

                    img {
                        width: 12px;
                        height: 12px;
                        transform: translateY(2px);
                    }
                }
            }
        }

        .nav-list-wrapper {
            width: 80px;
            background: rgb(243, 243, 243);
            overflow: hidden;
        }

        .food-list-wrapper {
            width: 295px;
            overflow: hidden;

            .foot-class {
                padding-left: 14px;
                height: 26px;
                line-height: 26px;
                border-left: 2px solid #d9dde1;
                font-size: 12px;
                font-weight: bold;
                color: #93999f;
                background: #f3f5f7;
                text-align: left;
            }

            .lists {
                .food-list:last-child {
                    padding-bottom: 0;
                    border-bottom: none;
                }

                .food-list {
                    display: flex;
                    list-style: none;
                    margin: 18px;
                    padding-bottom: 18px;
                    border-bottom: 1px solid #dddddd;

                    .food-img {
                        width: 57px;
                        height: 57px;

                        img {
                            width: 57px;
                            height: 57px;
                        }
                    }

                    .food-info {
                        margin-left: 10px;
                        text-align: left;

                        .food-price {
                            display: flex;
                            justify-content: space-between;
                            width: 180px;

                            .price {
                                color: red;
                                font-size: 16px;
                                font-weight: bold;
                            }

                            .number {
                                display: flex;

                                .number-text {
                                    font-size: 12px;
                                    height: 18px;
                                    line-height: 18px;
                                    margin: 0 15px;
                                }

                                [class^="symbol"] {
                                    width: 16px;
                                    height: 16px;
                                    line-height: 16px;
                                    border: 2px solid lightskyblue;
                                    border-radius: 100%;
                                    font-size: 24px;

                                    color: lightskyblue;
                                    text-align: center;
                                }

                                .symbol:first-child {
                                    line-height: 12px;
                                }
                            }
                        }

                        .food-name {
                            height: 14px;
                            line-height: 14px;
                            font-size: 14px;
                            color: #07111b;
                        }

                        .food-description {
                            text-overflow: ellipsis;
                            overflow: hidden;
                        }

                        .food-description,
                        .food-rate {
                            line-height: 12px;
                            height: 12px;
                            font-size: 12px;
                            color: #93999f;

                            margin: 10px 0;

                            span {
                                margin-right: 20px;
                            }
                        }
                    }
                }
            }
        }
    }

    .foot {
        position: fixed;
        height: 46px;
        bottom: 0;
        left: 0;
        width: 100%;
        z-index: 100;
    }
</style>