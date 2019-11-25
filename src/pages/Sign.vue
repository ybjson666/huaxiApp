<template>
  <div class='sign-container'>
      <head-bar title="签到"/>
      <div class="sign-contents">
          <div class="sign-wraper">
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
                <ul class="sign-list">
                    <li v-for="(item,index) in signList" :key="index">
                        <div class="sign-top">
                            <div class="sign-pic"><img :src="item.pic" alt=""></div>
                            <div class="sign-infos">
                                <h2 class="sign-name">{{item.sign_name}}</h2>
                                <div class="sing-info-bottom">
                                    <p class="sign-num-wraps">
                                        <span class="num-icon"><img src="../assets/images/user.png" alt=""></span>
                                        <span class="sign-num">{{item.join_num}}/{{item.total_num}}</span>
                                    </p>
                                    <p class="sign-addr-wraps">
                                        <span class="addr-icon"><img src="../assets/images/address.png" alt=""></span>
                                        <span class="sign-addr">{{item.addr}}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="sign-bottom">
                            <div class="sign-time-wrapper">
                                <div class="sign-time-left">
                                    <p class="sign-hour">{{item.start_time_hour}}</p>
                                    <p class="sign-date">{{item.start_time_date}}</p>
                                </div>
                                <div class="sign-time-middle">————</div>
                                <div class="sign-time-right">
                                    <p class="sign-hour">{{item.end_time_hour}}</p>
                                    <p class="sign-date">{{item.end_time_date}}</p>
                                </div>
                            </div>
                            <div class="sign-btn-groups unSigned" v-if="item.signed==='0'">
                                <span class="start-btn" @click="signStart">开始签到</span>
                                <span class="exit-btn" @click="signExit">退签</span>
                            </div>
                            <div class="sign-btn-groups" v-else>
                                <span class="start-btn">开始签到</span>
                                <span class="exit-btn">退签</span>
                            </div>
                        </div>
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
name:'sign',
  data () {
    return {
        isFresh:false,
        isShowUp:true,
        isPullUpLoading:false,
        isPullDownLoading:false,
        pullUpMsg:"上拉加载更多",
        pullDownMsg:"下拉刷新",
        signList:[
            {
                id:"001",
                pic:require('../assets/images/sign.png'),
                sign_name:"流浪狗救助活动(动物救助中心)",
                total_num:'46',
                join_num:"5",
                addr:"成都金牛区火车北站",
                start_time_hour:"14:00",
                start_time_date:"2019-03-08",
                end_time_hour:"16:00",
                end_time_date:"2019-03-12",
                signed:"0"
            },
            {
                id:"002",
                pic:require('../assets/images/sign.png'),
                sign_name:"敬老院工衣慈善活动",
                total_num:'46',
                join_num:"5",
                addr:"成都郫都区花园街道",
                start_time_hour:"14:00",
                start_time_date:"2019-03-08",
                end_time_hour:"16:00",
                end_time_date:"2019-03-12",
                signed:"1"
            },
            {
                id:"003",
                pic:require('../assets/images/sign.png'),
                sign_name:"流浪狗救助活动(动物救助中心)",
                total_num:'46',
                join_num:"5",
                addr:"成都金牛区火车北站",
                start_time_hour:"14:00",
                start_time_date:"2019-03-08",
                end_time_hour:"16:00",
                end_time_date:"2019-03-12",
                signed:"1"
            },
            {
                id:"004",
                pic:require('../assets/images/sign.png'),
                sign_name:"流浪狗救助活动(动物救助中心)",
                total_num:'46',
                join_num:"5",
                addr:"成都金牛区火车北站",
                start_time_hour:"14:00",
                start_time_date:"2019-03-08",
                end_time_hour:"16:00",
                end_time_date:"2019-03-12",
                signed:"0"
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
      signStart(){
          console.log("开始签到....")
      },
      signExit(){
          console.log("我要退签....")
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
.sign-container{
    height: 100%;
    .sign-contents{
        height: calc(100% - 2rem);
        background: #f0f0f0;
        .sign-wraper{
            position: relative;
            height: 100%;
            .sign-list{
                padding: .5rem;
                padding-top: .8rem;
                box-sizing: border-box;
                li{
                    background: #fff;
                    border-radius: 3px;
                    margin-bottom: .5rem;
                    padding: .5rem;
                    box-sizing: border-box;
                    .sign-top{
                        display: flex;
                        .sign-pic{
                            width: 7.5rem;
                            height: 5rem;
                            margin-right: .5rem;
                            img{
                                height: 100%;
                            }
                        }
                        .sign-infos{
                            flex: 1;
                            position: relative;
                            height: 5rem;
                            .sign-name{
                                font-size: .75rem;
                                color: #000;
                                font-weight: normal;
                            }
                            .sing-info-bottom{
                                width: 100%;
                                position: absolute;
                                left: 0;
                                bottom: 0;
                                .sign-num-wraps{
                                    margin-bottom: .2rem;
                                    .num-icon{
                                        display: inline-block;
                                        width: .65rem;
                                        vertical-align: middle;
                                        margin-right: .1rem;
                                    }
                                }
                                .sign-addr-wraps{
                                    .addr-icon{
                                        display: inline-block;
                                        width: .5rem;
                                        vertical-align: middle;
                                        margin-right: .1rem;
                                    }
                                }
                            }
                        }
                    }
                    .sign-bottom{
                        padding-top: .8rem;
                        .sign-time-wrapper{
                            display: flex;
                            justify-content: center;
                            padding: 0 1.5rem;
                            box-sizing: border-box;
                            color: #000;
                            div{
                                flex: 1;
                                text-align: center;
                                p{
                                    line-height: 1rem;
                                }
                                .sign-hour{
                                    font-size: .75rem;
                                }
                                .sign-date{
                                    color: #666;
                                }
                            }
                        }
                        .sign-btn-groups{
                            margin-top: .8rem;
                            display: flex;
                            justify-content: flex-end;
                            span{
                                height: 2rem;
                                text-align: center;
                                color: #fff;
                                background: #ccc;
                                border-radius: 1rem;
                                line-height: 2rem;
                            }
                            .start-btn{
                                width: 7.5rem;
                                margin-right: 1rem;
                            }
                            .exit-btn{
                                width: 3.5rem;
                            }
                        }
                        .unSigned{
                            .start-btn{
                                background: #ff0000;
                            }
                            .exit-btn{
                                background: #ff8338;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>