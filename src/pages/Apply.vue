<template>
  <div class='apply-container'>
      <head-bar title="招募报名"/>
      <div class="apply-contents">
          <p class="actv-title-bar"><span class="rect"></span>活动名称</p>
          <p class="actv-title">{{title}}</p>
          <textarea class="apply-desc" v-model="desc" placeholder="请在次输入报名申请描述"></textarea>
          <button class="apply-btn" :disabled="isApply">提交报名申请</button>
      </div>
  </div>
</template>

<script>
import HeadBar from '@/components/HeadBar'
export default {
name:'apply',
  data () {
    return {
        actvId:"",
        title:"流浪动物救助活动",
        isApply:false,
        desc:""
    };
  },

  components: {
      HeadBar
  },

  computed:{},

  mounted(){
      this.actvId=this.$route.params.actvId;
      console.log(this.actvId)
  },

  methods: {}
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
            width: 12.5rem;
            height: 2rem;
            line-height: 2rem;
            text-align: center;
            background: #ff0000;
            color: #fff;
            border-radius: 1rem;
            font-size: .8rem;
        }
    }
}
</style>