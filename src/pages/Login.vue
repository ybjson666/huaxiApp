<template>
  <div class='login-container'>
    <div class="bg-capture"></div>
    <div class="contents">
        <div class="login-type-bar">
            <ul class="type-list">
                <li v-for="(item,index) in typeList" :key="index" 
                :class="{on:userType===item.type}"
                @click="seleType(item.type)"
                >
                    <span>{{item.name}}</span>
                </li>
            </ul>
        </div>
        <form action="" class="login-form">
            <div class="row">
                <span class="label"><img src="../assets/images/account.png" alt="" oninput = "value=value.replace(/[^\d]/g,'')"></span>
                <input type="text" placeholder="请输入手机号" class="row-input" v-model="phone">
            </div>
            <div class="row last">
                <span class="label"><img src="../assets/images/password.png" alt=""></span>
                <input type="password" placeholder="请输入密码" class="row-input" v-model="password">
            </div>
            <p class="forget-pwd-bar">
                <span @click="forgetPwd">忘记密码</span>
            </p>
            <div class="btn-block">
                <div class="login-btn" @click="login">登录</div>
                <div class="regist-btn" @click="goRegist">注册</div>
            </div>
        </form>
    </div>
  </div>
</template>

<script>
import { toggleModal,reg_phone } from '../utils/tools'
import { mapActions } from 'vuex'
export default {
name:'login',
  data () {
    return {
        typeList:[
            {
                name:"个人登录",
                type:"1"
            },
            {
                name:"团队登录",
                type:"2"
            }
        ],
        userType:"1",
        phone:"",
        password:"",
        redirectPath:""
    };
  },
  mounted(){
      let path=this.$route.query.redirect||"";
      if(path) this.redirectPath=path;
  },

  methods: {
      ...mapActions('user',['req_login']),
      seleType(type){
          this.userType=type
      },
      forgetPwd(){
          this.$router.push('/findPwd')
      },
      login(){
          const { password, phone } =this;
          if(!phone){
              toggleModal("请输入手机号");
              return;
          }else if(!reg_phone.test(phone)){
              toggleModal("手机号格式错误");
              return;
          }else if(!password){
              toggleModal("请输入密码");
              return;
          }
          this.req_login([{phone,password},(data)=>{
              console.log(data)
              if(data.state===200){
                  toggleModal('登录成功');
                  setTimeout(()=>{
                      this.redirectPath?this.$router.replace(this.redirectPath):this.$router.replace('/main')
                  },1000);
              }else{
                  toggleModal(data.message);
              }
          }])
        
      },
      goRegist(){
          this.$router.push('/regist')
      }
  }
}

</script>
<style lang='scss' scoped>
.login-container{
    .bg-capture{
        height:8.9rem;
        background: url('../assets/images/bg1.png') no-repeat;
        background-size: cover;
    }
    .contents{
        padding: 2.5rem;
        box-sizing: border-box;
        .login-type-bar{
            margin-bottom: 2.3rem;
            .type-list{
                display: flex;
                li{
                    flex: 1;
                    font-size: .9rem;
                    text-align: center;
                    line-height: 1rem;
                    color: #000;
                }
                li.on{
                    color: #ff0000;
                }
            }
        }
        .login-form{
            padding: 0 1rem;
            box-sizing: border-box;
            .row{
                display: flex;
                margin-bottom: 1.2rem;
                .label{
                    display: block;
                    width: 1rem;
                    margin-right: .5rem;
                    line-height: 1.5rem;
                    padding-top: .3rem;
                    box-sizing: border-box;
                }
                .row-input{
                    flex: 1;
                    border-bottom: 1px solid #999;
                    line-height: 1.5rem;
                    font-size: .75rem;
                }
            }
            .last{
                margin-bottom: 0;
            }
            
            .forget-pwd-bar{
                text-align: right;
                color: #ff0000;
                line-height: 1.5rem;
                font-size: .7rem;
            }
            .btn-block{
                margin-top: 3.4rem;
                div{
                    height: 2rem;
                    line-height: 2rem;
                    text-align: center;
                    font-size: .9rem;
                    border-radius: .8rem;
                }
                .login-btn{
                    background: #ff0000;
                    color: #fff;
                    margin-bottom: .8rem;
                }
                .regist-btn{
                    border:1px solid #ff0000;
                    box-sizing: border-box;
                    color: #ff0000;
                }
            }
        }
    }

}
</style>