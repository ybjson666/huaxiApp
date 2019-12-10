<template>
  <div class='login-container'>
    <div class="bg-capture"></div>
    <div class="login-contents">
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
        <div class="login-form">
            <div class="row">
                <span class="label"><img src="../assets/images/account.png" alt=""></span>
                <input type="text" placeholder="请输入手机号" class="row-input" v-model="phone" oninput = "value=value.replace(/[^\d]/g,'')">
            </div>
            <div class="row last">
                <span class="label"><img src="../assets/images/password.png" alt=""></span>
                <input type="password" placeholder="请输入密码" class="row-input" v-model="password">
            </div>
            <p class="forget-pwd-bar">
                <span @click.stop="forgetPwds">忘记密码</span>
            </p>
            <div class="btn-block">
                <button class="login-btn" @click="login" :disbaled="isLogin" :class="{btnGray:isLogin}">登录</button>
                <div class="regist-btn" @click="goRegist">注册</div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import { toggleModal,reg_phone,reg_pwd } from '../utils/tools'
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
            // {
            //     name:"团队登录",
            //     type:"2"
            // }
        ],
        userType:"1",
        phone:"",
        password:"",
        redirectPath:"",
        isLogin:false
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
      forgetPwds(){
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
          }else if(password.trim().length<6){
              toggleModal("密码长度不能小于6位");
              return;
          }
          this.isLogin=true;
          this.req_login([{phone,password},(data)=>{
              if(data.state===200){
                  toggleModal('登录成功');
                  this.isLogin=false;
                  setTimeout(()=>{
                      this.redirectPath?this.$router.replace(this.redirectPath):this.$router.replace('/main')
                  },1000);
              }else{
                  toggleModal(data.message);
                  this.isLogin=false;
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
    height: 100%;
    .bg-capture{
        height:8.9rem;
        background: url('../assets/images/bg1.png') no-repeat;
        background-size: cover;
    }
    .login-contents{
        padding: 2.5rem 2.4rem;
        box-sizing: border-box;
        .login-type-bar{
            margin-bottom: 2.9rem;
            .type-list{
                display: flex;
                li{
                    flex: 1;
                    font-size: .9rem;
                    text-align: center;
                    line-height: 1rem;
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
                    border-bottom: 1px solid rgb(204,204,204);
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
                font-size: .75rem;
                margin-top: 7.5px;
            }
            .btn-block{
                margin-top: 2rem;
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
                    margin-bottom: 1rem;
                    display: block;
                    height: 2rem;
                    line-height: 2rem;
                    width: 100%;
                    border-radius: .8rem;
                    font-size: .9rem;
                    text-align: center;
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
