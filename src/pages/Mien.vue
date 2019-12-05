<template>
  <div class='mien-container'>
      <head-bar title="志愿风采"/>
      <div class="mien-contents">
          <div class="mien-wraper">
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
              <ul class="mien-list">
                <li v-for="(item,index) in mienList" :key="index" @click="goInfo(item.id)">
                  <h2 class="title">{{item.title}}</h2>
                  <div class="mien-wraps">
                    <div class="mien-infos">
                      <p class="desc">{{item.desc}}</p>
                      <div class="mien-datas">
                        <span class="mien-times">{{item.add_time}}</span>
                        <div class="scans-wraps">
                          <span class="scan-icon"><img src="../assets/images/browse.png" alt=""></span>
                          <span class="scan-num">{{item.scans}}</span>
                        </div>
                      </div>
                    </div>
                    <div class="mien-pic"><img :src="item.pic" alt=""></div>
                  </div>
                </li>
              </ul>
            </Scroller>
            <p class="none-data" v-show="!mienList.length">暂无数据</p>
          </div>
      </div>
  </div>
</template>

<script>
import Scroller from '@/components/Scroller';
import HeadBar from '@/components/HeadBar'
export default {
name:'mien',
  data () {
    return {
      hasData:true,
      isFresh:false,
      isShowUp:true,
      isPullUpLoading:false,
      isPullDownLoading:false,
      pullUpMsg:"上拉加载更多",
      pullDownMsg:"下拉刷新",
      mienList:[
        {
          id:"001",
          pic:require('../assets/images/mien2.png'),
          title:"给他一个温暖的家一流浪动物救助公益活动(动物救助中心)",
          desc:"不做冷漠的看客，不做热情的指挥家,汇聚一点一滴的力量，用行动改变动物的命运。",
          add_time:"2019-05-12 08:30:31",
          scans:"30"
        },
        {
          id:"002",
          pic:require('../assets/images/mien2.png'),
          title:"给他一个温暖的家一流浪动物救助公益活动(动物救助中心)",
          desc:"不做冷漠的看客，不做热情的指挥家,汇聚一点一滴的力量，用行动改变动物的命运。",
          add_time:"2019-05-12 08:30:31",
          scans:"30"
        },
        {
          id:"003",
          pic:require('../assets/images/mien2.png'),
          title:"给他一个温暖的家一流浪动物救助公益活动(动物救助中心)",
          desc:"不做冷漠的看客，不做热情的指挥家,汇聚一点一滴的力量，用行动改变动物的命运。",
          add_time:"2019-05-12 08:30:31",
          scans:"30"
        },
        {
          id:"004",
          pic:require('../assets/images/mien2.png'),
          title:"给他一个温暖的家一流浪动物救助公益活动(动物救助中心)",
          desc:"不做冷漠的看客，不做热情的指挥家,汇聚一点一滴的力量，用行动改变动物的命运。",
          add_time:"2019-05-12 08:30:31",
          scans:"30"
        },
        {
          id:"005",
          pic:require('../assets/images/mien2.png'),
          title:"给他一个温暖的家一流浪动物救助公益活动(动物救助中心)",
          desc:"不做冷漠的看客，不做热情的指挥家,汇聚一点一滴的力量，用行动改变动物的命运。",
          add_time:"2019-05-12 08:30:31",
          scans:"30"
        }
      ]
    };
  },

  components: {
      HeadBar,
      Scroller
  },

  computed:{},

  mounted(){
    this.mienList.length?this.hasData=true:this.hasData=false;
  },

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
    goInfo(id){
      this.$router.push(`/actvInfo/${id}`);
    }
  }
}

</script>
<style lang='scss' scoped>
.mien-container{
    height: 100%;
    .mien-contents{
      height: calc(100% - 2rem);
      background: #f5f5f5;
      .mien-wraper{
        height: 100%;
        position: relative;
        .mien-list{
          li{
            margin-bottom: .5rem;
            background: #fff;
            padding: .5rem;
            box-sizing: border-box;
            .title{
              font-size: .85rem;
              margin-bottom: .4rem;
              font-weight: normal;
            }
            .mien-wraps{
              display: flex;
              .mien-pic{
                width: 5rem;
                height: 5rem;
                border-radius: 3px;
                overflow: hidden;
                margin-left: .5rem;
                img{
                  height: 100%;
                }
              }
              .mien-infos{
                flex: 1;
                height: 5rem;
                position: relative;
                .desc{
                  color: rgb(26,26,26);
                  font-size: .7rem;
                }
                .mien-datas{
                  width: 100%;
                  position: absolute;
                  left: 0;
                  bottom: 0;
                  display: flex;
                  .mien-times{
                    flex: 3;
                    color: rgb(128,128,128);
                  }
                  .scans-wraps{
                    flex: 1;
                    text-align: right;
                    color: rgb(128,128,128);
                    .scan-icon{
                      width: .8rem;
                      display: inline-block;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
}
</style>