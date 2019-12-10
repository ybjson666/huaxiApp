<template>
  <div class='hunger-container'>
    <head-bar title="志愿活动" :showBack="showBack"/>
    <div class="hunger-contents">
        <div class="contents-wraps">
          <div class="top-bar"></div>
          <div class="navgitors block">
            <Navgitor :dataSource="dataSource"/>
          </div>
          <div class="actv-block">
            <div class="block-head block">
              <Captions captionTxt="志愿招募"/>
            </div>
            <div class="actv-wraps block">
              <ul class="hunger-list">
                  <li v-for="(item,index) in votList" :key="index" @click="seekInfo(item.activityrecruitid)">
                    <div class="item-wraps">
                      <div class="hunger-pic">
                        <img :src="item.cover" alt="">
                      </div>
                      <div class="hunger-infos">
                        <h2>{{item.activityname | curtWords(20)}}</h2>
                        <div class="hunger-bottom">
                            <p>
                              <span class="row-icon time-icon"><img src="../assets/images/time.png" alt=""></span>
                              <span>{{item.subdate}}</span>
                            </p>
                            <p>
                              <span class="row-icon num-icon"><img src="../assets/images/user.png" alt=""></span>
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
              <div class="seek-more" @click="seekMore('recruit')">查看更多<span class="more-icon"><img src="../assets/images/right.png" alt=""></span></div> 
            </div>
          </div>
          <div class="mien-block">
            <div class="mien-head block">
              <Captions captionTxt="志愿风采"/>
            </div>
            <div class="mien-wraps block">
                <ul class="mien-list">
                  <li v-for="(item,index) in mienList" :key="index" @click="openFunc">
                    <div class="item-wraps">
                      <div class="mien-pic"><img :src="item.pic" alt=""></div>
                      <div class="mienInfos">
                        <h2>{{item.name}}</h2>
                        <div class="mienBottom">
                          <p class="addtime">{{item.addTime}}</p>
                          <p class="scans">
                            <span class="scan-pic"><img src="../assets/images/browse.png" alt=""></span>
                            <span>{{item.sacn_num}}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div class="li-bar"></div>
                  </li>
                </ul>
                <div class="seek-more" @click="seekMore('mien')">查看更多<span class="more-icon"><img src="../assets/images/right.png" alt=""></span></div> 
            </div>
             
          </div>
        </div>
        <Loading v-show="isLoading"><span slot="contents" class="load-txt">数据加载中...</span></Loading>
    </div>
  </div>
</template>

<script>
import HeadBar from '@/components/HeadBar'
import Navgitor from '@/components/Navgitor'
import Loading from '@/components/Loading'
import Captions from '@/components/Captions'
import { toggleModal,isEn } from '../utils/tools';
import { mapActions,mapState } from 'vuex'
export default {
name:'hunger',
  data () {
    return {
      showBack:false,
      isLoading:true,
      dataSource:[
        {
          icon:require('../assets/images/recruit.png'),
          name:"志愿招募",
          path:'/recruit',
          needVolun:false
        },
        {
          icon:require('../assets/images/activity.png'),
          name:"志愿风采",
          path:'/mien',
          needVolun:false
        }
      ],
      mienList:[
        {
          id:"001",
          pic:require('../assets/images/mien.png'),
          name:"为人民服务，点滴做起，贵在坚持",
          addTime:"2019-04-12 15:08:36",
          sacn_num:"2346"
        },
        {
          id:"002",
          pic:require('../assets/images/mien.png'),
          name:"参与志愿工作既是“助人”，亦是“自助”...",
          addTime:"2019-04-12 15:08:36",
          sacn_num:"23"
        },
        {
          id:"003",
          pic:require('../assets/images/mien.png'),
          name:"志愿服务个人化，人性化的特征，可以有...",
          addTime:"2019-04-12 15:08:36",
          sacn_num:"880"
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
  // beforeRouteEnter (to, from, next) {
  //   if(from.name=='actvInfo'){
  //       to.meta.keepAlive=true
  //   }else{
  //     to.meta.keepAlive=false
  //   }
  //   next()
  // },
  computed:{
    ...mapState({
      votList:state=>state.volunteer.votList,
      userInfo:state=>state.user.userInfo
    })
  },
  created(){
    this.req_Vots([{isAll:'N',state:0,areaId:'N'},true,data=>{
      if(data.state!==200&&data.state!==700004){
            toggleModal(data.message);
      }else if(data.state===700004){
        toggleModal(data.message);
        setTimeout(()=>{
          this.$router.push('/login');
        },1000);
      }
    }])
    this.req_getUser(data=>{
      this.isLoading=false;
      if(data.state!==200&&data.state!==700004){
              toggleModal(data.message);
        }else if(data.state===700004){
            toggleModal(data.message);
            setTimeout(()=>{
                this.$router.push('/login');
            },1000);
        }
    })
  },
  filters:{
    // curtWords(val,num){
    //   if(!isEn.test(val)){
    //     if(val.length>num){
    //       return val.slice(0,num)+'...';
    //     }else{
    //       return val;
    //     }
    //   }else{
    //     return val;
    //   }
    // }
  },
  methods: {
    ...mapActions({
       req_Vots:'volunteer/req_Vots',
       req_getUser:'user/req_getUser'
    }),
    seekMore(type){
      const { isvolunteer} =this.userInfo;
      switch(type){
        case 'recruit':
          if(isvolunteer==0){
            toggleModal('志愿者方可进行此操作~');
          }else{
            this.$router.push('/recruit')
          }
          break;
          case 'mien':
          this.$router.push('/mien');
          break;
      }
    },
    seekInfo(id){
      const { isvolunteer} =this.userInfo;
        if(isvolunteer==0){
          toggleModal('志愿者方可进行此操作~');
        }else{
          this.$router.push(`/actvInfo/${id}`)
        }
    },
    openFunc(){
      toggleModal("功能正在开发中...")
    }
  }
}

</script>
<style lang='scss' scoped>
.hunger-container{
    height: 100%;
    .hunger-contents{
        height: calc(100% - 2rem);
        position: relative;
        .top-bar{
            height: 6rem;
        }
        .navgitors{
            position: absolute;
            width: 17rem;
            left: 50%;
            margin-left: -8.5rem;
            top:1rem;
            z-index: 5;
            border-radius: 3px;
            box-shadow: 0 0 10px 2px #ddd;
            padding: 1rem;
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
            .actv-wraps{
              padding-bottom: .5rem;
              box-sizing: border-box;
            }
            .hunger-list{
              padding: .5rem;
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
                    background: url('../assets/images/bg4.png') no-repeat;
                    background-size: 100% 100%;
                  }
                  .orange{
                    background: url('../assets/images/bg2.png')no-repeat;
                    background-size: 100% 100%;
                  }
                  .gray{
                    background: url('../assets/images/bg3.png')no-repeat;
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
                      color:rgb(26,26,26);
                      margin-top: -.17rem;
                    }
                    .hunger-bottom{
                      position: absolute;
                      width: 100%;
                      left: 0;
                      bottom: -.2rem;
                      font-size: .65rem;
                      color: rgb(127,127,127);
                        p{
                          font-size: .65rem;
                          margin-bottom: .05rem;
                          &:last-child{
                            margin: 0;
                          }
                          .row-icon{
                            display: inline-block;
                            margin-right: .3rem;
                            vertical-align: middle;
                          }
                          .time-icon{
                            width: .6rem;
                          }
                          .num-icon{
                            width: .7rem;
                          }
                          .addr-icon{
                            width: .55rem;
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
                }
              }
            }
        }
        .seek-more{
          margin-top: .3rem;
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
        .mien-block{
          .mien-head{
            box-sizing: border-box;
            margin-bottom: .5rem;
          }
          .mien-wraps{
            padding-bottom: .5rem;
            box-sizing: border-box;
            .mien-list{
              padding: .5rem;
              box-sizing: border-box;
              padding-bottom: 0;
              li{
                padding-top: .5rem;
                box-sizing: border-box;
                .item-wraps{
                  display: flex;
                  .mien-pic{
                    width: 7.5rem;
                    height: 5rem;
                    overflow: hidden;
                    border-radius: 3px;
                    margin-right: .5rem;
                    img{
                      height: 100%;
                    }
                  }
                  .mienInfos{
                    flex: 1;
                    height: 5rem;
                    position: relative;
                    h2{
                      font-size: .85rem;
                    }
                    .mienBottom{
                      position: absolute;
                      width: 100%;
                      left: 0;
                      bottom: 0;
                      p{
                        color: #808080;
                        line-height: 1rem;
                      }
                      .scans{
                        .scan-pic{
                          width: .8rem;
                          display: inline-block;
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
                }
              }
            }
          }
        }

    }
}
</style>