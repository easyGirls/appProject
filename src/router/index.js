//引入路由
import Vue from 'vue'                              //引入vue
import Router from 'vue-router'                    //引入路由信息
// 定义页面路由地址  
import Home from '@/components/Home'               //导入首页
import cart from '@/components/cart'               //导入购物车页
import my from '@/components/my'                   //导入"我的"页
import goodDetail from '@/components/goodDetail'   //导入商品详情页
import order from '@/components/order'             //导入订单页
import orderDetail from '@/components/orderDetail' //导入下订单页面
import author from '@/components/author'           //导入个人信息页
import bedding from '@/components/bedding'         //导入床上用品页
import information from '@/components/information' //导入“全文阅读”页
import news from '@/components/news'               //导入“文章”页
import sofas from '@/components/sofas'             //导入"沙发"选项卡    
import register from '@/components/register'       //导入"注册"页
import login from '@/components/login'             //导入"登录"页
import addAddress from '@/components/addAddress'   //导入新增地址页
import myAddress from '@/components/myAddress'   //导入我的收货地址页
import editAddress from '@/components/editAddress'   //导入编辑地址页
import editUserInfo from '@/components/editUserInfo'   //导入编辑地址页
import myCollection from '@/components/myCollection'   //导入我的收藏页
import store from '../vuex/store.js';
Vue.use(Router)                                    //初始化路由信息

//规定默认的路径，定义进入默认的路由页面（配置路由地址）
export const router = new Router({
  routes: [
    { path: '/',name: 'Home',component: Home },
    { path: '/Home',name: 'Home', component: Home},
    { path: '/cart',name: 'cart',component: cart, meta: { requireAuth: false  // 添加该字段，表示进入这个路由是需要登录的
    }},
    { path: '/my',name: 'my',component: my },
    { path: '/goodDetail', name: 'goodDetail',component: goodDetail },
    { path: '/order',name: 'order',component: order },
    { path: '/orderDetail',name: 'orderDetail',component: orderDetail },
    { path: '/addAddress',name: 'addAddress',component: addAddress },
    { path: '/myAddress',name: 'myAddress',component: myAddress },
    { path: '/editAddress',name: 'editAddress',component: editAddress },
    { path: '/author', name: 'author',component: author },
    { path: '/editUserInfo', name: 'editUserInfo',component: editUserInfo },
    { path: '/bedding' ,name:'bedding' ,component:bedding},
    { path: '/information' ,name:'information' ,component:information},
    { path: '/myCollection' ,name:'myCollection' ,component:myCollection},
    { path: '/news' ,name:'news' ,component:news},
    { path: '/sofas' ,name:'sofas' ,component:sofas},
    { path: '/register' ,name:'register' ,component:register},
    { path: '/login' ,name:'login' ,component:login},
  ]
})

router.beforeEach(function (to, from, next) {
  if (to.path === '/cart' && store.state.keyCode === -1) {
    next('/login');
  }else if (to.path === '/author' && store.state.keyCode === -1) {
    next('/login');
  }else if (to.path === '/my' && store.state.keyCode === -1) {
    next('/login');
  }else{
    next();
  }
})