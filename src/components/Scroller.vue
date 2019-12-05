<template>
  <div class="wrapper" ref="wrapper">
      <div class="scroller-wrapper">
          <div class="pull-down" v-show="isShowUp">
              <p class="pull-down-text" v-show="!isPullDownLoading">{{pullDownMsg}}</p>
              <p class="pull-down-icon" v-show="isPullDownLoading">
                  <mt-spinner type="snake" color="#26a2ff"/>
              </p>
          </div>
          <div class="fresh-text" v-show="isFresh">刷新成功</div>
          <slot></slot>
          <div class="pull-up" v-show="hasData">
              <p class="pull-up-text" v-show="!isPullUpLoading">{{pullUpMsg}}</p>
              <p class="pull-up-icon" v-show="isPullUpLoading">
                  <mt-spinner type="snake" color="#26a2ff" />
              </p>
          </div>    
      </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll';
import { Spinner } from 'mint-ui';
export default {
  name:'wraper',
  props:{
      pullDownMsg:{
          type:String,
          default:""
      },
      pullUpMsg:String,
      scrolling:Function,
      touchEnded:Function,
      isPullDownLoading:{
          type:Boolean,
          default:false
      },
      isPullUpLoading:{
          type:Boolean,
          default:false
      },
      isFresh:{
          type:Boolean,
          default:false
      },
      isShowUp:{
          type:Boolean,
          default:false
      },
      hasData:{
          type:Boolean,
          default:true
      }
      
  },
  methods:{
      _initScroll(){
          this.scroll=new BScroll(this.$refs.wrapper,{
            click:true,
            probeType: 3,
            tap:true
        })
        this.scroll.on("scroll",(pos)=>{
            this.$emit('scrolling',pos)
        })

        this.scroll.on('touchEnd',(pos)=>{
            this.$emit('touchEnded',pos,this.scroll)
        })

        this.scroll.refresh()
      }
      
  },
  mounted(){
      this.$nextTick(()=>{
          this._initScroll();
      })
  }
}
</script>
<style lang="scss" scoped>
.wrapper{
    position: absolute;
    top:0;
    left: 0;
    height: 100%;
    width: 100%;
    overflow: hidden;
    z-index: 20;
    .pull-down{
        height: 2.6rem;
        position: absolute;
        width: 100%;
        left: 0;
        top:-2.6rem;
    }
    .pull-down ,.pull-up{
        background:#fff;
        color: #ccc;
        background: #fafafa;
    }
    .pull-down-icon, .pull-up-icon{
        display: flex;
        align-items: center;
        justify-content: center;
        padding: .3rem 0;
        box-sizing: border-box;
        height: 2.6rem;;
    }
    .pull-down-text,.pull-up-text{
        text-align: center;
        line-height: 2.6rem;
    }
    .fresh-text{
        text-align: center;
        background: rgba(0,0,0,.7);
        color: orange;
        height: 2rem;
        line-height: 2rem;
        position: absolute;
        width: 100%;
        left: 0;
        top:0;
        z-index: 100;
    }
}
</style>