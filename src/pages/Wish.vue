<template>
  <div class='wish-container'>
      <head-bar title="我的心愿"/>
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
      <div class="wish-contents">
          <div class="wish-wraper">
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
                <ul class="wish-list">
                    <li v-for="(item,index) in wishList" :key="index">
                        <div class="wish-info-title">
                            <div class="wish-title-wraps">
                                <span class="wish-icon"><img src="../assets/images/wish.png" alt=""></span>
                                <span class="wish-title">{{item.wish_name}}</span>
                            </div>
                            <span class="wish-type orange" v-if="item.type==='1'">待审核</span>
                            <span class="wish-type orange" v-else-if="item.type==='2'">进行中</span>
                            <span class="wish-type red" v-else-if="item.type==='4'">未通过</span>
                        </div>
                        <p class="wish-desc">心愿描述：{{item.wish_des}}</p>
                        <div class="wish-date-wraps">
                            <span class="wish-date">提交时间：{{item.add_time}}</span>
                            <span class="apply-btn red" v-if="item.type==='1'">取消申请</span>
                            <span class="apply-btn" v-else>取消申请</span>
                        </div>
                        <span class="down-tags" v-if="item.type==='3'"><img src="../assets/images/finish.png" alt=""></span>
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
name:'wish',
  data () {
    return {
        isFresh:false,
        isShowUp:true,
        isPullUpLoading:false,
        isPullDownLoading:false,
        pullUpMsg:"上拉加载更多",
        pullDownMsg:"下拉刷新",
        curType:"0",
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
                name:"进行中"
            },
            {
                type:"3",
                name:"已完成"
            },
            {
                type:"4",
                name:"未通过"
            }
        ],
        wishList:[
            {
                id:"001",
                wish_name:"荒地绿植计划活动",
                type:"1",
                wish_des:"富士胶片的沙漠绿化志愿者队伍从各....",
                add_time:"2019-03-12 10:25:30"
            },
            {
                id:"002",
                wish_name:"贫困乡村志愿救助活动",
                type:"2",
                wish_des:"多少个日日夜夜，他们骷髅的双肩....",
                add_time:"2019-03-12 10:25:30"
            },
            {
                id:"003",
                wish_name:"城市垃圾分类公益活动",
                type:"3",
                wish_des:"垃圾分类“不打烊”！让我们一起....",
                add_time:"2019-03-12 10:25:30"
            },
            {
                id:"004",
                wish_name:"乡村建设发展活动",
                type:"4",
                wish_des:"富士胶片的沙漠绿化志愿者队伍从各....",
                add_time:"2019-03-12 10:25:30"
            },
            {
                id:"005",
                wish_name:"还人类蓝天公益活动",
                type:"3",
                wish_des:"富士胶片的沙漠绿化志愿者队伍从各....",
                add_time:"2019-03-12 10:25:30"
            },
            {
                id:"006",
                wish_name:"荒地绿植计划活动",
                type:"4",
                wish_des:"富士胶片的沙漠绿化志愿者队伍从各....",
                add_time:"2019-03-12 10:25:30"
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
.wish-container{
    height: 100%;
    background: #f0f0f0;
    .type-bar{
        height: 2rem;
        margin-bottom: .8rem;
        .type-list{
            display: flex;
            li{
                flex: 1;
                text-align: center;
                color: #000;
                span{
                    display: inline-block;
                    line-height: 1.9rem;
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
    .wish-contents{
        height: calc(100% - 4.8rem);
        .wish-wraper{
            height: 100%;
            position: relative;
            .wish-list{
                li{
                    background: #fff;
                    padding:.8rem .5rem;
                    box-sizing: border-box;
                    margin-bottom: .5rem;
                    position: relative;
                    .wish-info-title{
                        display: flex;
                        margin-bottom: .5rem;
                        .wish-title-wraps{
                            flex: 3.5;
                            .wish-icon{
                                display: inline-block;
                                width: .8rem;
                                vertical-align: middle;
                            }
                            .wish-title{
                                color: #000;
                                font-size: .75rem;
                                margin-left: .1rem;
                                vertical-align: middle;
                            }
                        }
                        .wish-type{
                            flex: 1;
                            text-align: right;
                        }
                        .orange{
                            color: #ff8338;
                        }
                        .red{
                            color: #ff0000;
                        }
                    }
                    .wish-desc{
                        margin-bottom: .3rem;
                    }
                    .wish-date-wraps{
                        display: flex;
                        .wish-date{
                            flex: 3.5;
                        }
                        .apply-btn{
                            flex: 1;
                            text-align: right;
                            color: #999;
                            text-decoration: underline;
                        }
                        .red{
                            color: #ff0000;
                        }
                    }
                    .down-tags{
                        position: absolute;
                        display: block;
                        width: 3rem;
                        top:0;
                        right: 0;
                    }
                }
            }
        }
    }
}
</style>