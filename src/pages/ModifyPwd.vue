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
            }else if(password.length<6){
                toggleModal('密码长度不能小于6位');
                return;
            }else if(!newpassword){
                toggleModal('请输入新密码！');
                return;
            }else if(newpassword.trim().length<6){
                toggleModal('密码长度不能小于6位');
                return;
            }else if(!repassword){
                toggleModal('请再次输入新密码！');
                return;
            }else if(repassword.trim().length<6){
                toggleModal('密码长度不能小于6位');
                return;
            }else if(newpassword !== repassword){
                toggleModal('两次密码不一致！');
                return;
            }

            this.isUse=true;
            modifyPwd({ password,newpassword,repassword }).then((data)=>{
               if(data.state===200){
                   toggleModal("修改成功");
                   setTimeout(()=>{
                      this.$router.go(-1);
                   },1000)
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
.password-conatiner{
    height: 100%;
    .password-contents{
        height: calc(100% - 2rem);
        background: #f0f0f0;
        padding-top:1rem;
        box-sizing: border-box;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
        .password-box{
            padding:0 .75rem;
            padding-bottom: 0;
            box-sizing: border-box;
            .rows{
                display: flex;
                border-bottom: 1px solid #f5f5f5;
                height:2.85rem;
                box-sizing: border-box;
                .label{
                    width: 3.5rem;
                    color: rgb(26,24,29);
                    font-size: .85rem;
                    margin-right: 2.7rem;
                    line-height:2.85rem;
                }
                .rows-input{
                    flex: 1;
                    font-size: .75rem;
                    line-height:2.85rem;
                    height:2.85rem;
                    padding: .8rem 0;
                    box-sizing:border-box;
                }
                .rows-input::-webkit-input-placeholder{
                    color: rgb(153,153,153);
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
            margin-top: 4.45rem;
        } 
    }
}
</style>