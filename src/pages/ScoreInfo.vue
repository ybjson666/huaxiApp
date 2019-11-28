<template>
  <div class='scoreInfo-container'>
      <head-bar title="积分明细"/>
      <div class="scoreInfo-contents">
          <div class="score-container">
              <div class="score-wraps">
                  <p class="curScore">{{curScore}}积分</p>
                  <p class="remins">当前余额</p>
              </div>
          </div>
          <div class="score-list-wrapper" ref="wrapers">
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
                  <ul class="score-list" ref="list">
                      <li v-for="(item,index) in scoreList" :key="index">
                          <p class="score-name">{{item.consumption}}</p>
                          <div class="score-wraps">
                              <span class="score-date">{{item.date}}</span>
                              <span class="score-num gray" v-if="item.limit.indexOf('-')>-1">{{item.limit}}分</span>
                              <span class="score-num" v-else>{{item.limit}}分</span>
                          </div>
                      </li>
                  </ul>
              </Scroller>
              <Loading v-show="isLoading"/>
              <p class="none-data" v-if="!scoreList.length">暂无数据</p>
          </div>
      </div>
  </div>
</template>

<script>
import Scroller from '@/components/Scroller';
import HeadBar from '@/components/HeadBar';
import Loading from '@/components/Loading'
import { mapActions,mapState } from 'vuex';
import { pageSize, toggleModal } from '../utils/tools';
export default {
name:'scoreInfo',
  data () {
    return {
        curScore:"4578.00",
        isFresh:false,
        isShowUp:true,
        isPullUpLoading:false,
        isPullDownLoading:false,
        pageno:1,
        hasData:false,
        pullUpMsg:"上拉加载更多",
        pullDownMsg:"下拉刷新",
        isLoading:false
    };
  },
  components: {
      HeadBar,
      Scroller,
      Loading
  },
  computed:{
      ...mapState('shop',['scoreList'])
  },
  created(){
      this.isLoading=true;
      this.req_scoreList([{pageno:this.pageno,pageSize,type:'0'},true,(data)=>{
        if(data.state===200){
            if(data.data&&data.data.length){
                this.pageno++;
            }
             this.$nextTick(()=>{
                setTimeout(()=>{
                    this.hasData=this.scoreList.length>=pageSize?true:false;
                    this.isLoading=false; 
                },1000);
            })
        }else{
            toggleModal(data.message);
            this.isLoading=false; 
        }
      }])
  },
  methods: {
      ...mapActions('shop',['req_scoreList']),
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
        this.req_scoreList([{pageno:this.pageno,pageSize,type:'0'},true,(data)=>{
            this.isFresh=true;
        if(data.state===200){
            this.pageno++;
             this.$nextTick(()=>{
                setTimeout(()=>{
                    this.isFresh=false;
                    this.isPullDownLoading=false;
                    this.hasData=this.scoreList.length>=pageSize?true:false; 
                },1000);
            })
            }else{
                toggleModal(data.message)
            }
      }])

      setTimeout(()=>{
          this.isPullDownLoading=false;
          this.isFresh=true;
          setTimeout(()=>{
              this.isFresh=false;
          },1000)     
      },1000)
    },
    loadMore(){
        this.isPullUpLoading=true;
        this.req_scoreList([{pageno:this.pageno,pageSize,type:'0'},false,(data)=>{
        if(data.state===200){
            this.pageno++;
            this.isPullUpLoading=false;
            }else{
                toggleModal(data.message)
            }
      }])

      setTimeout(()=>{
          this.isPullUpLoading=false;
      },1000)
    //   this.page++;
    },
  },
  mounted(){
       this.$nextTick(()=>{
          setTimeout(()=>{
            this.hasData=this.scoreList.length>=pageSize?true:false; 
          },1000);
      })
  }
}

</script>
<style lang='scss' scoped>
.scoreInfo-container{
    height: 100%;
    .scoreInfo-contents{
        height: calc(100% - 2rem);
        .score-container{
            padding: .5rem;
            box-sizing: border-box;
            height: 7rem;
            .score-wraps{
                height: 6rem;
                background: url('../assets/images/bg_details.png');
                background-size:100% 100%;
                color: #fff;
                padding:1.5rem .8rem;
                box-sizing: border-box;
                .curScore{
                    text-align: center;
                    font-size: .9rem;
                    margin-bottom: .2rem;
                }
                .remins{
                    text-align: center;
                }
            }
        }
        .score-list-wrapper{
            height: calc(100% - 7rem);
            position: relative;
            .score-list{
                padding-top: .5rem;
                box-sizing: border-box;
                li{
                    padding: .5rem;
                    box-sizing: border-box;
                    border-bottom: 1px solid #ccc;
                    margin-bottom: .6rem;
                    .score-name{
                        font-size: .8rem;
                        color: #333;
                        margin-bottom: .3rem;
                    }
                    .score-wraps{
                        display: flex;
                        .score-date{
                            flex: 3;
                        }
                        .score-num{
                            flex: 1;
                            text-align: right;
                            color: #ff8338;
                            font-size: .9rem;
                        }
                        .gray{
                            color: #ccc;
                        }
                    }
                }
            }
        }
    }
}
</style>