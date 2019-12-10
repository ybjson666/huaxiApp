<template>
  <div class='wish-container'>
      <head-bar title="我的心愿"/>
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
      <div class="wish-contents">
          <div class="bar-tip"></div>
          <div class="wish-wraper">
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
                <ul class="wish-list">
                    <li v-for="(item,index) in wishList" :key="index" @click="seekInfo(item.wishid)">
                        <div class="wish-li-wraps">
                            <div class="wish-info-title">
                                <div class="wish-title-wraps">
                                    <span class="wish-icon"><img src="../assets/images/wish.png" alt=""></span>
                                    <span class="wish-title">{{item.title}}</span>
                                </div>
                                <!-- <span class="wish-type orange" v-if="item.state=='1'">待审核</span>
                                <span class="wish-type orange" v-else-if="item.state=='2'">进行中</span>
                                <span class="wish-type red" v-else-if="item.state=='3'">未通过</span>
                                <span class="wish-type gray" v-else-if="item.state=='4'">已取消</span>
                                <span class="wish-type gray" v-else-if="item.state=='5'">已完成</span> -->
                            </div>
                            <p class="wish-desc">心愿描述：{{item.description}}</p>
                            <div class="wish-date-wraps">
                                <span class="wish-date">提交时间：{{item.subdate}}</span>
                            </div>
                            <span class="apply-btn red" v-if="item.state=='1'" @click.stop="cancel(item.wishid)">取消申请</span>
                            <span class="apply-btn" v-if="item.state=='2'">取消申请</span>
                            <span class="down-tags" v-if="item.state==='3'"><img src="../assets/images/failure.png" alt=""></span>
                            <span class="down-tags" v-if="item.state==='5'"><img src="../assets/images/check_success.png" alt=""></span>
                            <span class="type-tags type-red" v-if="item.state=='1'">待审核</span>
                            <span class="type-tags type-orange" v-else-if="item.state=='2'">进行中</span>
                        </div>
                    </li>
                </ul>
              </Scroller>
              <p class="none-data" v-if="!wishList.length">暂无数据</p>
          </div>
          <Loading v-show="isLoading"><span slot="contents" class="load-txt">数据加载中...</span></Loading>
      </div>
      
  </div>
</template>

<script>
import Scroller from '@/components/Scroller';
import HeadBar from '@/components/HeadBar'
import { toggleModal,pageSize,loadMoreData,fetchSyncDatas,ReFreshDatas } from '../utils/tools';
import { mapState,mapActions,mapMutations } from 'vuex';
import { cancelWish } from '../utils/api'
import Loading from '@/components/Loading'
export default {
name:'wish',
  data () {
    return {
        isFresh:false,
        isShowUp:true,
        isPullUpLoading:false,
        isPullDownLoading:false,
        hasData:false,
        pullUpMsg:"上拉加载更多",
        pullDownMsg:"下拉刷新",
        isLoading:false,
        state:"0",
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
                name:"进行中"
            },
            {
                type:"3",
                name:"未通过"
            },
            {
                type:"5",
                name:"已完成"
            },
        ],
        isMine:'Y',
        pageNo:1
    };
  },

  components: {
    HeadBar,
    Scroller,
    Loading
  },

  computed:{
      ...mapState('wish',['wishList'])
  },

  created(){
    this.fetchData();
  },

  methods: {
    ...mapActions('wish',['req_Wish']),
    ...mapMutations('wish',['cancel_wish']),
    seleType(type){
          this.state=type;
          this.pageNo=1;
          this.fetchData();
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
            this.hasData=this.wishList.length>=pageSize?true:false; 
        }else{
            toggleModal(data.message);
        }
    },
    refreshData(){
        this.pageNo=1;
        ReFreshDatas(this,this.req_Wish,{isMine:this.isMine,state:this.state,pageNo:this.pageNo,pageSize},data=>{
            this.calcList(data);
        })
    },
    loadMore(){
        loadMoreData(this,this.req_Wish,{isMine:this.isMine,state:this.state,pageNo:this.pageNo,pageSize});
    },
    fetchData(){
        fetchSyncDatas(this,this.req_Wish,{isMine:this.isMine,state:this.state,pageNo:this.pageNo,pageSize},data=>{
           this.calcList(data);
        });
    },
    cancel(wishId){
        cancelWish({wishId}).then(data=>{
            if(data.state===200){
                toggleModal('取消成功');
                this.pageNo=1;
                this.fetchData();
                // this.cancel_wish(wishId);
            }else{
                toggleModal(data.message);
            }
        })
    },
    seekInfo(id){
        this.$router.push(`/wishInfo/${id}`)
    }
  }
}

</script>
<style lang='scss' scoped>
.wish-container{
    height: 100%;
    background: #f0f0f0;
    .type-bar{
        height: 2rem;
        .type-list{
            display: flex;
            li{
                flex: 1;
                text-align: center;
                font-size: .85rem;
                span{
                    display: inline-block;
                    line-height: 1.9rem;
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
    .wish-contents{
        height: calc(100% - 4rem);
        position: relative;
        .wish-wraper{
            height: calc(100% - .85rem);
            position: relative;
            .wish-list{
                li{
                    background: #fff;
                    padding:.8rem .75rem;
                    padding-bottom: 1rem;
                    box-sizing: border-box;
                    margin-bottom: .25rem;
                    .wish-li-wraps{
                        border:1px solid#dcdcdc;
                        border-radius: 4px;
                        position: relative;
                        padding:  0 .5rem;
                        padding-top: 2rem;
                        padding-bottom: 1rem;
                        box-sizing: border-box;
                        position: relative;
                        .type-tags{
                            position: absolute;
                            left: -.4rem;
                            top:-1px;
                            width: 3.2rem;
                            height: 1.8rem;
                            text-align: center;
                            line-height: 1.5rem;
                            color: #fff;
                            font-size: .6rem;
                        }
                        .type-red{
                            background: url('../assets/images/bg4.png') no-repeat;
                            background-size:105% 100%;
                        }
                        .type-orange{
                            background: url('../assets/images/bg2.png') no-repeat;
                            background-size:105% 100%;
                        }
                        .apply-btn{
                            color: rgb(179,179,179);
                            text-decoration: underline;
                            position: absolute;
                            right:.5rem;
                            top:.6rem;
                            font-size: .75rem;
                        }
                        .red{
                            color: #ff0000;
                        }
                        .gray{
                            color: #ccc;
                        }
                    }
                    .wish-info-title{
                        display: flex;
                        margin-bottom: 1rem;
                        .wish-title-wraps{
                            flex: 3.5;
                            .wish-icon{
                                display: inline-block;
                                width: .9rem;
                                vertical-align: middle;
                            }
                            .wish-title{
                                font-size: .85rem;
                                margin-left: .1rem;
                                vertical-align: middle;
                            }
                        }
                        .wish-type{
                            flex: 1;
                            text-align: right;
                        }
                        .orange{
                            color: #ff8338;
                        }
                        .red{
                            color: #ff0000;
                        }
                        .gray{
                            color: #ccc;
                        }
                    }
                    .wish-desc{
                        margin-bottom: .75rem;
                        color: #808080;
                        word-wrap:break-word;
                    }
                    .wish-date-wraps{
                        display: flex;
                        color: #808080;
                        .wish-date{
                            flex: 3.5;
                        }
                    }
                    .down-tags{
                        position: absolute;
                        display: block;
                        width: 3rem;
                        top:0;
                        right: 0;
                    }
                    &:last-child{
                        margin-bottom: 0;
                    }
                }
            }
        }
    }
}
</style>