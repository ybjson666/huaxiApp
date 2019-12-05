
import Vue from 'vue'
import App from './App'
import router from './router'
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css'
import store from './store'
import rem from './utils/rem';
import moment from 'moment'//导入文件 
// import lodash from 'lodash'
import {toggleModal,isEn } from './utils/tools'
// import animate from 'animate.css'
Vue.prototype.moment = moment;//赋值使用

Vue.use(Mint);
Vue.config.productionTip = false;
// Vue.use(animate);//路由动画

/**全局文字长度过滤 */
Vue.filter('curtWords',(val,num)=> {
  if(!isEn.test(val)){
    if(val.length>num){
      return val.slice(0,num)+'...';
    }else{
      return val;
    }
  }else{
    return val;
  }
})


/**
 * 使用rem
 */
rem(document,window);

//获取用户信息
// let token=localStorage.getItem('appToken');
// let path=location.href.split('/')[location.href.split('/').length-1];
// if(token&&path!='login'){
//   store.dispatch('user/req_getUser',(data)=>{
//       if(data&&data.state!==200){
//         toggleModal(data.message);
//       }
//   })
// }


/*
  登录拦截
*/
router.beforeEach((from, to, next) => {
   if (from.meta.requireAuth) { // 判断跳转的路由是否需要登录
        // console.log(store._modules.root.state)
       if (store._modules.root.state.user.token) { // vuex.state判断token是否存在
           next() // 已登录
       } else {
           next({
               path: '/login',
               query: {redirect: from.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
           })
       }
   } else {
      next()
   }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
