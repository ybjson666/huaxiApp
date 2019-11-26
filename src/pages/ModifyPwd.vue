<template>
  <div class='password-conatiner'>
      <head-bar title="更改密码"/>
      <div class="password-contents">
          <div class="password-box block">
              <div class="rows">
                  <span class="label">原密码</span>
                  <input type="password" placeholder="请输入原密码" v-model="password" class="rows-input">
              </div>
              <div class="rows">
                  <span class="label">重置密码</span>
                  <input type="password" placeholder="请输入新密码"  v-model="newpassword" class="rows-input">
              </div>
              <div class="rows">
                  <span class="label">确认密码</span>
                  <input type="password" placeholder="请再次输入新密码"  v-model="repassword" class="rows-input">
              </div>
          </div>
          <button class="modify-btn btn" @click="submiting" :disabled="isUse" :class="{btnGray:isUse}">确认修改</button>
      </div>
  </div>
</template>

<script>
import HeadBar from '@/components/HeadBar'
import { toggleModal,reg_pwd} from '../utils/tools'
import { modifyPwd } from '../utils/api'
export default {
name:'password',
  data () {
    return {
        password:"",
        newpassword:"",
        repassword:"",
        isUse:false
    };
  },

  components: {
      HeadBar
  },
  methods: {
        submiting(){
            const { password,newpassword,repassword } =this;
            if(!password){
                toggleModal('请输入原密码！');
                return;
            }else if(!reg_pwd.test(password)){
                toggleModal('密码格式错误！');
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
            modifyPwd({ password,newpassword,repassword }).then((data)=>{
               if(data.state===200){
                   toggleModal("修改成功");
                   this.isUse=fale;
                   this.password="";
                   this.newpassword="";
                   this.repassword="";
               }else{
                   toggleModal(data.message);
                   this.isUse=fale;
               }
            })
        }
    }
}

</script>
<style lang='scss' scoped>
.password-conatiner{
    height: 100%;
    .password-contents{
        height: calc(100% - 2rem);
        background: #f0f0f0;
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
                    width: 4rem;
                    line-height: 2rem;
                    color: #000;
                    font-size: .75rem;
                }
                .rows-input{
                    flex: 1;
                    font-size: .75rem;
                }
                .code{
                    color: #ff0000;
                    width: 4rem;
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