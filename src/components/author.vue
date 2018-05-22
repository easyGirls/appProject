<!-- 个人信息页面 -->
<template>
  <div class="Author">
      <div class="AuthorHeader">
        <router-link to="my">
          <i class="iconfont icon-552cc14536532"></i>
        </router-link>
          关于我
      </div>
      <div class="AuthorMain">
        <p class="field">
          <span>用户名：</span>
          {{ userInformation.username }}
          <!-- <span class="editUserInfo" @click="editUserInfo(userInformation.username)"><i class="iconfont icon-zuozhe"></i></span> -->
        </p>
        <p class="field"><span>性别：</span>{{ userInformation.sex }}<span class="editUserInfo" @click="editUserInfo(0)"><i class="iconfont icon-zuozhe"></i></span></p>
        <p class="field"><span>年龄：</span>{{ userInformation.age }}<span class="editUserInfo" @click="openPicker"><i class="iconfont icon-zuozhe"></i></span></p>
        <!-- 不能直接用v-model="userInformation.age"，否则刷新得到的是未经处理的时间 -->
        <mt-datetime-picker
          ref="picker"
          type="date"
           v-model="age"
           :startDate="startDate"
            @confirm="handleConfirm"
            @cancel="checkinCancel"
             >
        </mt-datetime-picker>
        <p class="field"><span>联系电话：</span>{{ userInformation.phone }}<span class="editUserInfo" @click="editUserInfo(2)"><i class="iconfont icon-zuozhe"></i></span></p>
        <p class="field"><span>邮箱：</span>{{ userInformation.email }}<span class="editUserInfo" @click="editUserInfo(3)"><i class="iconfont icon-zuozhe"></i></span></p>
      </div>
  </div>
</template>

<script>
  import { DatetimePicker } from 'mint-ui';
  import store from '../vuex/store.js';
  export default {
    data(){
        return{
          ageFlag: false,
          age : store.state.userInformation[store.state.keyCode].age,
          startDate: new Date('1990-01-01'),
            // status2: store.state.status2
        }
    },
    computed: {
      userInformation: function(){
        var index = this.$store.state.keyCode;
        // console.log('userInformation',this.$store.state.userInformation[index])
        return this.$store.state.userInformation[index];
      }
    },
    components:{
      DatetimePicker
    },
    methods: {
      editUserInfo: function(index){
        if(index === 1){
          // document.getElementById('age').style.display = 'block';
          // alert(this.ageFlag)
          this.ageFlag = true;
        }else{
          this.ageFlag = false;
          this.$store.state.status2 = index;
          localStorage.setItem("status2",JSON.stringify(this.$store.state.status2));
          this.$router.push('/editUserInfo');
        }
      },
      openPicker: function() {
          this.$refs.picker.open();
      },
      handleConfirm: function(){
          var date = this.age;
          var year = date.getFullYear();
          var month = date.getMonth()+1;
          var day = date.getDate();
          this.userInformation.age = year + '/' + month + '/' + day;
          localStorage.setItem("userInformation",JSON.stringify(this.$store.state.userInformation));
          this.$refs.picker.close();
      },
      checkinCancel: function(){
          this.$refs.picker.close();
      }
    }
  }
</script>

<style>
.Author{
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 999;
  background: white;
}
.AuthorHeader{
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
.AuthorMain{
    margin-top: 1.6rem;
    font-size: 0.4rem;
    /*text-align: center;*/
}
.AuthorMain a{
    display: block;
    text-align: center;
    margin: 0.8rem auto;
    width: 110px;
    height: 37px;
    line-height: 37px;
    border-radius: 4px;
    text-align: center;
    background: #e0524b;
    color: white;
    font-weight: 800;
    font-size: 0.5rem;
}
.AuthorHeader i{
    display: block;
    float: left;
    height: 50px;
    font-size: 0.71rem;
    color: black;
    width: 0.9rem;
}
.field{
    padding-left: 0.5rem;
    border-bottom: 0.8px solid rgba(217,217,217,0.3);
    line-height: 1.3rem;
}
.editUserInfo{
    display: inline-block;
    position: absolute;
    right: 0.5rem;
    color: rgba(4,221,152,0.5);
}
.age{
  display: block !important;
}
</style>
