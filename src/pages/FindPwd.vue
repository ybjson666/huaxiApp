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
                  <input type="text" placeholder="请输入短信验证码" oninput = "value=value.replace(/[^\d]/g,'')" v-model="code" class="rows-input">
                  <button class="code" :disabled="isGet" @click="getCode">获取验证码</button>
              </div>
              <div class="rows">
                  <span class="label">新密码</span>
                  <input type="password" placeholder="请在此输入新密码" v-model="pwd_new" class="rows-input">
              </div>
              <div class="rows">
                  <span class="label">确认新密码</span>
                  <input type="password" placeholder="请再次输入新密码"  v-model="pwd_new_again" class="rows-input">
              </div>
          </div>
          <button class="modify-btn" @click="submiting">确认修改</button>
      </div>
  </div>
</template>

<script>
import HeadBar from '@/components/HeadBar'
export default {
name:'findPwd',
  data () {
    return {
        isGet:false,
        phone:"",
        code:"",
        pwd_new:"",
        pwd_new_again:""

    };
  },

  components: {
      HeadBar
  },

  computed:{},

  mounted(){},

  methods: {
      getCode(){

      },
      submiting(){

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
            width: 12.5rem;
            height: 2rem;
            background: #ff0000;
            color: #fff;
            text-align: center;
            line-height: 2rem;
            border-radius: .8rem;
            margin: 0 auto;
            margin-top: 3rem;
            font-size: .8rem;
        } 
    }
}
</style>