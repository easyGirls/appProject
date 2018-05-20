<!-- 我的收货地址 -->
<template>
	<div class="myAddress">
		<div class="myAddressHeader">
            <i class="iconfont icon-552cc14536532" @click="returnPre"></i>
            <span>我的收货地址</span>
            <!-- <span class="saveAddress" @click="saveAddress">保存</span> -->
        </div>
        <div class="myAddressCnt"></div>
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

		},
		methods: {
			//回退
			returnPre: function(){
				this.$router.go(-1);
			},
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
	    background: #fff;
	}
</style>
