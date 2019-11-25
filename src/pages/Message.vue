<template>
  <div class='message-conatiner'>
      <head-bar title="消息中心"/>
      <div class="message-content">
          <div class="message-wraper">
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
                <ul class="message-list">
                    <li v-for="(item,index) in msgList" :key="index">
                        <div class="msg-top">
                            <div class="msg-top-left fl">
                                <span class="msg-icon"><img src="../assets/images/notice.png" alt=""></span>
                                <span class="msg-tags">系统通知</span>
                            </div>
                            <div class="msg-top-right fr">
                                <span class="msg-times">{{item.msg_time}}</span>
                            </div>
                            <div class="cl"></div>
                        </div>
                        <p class="msg-name">{{item.msg_name}}</p>
                        <div class="msg-bottom">
                            <span class="msg-bottom-left fl">查看详情</span>
                            <span class="msg-arrow fr"><img src="../assets/images/into.png" alt=""></span>
                            <div class="cl"></div>
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
name:'message',
  data () {
    return {
        isFresh:false,
        isShowUp:true,
        isPullUpLoading:false,
        isPullDownLoading:false,
        pullUpMsg:"上拉加载更多",
        pullDownMsg:"下拉刷新",
        msgList:[
            {
                id:"001",
                msg_name:"你好，您发起的【志愿者申请】已被驳回，感谢您的关注！",
                msg_time:"2019-10-25 12:30"
            },
            {
                id:"001",
                msg_name:"你好，您发起的【志愿者申请】已被驳回，感谢您的关注！",
                msg_time:"2019-10-25 12:30"
            },
            {
                id:"001",
                msg_name:"你好，您发起的【志愿者申请】已被驳回，感谢您的关注！",
                msg_time:"2019-10-25 12:30"
            },
            {
                id:"001",
                msg_name:"你好，您发起的【志愿者申请】已被驳回，感谢您的关注！",
                msg_time:"2019-10-25 12:30"
            },
            {
                id:"001",
                msg_name:"你好，您发起的【志愿者申请】已被驳回，感谢您的关注！",
                msg_time:"2019-10-25 12:30"
            },
            {
                id:"001",
                msg_name:"你好，您发起的【志愿者申请】已被驳回，感谢您的关注！",
                msg_time:"2019-10-25 12:30"
            },
            {
                id:"001",
                msg_name:"你好，您发起的【志愿者申请】已被驳回，感谢您的关注！",
                msg_time:"2019-10-25 12:30"
            },
            {
                id:"001",
                msg_name:"你好，您发起的【志愿者申请】已被驳回，感谢您的关注！",
                msg_time:"2019-10-25 12:30"
            },
            {
                id:"001",
                msg_name:"你好，您发起的【志愿者申请】已被驳回，感谢您的关注！",
                msg_time:"2019-10-25 12:30"
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
.message-conatiner{
    height: 100%;
    .message-content{
        height: calc(100% - 2rem);
        background: #f0f0f0;
        .message-wraper{
            height: 100%;
            position: relative;
            .message-list{
                padding: .7rem .5rem;
                padding-bottom: 0;
                box-sizing: border-box;
                li{
                    background: #fff;
                    padding: .5rem;
                    padding-top: .8rem;
                    box-sizing: border-box;
                    margin-bottom: .5rem;
                    .msg-top{
                        margin-bottom: .4rem;
                        line-height: 1.25rem;
                        .msg-icon{
                            display: inline-block;
                            width: 1.2rem;
                            vertical-align: middle;
                        }
                        .msg-tags{
                            color: #000;
                            font-size: .85rem;
                            vertical-align: middle;
                            font-weight: bold;
                        }
                    }
                    .msg-name{
                        line-height: 1.25rem;
                        margin-bottom: .5rem;
                    }
                    .msg-bottom{
                        .msg-arrow{
                            display: inline-block;
                            width: .5rem;
                        }
                        .msg-bottom-left{
                            color: #000;
                            font-size: .75rem;
                        }
                    }
                }
            }
        }
        
    }   
}
</style>