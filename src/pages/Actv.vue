<template>
  <div class='active-container'>
      <head-bar title="我的活动"/>
      <div class="type-bar block">
          <ul class="type-list">
              <li 
                v-for="(item,index) in typeList" 
                :key="index" 
                :class="{on:state===item.type}"
                @click="seleType(item.type)"
              ><span>{{item.name}}</span></li>
          </ul>
      </div>
      <div class="active-contents">
          <div class="bar-tip"></div>
          <div class="actv-wraper">
              <Scroller
                    @scrolling="scrolling" 
                    @touchEnded="touchEnded" 
                    :pullUpMsg="pullUpMsg"
                    :pullDownMsg="pullDownMsg"
                    :isPullUpLoading="isPullUpLoading"
                    :isPullDownLoading="isPullDownLoading"
                    :isFresh="isFresh"
                    :isShowUp="isShowUp"
                    :hasData="hasData"
                >
                <ul class="actv-list">
                    <li v-for="(item,index) in actvList" :key="index">
                        <div class="actv-pic">
                            <img :src="item.cover" alt="">
                            <!-- <div class="actv-tags" v-if="item.applyState!=='3'">
                                <span class="tags-text" v-if="item.applyState=='1'">待审核</span>
                                <span class="tags-text" v-else-if="item.applyState=='2'">已通过</span>
                                <span class="tags-text" v-else-if="item.applyState=='4'">已取消</span>
                            </div> -->
                        </div>
                        <div class="actv-infos">
                            <div class="actv-title-wraps">
                                <span class="actv-title fl">{{item.activityname}}</span>
                                <span class="cancel unCancel fr" v-if="item.applyState=='1'" @click="canceAplys(item.activityrecruitid)">取消申请</span>
                                <!-- <span class="cancel canceled fr" v-if="item.applyState=='2'">取消申请</span> -->
                                <div class="cl"></div>
                            </div>
                            <div class="actv-bottom">
                                <p class="actv-time-wraps">
                                    <span class="time-icon"><img src="../assets/images/time.png" alt=""></span>
                                    <span class="actv-time">{{item.subdate}}</span>
                                </p>
                                <p class="actv-addr-wraps">
                                    <span class="addr-icon"><img src="../assets/images/address.png" alt=""></span>
                                    <span class="actv-addr">{{item.address}}</span>
                                </p>
                            </div>
                            <div class="actv-mark" v-if="item.applyState==='3'"><img src="../assets/images/failure.png" alt=""></div>
                        </div>
                        <span class="type-tags" v-if="item.applyState=='1'">待审核</span>
                        <span class="check-states" v-if="item.applyState=='3'"><img src="../assets/images/failure.png" alt=""></span>
                        <span class="check-states" v-else-if="item.applyState=='2'"><img src="../assets/images/chech_success.png" alt=""></span>
                    </li>
                </ul>
              </Scroller>
              <p class="none-data" v-if="!actvList.length">暂无数据</p>
          </div>
          <Loading v-show="isLoading"><span slot="contents" class="load-txt">数据加载中...</span></Loading>
      </div>
  </div>
</template>

<script>
import Scroller from '@/components/Scroller'
import HeadBar from '@/components/HeadBar'
import Loading from '@/components/Loading'
import {  mapActions,mapState,mapMutations } from 'vuex'
import { toggleModal,pageSize,fetchSyncDatas,loadMoreData,ReFreshDatas } from '../utils/tools'
import { cancelApply } from '../utils/api'
export default {
name:'active',
    data () {
        return {
            isFresh:false,
            isShowUp:true,
            isPullUpLoading:false,
            isPullDownLoading:false,
            isLoading:false,
            hasData:false,
            pullUpMsg:"上拉加载更多",
            pullDownMsg:"下拉刷新",
            customerId:"",
            pageNo:1,
            state:'0',
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
                    name:"已通过"
                },
                {
                    type:"3",
                    name:"未通过"
                }
            ]
        };
    },
    components: {
        HeadBar,
        Scroller,
        Loading
    },
    computed:{
        ...mapState('volunteer',['actvList']),
    },
    created(){
        this.customerId=localStorage.getItem('customerid');
        this.fetchData();
    },
    methods: {
        ...mapActions('volunteer',['req_actvs']),
        ...mapMutations('volunteer',['set_cancel_actv_list']),
        seleType(type){
            this.state=type;
            this.pageNo=1;
            this.fetchData();
        },
        canceAplys(id){
            cancelApply({activityEnterId:id,customerId:this.customerId}).then(data=>{
                if(data.state==200){
                    // this.set_cancel_actv_list(id);
                    toggleModal("取消成功");
                    this.pageNo=1;
                    this.fetchData();
                }else{
                    toggleModal(data.message);
                }
            })
        },
        touchEnded(pos,scroll){
            if(pos.y>60){
                this.refreshData();
            }else if(pos.y<scroll.maxScrollY-30){
                if(this.hasData){
                    this.loadMore();
                }
            }
        },
        scrolling(pos){
            if(pos.y>60){
                this.isPullDownLoading=true;
            }
        },
        calcList(data){
            if(data.state===200){
                this.hasData=this.actvList.length>=pageSize?true:false; 
            }else{
                toggleModal(data.message);
            }
        },
        refreshData(){
            ReFreshDatas(this,this.req_actvs,{id:this.customerId,state:this.state,pageNo:this.pageNo,pageSize},data=>{
                this.calcList(data);
            })
        },
        loadMore(){
            loadMoreData(this,this.req_actvs,{id:this.customerId,state:this.state,pageNo:this.pageNo,pageSize});
        },
        fetchData(){
            fetchSyncDatas(this,this.req_actvs,{id:this.customerId,state:this.state,pageNo:this.pageNo,pageSize},data=>{
                this.calcList(data);
            })
        }
    }
}

</script>
<style lang='scss' scoped>
.active-container{
    height: 100%;
    background: #f0f0f0;
    .type-bar{
        height: 2rem;
        .type-list{
            display: flex;
            li{
                flex: 1;
                text-align: center;
                color: #000;
                height: 2rem;
                span{
                    display: inline-block;
                    line-height: 2.2rem;
                    height: 1.9rem;
                    font-size: .85rem;
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
    .active-contents{
        height: calc(100% - 4.5rem);
        position: relative;
        .actv-wraper{
            height: calc(100% - .85rem);
            position: relative;
            .actv-list{
                li{
                    display: flex;
                    background: #fff;
                    padding: .7rem .75rem;
                    box-sizing: border-box;
                    margin-bottom: .5rem;
                    position: relative;
                    .type-tags{
                        position: absolute;
                        left: .35rem;
                        top:.6rem;
                        width: 3.2rem;
                        height: 1.8rem;
                        text-align: center;
                        line-height: 1.5rem;
                        color: #fff;
                        font-size: .6rem;
                        background: url('../assets/images/bg4.png') no-repeat;
                        background-size:105% 100%;
                        z-index: 4;
                    }
                    .check-states{
                        position: absolute;
                        display: block;
                        width: 3.25rem;
                        right: 0;
                        top:0;
                        z-index: 10;
                    }
                    .actv-pic{
                        width: 6rem;
                        height: 4.5rem;
                        border-radius: .2rem;
                        overflow: hidden;
                        margin-right: .5rem;
                        position: relative;
                        img{
                            height: 100%;
                        }
                        .actv-tags{
                            position: absolute;
                            width: 100%;
                            height: 2rem;
                            left: 0;
                            bottom: 0;
                            background: rgba(0,0,0,.5);
                            color: #fff;
                            text-align: center;
                            line-height: 2rem;
                        }
                    }
                    .actv-infos{
                        flex: 1;
                        position: relative;
                        height: 4.5rem;
                        .actv-bottom{
                            position: absolute;
                            width: 100%;
                            bottom: .4rem;
                            left: 0;
                            color: #808080;
                            font-size: .65rem;
                            .actv-time-wraps{
                                margin-bottom: .4rem;
                                .time-icon{
                                    display: inline-block;
                                    width: .7rem;
                                    margin-right: .5rem;
                                    vertical-align: middle;
                                }
                            }
                            .actv-addr-wraps{
                                .addr-icon{
                                    display: inline-block;
                                    width: .6rem;;
                                    margin-right: .5rem;
                                    vertical-align: middle;
                                }
                            }
                        }
                        
                        .actv-title-wraps{
                            .actv-title{
                                display: block;
                                font-size: .85rem;
                                width: 7rem;
                            }
                            .cancel{
                                text-decoration: underline;
                                display: inline-block;
                                font-size: .85rem;
                            }
                            .unCancel{
                                color: #ff0000;
                            }
                            .canceled{
                                color: #ccc;
                            }
                        }
                        .actv-mark{
                            position: absolute;
                            width: 3rem;
                            right:-.5rem;
                            top:-.5rem;
                        }
                    }
                }
            }
        }
    }
}
</style>