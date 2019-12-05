<template>
  <div class='regist-container'>
     <head-bar title="注册" :showBack="showBack"></head-bar>
      <div class="regist-contents">
          <div class="user-pic">
              <img src="../assets/images/head2.png" alt="">
          </div>
          <div class="login-block">
            <div class="row">
                <span class="label">账号名</span>
                <input type="text" class="row-input" placeholder="请在此输入账号名" v-model="nickName">
            </div>
            <div class="row">
                <span class="label">密码</span>
                <input type="password" class="row-input" placeholder="请输入密码(6-20位数字加字母)" v-model="password">
            </div>
            <!-- <div class="row">
                <div class="row-bar">
                    <span class="label">性别</span>
                    <span class="radio-wraps man-wraps">
                    <label class="theme-radio"><input type="radio" value="1" v-model="gender" name="gender_type"><i class="icon-radio"></i></label>
                    <span class="gender">男</span>
                    </span>
                    <span class="radio-wraps">
                    <label class="theme-radio"><input type="radio" value="2" v-model="gender" name="gender_type"><i class="icon-radio"></i></label>
                    <span class="gender">女</span>
                    </span>
                </div>
            </div> -->
            <div class="row">
                <span class="label">手机号</span>
                <input type="text" class="row-input" placeholder="请在此输入手机号" v-model="phone" oninput = "value=value.replace(/[^\d]/g,'')">
            </div>
            <div class="row very-row">
                <span class="label">验证码</span>
                <input type="text" class="row-input" placeholder="请在此输入验证码" v-model="verify" oninput = "value=value.replace(/[^\d]/g,'')">
                <button class="very-code" @click="getCode" :disabled="isuse">{{codeTxt}}</button>
            </div>
            <p class="info"><span @click="goLogin">已有账号？</span></p>
            <button class="regist-btn btn" @click="registing" :disabled="isRegist" :class="{btnGray:isRegist}">注册</button>
          </div>
      </div>
  </div>
</template>

<script>
import { reg_phone,reg_pwd,toggleModal } from '../utils/tools'
import HeadBar from '@/components/HeadBar'
import '../assets/css/check.css';
import { getVerifyCode,regist } from '../utils/api'


export default {
name:'regist',
  data () {
    return {
        nickName:"",
        gender:"1",
        password:"",
        phone:"",
        verify:"",
        codeTxt:"获取验证码",
        isuse:false,
        showBack:false,
        isRegist:false
    };
  },
  mounted(){},
  components:{
      HeadBar
  },
  methods: {
      registing(){
          const { nickName,password,phone,verify} =this;
     
          if(!nickName){
              toggleModal("请输入账号");
              return;
          }if(!password){
              toggleModal("请输入密码");
              return;
          }if(password.trim().length<6){
              toggleModal("密码长度不能小于6位");
              return;
          }else if(!phone){
              toggleModal("请输入电话号码");
              return;
          }else if(!reg_phone.test(phone)){
              toggleModal("电话号码格式错误");
              return;
          }
          else if(!verify){
              toggleModal("请输入验证码");
              return;
          }
          this.isRegist=true;
        regist({nickName,phone,password,verify}).then((data)=>{
            if(data.state==200){
                let uid=data.data.id;
                localStorage.setItem('uid',uid);
                toggleModal('注册成功');
                this.isRegist=false;
                setTimeout(()=>{
                    this.$router.push('/login')
                },1000);
            }else{
                toggleModal(data.message);
                this.isRegist=false;
            }
        })
        
      },
      getCode(){
        const { phone } =this;
        const _this=this;
        if(!phone){
            toggleModal("请输入电话号码");
            return false;
        }else if(!reg_phone.test(phone)){
            toggleModal("电话号码格式不争取");
            return false;
        }
        this.isuse=false;
        getVerifyCode(phone).then((data)=>{
            toggleModal("发送成功");
            setTimeout(()=>{
                var sec=60;
                var timer=setInterval(function(){
                    sec--;
                    _this.codeTxt=sec+'s';
                    if(sec<1){
                        clearInterval(timer);
                        _this.codeTxt="重新发送";
                        _this.isUse=false;
                        sec=60;
                    }
                },1000);
            },500);

        })
      },
      goLogin(){
          this.$router.replace('/login');
      }
  }
}

</script>
<style lang='scss' scoped>
.regist-container{
    height: 100%;
    .regist-contents{
        padding: 1rem 1.8rem;
        box-sizing: border-box;
        height:calc(100% - 2.5rem);
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
        .user-pic{
            width: 5.5rem;
            height: 5.5rem;
            margin: 0 auto;
            border-radius: 50%;
            overflow: hidden;
        }
        .login-block{
            margin-top: 1.4rem;
            .row{
                display: flex;
                border-bottom: 1px solid rgb(204,204,204);
                box-sizing: border-box;
                padding-bottom: .6rem;
                padding-top: 2rem;
                .label{
                    font-size: .85rem;
                    width: 3.5rem;
                }
                .row-input{
                    flex: 1;
                }
                .row-bar{
                    display: flex;
                    .man-wraps{
                        margin-right: 2rem;
                        margin-left: .8rem
                    }
                    .gender{
                        margin-left: .2rem; 
                    }
                }
            }
            .info{
                text-align: right;
                color: #ff0000;
                width: 100%;
                margin-top: .8rem;
                span{
                    text-decoration: underline;
                }
            }
            .very-row{
                position: relative;
                .very-code{
                    position: absolute;
                    right: 0;
                    z-index: 5;
                    color: #ff0000;
                    bottom: .7rem;
                    background: transparent;
                    outline: none;
                    border: none;
                    font-size: .75rem;
                }
            }
            .regist-btn{
                margin: 0 auto;
                margin-top: 2rem;
            }
        }
    }
}
</style>