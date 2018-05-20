<!-- 编辑地址页面 -->
<template>
	<div class="editAddress2">
		<div class="editAddressHeader">
            <i class="iconfont icon-552cc14536532" @click="returnPre"></i>
            <span>编辑地址</span>
            <span class="editAddress" @click="saveEditAddress">保存</span>
        </div>
		<div class="editAddressCnt">
			<mt-field class="inputCnt" label="收货人" v-model="editAddress.receiver"></mt-field>
			<mt-field class="inputCnt" label="联系电话" type="tel" v-model="editAddress.phone"></mt-field>
			<mt-field class="inputCnt" type="textarea" title="editAddress.phone" label="详细地址" v-model="editAddress.address"></mt-field>
		</div>
		<!-- <p class="normal"><span>设为默认地址</span><input type="checkbox" class="checkboxNormal" v-model="checked"></p> -->
	</div>
</template>
<script>
	import { MessageBox } from 'mint-ui';
	import store from '../vuex/store.js';
	export default{
		data(){
			return {
				editAddress:{
					receiver: '',
					phone: '',
					address: ''
				},
				editAddressFlag:{
					receiverFlag: false,
					phoneFlag: false,
					addressFlag: false
				},
			}
		},
		mounted: function(){
			this.initEditAddress();
		},
		computed: {
			address: function(){
				var keyCode = this.$store.state.keyCode;
				return this.$store.state.address[keyCode];
			},
			addressIndex: function(){
				console.log('1111111',this.$store.state.addressIndex)
				return this.$store.state.addressIndex;
			},
		},
		methods: {
			//回退
			returnPre: function(){
				this.$router.go(-1);
			},
			//保存修改的地址
			saveEditAddress: function(){
				var reg=/^[0-9]{11}$/;
				if(this.editAddress.receiver === ''){
					MessageBox.alert('请输入收货人姓名','提示');
					this.editAddressFlag.receiverFlag = false;
				}else{
					this.editAddressFlag.receiverFlag = true;
				}
				if(this.editAddress.phone === ''){
					MessageBox.alert('请输入联系电话','提示');
					this.editAddressFlag.phoneFlag = false;
				}else if(!reg.test(this.editAddress.phone)){
					MessageBox.alert('请输入11位数字值','提示');
					this.editAddressFlag.phoneFlag = false;
					this.editAddress.phone = '';
				}else{
					this.editAddressFlag.phoneFlag = true;
				}
				if(this.editAddress.address === ''){
					MessageBox.alert('请输入详细地址','提示');
					this.editAddressFlag.addressFlag = false;
				}else{
					this.editAddressFlag.addressFlag = true;
				}
				if(this.editAddressFlag.receiverFlag === true && this.editAddressFlag.phoneFlag === true && this.editAddressFlag.addressFlag === true){

					this.address[this.addressIndex].receiver = this.editAddress.receiver;
					this.address[this.addressIndex].phone = this.editAddress.phone;
					this.address[this.addressIndex].address = this.editAddress.address;

					localStorage.setItem("address",JSON.stringify(this.$store.state.address));
	                MessageBox.alert('修改成功','提示');
	                this.$router.go(-1);
				}else{}
			},
			// 初始化input
			initEditAddress: function(){
				this.editAddress.receiver = this.address[this.addressIndex].receiver;
				this.editAddress.phone = this.address[this.addressIndex].phone;
				this.editAddress.address = this.address[this.addressIndex].address;
			}
		}
	}
</script>
<style>
	.editAddress2{
		position: absolute;
	    width: 100%;
	    height: 100%;
	    z-index: 999;
	    background: #F4F4F4;
	    overflow: hidden;
	}
	.editAddressHeader{
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
	.editAddressHeader i{
	    display: block;
	    float: left;
	    height: 50px;
	    font-size: 0.71rem;
	    color: black;
	    width: 0.9rem;
	}
	.editAddress{
		padding-left: 5.2rem;
    	font-size: 0.38rem;
	}
	.editAddressCnt{
		margin-top: 1.34rem;
	    background: #fff;
	}
	.inputCnt{
		border-bottom: 1px solid #F4F4F4;
	}
	.inputCnt:last-child{
		border-bottom: none;
	}
	.mint-cell-title{
		font-size: 0.38rem;
	}
	/*.normal{
		position: relative;
		margin-top: 0.1rem;
		background: #fff;
		font-size: 0.38rem;
		line-height: 1rem;
		padding-left: 0.3rem;
	}
	.checkboxNormal{
		position: absolute;
		right: 0.5rem;
    	top: 0.4rem;
	}*/
	.mint-cell-wrapper{
		background-image: none;
	}
</style>