<!-- 我的收藏 -->
<template>
	<div class="myCollection">
		<div class="myCollectionHeader">
            <router-link to="my">
                <i class="iconfont icon-552cc14536532"></i>
            </router-link>
            我的收藏
        </div>
		<ul class="myCollectionCnt">
            <li class="orders"  v-for='(order,index) in collectProduct'>
                    <div class="orderOne">
                        <div class="orderImage"  @click="gotoGoodDetail(order.id)">
                            <img v-bind:src="order.imgone" alt="手机图片">
                        </div>
                        <div class="_orderbox"  @click="gotoGoodDetail(order.id)">
                            <div class="orderName"><span class="collectionName">{{order.name}}</span></div>
                            <!-- <div class="orderColor"><span>颜色:{{order.color}}</span></div> -->
                            <div class="orderPrice"><span>￥{{order.price}}</span></div>
                            <p >×{{order.value}}</p>
                        </div>
                        
                    </div>
                    <a href="javascript:;" class="iconfont icon-huishouzhan7"  @click="deleteCollection(index)" style="position: absolute;right: 0.7rem;top: 2.3rem;"></a>
                        
            </li>
        </ul>
	</div>
</template> 
<script>
	export default{
		data(){
			return {
				
			}
		},
		mounted: function(){

		},
		computed: {
	      collectProduct: function(){
	        var index = this.$store.state.keyCode;
	        // console.log('collectProduct',index,this.$store.state.collectProduct[index])
	        return this.$store.state.collectProduct[index];
	      }
	    },
		methods: {
			deleteCollection: function(index){
				this.collectProduct.splice(index,1);
				localStorage.setItem("collectProduct",JSON.stringify(this.$store.state.collectProduct));
			},
			gotoGoodDetail: function(id){
				this.$router.push({path:"goodDetail",query:{id:id}})
			}
		}
	}
</script>
<style>
	.myCollection{
		position: absolute;
	    width: 100%;
	    height: 100%;
	    z-index: 999;
	    background: white;
	}
	.myCollectionHeader{
		position: fixed;
	    top: 0;
	    width: 100%;
	    height: 1.4rem;
	    line-height: 1.4rem;
	    background: white;
	    padding-left: 0.3rem;
	    -webkit-box-shadow: 0 0 10px #cecece;
	    box-shadow: 0 0 10px #cecece;
	    z-index: 1;
	    font-size: 0.41rem;
	}
	.myCollectionHeader i{
		display: block;
	    float: left;
	    height: 50px;
	    font-size: 0.71rem;
	    color: black;
	    width: 0.9rem;
	}
	.myCollectionCnt{
		margin-top: 1.6rem;
    	font-size: 0.4rem;
	}
	.orders{
		position: relative;
	    margin-top: 0.2rem;
	    border-bottom: 1px solid #cccccc;
	}
	.orderImage{
        float: left;
        padding: 0.5rem 0rem 0.5rem 0.5rem;
    }
    ._orderbox{
    	float: left;
        width: 6.5rem;
        font-size: 0.35rem;
        padding-left: 0.3rem;
        padding-top: 0.6rem;
    }
	.collectionName{
        display: inline-block;
        width: 92%;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
	}
	/*.orderName{
	    width: 96%;
	}*/
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
		clear: left;
	    height: 3.4rem;
	}
	.orderOne img{
	    width: 2.5rem;
	    float: left;
	}
	.orderOne{
	    width: 100%;
	    height: 3.1rem;
	    background: white;
	    list-style: none;
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
</style>