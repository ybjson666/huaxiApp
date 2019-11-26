<template>
    <div class='wishInfo-container'>
        <head-bar title="心愿详情"/>
        <div class="wishInfo-contents">
            <div class="actv-pic"><img src="../assets/images/picture6.png" alt=""></div>
            <div class="title-wraps">
                <h2 class="titles">{{wish.title}}</h2>
                <p class="wish-type-wraps red" v-if="wish.state=='2'"><span>进行中</span></p>
                <p class="wish-type-wraps gray" v-else-if="wish.state=='5'"><span>已完成</span></p>
                <p class="wish-pub-time">发布时间：{{wish.starttime}}</p>
            </div>
            <div class="wishInfo-contents-wraps">
                <div class="section section-one block">
                    <p class="wish-content">{{wish.description}}</p>
                </div>
                <div class="section section-two block">
                    <div class="section-title">
                        <span class="section-icon"><img src="../assets/images/activity_details.png" alt=""></span>
                        <span>相关招募活动</span>
                    </div>
                    <div class="actv-block">
                        <ul class="hunger-list">
                            <li v-for="(item,index) in hungerList" :key="index" @click="seekInfo(item.id)">
                            <div class="item-wraps">
                                <div class="hunger-pic">
                                    <img :src="item.pic" alt="">
                                    </div>
                                    <div class="hunger-infos">
                                    <h2>{{item.name}}</h2>
                                    <div class="hunger-bottom">
                                        <p>
                                            <span class="row-icon"><img src="../assets/images/time.png" alt=""></span>
                                            <span>{{item.hunger_time}}</span>
                                        </p>
                                        <p>
                                            <span class="row-icon"><img src="../assets/images/user.png" alt=""></span>
                                            <span>{{item.join_num}}/{{item.totals}}</span>
                                        </p>
                                        <p>
                                            <span class="row-icon"><img src="../assets/images/address.png" alt=""></span>
                                            <span>{{item.addrs}}</span>
                                        </p>
                                    </div>
                                    </div>
                                    <div class="type-tag red" v-if="item.type==='0'">
                                        <span class="tag-txt">招募中</span>
                                    </div>
                                    <div class="type-tag orange" v-else-if="item.type==='1'">
                                        <span class="tag-txt">进行中</span>
                                    </div>
                                    <div class="type-tag gray" v-else-if="item.type==='2'">
                                        <span class="tag-txt">未开始</span>
                                    </div>
                                </div>
                                <div class="li-bar"></div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import HeadBar from '@/components/HeadBar'
import {mapActions,mapState } from 'vuex';
import { toggleModal } from '../utils/tools'
export default {
name:'sourceInfo',
  data () {
    return {
        wishId:"",
        hungerList:[
        {
          id:"001",
          name:"流浪猫救助活动(动物救助中心)",
          pic:require('../assets/images/sign.png'),
          type:"0",
          hunger_time:"2019-11-02",
          join_num:"12",
          totals:"50",
          addrs:"成都市金牛区"
        },
        {
          id:"002",
          name:"空气污染指数调查志愿小队活动",
          pic:require('../assets/images/sign.png'),
          type:"1",
          hunger_time:"2019-11-02",
          join_num:"12",
          totals:"50",
          addrs:"成都市金牛区"
        },
        {
          id:"003",
          name:"河道清理小队活动",
          pic:require('../assets/images/sign.png'),
          type:"2",
          hunger_time:"2019-11-02",
          join_num:"12",
          totals:"50",
          addrs:"成都市金牛区"
        }
      ],
    };
  },

  components: {
      HeadBar
  },
  mounted(){
      this.wishId=this.$route.params.wishId;
      this.req_WishInfo([{id:this.wishId},data=>{
          console.log(data)
      }])
  },
  methods:{
      ...mapActions('wish',['req_WishInfo'])
  },
  computed:{
      ...mapState('wish',['wish'])
  }
}

</script>
<style lang='scss' scoped>
.wishInfo-container{
    height: 100%;
    .wishInfo-contents{
        height: calc(100% - 2rem);
        overflow-y: scroll;
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
                padding: 0 .5rem;
                box-sizing: border-box;
                .section-icon{
                    display: inline-block;
                    width: 1rem;
                    margin-right: .3rem;
                }
            }
            .section-one{
                padding:.5rem;
                padding-top: 5rem;
                margin-bottom: .8rem;
                box-sizing: border-box;
                .wish-content{
                    padding: .8rem .5rem;
                    box-sizing: border-box;
                    border: 1px solid #d8271c;
                    border-radius: 4px;
                }
            }
            .section-two{
                .actv-block{
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
                                font-size: .75rem;
                                color: #000;
                                }
                                .hunger-bottom{
                                position: absolute;
                                width: 100%;
                                left: 0;
                                bottom: 0;
                                    p{
                                    font-size: .6rem;
                                    margin-bottom: .1rem;
                                    &:last-child{
                                        margin: 0;
                                    }
                                    span{
                                        vertical-align: middle;
                                    }
                                    .row-icon{
                                        display: inline-block;
                                        width: .6rem;
                                        margin-right: .3rem;
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
}
</style>