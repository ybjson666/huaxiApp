<template>
  <div class='datapicker fade' v-show="show">
      <div class="picker-wraps slideInUp">
          <div class="picker-bar">
              <span class="cancel-btn fl" @click="closeFrame">取消</span>
              <h2 class="picker-title">{{title}}</h2>
              <span class="sure-btn fr" @click="sureSele">确定</span>
              <div class="cl"></div>
          </div>
          <div class="picker-content">
              <div class="picker-wraper" ref="picker">
                  <ul class="data-list" ref="list">
                      <li v-for="(item,index) in dataSource" :key="index" :class="{choose:curIndex===index}" @click="seleItem(item,index)">
                          <span>{{item.DictName}}</span>
                      </li>
                  </ul>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll';
export default {
    name:'dataPicker',
    data(){
        return{
            curIndex:null,
            choose:""
        }
    },
    props:{
        show:Boolean,
        dataSource:Array,
        title:String
    },
    watch:{
        show(){
            setTimeout(()=>{
                this._initScroll();
            },200)
        }
    },
    methods: {
        closeFrame(){
            this.$emit('closeFrame');
            this.curIndex=null;
            this.choose="";
        },
        seleItem(item,index){
            this.curIndex=index;
            this.choose=item;
        },
        sureSele(){
            this.$emit('chooseItem',this.choose);
            this.curIndex=null;
            this.choose="";
        },
        _initScroll(){
            if(!this.scroll){
                this.scroll=new BScroll(this.$refs.picker,{
                    click:true,
                    probeType: 3,
                    tap:true
                })
            }
        }
    }
}

</script>
<style lang='scss' scoped>
.slideInUp {
  animation: slideInUp .3s;
}

@keyframes slideInUp {
  from {
    transform: translate3d(0, 100%, 0)
  }
  to {
    transform: translate3d(0, 0, 0)
  }
}
.fade{
    animation: fade .3s;
}
@keyframes fade {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.datapicker{
    position: fixed;
    height: 100%;
    width: 100%;
    top:0;
    left: 0;
    background: rgba(0,0,0,.5);
    .picker-wraps{
        position: absolute;
        height: 15rem;
        width: 100%;
        background: #fff;
        left: 0;
        bottom: 0;
        .picker-bar{
            height: 3rem;
            box-sizing: border-box;
            padding: 0 .5rem;
            font-size: .75rem;
            line-height: 3rem;
            position: relative;
            span{
                display: block;
                line-height: 3rem;
                position: absolute;
                top:0;
                height: 3rem;
            }
            h2{
                text-align: center;
                line-height: 3rem;
                font-size: .8rem;
                color: #000;
            }
            .cancel-btn{
                color: #666;
                left: .5rem;
            }
            .sure-btn{
                color: #f39c1c;
                right: .5rem;
            }
        }
        
    }
    .picker-content{
        position: relative;
        height: calc(100% - 2rem);
        .picker-wraper{
            position: absolute;
            height: 100%;
            width: 100%;
            left: 0;
            top: 0;
            overflow: hidden;
            .data-list{
                padding: .5rem;
                box-sizing: border-box;
                li{
                    line-height: 1.8rem;
                    text-align: center;
                    color: #666;
                    font-size: .75rem;
                    border-bottom: 1px solid #ccc;
                    box-sizing: border-box;
                    &:last-child{
                        border:none;
                    }
                    &.choose{
                        color: #26a2ff;
                    }
                }
            }
        }
    }
}
</style>