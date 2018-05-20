<!-- 我的收货地址 -->
<template>
	<div class="myAddress">
		<div class="myAddressHeader">
            <i class="iconfont icon-552cc14536532" @click="returnPre"></i>
            <span>我的收货地址</span>
            <span class="addAddress2" @click="addAddress">添加地址</span>
        </div>
        <div class="myAddressCnt scrollbar">
        	<ul>
        		<li v-for="(item,$index) in address" class="addressItem">
        			<p class="receiver">收货人：{{ item.receiver }}</p>
					<p class="phone">{{ item.phone }}</p>
					<p class="address">地址：{{ item.address }}</p>
					<p class="normal" @click="setNormalAddress($index)"><input type="checkbox" class="checkboxNormal2" v-model="item.normalFlag"><span>设为默认地址</span>
					<span class="edit" @click="editAddress($index)">编辑</span>
					<span class="delete" @click="deleteAddress($index)"><i class="iconfont icon-huishouzhan7"></i>删除</span></p>
        		</li>
        	</ul>
        </div>
	</div>
</template>
<script>
	export default{
		data(){
			return {}
		},
		mounted: function(){

		},
		computed: {
			address: function(){
				var keyCode = this.$store.state.keyCode;
				return this.$store.state.address[keyCode];
			},
			// addressIndex: function(){
			// 	console.log('11111112',this.$store.state.addressIndex)
			// 	return this.$store.state.addressIndex;
			// },
		},
		methods: {
			//回退
			returnPre: function(){
				this.$router.go(-1);
			},
			//删除地址
			deleteAddress: function(index){
				this.address.splice(index,1);
				// console.log('11',this.$store.state.address,this.address)
				localStorage.setItem("address",JSON.stringify(this.$store.state.address));
			},
			//添加地址
			addAddress: function(){
				this.$router.push('/addAddress');
			},
			//勾选复选框设置默认地址
			setNormalAddress: function(index){
				for(var i=0;i<this.address.length;i++){
					this.address[i].normalFlag = false;
				}
				this.address[index].normalFlag = true;
			},
			//编辑地址
			editAddress: function(index){
				// this.addressIndex = index;
				this.$store.state.addressIndex = index;
				// console.log('22222',index,this.addressIndex,this.$store.state.addressIndex)
				localStorage.setItem("addressIndex",JSON.stringify(this.$store.state.addressIndex));
				this.$router.push('editAddress');
			}
		}
	}
</script>
<style>
	.myAddress{
		position: absolute;
	    width: 100%;
	    height: 100%;
	    z-index: 999;
	    background: #F4F4F4;
	    overflow: hidden;
	}
	.myAddressHeader{
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
	.myAddressHeader i{
	    display: block;
	    float: left;
	    height: 50px;
	    font-size: 0.71rem;
	    color: black;
	    width: 0.9rem;
	}
	.myAddressCnt{
		margin-top: 1.34rem;
		height: 16.5rem;
	}
	.addressItem{
		background: #fff;
		margin-top: 0.15rem;
	}
	.addressItem:first-child{
		margin-top: 0rem;
	}
	.receiver{
		width: 60%;
		float: left;
		font-size: 0.36rem;
		line-height: 0.8rem;
		padding-left: 0.3rem;
		box-sizing: border-box;
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
		padding-left: 0.3rem;
		box-sizing: border-box;
	}
	.normal{
		position: relative;
		margin-top: 0.1rem;
		background: #fff;
		font-size: 0.36rem;
		line-height: 1rem;
		padding-left: 0.3rem;
	}
	.checkboxNormal2{
		display: inline-block;
		margin-right: 0.1rem;
	}
	.edit{
		display: inline-block;
    	padding-left: 3.5rem;
	}
	.delete{
		display: inline-block;
    	padding-left: 0.5rem;
	}
	.addAddress2{
		padding-left: 4rem;
    	font-size: 0.38rem;
	}
	.scrollbar{
            overflow-y:scroll;
    }
    .scrollbar::-webkit-scrollbar {
            width: 5px;
            height: 100%;
    }
    .scrollbar::-webkit-scrollbar-thumb {
            border-radius: 20px;
            background-color: #eee;
    }
    .scrollbar::-webkit-scrollbar-track {
            border-radius: 20px;
            background-color:rgba(255,255,255,0.2);
    }
</style>
