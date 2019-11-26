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
                        <div class="wish-info-title">
                            <div class="wish-title-wraps">
                                <span class="wish-icon"><img src="../assets/images/wish.png" alt=""></span>
                                <span class="wish-title">{{item.title}}</span>
                            </div>
                            <span class="wish-type orange" v-if="item.state=='1'">待审核</span>
                            <span class="wish-type orange" v-else-if="item.state=='2'">进行中</span>
                            <span class="wish-type red" v-else-if="item.state=='3'">未通过</span>
                            <span class="wish-type gray" v-else-if="item.state=='5'">已完成</span>
                        </div>
                        <p class="wish-desc">心愿描述：{{item.description}}</p>
                        <div class="wish-date-wraps">
                            <span class="wish-date">提交时间：{{item.subdate}}</span>
                            <span class="apply-btn red" v-if="item.state=='1'" @click="cancel(item.wishid)">取消申请</span>
                        </div>
                        <span class="down-tags" v-if="item.state==='3'"><img src="../assets/images/finish.png" alt=""></span>
                    </li>
                </ul>
              </Scroller>
              <Loading v-show="isLoading"/>
              <p class="none-data" v-if="!wishList.length">暂无数据</p>
          </div>
      </div>
      
  </div>
</template>

<script>
import Scroller from '@/components/Scroller';
import HeadBar from '@/components/HeadBar'
import { toggleModal,pageSize } from '../utils/tools';
import { mapState,mapActions } from 'vuex';
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
      seleType(type){
          this.state=type;
          this.pageNo=1;
          this.fetchData();
      },
      touchEnded(pos,scroll){
        if(pos.y>60){
            this.refreshData();
        }else if(pos.y<scroll.maxScrollY-30){
            this.loadMore();
        }
    },
    scrolling(pos){
      if(pos.y>60){
          this.isPullDownLoading=true;
      }
    },
    refreshData(){
        this.pageNo=1;
        this.req_Wish([{isMine:this.isMine,state:this.state,pageNo:this.pageNo,pageSize},true,data=>{
            this.isFresh=true;
            if(data.state===200 && data.data.length){
                this.pageNo++;
                this.$nextTick(()=>{
                    setTimeout(()=>{
                        this.hasData=this.wishList.length>=pageSize?true:false; 
                        this.isFresh=false;
                        this.isPullDownLoading=false;
                    },1000);
                })
                
            }else{
                toggleModal(data.message)
            }
        }])
    },
    loadMore(){
      this.isPullUpLoading=true;
      this.req_Wish([{isMine:this.isMine,state:this.state,pageNo:this.pageNo,pageSize},false,data=>{
          if(data.state===200){
              if(data.data.length){
                  this.pageNo++;
              }
            this.isPullUpLoading=false;
          }else{
                toggleModal(data.message)
            }
      }])
    },
    fetchData(){
        this.isLoading=true;
        this.req_Wish([{isMine:this.isMine,state:this.state,pageNo:this.pageNo,pageSize},true,data=>{
        if(data.state===200){
            if(data.data &&data.data.length){
                this.pageNo++;
            }
            this.$nextTick(()=>{
                setTimeout(()=>{
                    this.hasData=this.wishList.length>=pageSize?true:false; 
                    this.isLoading=false;
                },500);
            })
        }else{
            this.isLoading=false;
            toggleModal(data.message)
        }
      }])
    },
    cancel(wishId){
        cancelWish({wishId}).then(data=>{
            if(data.state===200){
                toggleModal('取消成功');
                this.pageNo=1;
                this.fetchData();
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
        margin-bottom: .8rem;
        .type-list{
            display: flex;
            li{
                flex: 1;
                text-align: center;
                color: #000;
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
        height: calc(100% - 4.8rem);
        .wish-wraper{
            height: 100%;
            position: relative;
            .wish-list{
                li{
                    background: #fff;
                    padding:.8rem .5rem;
                    box-sizing: border-box;
                    margin-bottom: .5rem;
                    position: relative;
                    .wish-info-title{
                        display: flex;
                        margin-bottom: .5rem;
                        .wish-title-wraps{
                            flex: 3.5;
                            .wish-icon{
                                display: inline-block;
                                width: .8rem;
                                vertical-align: middle;
                            }
                            .wish-title{
                                color: #000;
                                font-size: .75rem;
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
                    }
                    .wish-desc{
                        margin-bottom: .3rem;
                    }
                    .wish-date-wraps{
                        display: flex;
                        .wish-date{
                            flex: 3.5;
                        }
                        .apply-btn{
                            flex: 1;
                            text-align: right;
                            color: #999;
                            text-decoration: underline;
                        }
                        .red{
                            color: #ff0000;
                        }
                        .gray{
                            color: #ccc;
                        }
                    }
                    .down-tags{
                        position: absolute;
                        display: block;
                        width: 3rem;
                        top:0;
                        right: 0;
                    }
                }
            }
        }
    }
}
</style>