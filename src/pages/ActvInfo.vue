<template>
    <div class='actvInfo-container'>
        <head-bar title="活动详情"/>
        <div class="actvInfo-contents">
            <div class="actv-pic"><img :src="actvInfo.cover" alt=""></div>
            <div class="title-wraps">
                <h2 class="titles">{{actvInfo.activityname}}</h2>
                <div class="type-wraps" v-if="actvInfo.state">
                    <p class="types red" v-if="actvInfo.state=='1'">招募中</p>
                    <p class="types orange" v-if="actvInfo.state=='2'">进行中</p>
                    <p class="types gray" v-if="actvInfo.state=='3'">未开始</p>
                </div>
            </div>
            <div class="activInfo-contents-wraps">
                <div class="section section-one block">
                    <div class="section-title">
                        <span class="section-icon"><img src="../assets/images/activity_details.png" alt=""></span>
                        <span>活动详情</span>
                    </div>
                    <div class="section-content">
                        <div class="rows">
                            <div class="row-icon addr-icon"><img src="../assets/images/activity_address.png" alt=""></div>
                            <div class="row-info">
                                <p class="row-line">{{actvInfo.address}}</p>
                            </div>
                        </div>
                        <div class="rows">
                            <div class="row-icon time-icon"><img src="../assets/images/activity_time.png" alt=""></div>
                            <div class="row-info">
                                <p class="row-line">招募开始：{{actvInfo.recruitstarttime}}</p>
                                <p class="row-line">招募结束：{{actvInfo.recruitendtime}}</p>
                                <p class="row-line">活动开始：{{actvInfo.activitystarttime}}</p>
                                <p class="row-line">活动结束：{{actvInfo.activityendtime}}</p>
                            </div>
                        </div>
                        <div class="rows">
                            <div class="row-icon serv-icon"><img src="../assets/images/activity_type.png" alt=""></div>
                            <div class="row-info">
                                <p class="row-line">服务类型：{{servAreaName}}</p>
                            </div>
                        </div>
                        <div class="rows">
                            <div class="row-icon num-icon"><img src="../assets/images/activity_number.png" alt=""></div>
                            <div class="row-info">
                                <p class="row-line" v-if="actvInfo.recruitcount==0">志愿者人数：{{actvInfo.hascount}} / 不限制</p>
                                <p class="row-line" v-else>{{actvInfo.hascount}} / {{actvInfo.recruitcount}} 人</p>
                            </div>
                        </div>
                        <!-- <div class="rows">
                            <div class="row-icon"><img src="../assets/images/activity_location.png" alt=""></div>
                            <div class="row-info">
                                <p class="row-line">{{actvInfo.address}}</p>
                            </div>
                        </div> -->
                    </div>
                </div>
                <div class="section section-two block">
                    <div class="section-title">
                        <span class="section-icon"><img src="../assets/images/activity_details.png" alt=""></span>
                        <span>活动介绍</span>
                    </div>
                    <div class="actv-intros" v-html="actvInfo.activitydesc"></div>
                </div>
                <!-- <div class="apply-btn btn" @click="apply" v-show="actvInfo.isApply==0">发起报名</div> -->
                <div class="apply-btn btn" @click="apply">发起报名</div>
            </div>
            <Loading v-show="isLoading"/>
        </div>
    </div>
</template>

<script>
import HeadBar from '@/components/HeadBar'
import Loading from '@/components/Loading'
import { mapActions,mapState } from 'vuex'
import { toggleModal } from "../utils/tools"
export default {
name:'actvInfo',
  data () {
    return {
        actvId:"",
        isLoading:true
    };
  },

  components: {
      HeadBar,
      Loading
  },
  computed:{
      ...mapState({
          actvInfo:state=>state.volunteer.actvInfo,
          serviceTypes:state=>state.user.serviceTypes,
          userInfo:state=>state.user.userInfo
      }),
      //分开写法
    //   ...mapState('user',['serviceTypes']),
    //   ...mapState('volunteer',['actvInfo']),
      servAreaName(){
            let name="";
            this.serviceTypes.map((item)=>{
                if(this.actvInfo.activitytype==item.dictionaryId){
                    name=item.dictionaryValue;
                }
            })
            return name;
        }
  },
  created(){
        this.actvId=this.$route.params.actvId;
        let customerid=localStorage.getItem('customerid')
        this.req_getServices((data)=>{
            if(data.state!==200){
                toggleModal(data.message);
            }
        })
        this.req_actvInfo([this.actvId,customerid,data=>{
            this.isLoading=false;
            if(data.state!==200){
                toggleModal(data.message);
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
      ...mapActions({
          req_actvInfo:'volunteer/req_actvInfo',
          req_getServices:'user/req_getServices'
      }),
      //分开写法
    //   ...mapActions('volunteer',['req_actvInfo']),
    //   ...mapActions('user',['req_getServices']),
      apply(){
          const { isvolunteer} =this.userInfo;
          if(isvolunteer==0){
              toggleModal('必须先成为志愿者才能报名~');
              return;
          }
           this.$router.push(`/apply/${this.actvId}/${this.actvInfo.activityname}`);
      }
  }
}

</script>
<style lang='scss' scoped>
.actvInfo-container{
    height: 100%;
    .actvInfo-contents{
        height: calc(100% - 2.5rem);
        overflow-y: scroll;
        background: #f0f0f0;
        position: relative;
        -webkit-overflow-scrolling: touch;
        .actv-pic{
            height: 9rem;
            img{
                height: 100%;
            }
        }
        .title-wraps{
            width: 17.5rem;
            position: absolute;
            left: 50%;
            margin-left: -8.75rem;
            padding: .8rem 0;
            top: 8rem;
            background: #fff;
            border:  1px solid#f0f0f0;
            box-sizing: border-box;
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
            .red{
                color: #ff0000;
            }
            .orange{
                color: #ff8338;
            }
            .gray{
                color: #b3b3b3;
            }
        }
        .activInfo-contents-wraps{
            padding: 1.5rem 0;
            box-sizing: border-box;
            .section-title{
                height: 2.5rem;
                line-height: 2.5rem;
                border-bottom:2px solid #f0f0f0;
                font-size: .85rem;
                .section-icon{
                    display: inline-block;
                    width: 1.4rem;
                    margin-right: .2rem;
                    vertical-align: middle;
                    padding-top: .3rem;
                    box-sizing: border-box;
                    height: 2.5rem;
                }
            }
            .section{
                padding: 0 .65rem;
                box-sizing: border-box;
                .rows{
                    display: flex;
                    margin-bottom: .3rem;
                    .row-icon{
                        display: inline-block;
                        margin-right: .8rem;
                        box-sizing: border-box;
                        padding-top: .15rem;
                        img{
                            vertical-align: middle;
                        }
                    }
                    .time-icon{
                        width: .7rem;
                    }
                    .serv-icon{
                        width: .7rem;
                    }
                    .addr-icon{
                        width: .7rem;
                    }
                    .num-icon{
                        width: .75rem;
                    }
                    .row-info{
                        flex: 1;
                        .row-line{
                            line-height: 1.25rem;
                            color: #808080;
                        }
                    }
                }
            }
            .section-one{
                padding-top: 2.5rem;
                margin-bottom: .8rem;
                .section-content{
                    padding: .8rem .3rem;
                    box-sizing: border-box;
                }
            }
            .section-two{
                .actv-intros{
                    padding:.8rem 1.8rem;
                    box-sizing: border-box;
                    word-wrap:break-word;
                    line-height: 1.25rem;
                    text-align: justify;
                    color: #808080;
                    p{
                        line-height: 1.25rem;
                        text-align: justify;
                        word-wrap:break-word;
                    }
                }
            }
            .apply-btn{
                margin: 0 auto;
                margin-top: 2rem;
            }
        }
        
    }
}
</style>