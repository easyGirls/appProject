<template>
  <div class="my">
    <div class="myHeader">{{my}}<p class="exit" @click="exit">退出</p></div>
    <div class="myMain">
      <div class="Main">
        <img src="/static/img/tou.jpg" alt="头像">
        <p>{{myName}}</p>
      </div>
    </div>
    <div class="MyBox">
      <div class="myOrder" @click="order">
        <div class="Order">
          <i class="iconfont icon-74wodedingdan"></i>
          <p>我的订单</p>
        </div>
      </div>
      <div class="myCollection" @click="author">
        <div class="Order">
          <i class="iconfont icon-zuozhe"></i>
          <p>个人资料</p>
        </div>
      </div>
    </div> 
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import store from '../vuex/store.js'; 
  export default {
    name:"my",
    data(){
      return{
        my:"个人中心",
        myName:store.state.userInformation[store.state.keyCode].username,
      }
    },
    methods:{
      exit: function(){
          // localStorage.removeItem("userInformation");
          // localStorage.removeItem("goodDetails");
          // localStorage.removeItem("carts");
          // localStorage.removeItem("orders");
          localStorage.removeItem("keyCode");
          this.$store.state.keyCode = -1;
          console.log('userInformation',this.$store.state.userInformation);
          this.$router.push('/login');
      },
      order:function(){
         this.$router.push('/order')
      },
      author:function(){
          this.$router.push('/author')
      }
    }
  }
</script>


<style>
   .myHeader{
        height: 1.3rem;
        line-height: 1.3rem;
        font-size: 0.35rem;
        padding-left: 0.3rem;
        background: white;
        font-size: 0.41rem;
   }
   .exit{
        float:right;    
        padding-right: 0.5rem;
        font-size: 0.4rem;
   }
   .myMain{
       height: 100%;
       background: white;
       margin-top: 10px;
       width: 100%;
       
   }
    .MyBox{
        width: 100%;
        height: 110px;
        background: white;
    }
    .myOrder,.myCollection{
        height: 50%;
    }
   .Main, .Order{
       height: 100%;
       /* background: red; */
       margin-left: 10px;
       border-bottom: 1px solid #cccccc;
   }
   .myMain img{
       display: block;
       width: 60px;
       height: 60px;
       padding: 7px;
       float: left;
   }
    .myMain p{
        line-height: 75px;
    }
  
   .Order i , .Order p{
       display: block;
       line-height: 55px;
       float: left;
       padding-left: 10px;
   }
</style>
