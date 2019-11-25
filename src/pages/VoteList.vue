<template>
  <div class='vote-container'>
      <head-bar title="投票列表"/>
      <div class="vote-contents">
          <div class="vote-wraper">
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
                <ul class="vote-list">
                    <li v-for="(item,index) in voteList" :key="index">
                        <div class="pic-wraps">
                            <img :src="item.pic" alt="">
                        </div>
                        <div class="shadow">
                            <h2>{{item.title}}</h2>
                            <p>{{item.add_time}}</p>
                            <div class="btn-wraps">
                                <div>
                                    <span class="txt">查看详情</span>
                                    <span class="icon"><img src="../assets/images/into2.png" alt=""></span>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
              </Scroller>
              <p class="none-data" v-if="!voteList.length">暂无数据</p>
          </div>
      </div>
  </div>
</template>

<script>
import Scroller from '@/components/Scroller';
import HeadBar from '@/components/HeadBar'
export default {
name:'vote',
  data () {
    return {
        hasData:true,
        isFresh:false,
        isShowUp:true,
        isPullUpLoading:false,
        isPullDownLoading:false,
        pullUpMsg:"上拉加载更多",
        pullDownMsg:"下拉刷新",
        voteList:[
            {
                id:"001",
                pic:require('../assets/images/bg1.png'),
                title:"最美环保志愿者评选",
                add_time:"2019-06-25至2019-06-05"
            },
            {
                id:"002",
                pic:require('../assets/images/bg1.png'),
                title:"最美环保志愿者评选",
                add_time:"2019-06-25至2019-06-05"
            },
            {
                id:"003",
                pic:require('../assets/images/bg1.png'),
                title:"最美环保志愿者评选",
                add_time:"2019-06-25至2019-06-05"
            },
            {
                id:"004",
                pic:require('../assets/images/bg1.png'),
                title:"最美环保志愿者评选",
                add_time:"2019-06-25至2019-06-05"
            },
            {
                id:"005",
                pic:require('../assets/images/bg1.png'),
                title:"最美环保志愿者评选",
                add_time:"2019-06-25至2019-06-05"
            }
        ]
    };
  },

  components: {
      Scroller,
      HeadBar
  },

  computed:{},

  mounted(){},

  methods: {
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
      setTimeout(()=>{
          this.isPullUpLoading=false;
      },1000)
    },
  }
}

</script>
<style lang='scss' scoped>
.vote-container{
    height: 100%;
    .vote-contents{
        height: calc(100% - 2rem);
        .vote-wraper{
            height: 100%;
            position: relative;
            .vote-list{
                padding: 0 .5rem;
                padding-top: .8rem;
                box-sizing: border-box;
                li{
                    position: relative;
                    margin-bottom: .8rem;
                    height: 7.5rem;
                    .pic-wraps{
                        height: 100%;
                        overflow: hidden;
                        border-radius: 6px;
                        img{
                            height: 100%;
                        }
                    }
                    .shadow{
                        position: absolute;
                        width: 100%;
                        height: 100%;
                        left: 0;
                        top: 0;
                        background: rgba(0,0,0,.3);
                        z-index: 5;
                        padding-top: 1rem;
                        box-sizing: border-box;
                        color: #fff;
                        border-radius: 6px;
                        h2{
                            font-size: .8rem;
                            font-weight: normal;
                            margin-bottom: .3rem;
                            text-align: center;
                        }
                        p{
                            text-align: center;
                            margin-bottom: .3rem;
                        }
                        .btn-wraps{
                            text-align: center;
                            div{
                                display: inline-block;
                                width: 4.5rem;
                                height: 1.25rem;
                                text-align: center;
                                line-height: 1.1rem;
                                color: #ff0000;
                                background: #fff;
                                border-radius: .8rem;
                                vertical-align: middle;
                            }
                            .txt{
                                vertical-align: middle;
                            }
                            .icon{
                                width: .5rem;
                                display: inline-block;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>