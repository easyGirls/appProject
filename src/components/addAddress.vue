<!-- 添加新地址页面 -->
<template>
	<div class="addAddress">
		<div class="addAddressHeader">
            <i class="iconfont icon-552cc14536532" @click="returnPre"></i>
            <span>添加新地址</span>
            <span class="saveAddress" @click="saveAddress">保存</span>
        </div>
		<div class="addAddressCnt">
			<!-- <div class="inputCnt">
				<label id="username">收货人</label> 
 				<input type="text" id="username" v-model="newAddress.receiver"  @blur="checkReceiver">
			</div> -->
			 

			<mt-field class="inputCnt" label="收货人" v-model="newAddress.receiver"></mt-field>
			<mt-field class="inputCnt" label="联系电话" type="tel" v-model="newAddress.phone"></mt-field>
			<!-- <p @click="onpopupVisible">
			<mt-field class="inputCnt" label="详细地址">
				<mt-popup
				  v-model="popupVisible"
				  position="bottom"
				  popup-transition="popup-fade">
				  	<mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
				</mt-popup>
			</mt-field></p> -->
			<!-- <v-distpicker type="mobile" style="height: 500px;overflow:hidden;"></v-distpicker> -->
			<mt-field class="inputCnt" type="textarea" title="newAddress.phone" label="详细地址" v-model="newAddress.address"></mt-field>
		</div>
		<p class="normal"><span>设为默认地址</span><input type="checkbox" class="checkboxNormal" v-model="checked"></p>
	</div>
</template>
<script>
	// import { Popup } from 'mint-ui';
	import { MessageBox } from 'mint-ui';
	import store from '../vuex/store.js';
	// import VDistpicker from 'v-distpicker'
	export default{
		data(){
			return {
				newAddress:{
					receiver: '',
					phone: '',
					address: ''
				},
				newAddressFlag:{
					receiverFlag: false,
					phoneFlag: false,
					addressFlag: false
				},
				checked: false,
				// popupVisible: false,
				// slots: [
			 //        {
			 //          flex: 1,
			 //          values: ['广东省','湖北省'],
			 //          className: 'slot1',
			 //          textAlign: 'right'
			 //        }, {
			 //          divider: true,
			 //          content: '-',
			 //          className: 'slot2'
			 //        }, {
			 //          flex: 1,
			 //          values: ['广州市', '佛山市', '湛江市', '肇庆市'],
			 //          className: 'slot3',
			 //          textAlign: 'left'
			 //        },
			 //         {
			 //          flex: 2,
			 //          values: ['啊啊市', '佛山2市', '湛江2市', '肇庆2市'],
			 //          className: 'slot6',
			 //          textAlign: 'left'
			 //        }
			 //      ]
			}
		},
		mounted: function(){

		},
		computed: {
			address: function(){
				var keyCode = this.$store.state.keyCode;
				return this.$store.state.address[keyCode];
			},
		},
		components: { 
			// 'v-distpicker': VDistpicker
		},
		methods: {
			//回退
			returnPre: function(){
				this.$router.go(-1);
			},
			saveAddress: function(){
				var reg=/^[0-9]{11}$/;
				if(this.newAddress.receiver === ''){
					MessageBox.alert('请输入收货人姓名','提示');
					this.newAddressFlag.receiverFlag = false;
				}else{
					this.newAddressFlag.receiverFlag = true;
				}
				if(this.newAddress.phone === ''){
					MessageBox.alert('请输入联系电话','提示');
					this.newAddressFlag.phoneFlag = false;
				}else if(!reg.test(this.newAddress.phone)){
					MessageBox.alert('请输入11位数字值','提示');
					this.newAddressFlag.phoneFlag = false;
					this.newAddress.phone = '';
				}else{
					this.newAddressFlag.phoneFlag = true;
				}
				if(this.newAddress.address === ''){
					MessageBox.alert('请输入详细地址','提示');
					this.newAddressFlag.addressFlag = false;
				}else{
					this.newAddressFlag.addressFlag = true;
				}
				if(this.newAddressFlag.receiverFlag === true && this.newAddressFlag.phoneFlag === true && this.newAddressFlag.addressFlag === true){
					// console.log('this.address',this.address,this.$store.state.address)
					if(this.address.length === 0){
						//normalFlag标记是否为默认地址
						this.address.push({ normalFlag: this.checked,receiver: this.newAddress.receiver,phone: this.newAddress.phone,
						address: this.newAddress.address });
						localStorage.setItem("address",JSON.stringify(this.$store.state.address));
						MessageBox.alert('添加成功','提示');
						//添加成功后回退到上一步
						this.$router.go(-1);
						//清空
						this.newAddress.receiver = '';
						this.newAddress.phone = '';
						this.newAddress.address = '';
						this.checked = '';

						// console.log('111',this.address,this.$store.state.address)
					}else{
						var flag = false;
						var index = -1;
						// console.log('ss',this.address,this.address.length)
						for(var i=0;i<this.address.length;i++){
							if(this.address[i].receiver===this.newAddress.receiver && this.address[i].phone===this.newAddress.phone && this.address[i].address===this.newAddress.address){
								flag = false;
								index = i;
								break;
							}else{
								flag = true;
							}
	                    }
	                    if(flag){
	                    	//如果当前添加的新地址设置为默认地址，就要把已存在的地址的normalFlag设为false
	                    	if(this.checked === true){
	                    		this.address.map((item) => {
	                    			item.normalFlag = false;
	                    		})
	                    	}
	                    	this.address.push({ normalFlag: this.checked,receiver: this.newAddress.receiver,phone: this.newAddress.phone,
						        address: this.newAddress.address });
	                    	localStorage.setItem("address",JSON.stringify(this.$store.state.address));
	                    	MessageBox.alert('添加成功','提示');
	                    	//添加成功后回退到上一步
							this.$router.go(-1);
	                    	//清空
							this.newAddress.receiver = '';
							this.newAddress.phone = '';
							this.newAddress.address = '';
							this.checked = '';
	                    }else{
	                    	if(this.address[index].normalFlag === this.checked){
									MessageBox.alert('地址已存在','提示');
									//清空
									this.newAddress.receiver = '';
									this.newAddress.phone = '';
									this.newAddress.address = '';
									this.checked = '';
								}else{
									//如果当前添加的新地址设置为默认地址，就要把已存在的地址的normalFlag设为false
			                    	if(this.checked === true){
			                    		this.address.map((item) => {
			                    			item.normalFlag = false;
			                    		})
			                    	}
									this.address[index].normalFlag = this.checked;
									localStorage.setItem("address",JSON.stringify(this.$store.state.address));
									MessageBox.alert('修改成功','提示');
									//添加成功后回退到上一步
									this.$router.go(-1);
									//清空
									this.newAddress.receiver = '';
									this.newAddress.phone = '';
									this.newAddress.address = '';
									this.checked = '';
								}
	                    }
	                    // console.log('222',this.address,this.$store.state.address)
					}
				}else{}
			}
		}
	}
</script>
<style>
	.addAddress{
		position: absolute;
	    width: 100%;
	    height: 100%;
	    z-index: 999;
	    background: #F4F4F4;
	    overflow: hidden;
	}
	.addAddressHeader{
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
	.addAddressHeader i{
	    display: block;
	    float: left;
	    height: 50px;
	    font-size: 0.71rem;
	    color: black;
	    width: 0.9rem;
	}
	.saveAddress{
		padding-left: 5.2rem;
    	font-size: 0.38rem;
	}
	.addAddressCnt{
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
	.normal{
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
	}
	.mint-cell-wrapper{
		background-image: none;
	}
</style>