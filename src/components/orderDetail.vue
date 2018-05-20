<!-- 下订单页面 -->
<template>
	<div class="orderDetail">
		<div class="orderDetailHeader">
            <i class="iconfont icon-552cc14536532" @click="returnPre"></i>
            下单
        </div>
		<div v-if="!address.length" class="receiveAddress">
			<div @click="addAddress">
				<mt-palette-button content="+">
			      <span class="my-icon-button"></span>
			    </mt-palette-button>
			    <p class="newAddAddress">新增收货地址</p>
			</div>
		</div>
		<div v-else class="receiveAddress" @click="enterMyAddress">
			<p class="receiver">收货人：{{ addressForm.receiver }}</p>
			<p class="phone">{{ addressForm.phone }}</p>
			<p class="address">地址：{{ addressForm.address }} <span class="enter">></span></p>
		</div>
		<!-- 商品信息 -->
		<div class="productCnt">
			<ul>
				<div class="ordeId2">
                    <span style="float: left;color:#666">
                        <i class="iconfont icon-qijiandian"></i>
                        家
                    </span>
                </div>
                <li v-for="(order,index) in orders" class="orders">
                    <div class="orderBox2">
                        <div class="orderOne2">
                            <div class="orderImage2">
                                <img v-bind:src="order.image" alt="手机图片">
                            </div>
                            <div class="_orderbox2">
                                <div class="orderName2"><span>{{order.name}}</span></div>
                                <!-- <div class="orderColor"><span>颜色:{{order.color}}</span></div> -->
                                <div class="orderPrice2"><span>￥{{order.price}}</span></div>
                            </div>
                            <p >×{{order.value}}</p>
                        </div>
                    </div>
                </li>
            </ul>
		</div>
		<div class="submitOrderCnt">
			<p class="sumPrice"><span class="priceField">合计：</span><span class="money">￥{{ sumPrice }}</span></p>
			<p class="submitBtn" @click="submitDetailOrder">提交订单</p>
		</div>
	</div>
</template>
<script>
	import store from '../vuex/store.js';
	import { MessageBox } from 'mint-ui';
	export default {
		data(){
			return {
				addressForm: {
					receiver: '',
					phone: '',
					address: ''
				},
				
			}
		},
		computed: {
			address: function(){
				var keyCode = this.$store.state.keyCode;
				// console.log('sa',keyCode,this.$store.state.address[keyCode])
				// 
				return this.$store.state.address[keyCode];
			},
			orders: function(){
	            var keyCode = this.$store.state.keyCode;
	            // console.log('sa2',keyCode,this.$store.state.orders[keyCode])
	            return this.$store.state.orders[keyCode];    
	        },
	        sumPrice: function(){
	        	var sumPrice = 0;
	        	for(var i=0;i<this.orders.length;i++){
	        		sumPrice += this.orders[i].price * this.orders[i].value;
	        	}
	        	return sumPrice;
	        }
		},
		watch:{
			address: {
				handler: function(val){
					this.initAddress();
				},
				deep:true
			}
		},
		mounted: function(){
			this.initAddress();
		},
		methods:{
			//回退
			returnPre: function(){
				this.$router.go(-1);
			},
			//新增收货地址
			addAddress: function(){
				this.$router.push('/addAddress');
			},
			//初始化地址
			initAddress: function(){
				for(var i=0;i<this.address.length;i++){
					if(this.address[i].normalFlag === true){
						this.addressForm.receiver = this.address[i].receiver;
						this.addressForm.phone = this.address[i].phone;
						this.addressForm.address = this.address[i].address;
						break;
					}else{
						this.addressForm.receiver = this.address[0].receiver;
						this.addressForm.phone = this.address[0].phone;
						this.addressForm.address = this.address[0].address;
					}
				}
			},
			//进入我的收货地址页
			enterMyAddress: function(){
				this.$router.push('/myAddress');
			},
			//点击提交订单
			submitDetailOrder: function(){
	        	MessageBox.alert('购买成功','提示');
	        	this.$router.push('order');
	        }
		}
	}
</script>
<style>
	.orderDetail{
	    position: absolute;
	    width: 100%;
	    height: 100%;
	    z-index: 999;
	    background: #F4F4F4;
	}
	.orderDetailHeader{
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
	.orderDetailHeader i{
	    display: block;
	    float: left;
	    height: 50px;
	    font-size: 0.71rem;
	    color: black;
	    width: 0.9rem;
	}
	.receiveAddress {
	   margin-top: 1.34rem;
	   background: #fff;
	   padding-top: 0.15rem;
	   padding-left: 0.2rem;
	}
	.mint-main-button{
		background: #F4F4F4;
		color: #575751;
	}
	.newAddAddress{
		position: absolute;
		top: 2rem;
	    left: 2.1rem;
	    font-size: 0.40rem;
	}
	.productCnt{
		margin-top: 0.15rem;
		background: #fff;
	}
	.orderBox2{
	    margin-top: 0.2rem;
	    /*height: 6.1rem;*/
	}
	.orderOne2{
	    width: 100%;
	    height: 3.1rem;
	    background: white;
	    list-style: none;
	}
	.orderOne2 img{
	    width: 2.5rem;
	    float: left;
	}
	.ordeId2{
	    height: 1.2rem;
	    line-height: 1.2rem;
	    background: white;
	    border-bottom: 1px solid #cccccc;
	    padding-left: 10px;
	}
	.orderImage2{
	    padding: .3rem;
	}
	._orderbox2{
	    width: 58%;
	    padding-left: 0.2rem;
	    float: left;
	}
	.orderName2{
	    width: 96%;
	    overflow : hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp:2;
        -webkit-box-orient: vertical;
	}
	.orderPrice2{
	    width: 100px;
	    float: left;
	    color: red;
	    font-size: 0.34rem;
	    margin-top: 0.13rem;
	}
	.submitOrderCnt{
		text-align: right;
		padding-right: 0.6rem;
		padding-top: 0.5rem;
	}
	.priceField{
		font-size: 0.37rem;
		line-height: 0.8rem;
	}
	.money{
		font-size: 0.41rem;
		color: red;
		line-height: 0.8rem;
	}
	.submitBtn{
		font-size: 0.38rem;
		width: 20%;
	    background: red;
	    color: #fff;
	    padding: 0.12rem;
	    text-align: center;
	    float: right;
	}
	.receiver{
		width: 60%;
		float: left;
		font-size: 0.36rem;
		line-height: 0.8rem;
	}
	.phone{
		width: 40%;
		/*padding-left: 0.1rem;*/
		text-align: center;
		float: left;
		font-size: 0.36rem;
		line-height: 0.8rem;
	}
	.address{
		position: relative;
		clear: left;
		font-size: 0.36rem;
		line-height: 0.8rem;
	}
	.enter{
		position: absolute;
		right: 1rem;
		font-size: 0.41rem;
	}
</style>