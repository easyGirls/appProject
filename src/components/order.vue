<!-- 订单页面 -->
<template>
    <div class="order">
        <!-- 导航 -->
        <div class="orderHeader">
            <router-link to="my">
                <i class="iconfont icon-552cc14536532"></i>
            </router-link>
            我的订单
        </div>
        <!-- 无订单状态 -->
        <div class="orderimg" v-if="!myOrders.length">
            <img src="/static/img/dingdan.png" alt="订单">
            <p>您暂无订单</p>
        </div>
        <!-- 有订单状态 -->
        <div class="orderMain" v-else>
            <div class="_bedding_twoMain">
                <mt-navbar v-model="selected" >
                    <mt-tab-item id="tab-container1">全部</mt-tab-item>
                    <mt-tab-item id="tab-container2">未付款</mt-tab-item>
                    <mt-tab-item id="tab-container3">已发货</mt-tab-item>
                    <mt-tab-item id="tab-container4">已完成</mt-tab-item>
                </mt-navbar>
            </div>

            <mt-tab-container v-model="selected" swipeable>
            <!-- 全部 -->
            <mt-tab-container-item id="tab-container1">
                <div>
                    
                    <ul>
                        <li class="orders"  v-for='(item,index) in myOrders'>
                            <div class="info">
                                <p class="orderNum"><span>订单号：</span><span>{{ item.myOrdersNum}}</span></p>
                                <p class="orderPerson"><span>收货人：</span><span>{{ item.receiver}}</span></p>
                                <p class="orderPhone"><span>联系电话：</span><span>{{ item.phone}}</span></p>
                                <p class="orderAddress"><span>收货地址：</span><span>{{ item.address}}</span></p>
                                <p class="orderTime"><span>下单时间：</span><span>{{ item.myOrdersTime}}</span></p>
                            </div>
                            <div class="orderBox"  v-for="order in item.productsData">
                                <div class="ordeId">
                                    <span style="float: left;color:#666">
                                        <i class="iconfont icon-qijiandian"></i>
                                        家
                                    </span>
                                    <span style="float: right;margin-right: 0.2rem;color: #00acff;font-weight: 400;">交易成功</span>
                                </div>
                                <div class="orderOne">
                                    <div class="orderImage">
                                        <img v-bind:src="order.imgone" alt="手机图片">
                                    </div>
                                    <div class="_orderbox">
                                        <div class="orderName"><span>{{order.name}}</span></div>
                                        <div class="orderColor"><span>颜色:{{order.color}}</span></div>
                                        <div class="orderPrice"><span>￥{{order.price}}</span></div>
                                    </div>
                                    <p >×{{order.value}}</p>
                                </div>
                                
                            </div>
                            <div class="orderTwo">
                                <div class="_Order" @click="odefault(index)">
                                    <a>删除订单</a>
                                </div>
                                <div class="_Total">
                                    共<span>{{item.count}}</span>件商品 总计:<span>￥{{item.sumPrice}}</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div> 
        </mt-tab-container-item>
        <!-- 未付款 -->
        <mt-tab-container-item id="tab-container2">
          <ul style="margin-top: 2px;">
            
          </ul>
        </mt-tab-container-item>
        <!-- 已发货 -->
        <!-- <mt-tab-container-item id="tab-container3">
          <ul>
                <li v-for="(order,index) in myOrders.productsData" class="orders">
                    <div class="orderBox">
                        <div class="ordeId">
                            <span style="float: left;color:#666">
                                <i class="iconfont icon-qijiandian"></i>
                                家
                            </span>
                            <span style="float: right;margin-right: 0.2rem;color: #00acff;font-weight: 400;">交易成功</span>
                        </div>
                        <div class="orderOne">
                            <div class="orderImage">
                                <img v-bind:src="order.image" alt="手机图片">
                            </div>
                            <div class="_orderbox">
                                <div class="orderName"><span>{{order.name}}</span></div>
                                <div class="orderColor"><span>颜色:{{order.color}}</span></div>
                                <div class="orderPrice"><span>￥{{order.price}}</span></div>
                            </div>
                            <p >×{{order.value}}</p>
                        </div>

                        <div class="orderTwo">
                            <div class="_Order" @click="odefault(index)">
                                <a>删除订单</a>
                            </div>
                            <div class="_Total">
                                共<span>{{order.value}}</span>件商品 总计:<span>￥{{order.value*order.price}}</span>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </mt-tab-container-item> -->
        <!-- 已完成 -->
        <mt-tab-container-item id="tab-container4">
          <ul style="margin-top: 2px;">
            
          </ul>
        </mt-tab-container-item>
      </mt-tab-container>        
        </div>
    </div>
</template>

<script>
import { mapState ,mapMutations ,mapGetters,} from 'vuex';
export default {
    name:"order",
    data(){
      return{
        selected:"tab-container1",
      }
    },
    computed:{
        myOrders: function(){
            var keyCode = this.$store.state.keyCode;
            console.log('aaa',this.$store.state.myOrders[keyCode],keyCode)
            return this.$store.state.myOrders[keyCode];    
        },
    },
    methods:{
        ...mapMutations([
            "odefault"
        ]),
    }

}
</script>


<style>
.order .mint-navbar .mint-tab-item.is-selected {
    border-bottom: 3px solid red;
    color: red;
}
.order{
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 999;
    background: #F4F4F4;
}
.orderimg{
    width: 3rem;
    height: 3rem;
    margin: 5rem auto;
}
.orderImage{
    padding: .3rem;
}
.orderimg img{
    width: 2.5rem;
}
.orderimg p{
    margin-top: 0.3rem;
    text-align: center;
    color: #ccc;
    font-size: 0.42rem
}
.orderHeader{
    position: fixed;
    top: 0;
    width: 100%;
    height: 1.3rem;
    line-height: 1.3rem;
    background: white;
    padding-left: 0.3rem;
    box-shadow: 0 0 10px #cecece;
    z-index: 1;
    font-size: 0.41rem; 
}
.orderHeader i{
    display: block;
    float: left;
    height: 50px;
    font-size: 0.71rem;
    color: black;
    width: 0.9rem;
}
.orderMain {
   margin-top: 1.34rem;
}
.orderOne{
    height: 3.4rem;
}
.orderOne img{
    width: 2.5rem;
    float: left;
}
.orders{
    margin-top: 0.2rem;
}
.orderName{
    width: 96%;
    /* margin-top: 0.6rem; */
}
.orderPrice span{
    color: red;
}
.orderValue span{
    position: relative;
    top: -2rem;
    float: right;
    color: #888888;
    margin-right: 0.3rem;
}
.orderBox{
    /*margin-top: 0.2rem;*/
    height: 4.1rem;
}
.orderOne{
    width: 100%;
    height: 3.1rem;
    background: white;
    list-style: none;
}
.orderTwo{
    width: 100%;
    height: 1.7rem;
    background: white;
    border-top: 1px solid #cccccc;
}
.orderTwo{
    /*float: right;*/
}
.orderTwo span{
    color: red;
}
.ordeId{
    height: 1.2rem;
    line-height: 1.2rem;
    background: white;
    border-bottom: 1px solid #cccccc;
    padding-left: 10px;
}
._Order{
    float: right;
    padding-right: 0.3rem;
    margin-top: 0.8rem;
    color: #888;
}
._Total{
    float: right;
    margin-top: 13px;
}
.orderColor span{
    font-size: 0.3rem;
    padding-left: 0.1rem;
    color: #888;
}
.orderPrice{
    width: 100px;
    float: left;
    color: red;
    font-size: 0.34rem;
    margin-top: 0.13rem;
}
._orderbox{
    width: 58%;
    float: left;
}
.orderOne>p{
    color: #888;
}
.info{
    padding-top: 0.3rem;
    font-size: 0.32rem;
    box-sizing: border-box;
    background: #fff;
}
.orderNum,.orderPerson,.orderPhone{
    float: left;
    line-height: 0.5rem;
    box-sizing: border-box;
}
.orderNum{
    width: 35%;
    padding-left: 0.3rem;
}
.orderPerson{
    width: 20%;
}
.orderPhone{
    width: 40%;
    padding-left: 0rem;
}
.orderAddress,.orderTime{
    clear: left;
    padding-left: 0.3rem;
    box-sizing: border-box;
    line-height: 0.5rem;
}
</style>

