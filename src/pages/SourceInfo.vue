<template>
    <div class='sourceInfo-container'>
        <head-bar title="资源详情"/>
        <div class="sourceInfo-contents">
            <div class="actv-pic"><img :src="source.pic" alt=""></div>
            <div class="title-wraps">
                <h2 class="titles">{{source.title}}</h2>
            </div>
            <div class="sourceInfo-contents-wraps">
                <div class="section section-one block">
                    <div class="section-title">
                        <span class="section-icon"><img src="../assets/images/activity_details.png" alt=""></span>
                        <span>资源详情</span>
                    </div>
                    <div class="section-content">
                        <div class="rows">
                            <div class="row-icon"><img src="../assets/images/activity_address.png" alt=""></div>
                            <div class="row-info">
                                <p class="row-line">{{source.addrs}}</p>
                            </div>
                        </div>
                        <div class="rows">
                            <div class="row-icon"><img src="../assets/images/activity_time.png" alt=""></div>
                            <div class="row-info">
                                <p class="row-line">开放时间：{{source.open_time}}</p>
                            </div>
                        </div>
                        <div class="rows">
                            <div class="row-icon"><img src="../assets/images/source.png" alt=""></div>
                            <div class="row-info">
                                <p class="row-line">资源类型：{{source.source_type}}</p>
                            </div>
                        </div>
                        <div class="rows">
                            <div class="row-icon"><img src="../assets/images/activity_location.png" alt=""></div>
                            <div class="row-info">
                                <p class="row-line">{{source.source_addr}}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="section section-two block">
                    <div class="section-title">
                        <span class="section-icon"><img src="../assets/images/activity_details.png" alt=""></span>
                        <span>资源说明</span>
                    </div>
                    <div class="actv-intros"><p>{{source.actv_desc}}</p></div>
                </div>
                <div class="apply-btn btn" @click="appoint">我要预约</div>
            </div>
        </div>
    </div>
</template>

<script>
import HeadBar from '@/components/HeadBar'
export default {
name:'sourceInfo',
  data () {
    return {
        sourceId:"",
        source:{
            pic:require('../assets/images/picture6.png'),
            title:"流浪动物救助活动",
            addrs:"高新区 四川省成都市高新区天府三街",
            open_time:"09:00-18:00",
            source_type:"办公室",
            source_addr:"高新区孵化园救助站",
            actv_desc:`当你看到一只小狗或小猫被遗弃路边，说着流浪街头，你必须记录的是，当你看到一只小狗或小猫被遗弃路边，
            说着流浪街头，你必须记录的是当你看到一只小狗或小猫被遗弃路边，说着流浪街头，你必须记录的是`
        }
    };
  },

  components: {
      HeadBar
  },
  mounted(){
      this.sourceId=this.$route.params.sourceId;
      console.log(this.sourceId)
  },
  methods:{
      appoint(){
          this.$router.push(`/subscribe/${this.sourceId}`);
      }
  }
}

</script>
<style lang='scss' scoped>
.sourceInfo-container{
    height: 100%;
    .sourceInfo-contents{
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
        .sourceInfo-contents-wraps{
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