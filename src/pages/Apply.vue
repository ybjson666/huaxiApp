<template>
  <div class='apply-container'>
      <head-bar title="招募报名"/>
      <div class="apply-contents">
          <p class="actv-title-bar"><span class="rect"></span>活动名称</p>
          <p class="actv-title">{{actvName}}</p>
          <textarea class="apply-desc" v-model="remark" placeholder="请在次输入报名申请描述"></textarea>
          <button class="apply-btn btn" :disabled="isApply" @click="goApply" :class="{btnGray:isApply}">提交报名申请</button>
      </div>
  </div>
</template>

<script>
import HeadBar from '@/components/HeadBar'
import { apply } from '../utils/api';
import  { toggleModal } from '../utils/tools'
export default {
name:'apply',
  data () {
    return {
        id:"",
        actvName:"",
        isApply:false,
        remark:""
    };
  },

  components: {
      HeadBar
  },

  computed:{},

  mounted(){
      const { actvId,actvName }=this.$route.params;
      this.id=actvId;
      this.actvName=actvName;
     
  },

  methods: {
      goApply(){
          const { id, remark } =this;

          if(!remark){
              toggleModal("请输入报名申请描述");
              return;
          }
          this.isApply=true;
          apply({id,remark}).then(data=>{
              if(data.state==200){
                  toggleModal('报名成功');
                  this.remark="";
              }else{
                  toggleModal(data.message);
                  this.isApply=false;
              }
          })

      }
  }
}

</script>
<style lang='scss' scoped>
.apply-container{
    height: 100%;
    .apply-contents{
        height: calc(100% - 2rem);
        background: #f0f0f0;
        padding: .5rem;
        padding-top: 1rem;
        box-sizing: border-box;
        .actv-title-bar{
            font-size: .75rem;
            line-height: 1.25rem;
            color: #333;
            .rect{
                display: inline-block;
                width: .2rem;
                height: .8rem;
                background: #ff0000;
                vertical-align: middle;
                margin-right: .2rem;
            }
        }
        .actv-title{
            color: #000;
            font-size: .9rem;
            line-height: 1.5rem;
            padding-left: .5rem;
            box-sizing: border-box;
        }
        .apply-desc{
            resize: none;
            height: 10rem;
            width: 100%;
            border: none;
            margin-top: .8rem;
            padding: .5rem;
            box-sizing: border-box;
            border-radius: 3px;
            outline: none;
        }
        .apply-btn{
            margin: 0 auto;
            margin-top: 3rem;
        }
    }
}
</style>