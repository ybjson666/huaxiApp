<template>
  <div class='appoint-container'>
      <head-bar title="我的预约"/>
      <div class="type-bar block">
          <ul class="type-list">
              <li 
              v-for="(item,index) in typeList" 
              :key="index" 
              :class="{on:curType===item.type}"
              @click="seleType(item.type)"
              ><span>{{item.name}}</span></li>
          </ul>
      </div>
      <div class="appoint-contents">
          <div class="bar-tip"></div>
          <div class="appoint-wraper">
              <Scroller
                    @scrolling="scrolling" 
                    @touchEnded="touchEnded" 
                    :pullUpMsg="pullUpMsg"
                    :pullDownMsg="pullDownMsg"
                    :isPullUpLoading="isPullUpLoading"
                    :isPullDownLoading="isPullDownLoading"
                    :isFresh="isFresh"
                    :isShowUp="isShowUp"
                >
                <ul class="appoint-list">
                    <li v-for="(item,index) in appointList" :key="index">
                      <div class="actv-pic">
                            <img :src="item.pic" alt="">
                        </div>
                        <div class="actv-infos">
                            <div class="actv-title-wraps">
                                <span class="actv-title fl">{{item.appoint_name}}</span>
                                <span class="cancel unCancel fr" v-if="item.type==='1'" @click="canceAply">取消预约</span>
                                <div class="cl"></div>
                            </div>
                            <div class="actv-bottom">
                                <p class="actv-time-wraps">
                                    <span class="time-icon"><img src="../assets/images/time.png" alt=""></span>
                                    <span class="actv-time">{{item.appoint_time}}</span>
                                </p>
                                <p class="actv-addr-wraps">
                                    <span class="addr-icon"><img src="../assets/images/address.png" alt=""></span>
                                    <span class="actv-addr">{{item.appoint_addr}}</span>
                                </p>
                            </div>
                            <div class="actv-mark" v-if="item.type==='3'"><img src="../assets/images/failure.png" alt=""></div>
                            <div class="actv-mark" v-else-if="item.type==='2'"><img src="../assets/images/chech_success.png" alt=""></div>
                        </div>
                        <span class="state-tags" v-if="item.type=='1'">待审核</span>
                    </li>
                </ul>
              </Scroller>
          </div>
      </div>
  </div>
</template>

<script>
import Scroller from '@/components/Scroller';
import HeadBar from '@/components/HeadBar'
export default {
name:'appoint',
  data () {
    return {
        curType:"0",
        isFresh:false,
        isShowUp:true,
        isPullUpLoading:false,
        isPullDownLoading:false,
        pullUpMsg:"上拉加载更多",
        pullDownMsg:"下拉刷新",
        typeList:[
            {
                type:"0",
                name:"全部"
            },
            {
                type:"1",
                name:"待审核"
            },
            {
                type:"2",
                name:"已通过"
            },
            {
                type:"3",
                name:"未通过"
            }
        ],
        appointList:[
          {
            id:"001",
            pic:require('../assets/images/sign.png'),
            appoint_name:"城市文明建设活动",
            type:"1",
            appoint_time:"2019-04-21至2019-04-25",
            appoint_addr:"成都金牛区火车北站"
          },
          {
            id:"002",
            pic:require('../assets/images/sign.png'),
            appoint_name:"垃圾分类公益活动",
            type:"3",
            appoint_time:"2019-04-21至2019-04-25",
            appoint_addr:"成都金牛区火车北站"
          },
          {
            id:"003",
            pic:require('../assets/images/sign.png'),
            appoint_name:"乡村教育志愿活动",
            type:"2",
            appoint_time:"2019-04-21至2019-04-25",
            appoint_addr:"成都金牛区火车北站"
          },
          {
            id:"004",
            pic:require('../assets/images/sign.png'),
            appoint_name:"城市文明建设活动",
            type:"1",
            appoint_time:"2019-04-21至2019-04-25",
            appoint_addr:"成都金牛区火车北站"
          },
          {
            id:"005",
            pic:require('../assets/images/sign.png'),
            appoint_name:"养老院公益活动",
            type:"3",
            appoint_time:"2019-04-21至2019-04-25",
            appoint_addr:"成都金牛区火车北站"
          }
        ]
    };
  },

  components: {
    HeadBar,
    Scroller
  },

  computed:{},

  mounted(){},

  methods: {
      seleType(type){
        this.curType=type;
      },
      canceAply(type){
        console.log("取消预约...")
      },
      touchEnded(pos,scroll){
      if(pos.y>60){
          this.refreshData();
      }else if(pos.y<scroll.maxScrollY-30){
          this.loadMore();
      }
    },
    scrolling(pos){
      if(pos.y>60){
          this.isPullDownLoading=true;
      }
    },
    refreshData(){
      setTimeout(()=>{
          this.isPullDownLoading=false;
          this.isFresh=true;
          setTimeout(()=>{
              this.isFresh=false;
          },1000)     
      },1000)
    },
    loadMore(){
      this.isPullUpLoading=true;
      setTimeout(()=>{
          this.isPullUpLoading=false;
      },1000)
    },
  }
}

</script>
<style lang='scss' scoped>
.appoint-container{
    height: 100%;
    background: #f5f5f5;
     .type-bar{
        height: 2rem;
        .type-list{
            display: flex;
            li{
                flex: 1;
                text-align: center;
                font-size: .85rem;
                span{
                    display: inline-block;
                    line-height: 2.1rem;
                    height: 1.9rem;
                }
                &.on{
                    color: #ff0000;
                    span{
                        border-bottom: 2px solid #ff0000;
                    }
                }
            }
        }
    }
    .appoint-contents{
        height: calc(100% - 4rem);
        background: #f0f0f0;
        position: relative;
        .bar-tip{
            background: #f5f5f5;
            height: .75rem;
        }
        .appoint-wraper{
            height: calc(100% - .75rem);
            position: relative;
            .appoint-list{
              li{
                    display: flex;
                    background: #fff;
                    padding: .7rem .75rem;
                    box-sizing: border-box;
                    margin-bottom: .75rem;
                    position: relative;
                    .actv-pic{
                        width: 6.25rem;
                        height: 5rem;
                        border-radius: .2rem;
                        overflow: hidden;
                        margin-right: .5rem;
                        position: relative;
                        img{
                            height: 100%;
                        }
                        .actv-tags{
                            position: absolute;
                            width: 100%;
                            height: 2rem;
                            left: 0;
                            bottom: 0;
                            background: rgba(0,0,0,.5);
                            color: #fff;
                            text-align: center;
                            line-height: 2rem;
                        }
                    }
                    .actv-infos{
                        flex: 1;
                        position: relative;
                        height: 5rem;
                        .actv-bottom{
                            position: absolute;
                            width: 100%;
                            bottom: 0;
                            left: 0;
                            color: rgb(128,128,128);
                            .actv-time-wraps{
                                margin-bottom:.4rem; 
                                .time-icon{
                                    display: inline-block;
                                    width: .6rem;
                                    vertical-align: middle;
                                }
                            }
                            .actv-addr-wraps{
                                margin-bottom: .4rem;
                                .addr-icon{
                                    display: inline-block;
                                    width: .6rem;
                                    vertical-align: middle;
                                }
                            }
                        }
                        
                        .actv-title-wraps{
                            .actv-title{
                                display: block;
                                font-size: .85rem;
                                width: 7rem;
                            }
                            .cancel{
                                text-decoration: underline;
                                display: inline-block;
                                line-height: 1.25rem;
                                font-size: .85rem;
                            }
                            .unCancel{
                                color: #ff0000;
                            }
                            .canceled{
                                color: #ccc;
                            }
                        }
                        .actv-mark{
                            position: absolute;
                            width: 3rem;
                            right:-.75rem;
                            top:-.7rem;
                        }
                    }
                    .state-tags{
                        display: block;
                        position: absolute;
                        left: 0.35rem;
                        top:.7rem;
                        width: 3.2rem;
                        height: 1.8rem;
                        text-align: center;
                        line-height: 1.5rem;
                        color: #fff;
                        font-size: .6rem;
                        background: url('../assets/images/bg4.png') no-repeat;
                        background-size:105% 100%;
                    }
                }
            }
        }
    }
}
</style>