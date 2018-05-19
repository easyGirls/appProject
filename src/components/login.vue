<!-- 登录页面 -->
<template> 
 	<div class="login"> 
 		<!-- 头部 -->
    	<mt-header title="登录">
  			<router-link to="/register" slot="right">
    			<p>注册</p>
  			</router-link>
		</mt-header> 

 		<div class="loginContent"> 
 			<form :model="rulesForm" ref="rulesForm"> 
 				<section> 
 					<div> 
 						<label id="username">用户名</label> 
 						<input type="text" id="username" v-model="rulesForm.username" placeholder="请输入用户名" @blur="checkUsername"> 
 						<p v-show="flagData.usernameFlag" class="usernameText">请输入用户名</p>
 					</div> 
 				</section> 
				<section> 
 					<div> 
 						<label id="username">密码</label>
 						<input type="password" id="password" v-model="rulesForm.password" placeholder="请输入6-16位密码"@blur="checkPassword">
 						<p v-show="flagData.passwordFlag" class="passwordText">请输入6-16位密码</p> 
 					</div> 
 				</section> 
 				<section> 
 					<mt-button type="danger" class="btn" @click="loginSubmit">登录</mt-button> 
 				</section> 
 			</form> 
 		</div> 
 	</div> 
</template> 

<script>
import { MessageBox } from 'mint-ui'; 
export default{ 
 	data(){ 
 		return { 
 			rulesForm:{ 
 				username:'', 
 				password:'' 
 			}, 
 			popupVisible:false,
 			flagData:{
 				usernameFlag: false,
	 			passwordFlag: false
 			},
 			key: false,
 		} 
 	}, 
 	mounted:function(){ 
 		
 	}, 
 	methods:{
 		//检查用户名
 		checkUsername: function(){
 			var element = document.getElementsByClassName('usernameText');
	 		if(!this.rulesForm.username){ 
	 			this.flagData.usernameFlag = true;
				element[0].innerText = '请输入用户名';
			}
 		},
 		//检查密码
 		checkPassword: function(){
 			var element = document.getElementsByClassName('passwordText');
		 	var userInformation = this.$store.state.userInformation;
	 		if(!this.rulesForm.password){ 
	 			this.flagData.passwordFlag = true;
				element[0].innerText = '请输入6-16位密码';
			}else if(this.rulesForm.password.length<6 || this.rulesForm.password.length>16){
				this.flagData.passwordFlag = true;
				elementPassword[0].innerText = '密码必须是6-16位';
			}
 		}, 
 		//点击登录
 		loginSubmit: function(){
 			var userInformation = this.$store.state.userInformation;
 			var flag = 0;
 			var index = -1;
 			for(var i=0;i<userInformation.length;i++){
				if(userInformation[i].username === this.rulesForm.username && userInformation[i].password === this.rulesForm.password){
					flag = 1;
					index = i;
					break;
				}else{
					flag = 0;
				}
			}
			if(flag === 1){
				this.$router.push('/Home');
				this.$store.state.keyCode = index;
				localStorage.setItem("keyCode",JSON.stringify(this.$store.state.keyCode));
			}else{
				MessageBox.alert('登录失败','提示');
			}
 		}
 	} 
 }  
</script>

<style> 
 /*头部*/ 
.login .mint-header {
    background-color: #f7f7f7;
    color: black;
    font-size: 0.6rem;
    font-weight: 500;
}

/*中间注册相关信息*/ 
.login .loginContent section{ 
 	position: relative;
 	width: 100%; 
 	text-align: center; 
 	line-height: 1.3rem; 
 	margin-top: 0.6rem; 
 	margin-bottom: 0.28rem;
 } 
.login .loginContent section:first-child{
 	margin-top: 1rem;
 }
.login .loginContent div{ 
 	width: 80%; 
 	display: inline-block; 
 	border: 1px solid #e0e0e0; 
 	background: #fff; 
 } 
.login .loginContent div.code{ 
 	background:#f4f4f4;
 	border: 0; 
} 
.login .loginContent div label{ 
 	width: 27%; 
 	line-height: 1.3rem; 
 	float: left; 
 	display: block; 
 	text-align: center; 
 	font-size: 0.45rem; 
 	color: #333; 
} 
.login .loginContent div input{ 
 	font-size: 0.45rem; 
 	border: 0; 
 	line-height: 1.3rem; 
 	width: 73%; 
 	outline: none;
} 
.login .loginContent div input#password{ 
 	width: 73%;  
} 
.login .loginContent div input#verification{ 
 	width: 52%; 
 	float: left; 
 	display: block; 
 	text-align: center; 
 	border: 1px solid #e0e0e0; 
} 
.usernameText,.passwordText{
	line-height: 30px;
	color: red;
	position: absolute;
	bottom: -50%;
    left: 11%;
}
/*.login .loginContent div .codeBtn{ 
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
} */
/*注册按钮*/ 
.login .loginContent .btn{ 
 	width:80%; 
 	background: #ff3600; 
 	border-radius: 0px; 
 	cursor:pointer; 
 	font-size: 0.55rem; 
 	height: 1.3rem; 
} 
/*协议部分*/ 
/*.register .footer{ 
 	line-height: 2rem; 
 	color: #999; 
 	font-size: 0.7rem; 
 	text-align: center; 
} 
.register .footer i,.register .footer span{ 
 	color: #ff3600; 
 	cursor:pointer; 
}*/ 
</style> 
