<template>
    <div class='desire-container'>
        <head-bar title="心愿活动" :showBack="showBack"/>
        <div class="desire-contents">
            <div class="top-bar"></div>
            <div class="navgitors block">
                <Navgitor :dataSource="dataSource"/>
            </div>
            <div class="actv-block">
                <div class="block-head block">
                    <Captions captionTxt="投票活动"/>
                </div>
                <div class="actv-wraps block">
                    <div class="actv-pic">
                        <img :src="actviity.pic" alt="">
                        <div class="shades">
                            <h2>{{actviity.title}}</h2>
                            <p>{{actviity.add_time}}</p>
                            <div><span>查看详情<img src="../assets/images/into2.png"/></span></div>
                        </div>
                    </div>
                    <div class="seek-more" @click="seekMore('vote')">查看更多<span class="more-icon"><img src="../assets/images/right.png" alt=""/></span></div> 
                </div>
            </div>
            <div class="desire-block">
                <Captions captionTxt="心愿列表"/>
                <div class="desire-wraps block">
                    <div class="desire-info" @click="seekInfo('wish',desire.wishid)">
                        <p class="title">
                            <img src="../assets/images/wish.png" alt="">
                            <span>{{desire.title}}</span>
                        </p>
                        <div>提交时间：<span>{{desire.starttime}}</span></div>
                        <span class="type-tags orange" v-if="desire.state=='2'">进行中</span>
                        <!-- <span class="type-tags gray" v-else-if="desire.state=='3'">未通过</span>
                        <span class="type-tags gray" v-else-if="desire.state=='4'">已取消</span> -->
                        <span class="type-tags gray" v-else-if="desire.state=='5'">已完成</span>
                    </div>
                    <div class="seek-more" @click="seekMore('desire')">查看更多<span class="more-icon"><img src="../assets/images/right.png" alt=""/></span></div> 
                </div>
            </div>
            <div class="source-block">
                <Captions captionTxt="资源列表"/>
                <div class="source-wraps block">
                    <ul class="source-list">
                        <li v-for="(item,index) in sourceList" :key="index" @click="seekInfo('source',item.id)">
                            <div class="li-wraps">
                                <div class="title">
                                    <img src="../assets/images/icon.png" alt="">
                                    <span>{{item.title}}</span>
                                </div>
                                <p>资源类型：{{item.source_type}}</p>
                                <p>开放时间：{{item.open_time}}</p>
                                <p>资源地址：{{item.addr}}</p>
                            </div>
                            <div class="li-bar"></div>
                        </li>
                    </ul>
                    <div class="seek-more" @click="seekMore('source')">查看更多<span class="more-icon"><img src="../assets/images/right.png" alt=""/></span></div> 
                </div>
            </div>
            <Loading v-show="isLoading"/>
        </div>
    </div>
</template>

<script>
import HeadBar from '@/components/HeadBar'
import Navgitor from '@/components/Navgitor'
import Captions from '@/components/Captions'
import Loading from '@/components/Loading'
import { mapActions,mapState } from 'vuex'
import { toggleModal } from '../utils/tools'
export default {
name:'desire',
  data () {
    return {
        showBack:false,
        isLoading:true,
        dataSource:[
            {
                icon:require('../assets/images/release.png'),
                name:"发布心愿",
                path:'/publish'
            },
            {
                icon:require('../assets/images/appointment2.png'),
                name:"资源预约",
                path:'/sourceList'
            }
        ],
        actviity:{
            id:"001",
            pic:require('../assets/images/picture6.png'),
            title:"最美环保志愿者评选",
            add_time:"2019-10-12至2019-12-03"
        },
        sourceList:[
            {
                id:"001",
                title:"智慧广场",
                source_type:"办公楼",
                open_time:"09:00-18:00",
                addr:"深圳市南山区乔山路"
            },
            {
                id:"002",
                title:"智慧广场",
                source_type:"办公楼",
                open_time:"09:00-18:00",
                addr:"深圳市南山区乔山路"
            },
            {
                id:"003",
                title:"智慧广场",
                source_type:"办公楼",
                open_time:"09:00-18:00",
                addr:"深圳市南山区乔山路"
            }
        ]
    };
  },

  components: {
      HeadBar,
      Navgitor,
      Captions,
      Loading
  },
  created(){
      this.req_Wish([{isHomePage:'Y',state:0,pageNo:1,pageSize:1},true,(data=>{
          this.isLoading=false;
          if(data.state!==200){
              toggleModal(data.message);
          }
      })])
  },
  computed:{
      ...mapState('wish',['wishList']),
      desire(){
          let desireObj={};
          if(this.wishList.length){
              desireObj=this.wishList[0]
          }
          return desireObj;
      }
  },
  methods: {
      ...mapActions('wish',['req_Wish']),
      seekMore(type){
        switch(type){
            case 'desire':
                this.$router.push('/wishList');
                return;
            case 'source':
                this.$router.push('/sourceList');
                return;
            case 'vote':
                this.$router.push('/voteList');
                return;
        }
    },
    seekInfo(type,id){
        switch(type){
            case 'wish':
                this.$router.push(`/wishInfo/${id}`);
                return;
            case 'source':
                this.$router.push(`/sourceInfo/${id}`);
                return;
            case 'actv':
                return;
        }
        // this.$router.push(`/wishInfo/${id}`)
    }
  }
}

</script>
<style lang='scss' scoped>
.desire-container{
    height: 100%;
    .desire-contents{
        height: calc(100% - 2rem);
        background: #f0f0f0;
        overflow-y: scroll;
        position: relative;
        .top-bar{
            height: 6rem;
        }
        .navgitors{
            height: 7.5rem;
            position: absolute;
            width: 17rem;
            left: 50%;
            margin-left: -8.5rem;
            top:1rem;
            z-index: 5;
            border-radius: 3px;
            box-shadow: 0 0 10px 2px #ddd;
            padding: .8rem;
            box-sizing: border-box;
        }
        .block-head{
            padding-top: 3rem;
            padding-bottom: .5rem;
            margin-bottom: .5rem;
            box-sizing: border-box;
        }
        .actv-block{
            margin-bottom: 1rem;
        }
        .actv-wraps{
            padding: .5rem;
            box-sizing: border-box;
            .actv-pic{
                position: relative;
                height: 7.5rem;
                overflow: hidden;
                border-radius: 3px;
                .shades{
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    left: 0;
                    top:0;
                    background: rgba(0,0,0,.5);
                    z-index: 5;
                    color: #fff;
                    h2{
                        text-align: center;
                        font-size: 1rem;
                        padding-top: 1rem;
                        box-sizing: border-box;
                        margin-bottom: .3rem;
                    }
                    p{
                        text-align: center;
                        margin-bottom: 1rem;
                    }
                    div{
                        text-align: center;
                        span{
                            color: #ff0000;
                            font-size: .8rem;
                            background: #fff;
                            border-radius: 1rem;
                            display: inline-block;
                            height: 1.3rem;
                            line-height: 1.3rem;
                            width: 5rem;
                            text-align: center;
                            img{
                                width: .5rem;
                                margin-left: .2rem;
                            }
                        }
                    }
                }
            }
        }
        .seek-more{
          margin-top: .2rem;
          height: 1.5rem;
          text-align: right;
          padding: 0 .5rem;
          box-sizing: border-box;
          line-height: 1.5rem;
          color: #ff0000;
          .more-icon{
            display: inline-block;
            width: .8rem;
          }
        }
        .desire-block{
            margin-bottom: 1rem;
            .desire-wraps{
                margin-top: .5rem;
                padding: .5rem;
                box-sizing: border-box;
                .desire-info{
                    position: relative;
                    padding: 1.5rem .5rem;
                    box-sizing: border-box;
                    border:1px solid #ccc;
                    border-radius: 3px;
                    p{
                        font-size: .8rem;
                        color: #000;
                        margin-bottom: .5rem;
                        img{
                            width: .8rem;
                            margin-right: .2rem;
                        }
                    }
                    div{
                        padding-left: 1.25rem;
                        box-sizing: border-box;
                    }
                    .type-tags{
                        position: absolute;
                        display: block;
                        height: 1.5rem;
                        line-height: 1.2rem;
                        width: 4rem;
                        text-align: center;
                        left: -.5rem;
                        top:-.1rem;
                        color: #fff;
                        font-size: .6rem;
                    }
                    .orange{
                        background: url('../assets/images/bg2.png') no-repeat;
                        background-size: 100% 100%;
                    }
                    .gray{
                        background: url('../assets/images/bg3.png') no-repeat;
                        background-size: 100% 100%;
                    }
                }
            }
        }
        .source-block{
            .source-wraps{
                padding: .5rem;
                box-sizing: border-box;
                .source-list{
                    li{
                        margin-bottom: .5rem;
                        &:last-child{
                            margin: 0;
                        }
                        .li-wraps{
                            border:1px solid #ccc;
                            box-sizing: border-box;
                            border-radius: 3px;
                            margin-bottom: .5rem;
                            padding: .8rem .5rem;
                            div{
                                color: #000;
                                font-size: .8rem;
                                margin-bottom: .4rem;
                                img{
                                    width: .8rem;
                                    margin-right: .2rem;
                                }
                            }
                            p{
                                color: #808080;
                                line-height: 1.25rem;
                            }
                        }
                        .li-bar{
                            height: .3rem;
                            background: #f0f0f0;
                        }
                        
                    }
                }
            }
        }
       

    }
}
</style>