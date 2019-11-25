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
                            <div class="row-icon"><img src="../assets/images/activity_address.png" alt=""></div>
                            <div class="row-info">
                                <p class="row-line">{{actvInfo.address}}</p>
                            </div>
                        </div>
                        <div class="rows">
                            <div class="row-icon"><img src="../assets/images/activity_time.png" alt=""></div>
                            <div class="row-info">
                                <p class="row-line">招募开始：{{actvInfo.checkstarttime}}</p>
                                <p class="row-line">招募结束：{{actvInfo.recruit_end}}</p>
                                <p class="row-line">活动开始：{{actvInfo.actv_start}}</p>
                                <p class="row-line">活动结束：{{actvInfo.actv_end}}</p>
                            </div>
                        </div>
                        <!-- <div class="rows">
                            <div class="row-icon"><img src="../assets/images/activity_type.png" alt=""></div>
                            <div class="row-info">
                                <p class="row-line">{{actvInfo.sverice_type}}</p>
                            </div>
                        </div> -->
                        <div class="rows">
                            <div class="row-icon"><img src="../assets/images/activity_number.png" alt=""></div>
                            <div class="row-info">
                                <p class="row-line">{{actvInfo.hascount}} / {{actvInfo.recruitcount}} 人</p>
                            </div>
                        </div>
                        <div class="rows">
                            <div class="row-icon"><img src="../assets/images/activity_location.png" alt=""></div>
                            <div class="row-info">
                                <p class="row-line">{{actvInfo.address}}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="section section-two block">
                    <div class="section-title">
                        <span class="section-icon"><img src="../assets/images/activity_details.png" alt=""></span>
                        <span>活动介绍</span>
                    </div>
                    <div class="actv-intros"><p>{{actvInfo.activitydesc}}</p></div>
                </div>
                <div class="apply-btn btn" @click="apply">发起报名</div>
            </div>
        </div>
    </div>
</template>

<script>
import HeadBar from '@/components/HeadBar'
import { mapActions,mapState } from 'vuex';
import { toggleModal } from "../utils/tools"
export default {
name:'actvInfo',
  data () {
    return {
        actvId:""
    };
  },

  components: {
      HeadBar
  },
  computed:{
      ...mapState('volunteer',['actvInfo'])
  },
  created(){
      this.actvId=this.$route.params.actvId;
      this.req_actvInfo([this.actvId,data=>{
          if(data.state!==200){
              toggleModal(data.message);
          }
      }])
  },
  methods:{
      ...mapActions('volunteer',['req_actvInfo']),
      apply(){
          this.$router.push(`/apply/${this.actvId}`);
      }
  }
}

</script>
<style lang='scss' scoped>
.actvInfo-container{
    height: 100%;
    .actvInfo-contents{
        height: calc(100% - 2rem);
        overflow-y: scroll;
        background: #f0f0f0;
        position: relative;
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
            border-bottom: none;
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
                .section-icon{
                    display: inline-block;
                    width: 1rem;
                    margin-right: .3rem;
                }
            }
            .section{
                padding: 0 .7rem;
                box-sizing: border-box;
                .rows{
                    display: flex;
                    margin-bottom: .3rem;
                    .row-icon{
                        display: inline-block;
                        width: .6rem;
                        margin-right: .5rem;
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
                padding-top: 2rem;
                margin-bottom: .8rem;
                .section-content{
                    padding: .8rem .5rem;
                    box-sizing: border-box;
                }
            }
            .section-two{
                .actv-intros{
                    padding:.8rem 1rem;
                    box-sizing: border-box;
                    p{
                        line-height: 1.25rem;
                        text-align: justify;
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