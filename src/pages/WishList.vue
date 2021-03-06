<template>
  <div class='wishList-container'>
    <head-bar title="心愿列表"/>
    <div class="type-bar block">
        <ul class="type-list">
            <li 
            v-for="(item,index) in typeList" 
            :key="index" 
            :class="{on:curType===item.type}"
            @click="seleType(item.type)"
            >
                <span>{{item.name}}</span>
            </li>
        </ul>
    </div>
    <div class="wishList-contents" ref="wrapers">
        <div class="bar-tip"></div>
        <div class="wishList-wraper">
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
                <ul class="wish-list" ref="list">
                    <li v-for="(item,index) in wishList" :key="index" @click="seekInfo(item.wishid)">
                        <div class="desire-info">
                            <p class="title">
                                <img src="../assets/images/wish.png" alt="">
                                <span>{{item.title}}</span>
                            </p>
                            <div>提交时间：<span>{{item.subdate}}</span></div>
                            <span class="type-tags orange" v-if="item.state=='2'">进行中</span>
                            <span class="type-tags gray" v-if="item.state=='5'">已完成</span>
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
import { toggleModal,pageSize,loadMoreData,ReFreshDatas,fetchSyncDatas } from '../utils/tools';
import { mapState,mapActions } from 'vuex'
import Loading from '@/components/Loading'
export default {
name:'wishList',
  data () {
    return {
        curType:0,
        hasData:false,
        isFresh:false,
        isShowUp:true,
        isLoading:false,
        isPullUpLoading:false,
        isPullDownLoading:false,
        pullUpMsg:"上拉加载更多",
        pullDownMsg:"下拉刷新",
        typeList:[
            {
                type:0,
                name:"全部"
            },
            {
                type:2,
                name:"进行中"
            },
            {
                type:5,
                name:"已完成"
            }
        ],
        pageNo:1,
        isMine:'N',
        isHomePage:'N'
    };
  },

  components: {
    Scroller,
    HeadBar,
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
        ReFreshDatas(this,this.req_Wish,{isMine:this.isMine,isHomePage:this.isHomePage,state:this.curType,pageSize,pageNo:this.pageNo},data=>{
            this.calcList(data);
        })
    },
    loadMore(){
      loadMoreData(this,this.req_Wish,{isMine:this.isMine,isHomePage:this.isHomePage,state:this.curType,pageSize,pageNo:this.pageNo})
    },
    fetchData(){
        fetchSyncDatas(this,this.req_Wish,{isMine:this.isMine,isHomePage:this.isHomePage,state:this.curType,pageSize,pageNo:this.pageNo},data=>{
            this.calcList(data);
        })
    },
    seleType(type){
        this.curType=type;
        this.pageNo=1;
        this.fetchData();
    },
    seekInfo(id){
        this.$router.push(`/wishInfo/${id}`)
    }
  }
}

</script>
<style lang='scss' scoped>
.wishList-container{
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
                    line-height: 2.3rem;
                    height: 1.9rem;
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
    .wishList-contents{
        height: calc(100% - 4rem);
        position: relative;
        .wishList-wraper{
            height: calc(100% - .85rem);
            position: relative;
            .wish-list{
                li{
                    background: #fff;
                    margin-bottom: .5rem;
                    padding: .5rem;
                    box-sizing: border-box;
                    .desire-info{
                        position: relative;
                        padding: 1.5rem .5rem;
                        box-sizing: border-box;
                        border:1px solid #ccc;
                        border-radius: 3px;
                        word-wrap:break-word;
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
                            color: #808080;
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
        }
    }
}
</style>