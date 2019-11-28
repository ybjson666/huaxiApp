<template>
  <div class='findPwd-container'>
      <head-bar title="找回密码"/>
      <div class="password-contents">
          <div class="password-box block">
              <div class="rows">
                  <span class="label">手机号码</span>
                  <input type="text" placeholder="请在此输入手机号" v-model="phone" class="rows-input" oninput = "value=value.replace(/[^\d]/g,'')">
              </div>
              <div class="rows">
                  <span class="label">验证码</span>
                  <input type="text" placeholder="请输入短信验证码" oninput = "value=value.replace(/[^\d]/g,'')" v-model="verify" class="rows-input">
                  <button class="code" :disabled="isGet" @click="getCode">{{codeTxt}}</button>
              </div>
              <div class="rows">
                  <span class="label">新密码</span>
                  <input type="password" placeholder="请在此输入新密码" v-model="newpassword" class="rows-input">
              </div>
              <div class="rows">
                  <span class="label">确认新密码</span>
                  <input type="password" placeholder="请再次输入新密码"  v-model="repassword" class="rows-input">
              </div>
          </div>
          <button class="modify-btn btn" @click="submiting" :disabled="isUse" :class="{btnGray:isUse}">确认修改</button>
      </div>
  </div>
</template>

<script>
import HeadBar from '@/components/HeadBar'
import { getVerifyCode,findPwds} from '../utils/api'
import { toggleModal,reg_phone,reg_pwd } from '../utils/tools'
export default {
name:'findPwd',
  data () {
    return {
        isGet:false,
        phone:"",
        verify:"",
        newpassword:"",
        repassword:"",
        codeTxt:"获取验证码",
        isUse:false
    };
  },

  components: {
      HeadBar
  },
  methods: {
      getCode(){
        const { phone } =this;
        if(!phone){
            toggleModal("请输入电话号码");
            return;
        }else if(!reg_phone.test(phone)){
            toggleModal("电话号码格式不争取");
            return;
        }
        this.isGet=false;
        getVerifyCode(phone).then((data)=>{
            toggleModal("发送成功");
            setTimeout(()=>{
                var sec=60;
                var timer=setInterval(()=>{
                    sec--;
                    this.codeTxt=sec+'s';
                    if(sec<1){
                        clearInterval(timer);
                        this.codeTxt="重新发送";
                        this.isGet=false;
                        sec=60;
                    }
                },1000);
            },500);

        })
      },
      submiting(){

          const { phone,verify,newpassword,repassword } =this;

          if(!phone){
                toggleModal('请输入手机号！');
                return;
            }else if(!reg_phone.test(phone)){
                toggleModal('手机号格式错误！');
                return;
            }else if(!verify){
                toggleModal('请输入验证码！');
                return;
            }else if(!newpassword){
                toggleModal('请输入新密码！');
                return;
            }else if(!reg_pwd.test(newpassword)){
                toggleModal('密码格式错误！');
                return;
            }else if(!repassword){
                toggleModal('请再次输入新密码！');
                return;
            }else if(!reg_pwd.test(repassword)){
                toggleModal('密码格式错误！');
                return;
            }else if(newpassword !== repassword){
                toggleModal('两次密码不一致！');
                return;
            }

            this.isUse=true;

            findPwds({ phone,verify,newpassword,repassword }).then(data=>{
                if(data.state==200){
                    toggleModal("修改成功");
                    this.isUse=false;
                }else{
                    toggleModal(data.message);
                    this.isUse=false;
                }
            })
      }
  }
}

</script>
<style lang='scss' scoped>
.findPwd-container{
    height: 100%;
    .password-contents{
        height: calc(100% - 2rem);
        padding-top:.8rem;
        box-sizing: border-box;
        .password-box{
            padding: .5rem;
            padding-bottom: 0;
            box-sizing: border-box;
            .rows{
                display: flex;
                border-bottom: 1px solid #f5f5f5;
                height: 2rem;
                box-sizing: border-box;
                .label{
                    width: 4.5rem;
                    line-height: 2rem;
                    color: #000;
                    font-size: .75rem;
                }
                .rows-input{
                    width: 9rem;
                    font-size: .75rem;
                }
                .code{
                    color: #ff0000;
                    width: 4rem;
                    text-align: center;
                }
            }
        }
        .modify-btn{
            margin: 0 auto;
            margin-top: 3rem;
        } 
    }
}
</style>