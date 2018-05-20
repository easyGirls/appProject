<!-- 购物车页面 -->
<template>
    <div class="cart">
        <div class="cartheader" >
            <router-link to="/">
                <i class="iconfont icon-552cc14536532"></i>
            </router-link>
            购物车
        </div>

        <div class="cartMain">
            <ul>
                <li v-for="(cart,index) in carts" class="cartList">
                    <div class="cartImage">
                        <input type="checkbox" class="checkbox" v-model="cart.checked"/>
                        <img v-bind:src="cart.imgone" >
                    </div>

                    <!-- 购物车商品信息 -->
                    <div class="cartInformation">
                        <div class="cartName">{{cart.name}}
                            <a href="javascript:;" class="iconfont icon-huishouzhan7"  @click="shanchu(index)" ></a>
                        </div>
                        <p class="cartPrice">￥{{cart.price}}</p>
                    </div>
                    <!-- 购物车商品数量 -->
                    <div class="cartNumber">
                        <a href="javascript:;" @click="reduce(index)" class="add">-</a>
                        <input type="text"   v-model="cart.value" readonly="readonly"/>
                        <a href="javascript:;" @click="add(index)" class="reduce">+</a>
                    </div>                   
                </li>
            </ul>
        </div>

        
        <div class="cartImg" v-if="!carts.length">
            <img src="/static/img/gouwuche.png" alt="购物车图片">
            <h1>购物车是空的哦，快去购物吧</h1>
            <router-link :to="{name:'Home'}">逛一逛</router-link>
        </div>

        <div class="cartFooter"  v-if="carts.length">
            <div class="checkedMore" @click="selectedMore"><input type="checkbox" ref="checkedMore">全选</div>
            <div class="_box">
                <div class="Settlement">
                    <div class="Total">合计：<span style="font-size: 0.54rem;color:#E3211E">￥{{this.sum()}}</span></div>
                </div>
                <div class="Settlementtwo" @click="submitOrder">
                    <router-link :to="{name:'orderDetail'}" >结算</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { Toast } from 'mint-ui';
    import store from '../vuex/store.js'; 
    import { mapState,mapMutations,mapGetters  } from 'vuex';
    export default {
        name:"cart",
        data(){
            return{
                carts: [],
                //用于存储购物车数据，为了监听购物车商品数据变化时重新初始化购物车商品列表
                carts2: store.state.carts[store.state.keyCode],
            }
        },
        mounted: function(){
            this.initCarts();
        },
        watch: {
            //监听删除购物车商品时，重新初始化购物车页面商品列表
            carts2: {
                handler: function(val){
                     this.initCarts();
                },
                deep:true
            }
        },
        computed:{
            // ...mapGetters(
            //     ["sum"]
            // ),
            // carts(){
            //     return this.$store.state.carts    
            // },
        },
        methods:{
            ...mapMutations([
                'shanchu','add','reduce'
                // ,'settlement'
            ]),
            //初始化购物车
            initCarts: function(){
                var cartsData = this.$store.state.carts[store.state.keyCode];
                this.carts = [];
                for(var i=0;i<cartsData.length;i++){
                    this.carts.push({ checked: false,id:cartsData[i].id,name:cartsData[i].name,price:cartsData[i].price,imgone:cartsData[i].imgone,value:cartsData[i].value });
                }
            },
            //勾选复选框选中商品
            // selectedProduct: function(index){
                //为后面计算总价设置的，其值改变不了复选框的状态
                // if(this.$refs.checkedbox[index].checked === true){
                //     this.carts[index].checked = true;
                // }else{
                //     this.carts[index].checked = false;
                // }  
            // },
            //全选
            selectedMore: function(){
                if(this.$refs.checkedMore.checked === true){
                    for(var i=0;i<this.carts.length;i++){
                        // this.$refs.checkedbox[i].checked = true;
                        this.carts[i].checked = true;
                    }
                }else{
                    for(var i=0;i<this.carts.length;i++){
                        // this.$refs.checkedbox[i].checked = false;
                        this.carts[i].checked = false;
                    }
                }
                
            },
            //计算总价
            sum: function(){
                var sum=0;
                for(var i=0;i<this.carts.length;i++){
                    if(this.carts[i].checked === true){
                        sum += this.carts[i].price*this.carts[i].value;
                    }
                }
                return sum;
            },
            //结算
            submitOrder:function(){
                var orderData = []; 
                for(var i=0;i<this.carts.length;i++){
                    if(this.carts[i].checked === true){
                        var data={
                            id:this.carts[i].id,
                            name:this.carts[i].name,
                            price:this.carts[i].price,
                            image:this.carts[i].imgone,
                            value:this.carts[i].value,
                            order:this.carts[i].order,
                            color:this.carts[i].color,
                            number:this.carts[i].number,
                            
                        }
                        orderData.push(data);
                    }
                }
                this.$store.commit("addorder",orderData);
            }
        },
        
    }
</script>

<style>
    .cart{
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 999;
        top: 0;
        left: 0;
        background: #F4F4F4;
    }
    .cartheader{
        position: fixed;
        width: 100%;
        box-shadow: 0 0 10px #cecece;
        height: 1.3rem;
        line-height: 1.3rem;
        font-size: 0.35rem;
        padding-left: 0.3rem;
        background: white;
        top: 0;
        font-size: 0.41rem;
    }
    .cartheader i{
        display: block;
        float: left;
        height: 50px;
        font-size: 0.71rem;
        color: black;
        width: 0.9rem;
    }
    .cartList{
        width: 100%;
        height: 4rem;
        background: white;
        margin-top: 0.04rem;
    }
    .cartMain{
        margin-top: 1.3rem;
        margin-bottom: 1.24rem;
    }
    .cartMain ul li{
        position: relative;
        list-style: none;
    }
    .cartImage{
        position: relative;
    }
    .cartImage .checkbox{
        position: absolute;
        left: 11%;
        top: 41%;
    }
    .cartImage img{
        width: 1rem;
        height: 1rem;
    }
    .cartImage{
        float: left;
        padding: 0.5rem 0.2rem 0.5rem 0.8rem;
    }
    .cartInformation{
        width: 7.7rem;
        font-size: 0.35rem;
        padding-left: 0.3rem;
        padding-top: 0.6rem;
    }
    .cartPrice{
        color:red;
        margin-top: 0.2rem;
        font-size: 0.4rem;
    }
    .cartNumber {
        float: left;
        margin-top: 0.3rem;
    }
    .cartNumber .add,.cartNumber .reduce{
        display: block;
        width: 0.75rem;
        height: 0.75rem;
        line-height: 0.75rem;
        border: 1px solid #dedede;
        float: left;
        color: #b2b2b2;
        text-align: center;
        font-size: 0.5rem;
    }
    .cartNumber input{
        width: 0.96rem;
        height: 0.76rem;
        float: left;
        text-align: center;
        border: 1px solid #dedede;
    }
    .cartNumber .add{
        border-right: none;
        
    }
    .cartNumber .reduce{
        border-left: none;
    }
    .cartFooter {
        position: fixed;
        width: 100%;
        height: 1.18rem;
        background: white;
        bottom: 0;
        display: block;
        border-top: 1px solid #F4F4F4;
    }
    .cartImg img{
        width: 4.4rem;
        height: 5.2rem;
        display: block;
        margin: auto;
        padding-top: 1.5rem;
    }
    .cartImg a{
        display: block;
        text-align: center;
        margin: 0.8rem auto;
        width: 110px;
        height: 37px;
        line-height: 37px;
        border-radius: 4px;
        text-align: center;
        background: #e0524b;
        color: white;
        font-weight: 800;
        font-size: 0.5rem;
    }
    .cartName{
        width: 9.3rem;
        font-size: 0.36rem;
    }
    .cartName a{
        color: black;
        font-size: 0.57rem;
        float: right;
    }
    .cartImg h1{
        margin-top: 0.5rem;
        text-align: center;
        color: #959595;
        font-size: 0.6rem;
    }
    .checkedMore{
        float: left;
        width: 20%;
        height: 100%;
        padding-top: 4%;
        padding-left: 5%;
        box-sizing: border-box;
    }
    .checkedMore input{
        margin: 2% 5% 0 0;
        display: inline-block;
    }
    ._box{
        width: 80%;
        height: 100%;
        float: left;
    }
    .Total{
        float: right;
        padding-right: 10%;
        line-height: 1.18rem;
        font-size: 0.35rem;
    }
    .Settlement{
        width: 50%;
        height: 100%;
        /*background: #FF9800;*/
        float: left;
    }
    .Settlementtwo{
        width: 50%;
        height: 100%;
        background: #E3211E;
        float: right;
    }
    .Settlement a,.Settlementtwo a{
        color: white;
        text-align: center;
        line-height: 1.18rem;
        display: block;
        font-size: 0.35rem;
    }
</style>
