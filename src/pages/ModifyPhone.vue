<template>
  <div class='phone-container'>
      <head-bar title="更改手机号"/>
      <div class="phone-contents">
          <div class="phone-box block">
              <div class="rows">
                  <span class="label">手机号</span>
                  <input type="text" placeholder="请输入要绑定的新的手机号" oninput = "value=value.replace(/[^\d]/g,'')" v-model="phone" class="rows-input">
              </div>
              <div class="rows">
                  <span class="label">验证码</span>
                  <input type="text" placeholder="请输入短信验证码" oninput = "value=value.replace(/[^\d]/g,'')" v-model="code" class="rows-input">
                  <button class="code" :disabled="isGet" @click="getCode">获取验证码</button>
              </div>
          </div>
          <button class="modify-btn" @click="submiting">确认修改</button>
      </div>
  </div>
</template>

<script>
import HeadBar from '@/components/HeadBar'
import { toggleModal } from '../utils/tools'
export default {
name:'phone',
  data () {
    return {
        phone:"",
        code:"",
        isGet:false
    };
  },

  components: {
      HeadBar
  },

  computed:{},

  mounted(){},

  methods: {
      getCode(){
          console.log('获取验证码...')
      },
      submiting(){
          console.log("确认修改")
      }
  }
}

</script>
<style lang='scss' scoped>
.phone-container{
    height: 100%;
    .phone-contents{
        height: calc(100% - 2.5rem);
        background: #f0f0f0;
        padding-top:.8rem;
        box-sizing: border-box;
        .phone-box{
            padding:0 .5rem;
            box-sizing: border-box;
            .rows{
                display: flex;
                border-bottom: 1px solid #f5f5f5;
                height: 2rem;
                box-sizing: border-box;
                .label{
                    width: 3rem;
                    line-height: 2rem;
                    color: #000;
                    font-size: .75rem;
                }
                .rows-input{
                    flex: 1;
                    font-size: .75rem;
                    line-height: 2rem;
                }
                .code{
                    color: #ff0000;
                    width: 4rem;
                    font-size: .75rem;
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