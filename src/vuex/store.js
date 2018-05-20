import Vue from 'vue'
import Vuex, { Store } from 'Vuex'
import { MessageBox } from 'mint-ui';

Vue.use(Vuex);

const store=new Vuex.Store({
    state:{
        //数据保存本地防止刷新消失
        userInformation:localStorage["userInformation"]?JSON.parse(localStorage["userInformation"]): [],
        goodDetails:localStorage["goodDetails"]?JSON.parse(localStorage["goodDetails"]): [],
        carts:localStorage["carts"]?JSON.parse(localStorage["carts"]): [],
        orders:localStorage["orders"]?JSON.parse(localStorage["orders"]): [],
        keyCode:localStorage["keyCode"]?JSON.parse(localStorage["keyCode"]): -1,
        //收货地址
        address:localStorage["address"]?JSON.parse(localStorage["address"]): []
    },
    mutations:{
        //用户注册
        userInformationMutation(state,userInfo){
            state.userInformation.push(userInfo);
            //注册用户时，为每个用户创建一个购物车
            var shopCartData = [];
            state.carts.push(shopCartData);
            //注册用户时，为每个用户创建一个订单
            var orderData = [];
            state.orders.push(orderData);
            //注册用户时，为每个用户创建一个收货地址数组
            var address = [];
            state.address.push(address);
            localStorage.setItem("userInformation",JSON.stringify(state.userInformation));
            localStorage.setItem("carts",JSON.stringify(state.carts));
            localStorage.setItem("orders",JSON.stringify(state.orders));
            localStorage.setItem("address",JSON.stringify(state.address));
        },
        //加入购物车
        addcarts:(state,data)=>{
            var index = state.keyCode;
            state.carts[index].unshift(data);
            // state.carts[index].unshift();
            localStorage.setItem("carts",JSON.stringify(state.carts));
            // state.carts.push(data);
            // state.carts.reverse();
            // localStorage.setItem("carts",JSON.stringify(state.carts));
        },
        //购物之后加入订单
        addorder:(state,data)=>{
            var index = state.keyCode;
            state.orders[index].unshift(data);
            // state.orders[index].unshift();
            localStorage.setItem("orders",JSON.stringify(state.orders));
            // state.orders.push(data);
            // localStorage.setItem("orders",JSON.stringify(state.orders));
        },
        //删除购物车商品
        shanchu:(state,index)=>{
            MessageBox.confirm('确定删除该商品么？').then(action=>{
                state.carts[state.keyCode].splice(index,1);
                localStorage.setItem("carts",JSON.stringify(state.carts));
            })           
        },

        //购物车结算
        // settlement:(state,data)=>{
        //     state.carts[state.keyCode]=[];
        //     localStorage.setItem("carts",JSON.stringify(state.carts));
        // },
        
        //订单删除
        odefault:(state,index)=>{
            MessageBox.confirm('确定删除该订单么？').then(action=>{
                state.orders[state.keyCode].splice(index,1);
                localStorage.setItem("orders",JSON.stringify(state.orders));
            })
        },

        //数量加
        add(state,index){
            state.carts[state.keyCode][index].value++;
            localStorage.setItem("carts",JSON.stringify(state.carts));
        },
        //数量减
        reduce(state,index){
            if(state.carts[state.keyCode][index].value==1){
                state.carts[state.keyCode][index].value=1;
            }else{
                state.carts[state.keyCode][index].value--;
            }
            localStorage.setItem("carts",JSON.stringify(state.carts));
        },       
    },
    getters:{
        // sum:state=>{
        //     var sum=0;
        //     state.carts.forEach((cart)=>{
        //         sum+=cart.price*cart.value
        //     })
        //     return sum
        // },
    },
    
})
export default store