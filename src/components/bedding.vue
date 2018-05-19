<!-- 床上用品页面 -->
<template>
  <div class="bedding">
    <!-- 头部 -->
    <div class="beddingheader" >
      <router-link to="/">
        <i class="iconfont icon-552cc14536532"></i>
      </router-link>
      床上用品
    </div>

    <!-- 选项卡 -->
    <div class="_bedding_twoMain">
      <mt-navbar v-model="selected" >
        <mt-tab-item id="tab-container1">全部</mt-tab-item>
        <mt-tab-item id="tab-container2">套件</mt-tab-item>
        <mt-tab-item id="tab-container3">枕头</mt-tab-item>
        <mt-tab-item id="tab-container4">床垫</mt-tab-item>
      </mt-navbar>
        
      <mt-tab-container v-model="selected" swipeable>
        <!-- 全部 -->
        <mt-tab-container-item id="tab-container1">
          <ul style="margin-top: 2px;">
            <li class="_beddingList" v-for="(bedding,index) in beddings" :id="bedding.id" @click="open(bedding.id)">
              <img v-bind:src="bedding.ImgF" alt="图片">
              <p>{{bedding.name}}</p>
              <div>￥{{bedding.Price}}</div>
            </li>
          </ul>
        </mt-tab-container-item>
        <!-- 套件 -->
        <mt-tab-container-item id="tab-container2">
          <ul style="margin-top: 2px;">
            <li class="_beddingList" v-for="(bedding,index) in suites" :id="bedding.id" @click="open(bedding.id)"> 
              <img v-bind:src="bedding.ImgF" alt="图片">
              <p>{{bedding.name}}</p>         
              <div>￥{{bedding.Price}}</div>
            </li>
          </ul>
        </mt-tab-container-item>
        <!-- 枕头 -->
        <mt-tab-container-item id="tab-container3">
          <ul style="margin-top: 2px;">
            <li class="_beddingList" v-for="(bedding,index) in Pillows" :id="bedding.id" @click="open(bedding.id)"> 
              <img v-bind:src="bedding.ImgF" alt="图片">
              <p>{{bedding.name}}</p>
              <div>￥{{bedding.Price}}</div>
            </li>
          </ul>
        </mt-tab-container-item>
        <!-- 床垫 -->
        <mt-tab-container-item id="tab-container4">
          <ul style="margin-top: 2px;">
            <li class="_beddingList" v-for="(bedding,index) in Mattress" :id="bedding.id" @click="open(bedding.id)"> 
              <img v-bind:src="bedding.ImgF" alt="图片">
              <p>{{bedding.name}}</p>
              <p style="font-size: 0.3rem;">{{bedding.nametwo}}</p>
              <div>￥{{bedding.Price}}</div>
            </li>
          </ul>
        </mt-tab-container-item>
      </mt-tab-container>            
    </div>
  </div>
</template>


<script>
import { Navbar, TabItem } from 'mint-ui';
export default {
  name:"bedding",
  data(){
      return{
          selected:"tab-container1",
          beddings:[],
          suites:[],
          Pillows:[],
          Mattress:[]
      }
  },
  mounted:function(){
    this.getData()
    this.getMoto()
    this.getVibe()
    this.getZ2()
  },
  methods:{
    // 全部
    getData:function(){
        var _this=this;
        this.$http.get("/static/bedding.json").then(function(res){
          for(var i=0,len=res.body.beddings.length;i<len;i++){
            var selData=res.body.beddings[i];
            var part=res.body.beddings[i].name;
            _this.beddings.push(selData)
        }
      })
    },
    // 被子
    getMoto:function(){
      var _this=this;
      this.$http.get("/static/bedding.json").then(function(res){
        for(var i=0,len=res.body.suites.length;i<len;i++){
          var selData=res.body.suites[i];
          var part=res.body.suites[i].name;
          _this.suites.push(selData)
        }
      })
    },
    // 枕头
    getVibe:function(){
      var _this=this;
      this.$http.get("/static/bedding.json").then(function(res){
        for(var i=0,len=res.body.Pillows.length;i<len;i++){
          var selData=res.body.Pillows[i];
          var part=res.body.Pillows[i].name;
          _this.Pillows.push(selData)
        }
      })
    },
    // 垫子
    getZ2:function(){
      var _this=this;
      this.$http.get("/static/bedding.json").then(function(res){
        for(var i=0,len=res.body.Mattress.length;i<len;i++){
          var selData=res.body.Mattress[i];
          var part=res.body.Mattress[i].name;
          _this.Mattress.push(selData)
        }
      })
    },
    open:function(id){
      this.$router.push({path:"goodDetail",query:{id:id}})
    },
    bedding:function(){
      this.$router.push({path:"Home"})
    },
  }
}
</script>

<style>
.beddingheader{
    position: fixed;
    width: 100%;
    -webkit-box-shadow: 0 0 10px #cecece;
    box-shadow: 0 0 10px #cecece;
    height: 1.3rem;
    line-height: 1.3rem;
    font-size: 0.35rem;
    padding-left: 0.3rem;
    background: white;
    top: 0;
    font-size: 0.41rem; 
    z-index: 100;
}
.beddingheader i{
    display: block;
    float: left;
    height: 50px;
    padding-right: 0.3rem;
    font-size: 22px;
    color: black;
}
._beddingList{
    height: 7rem;
    background: white;
    float: left;
    box-sizing: border-box;
    width: 50%;
    border-right: 1px solid #F4F4F4;
    border-bottom: 1px solid #F4F4F4;
    float: left;
    margin-top: 1px;
    list-style: none;
}
._bedding_twoMain{
  margin-top: 1.34rem;
}
._beddingList p{
    width: 94%;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: auto;
    font-size: 0.35rem;
    text-align: center;
}
._beddingList div{
    text-align: center;
    color: red;
    margin-top: 10px;
}
._beddingList img{
    height: 3.2rem;
    width: 4rem;
    display: block;
    margin: auto;
    padding: 0.5rem;
}
.bedding .mint-tab-item-label {
    color: inherit;
    font-size: 0.4rem;
    line-height: 0.5rem;
}
.bedding .mint-header {
    display: flex;
    font-size: 0.5rem;
    height: 50px;
    line-height: 1;
}
/*.mint-tab-container {
    overflow: hidden; 
    z-index: 2; 
  }*/
</style>
