<template>
  <div class='regist-container'>
     <head-bar title="注册"></head-bar>
      <div class="regist-contents">
          <div class="user-pic">
              <img src="../assets/images/head2.png" alt="">
          </div>
          <div class="login-block">
            <div class="row">
                <p>账号名</p>
                <input type="text" class="row-input" placeholder="请在此输入账号名" v-model="nickName">
            </div>
            <div class="row">
                <p>密码</p>
                <input type="password" class="row-input" placeholder="请在此输入密码 (6-20位)" v-model="password">
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
                <p>手机号</p>
                <input type="text" class="row-input" placeholder="请在此输入手机号" v-model="phone" oninput = "value=value.replace(/[^\d]/g,'')">
            </div>
            <div class="row very-row">
                <p>验证码</p>
                <input type="text" class="row-input" placeholder="请在此输入验证码" v-model="verify" oninput = "value=value.replace(/[^\d]/g,'')">
                <button class="very-code" @click="getCode" :disabled="isuse">{{codeTxt}}</button>
            </div>
            <button class="regist-btn btn" @click="registing">注册</button>
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
        isuse:false
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
          }if(!reg_pwd.test(password)){
              toggleModal("格式错误密码");
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
        regist({nickName,phone,password,verify}).then((data)=>{
            if(data.state==200){
                let uid=data.data.id;
                localStorage.setItem('uid',uid);
                toggleModal('注册成功');
                setTimeout(()=>{
                    this.$router.push('/login')
                },1000);
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
      }
  }
}

</script>
<style lang='scss' scoped>
.regist-container{
    .regist-contents{
        padding: 1rem 1.8rem;
        box-sizing: border-box;
        .user-pic{
            width: 5.5rem;
            height: 5.5rem;
            margin: 0 auto;
            border-radius: 50%;
            overflow: hidden;
        }
        .login-block{
            margin-top: 1.5rem;
            .row{
                margin-bottom: 1rem;
                p{
                    color: #333;
                    font-size: .8rem;
                    margin-bottom: .8rem;
                }
                .row-input{
                    line-height: 1.25rem;
                    border-bottom: 1px solid #ccc;
                    width: 100%;
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
            .very-row{
                position: relative;
                .very-code{
                    position: absolute;
                    right: 0;
                    z-index: 5;
                    color: #ff0000;
                    bottom: .2rem;
                    background: transparent;
                    outline: none;
                    border: none;
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