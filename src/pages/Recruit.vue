<template>
  <div class='recruit-container'>
    <head-bar title="志愿招募"/>
    <div class="seleArea-block">
      <div class="area-wraps fl" @click="showArea">
        <span>活动地区筛选</span>
        <span class="down" ref="down"><img src="../assets/images/sieve.png" alt=""></span>
      </div>
      <div class="sorts fr" ref="sorts" @click="toggelSort"><img src="../assets/images/sorting.png" alt=""></div>
      <div class="cl"></div>
    </div>
    <div class="recruit-contents">
      <div class="recruit-wraper">
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
          <ul class="recruit-list">
            <li v-for="(item,index) in votList" :key="index" @click="goInfo(item.activityrecruitid)">
              <div class="item-wraps">
                <div class="hunger-pic">
                  <img :src="item.cover" alt="">
                </div>
                <div class="hunger-infos">
                  <h2>{{item.activityname}}</h2>
                  <div class="hunger-bottom">
                      <p>
                        <span class="row-icon"><img src="../assets/images/time.png" alt=""></span>
                        <span>{{item.activitystarttime}}</span>
                      </p>
                      <p>
                        <span class="row-icon"><img src="../assets/images/user.png" alt=""></span>
                        <span>{{item.hascount}}/{{item.recruitcount}}</span>
                      </p>
                      <p>
                        <span class="row-icon"><img src="../assets/images/address.png" alt=""></span>
                        <span>{{item.address}}</span>
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
        </Scroller>
        <Loading v-show="isLoading"/>
         <p class="none-data" v-if="!votList.length">暂无数据</p>
      </div>
    </div>
     <ServicePicker :show="seekServArea" @closeFrame="closeFrame" :dataSource="servAreas" @chooseItem="chooseServArea"/>
  </div>
</template>

<script>
import Scroller from '@/components/Scroller';
import HeadBar from '@/components/HeadBar'
import ServicePicker from '@/components/ServicePicker'
import Loading from '@/components/Loading'
import {mapActions,mapState} from 'vuex'
import { toggleModal,pageSize } from '../utils/tools'
export default {
name:'recruit',
  data () {
    return {
      seekServArea:false,
      isFresh:false,
      isShowUp:true,
      isPullUpLoading:false,
      isPullDownLoading:false,
      hasData:false,
      isLoading:false,
      pullUpMsg:"上拉加载更多",
      pullDownMsg:"下拉刷新",
      areaId:"",
      sort:0,
      pageNo:1,
      isAll:'Y',
      state:0
    };
  },

  components: {
    HeadBar,
    Scroller,
    ServicePicker,
    Loading
  },

  computed:{
    ...mapState('user',['servAreas']),
    ...mapState('volunteer',['votList'])
  },

  created(){
    this.req_servAreas((data)=>{
        if(data.state!==200){
            toggleModal(data.message);
        }
    })
    this.fetchData();
  },
  methods: {
    ...mapActions('user',['req_servAreas']),
    ...mapActions('volunteer',['req_Vots']),
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
      this.pageno=1;
      this.req_Vots([{isAll:this.isAll,areaId:this.areaId,sort:this.sort,pageNo:this.pageNo,pageSize,state:this.state},true,data=>{
        this.isFresh=true;
        if(data.state===200 && data.data&&data.data.length){
            this.pageno++;
            this.$nextTick(()=>{
                setTimeout(()=>{
                    this.hasData=this.votList.length>=pageSize?true:false; 
                    this.isFresh=false;
                    this.isPullDownLoading=false;
                },1500);
            })
            
        }else{
            toggleModal(data.message)
        }
      }])
    },
    loadMore(){
      this.isPullUpLoading=true;
      this.req_Vots([{isAll:this.isAll,areaId:this.areaId,sort:this.sort,pageNo:this.pageNo,pageSize,state:this.state},false,data=>{
          if(data.state===200){
              if(data.data.length){
                  this.pageno++;
              }
            this.isPullUpLoading=false;
          }else{
                toggleModal(data.message)
            }
      }])
    },
    showArea(){
      this.seekServArea=true;
      this.$refs.down.style='transform:rotate(180deg)'
    },
    toggelSort(){
      if(this.sort==0){
        this.sort=1;
        this.$refs.sorts.style='transform:rotate(180deg)';
      }else{
         this.sort=0;
        this.$refs.sorts.style='transform:rotate(0deg)';
      }
      this.pageNo=1;
      this.isAll='N';
      this.fetchData();

    },
    goInfo(id){
      this.$router.push(`/actvInfo/${id}`);
    },
    closeFrame(){
      this.seekServArea=false;
    },
    chooseServArea(item){
      this.seekServArea=false;
      this.areaId=item.dictionaryId;
      this.pageNo=1;
      this.isAll='N';
      this.fetchData();
    },
    fetchData(){
      this.isLoading=true;
      this.req_Vots([{isAll:this.isAll,areaId:this.areaId,sort:this.sort,pageNo:this.pageNo,pageSize,state:this.state},true,data=>{
      if(data.state==200){
          if(data.data&&data.data.length){
            this.pageNo++;
          }
          this.$nextTick(()=>{
            setTimeout(()=>{
              this.hasData=this.votList.length>=pageSize?true:false;
              this.isLoading=false; 
            },1000);
          })
        }else{
          toggleModal(data.message);
          this.isLoading=false; 
        }
      }])
    }
  }
}

</script>
<style lang='scss' scoped>
.recruit-container{
    height: 100%;
    .seleArea-block{
      height: 2.5rem;
      border-bottom: 2px solid #f0f0f0;
      box-sizing: border-box;
      line-height: 2.5rem;
      padding: 0 .5rem;
      .area-wraps{
        .down{
          display: inline-block;
          width: .5rem;
          transition:.3s;
        }
      }
      .sorts{
        width: .8rem;
        transition:.3s;
      }
    }
    .recruit-contents{
      height: calc(100% - 4.5rem);
      .recruit-wraper{
        height: 100%;
        position: relative;
        .recruit-list{
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
</style>