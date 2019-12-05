<template>
    <div class='wishInfo-container'>
        <head-bar title="心愿详情"/>
        <div class="wishInfo-contents">
            <div class="actv-pic"><img src="../assets/images/picture6.png" alt=""></div>
            <div class="title-wraps">
                <h2 class="titles">{{wishInfo.wish.title}}</h2>
                <p class="wish-type-wraps red" v-if="wishInfo.wish.state=='2'"><span>进行中</span></p>
                <p class="wish-type-wraps gray" v-else-if="wishInfo.wish.state=='5'"><span>已完成</span></p>
                <p class="wish-pub-time">发布时间：{{wishInfo.wish.starttime}}</p>
            </div>
            <div class="wishInfo-contents-wraps">
                <div class="section section-one block">
                    <p class="wish-content">{{wishInfo.wish.description}}</p>
                </div>
                <div class="section section-two block">
                    <div class="section-title">
                        <span class="section-icon"><img src="../assets/images/activity_details.png" alt=""></span>
                        <span class="section-txt">相关招募活动</span>
                    </div>
                    <div class="actv-block">
                        <ul class="hunger-list">
                            <li v-for="(item,index) in wishInfo.activity" :key="index" @click="seekInfo(item.activityrecruitid)">
                                <div class="item-wraps">
                                    <div class="hunger-pic">
                                        <img :src="item.cover" alt="">
                                    </div>
                                    <div class="hunger-infos">
                                        <h2>{{item.activityname | curtWords(9)}}</h2>
                                        <div class="hunger-bottom">
                                            <p>
                                                <span class="row-icon time-icon"><img src="../assets/images/time.png" alt=""></span>
                                                <span>{{item.subdate}}</span>
                                            </p>
                                            <p>
                                                <span class="row-icon user-icon"><img src="../assets/images/user.png" alt=""></span>
                                                <span v-if="item.recruitcount==0">{{item.hascount}}/不限制</span>
                                                <span v-else>{{item.hascount}}/{{item.recruitcount}}</span>
                                            </p>
                                            <p>
                                                <span class="row-icon addr-icon"><img src="../assets/images/address.png" alt=""></span>
                                                <span>{{item.address | curtWords(12)}}</span>
                                            </p>
                                        </div>
                                    </div>
                                    <div class="type-tag red" v-if="item.state=='1'">
                                        <span class="tag-txt">招募中</span>
                                    </div>
                                    <div class="type-tag orange" v-else-if="item.state=='2'">
                                        <span class="tag-txt">进行中</span>
                                    </div>
                                    <div class="type-tag gray" v-else-if="item.state=='3'">
                                        <span class="tag-txt">未开始</span>
                                    </div>
                                </div>
                                <div class="li-bar"></div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <Loading v-show="isLoading"><span slot="contents" class="load-txt">数据加载中...</span></Loading>
        </div>
    </div>
</template>

<script>
import HeadBar from '@/components/HeadBar'
import Loading from '@/components/Loading'
import {mapActions,mapState } from 'vuex';
import { toggleModal,isEn } from '../utils/tools'
export default {
name:'sourceInfo',
  data () {
    return {
        wishId:"",
        isLoading:false
    };
  },
  components: {
      HeadBar,
      Loading
  },
  mounted(){
      this.wishId=this.$route.params.wishId;
      this.isLoading=true;
      this.req_WishInfo([{id:this.wishId},data=>{
          if(data.state===200){
              this.isLoading=false;
          }else{
              toggleModal(data.message);
              this.isLoading=false
          }
      }])
  },
  beforeRouteEnter (to, from, next) {
    if(to.meta.lastPath!=to.path){
        to.meta.keepAlive=false;
        to.meta.lastPath=to.path;
    }else{
        to.meta.keepAlive=true;
    }
    next();
  },
  methods:{
    ...mapActions('wish',['req_WishInfo']),
    seekInfo(id){
      this.$router.push(`/actvInfo/${id}`)
    }
  },
  computed:{
      ...mapState('wish',['wishInfo'])
  }
}

</script>
<style lang='scss' scoped>
.wishInfo-container{
    height: 100%;
    .wishInfo-contents{
        height: calc(100% - 2.5rem);
        overflow-y: scroll;
        position: relative;
        -webkit-overflow-scrolling: touch;
        .actv-pic{
            height: 9rem;
            img{
                height: 100%;
            }
        }
        .title-wraps{
            width: 17rem;
            position: absolute;
            left: 50%;
            margin-left: -8.5rem;
            padding: .8rem 0;
            top: 8rem;
            background: #fff;
            border:  1px solid#f0f0f0;
            h2{
                text-align: center;
                font-size: .8rem;
                color: #000;
                font-weight: normal;
                margin-bottom: .5rem;
            }
            p{
                text-align: center;
                font-size: .75rem;
            }
            .wish-pub-time{
                color: #808080;
                margin-top: .3rem;
            }
            .red{
                color: #ff0000;
            }
            .gray{
                color: #b3b3b3;
            }
        }
        .wishInfo-contents-wraps{
            padding: 1.5rem 0;
            box-sizing: border-box;
            .section-title{
                height: 2.5rem;
                line-height: 2.5rem;
                border-bottom:2px solid #f0f0f0;
                padding: 0 .8rem;
                box-sizing: border-box;
                .section-icon{
                    display: inline-block;
                    width: 1.4rem;
                    margin-right: .2rem;
                    box-sizing: border-box;
                    height: 2.5rem;
                    padding-top: .3rem;
                    vertical-align: middle;
                }
                .section-txt{
                    font-size: .85rem;
                }
            }
            .section-one{
                padding:.5rem .9rem;
                padding-top: 5rem;
                margin-bottom: .8rem;
                box-sizing: border-box;
                .wish-content{
                    padding: .8rem;
                    box-sizing: border-box;
                    border: 1px solid #d8271c;
                    border-radius: 4px;
                    text-align: justify;
                }
            }
            .section-two{
                .actv-block{
                    .hunger-list{
                        padding: .5rem .8rem;
                        box-sizing: border-box;
                        padding-bottom: 0;
                        li{
                            margin-bottom: .8rem;
                            .item-wraps{
                            position: relative;
                            display: flex;
                            .type-tag{
                                position: absolute;
                                width: 3.5rem;
                                height: 1.5rem;
                                color: #fff;
                                left: -.45rem;
                                top:-.1rem;
                                font-size: .6rem;
                                z-index: 10;
                                line-height: 1.2rem;
                                padding-left: .5rem;
                                box-sizing: border-box;
                            }
                            .red{
                                background: url('../assets/images/bg2.png') no-repeat;
                                background-size: 100% 100%;
                            }
                            .orange{
                                background: url('../assets/images/bg3.png')no-repeat;
                                background-size: 100% 100%;
                            }
                            .gray{
                                background: url('../assets/images/bg4.png')no-repeat;
                                background-size: 100% 100%;
                            }
                            .hunger-pic{
                                width: 7.5rem;
                                height: 5rem;
                                border-radius: 3px;
                                overflow: hidden;
                                margin-right: .5rem;
                            }
                            .hunger-infos{
                                flex: 1;
                                height: 5rem;
                                position: relative;
                                h2{
                                font-size: .85rem;
                                font-weight: normal;
                                }
                                .hunger-bottom{
                                    position: absolute;
                                    width: 100%;
                                    left: 0;
                                    bottom: 0;
                                    font-size: .65rem;
                                    color: rgb(127,127,127);
                                        p{
                                           font-size: .6rem;
                                            margin-bottom: .2rem;
                                            &:last-child{
                                                margin: 0;
                                            }
                                            .row-icon{
                                                display: inline-block;
                                                margin-right: .3rem;
                                                vertical-align: middle;
                                            }
                                            .time-icon{
                                                width: .7rem;
                                            }
                                            .user-icon{
                                                width: .8rem;
                                            }
                                            .addr-icon{
                                                width: .6rem;
                                            }
                                        }
                                    }
                                }
                            
                            }
                            .li-bar{
                                height: .3rem;
                                background: #f0f0f0;
                                margin-top: .8rem;
                            }
                            &:last-child{
                                margin: 0;
                                .li-bar{
                                    display: none;
                                }
                            }
                        }
                    }
                }
            }
        }
        
    }
}
</style>