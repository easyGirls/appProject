<!-- 编辑个人信息页面 -->
<template>
	<div class="editUserInfoCnt">
		<div class="editUserInfoHeader">
	        <router-link to="author">
	          <i class="iconfont icon-552cc14536532"></i>
	        </router-link>
	        设置{{ name }}
      </div>
      <div class="editUserInfoContent">
      	<mt-radio v-model="userInfo2.sex" :options="['男', '女']" v-if="sexFlag">
		</mt-radio>
		<!-- <mt-datetime-picker
    		ref="picker"
    		type="time"
   			 v-model="userInformation.age" v-if='ageFlag'>
  		</mt-datetime-picker> -->
      	<mt-field class="inputCnt" label="" v-model="userInfo2.phone" :placeholder="'设置'+name" v-if='phoneFlag'></mt-field>
      	<mt-field class="inputCnt" label="" v-model="userInfo2.email" :placeholder="'设置'+name" v-if='emailFlag'></mt-field>
      	<mt-button type="default" @click="save">更新保存</mt-button>
      </div>
	</div>
</template>
<script>
	import store from '../vuex/store.js';
	import { MessageBox } from 'mint-ui';
	export default{
		data(){
			return {
				name: 'aa',
				// false
				sexFlag: false,
				phoneFlag: false,
				emailFlag: false,
				status2: store.state.status2,
				userInfo2: {
					sex: '',
					phone: '',
					email: ''
				}
			}
		},
		computed:{
			userInformation: function(){
				var index = this.$store.state.keyCode;
				return this.$store.state.userInformation[index];
			}
		},
		watch:{
			status2: function(val){
				this.initContent();
			}
		},
		mounted: function(){
			this.initContent();
		},
		methods:{
			initContent: function(){
				if(this.status2 === 0){
					this.name = '性别';
					this.sexFlag = true;
					this.phoneFlag = false;
					this.emailFlag = false;
				}else if(this.status2 === 2){
					this.name = '联系方式';
					this.sexFlag = false;
					this.phoneFlag = true;
					this.emailFlag = false;
				}else{
					this.name = '邮箱';
					this.sexFlag = false;
					this.phoneFlag = false;
					this.emailFlag = true;
				}
			},
			save: function(){
				var reg=/^[0-9]{11}$/;
				if(this.phoneFlag === true){
					if(!this.userInfo2.phone){ 
			 			MessageBox.alert('请输入电话号码','提示');
					}else if(!reg.test(this.userInfo2.phone)){
						MessageBox.alert('电话号码必须为11位数字','提示');
					}else{
						var userInfo = this.$store.state.userInformation;
						var index = this.$store.state.keyCode;
						for(var i=0;i<userInfo.length;i++){
							if(userInfo[i].phone == this.userInfo2.phone && i!=index){
								MessageBox.alert('电话号码已存在','提示');
							}else{
								this.userInformation.phone = this.userInfo2.phone;
								localStorage.setItem("userInformation",JSON.stringify(this.$store.state.userInformation));
								this.$router.push('/author');
							}
						}
					}
				}else if(this.emailFlag === true){
					var reg2=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
			 		if(!this.userInfo2.email){ 
			 			MessageBox.alert('请输入邮箱','提示');
					}else if(!reg2.test(this.userInfo2.email)){
						MessageBox.alert('邮箱输入错误','提示'); 
				 	}else{
				 		this.userInformation.email = this.userInfo2.email;
						localStorage.setItem("userInformation",JSON.stringify(this.$store.state.userInformation));
						this.$router.push('/author');
				 	}
				}else{
					localStorage.setItem("userInformation",JSON.stringify(this.$store.state.userInformation));
					this.$router.push('/author');
				}
				// console.log('222',this.userInfo2.phone,this.userInformation.phone,this.$store.state.userInformation[this.$store.state.keyCode].phone)
				
				
				// 
			}
			
		}
	}
</script>
<style>
	.editUserInfoCnt{
		position: absolute;
	    width: 100%;
	    height: 100%;
	    z-index: 999;
	    background: white;
	}
	.editUserInfoHeader{
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
	.editUserInfoContent{
		margin-top: 1.6rem;
    	font-size: 0.4rem;
	}
	.inputCnt{
		border-bottom: 1px solid #F4F4F4;
	}
	.mint-button--default{
		margin-top: 0.5rem;
	    width: 90%;
	    margin-left: 5%;
	    box-shadow: none;
	}
    
</style>