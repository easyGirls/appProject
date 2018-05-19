<!-- 注册页面 -->
<template> 
 	<div class="register"> 
 		<!-- 头部 -->
    	<mt-header title="注册">
  			<router-link to="/login" slot="left">
    			<mt-button icon="back"></mt-button>
  			</router-link>
		</mt-header> 

 		<div class="registerContent"> 
 			<form :model="rulesForm" ref="rulesForm"> 
 				<section> 
 					<div> 
 						<label id="username">用户名</label> 
 						<input type="text" id="username" v-model="rulesForm.username" placeholder="请输入用户名" @blur="checkUsername"> 
 					</div> 
 					<p v-show="flagData.usernameFlag" class="usernameText">请输入用户名</p>
 				</section> 
 				<section> 
 					<div> 
 						<label id="email">邮箱</label> 
 						<input type="text" id="email" v-model="rulesForm.email" placeholder="请输入邮箱" @blur="checkEmail" >
 					</div> 
 					<p v-show="flagData.emailFlag" class="emailText"></p>
 				</section>
 				<section> 
			 		<div> 
			 			<label id="phone">电话</label> 
			 			<input type="text" id="phone" v-model="rulesForm.phone" placeholder="请输入电话号码" @blur="checkPhone"> 
			 		</div> 
			 		<p v-show="flagData.phoneFlag" class="phoneText"></p>
 				</section>
				<section> 
 					<div> 
 						<label id="password">密码</label> 
 						<input type="password" id="password" v-model="rulesForm.password" placeholder="请输入6-16位密码"  @blur="checkPassword"> 
 					</div> 
 					<p v-show="flagData.passwordFlag" class="passwordText">请输入6-16位密码</p>
 				</section> 
 				<section> 
 					<div> 
 						<label id="dbpassword">重复密码</label> 
 						<input type="password" id="dbpassword" v-model="rulesForm.dbpassword" placeholder="请重复输入密码"  @blur="checkDbpassword"> 
 					</div> 
 					<p v-show="flagData.dbpasswordFlag" class="dbpasswordText">请重复输入密码</p>
 					<p v-show="flagData.dbpasswordFlag2" class="dbpasswordText">两次输入密码不一致</p>
 				</section> 
 				<section> 
 					<mt-button type="danger" class="btn" @click="registerSubmit">注册</mt-button> 
 				</section> 
 			</form> 
 		</div> 
 		<!-- <div class="footer"> 
 			<i class="fa fa-check-circle" aria-hidden="true"></i> 
 			点击 立即注册 即表示您同意醉品<span>用户协议</span>和<span>隐私协议</span> 
 		</div>  -->
 	</div> 
</template> 

<script>
	import { MessageBox } from 'mint-ui';
	import store from '../vuex/store.js'; 
	export default{ 
	 	data(){ 
	 		return { 
	 			rulesForm:{ 
	 				username:'', 
	 				email:'', 
	 				password:'', 
	 				dbpassword:'', 
	 				phone:'' 
	 			}, 
	 			form:'', 
	 			popupVisible:false ,
	 			flagData: {
	 				usernameFlag: false,
	 				emailFlag: false,
	 				phoneFlag: false,
	 				passwordFlag: false,
	 				dbpasswordFlag: false,
	 				dbpasswordFlag2: false
	 			},
	 			//用于判断是否注册成功，所有为true时登录成功
	 			usernameKey: false,
	 			emailKey: false,
	 			phoneKey: false,
	 			passwordKey: false,
	 			dbpasswordKey: false
	 		} 
	 	}, 
	 	watch: {
	 	},
	 	mounted:function(){ 
	 		 
	 	}, 
	 	methods:{ 
		 	//检查用户名
		 	checkUsername: function(){
		 		var element = document.getElementsByClassName('usernameText');
		 		var userInformation = this.$store.state.userInformation;
		 		if(!this.rulesForm.username){ 
		 			this.flagData.usernameFlag = true;
					element[0].innerText = '请输入用户名';
					this.usernameKey = false;
				}else if(userInformation.length != 0){
					// console.log('22',userInformation)
					for(var i=0;i<userInformation.length;i++){
						if(userInformation[i].username === this.rulesForm.username){
							// alert(0);
							this.flagData.usernameFlag = true;
							element[0].innerText = '用户名已存在';
							this.usernameKey = false;
							break;
						}else{
							this.flagData.usernameFlag = false;
							this.usernameKey = true;
						}
					}
				}else{
					this.flagData.usernameFlag = false;
					this.usernameKey = true;
				}
		 	},
		 	//检查邮箱
		 	checkEmail: function(){
		 		var element = document.getElementsByClassName('emailText');
		 		var reg2=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
		 		if(!this.rulesForm.email){ 
		 			this.flagData.emailFlag = true;
		 			element[0].innerText = '请输入邮箱';
		 			this.emailKey = false;
				}else if(!reg2.test(this.rulesForm.email)){ 
					this.flagData.emailFlag = true;
		 			element[0].innerText = '邮箱输入错误';
		 			this.emailKey = false;
			 	}else{
			 		this.flagData.emailFlag = false;
			 		this.emailKey = true;
			 	}
		 	},
		 	//检查手机号码
		 	checkPhone: function(){
		 		var elementPhome = document.getElementsByClassName('phoneText');
		 		var reg=/^[0-9]{11}$/;
		 		var userInformation = this.$store.state.userInformation; 
		 		if(!this.rulesForm.phone){ 
		 			this.flagData.phoneFlag = true;
		 			elementPhome[0].innerText = '请输入电话号码';
		 			this.phoneKey = false;
				}else if(!reg.test(this.rulesForm.phone)){
					this.flagData.phoneFlag = true;
					elementPhome[0].innerText = '电话号码必须为11位数字';
					this.phoneKey = false;
				}else if(userInformation.length != 0){
					// console.log('33',userInformation)
					for(var i=0;i<userInformation.length;i++){
						if(userInformation[i].phone == this.rulesForm.phone){
							this.flagData.phoneFlag = true;
							elementPhome[0].innerText = '手机号码已注册';
							this.phoneKey = false;
						}else{
							this.flagData.phoneFlag = false;
							this.phoneKey = true;
						}
					}
				}else{
					this.flagData.phoneFlag = false;
					this.phoneKey = true;
				}
		 	},
		 	//检查密码是否为空
		 	checkPassword: function(){
		 		var elementPassword = document.getElementsByClassName('passwordText');
		 		if(!this.rulesForm.password){ 
		 			this.flagData.passwordFlag = true;
		 			elementPassword[0].innerText = '请输入6-16位密码';
		 			this.passwordKey = false;
				}else if(this.rulesForm.password.length<6 || this.rulesForm.password.length>16){
					this.flagData.passwordFlag = true;
					elementPassword[0].innerText = '密码必须是6-16位';
					this.passwordKey = false;
				}else{
					this.flagData.passwordFlag = false;
					this.passwordKey = true;
				}
		 	},
		 	//检查重复密码
		 	checkDbpassword: function(){
		 		if(!this.rulesForm.dbpassword){ 
		 			this.flagData.dbpasswordFlag = true;
		 			this.flagData.dbpasswordFlag2 = false;
		 			this.dbpasswordKey = false;
				}else if(this.rulesForm.password === this.rulesForm.dbpassword){  
					this.flagData.dbpasswordFlag = false;
		 			this.flagData.dbpasswordFlag2 = false;
		 			this.dbpasswordKey = true;
		 		}else{
		 			this.flagData.dbpasswordFlag = false;
		 			this.flagData.dbpasswordFlag2 = true;
		 			// this.rulesForm.password=''; 
		 			this.rulesForm.dbpassword=''; 
		 			this.dbpasswordKey = false;
		 		}
		 	},
		 	// goBack:function(){ 
		 	// 	this.$router.go(-1); 
		 	// },
		 	//点击注册
		 	registerSubmit:function(){
		 		if(this.usernameKey === true && this.emailKey=== true && this.phoneKey=== true && this.passwordKey=== true  && this.dbpasswordKey=== true){
			 		var registerData = { username:this.rulesForm.username,email:this.rulesForm.email,password:this.rulesForm.password,phone:this.rulesForm.phone } 
					this.$store.commit('userInformationMutation',registerData);
					MessageBox.alert('注册成功','提示');
					this.rulesForm.username = '';
					this.rulesForm.email = '';
					this.rulesForm.password = '';
					this.rulesForm.dbpassword = '';
					this.rulesForm.phone = '';
					this.$router.push('/login');
				}else{
					MessageBox.alert('注册失败','提示');
				}
		 	}
	 	} 
	}  
</script>

<style> 
 /*头部*/ 
.register .mint-header {
    background-color: #f7f7f7;
    color: black;
    font-size: 0.6rem;
    font-weight: 500;
}

/*中间注册相关信息*/ 
.register .registerContent section{ 
	position: relative;
 	width: 100%; 
 	text-align: center; 
 	line-height: 1.3rem; 
 	margin-top: 0.6rem; 
 	margin-bottom: 0.28rem; 
 } 
 .register .registerContent section:first-child{
 	margin-top: 1rem;
 }

.register .registerContent div{ 
 	width: 80%; 
 	display: inline-block; 
 	border: 1px solid #e0e0e0; 
 	background: #fff; 
 } 
.register .registerContent div.code{ 
 	background:#f4f4f4; 
} 
.register .registerContent div label{ 
 	width: 27%; 
 	line-height: 1.3rem; 
 	float: left; 
 	display: block; 
 	text-align: center; 
 	font-size: 0.45rem; 
 	color: #333; 
} 
.register .registerContent div input{ 
 	font-size: 0.45rem; 
 	border: 0; 
 	line-height: 1.3rem; 
 	width: 73%; 
 	outline: none; 
} 
.register .registerContent div input#password,.register .registerContent div input#dbpassword{ 
 	width: 73%; 
} 
.register .registerContent div.code{ 
 	border: 0; 
} 
.register .registerContent div input#verification{ 
 	width: 52%; 
 	float: left; 
 	display: block; 
 	text-align: center; 
 	border: 1px solid #e0e0e0; 
} 
.register .registerContent div .codeBtn{ 
 	display: block; 
 	float: right; 
 	margin-left: 5%; 
 	width: 38%; 
 	background: #ff3600; 
 	border-radius: 0px; 
 	cursor:pointer; 
 	font-size: 0.7rem; 
 	height: 2rem; 
} 
.register .registerContent div .codeBtn label{ 
 	width: 100%; 
 	color: #fff; 
} 
.usernameText,.emailText,.phoneText,.passwordText,.dbpasswordText{
	line-height: 30px;
	color: red;
	position: absolute;
	bottom: -50%;
    left: 11%;
}
.register .registerContent .usernameText{
    bottom: -50%;
    left: 11%;
}
.register .registerContent .emailText{
	bottom: -50%;
    left: 11%;
}
/*注册按钮*/ 
.register .registerContent .btn{ 
 	width:80%; 
 	background: #ff3600; 
 	border-radius: 0px; 
 	cursor:pointer; 
 	font-size: 0.55rem; 
 	height: 1.3rem; 
} 
/*协议部分*/ 
.register .footer{ 
 	line-height: 2rem; 
 	color: #999; 
 	font-size: 0.7rem; 
 	text-align: center; 
} 
.register .footer i,.register .footer span{ 
 	color: #ff3600; 
 	cursor:pointer; 
} 
</style> 
