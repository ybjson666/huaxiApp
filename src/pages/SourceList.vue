<template>
  <div class='sourceList-container'>
      <head-bar title="资源列表">
        <span slot="right-btn" class="right-btn" @click="goAppoint">我的预约</span>
      </head-bar>
      <div class="sele-bar" @click="chooseArea">
        <span class="sele-txt">地区筛选</span>
        <span class="trige" ref="trige"><img src="../assets/images/sieve.png" alt=""></span>
      </div>
      <div class="sourceList-contents">
          <div class="sourceListWraper">
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
              <ul class="source-list">
                <li v-for="(item,index) in sourceList" :key="index" @click="seekInfo(item.id)">
                  <div class="source-wraps">
                    <div class="source-pic"><img :src="item.pic" alt=""></div>
                    <div class="source-info">
                      <h2>{{item.title}}</h2>
                      <div class="source-bottom">
                        <p>资源类型：{{item.source_type}}</p>
                        <p>开放时间：{{item.open_time}}</p>
                        <p>资源地址：{{item.addr}}</p>
                      </div>
                    </div>
                  </div>
                  <div class="li-bar"></div>
                </li>
              </ul>
            </Scroller>
            <p class="none-data" v-if="!sourceList.length">暂无数据</p>
          </div>
      </div>
      <city-selector :column = 3  :show="isShow" idName="city-box" />
      <input type="text" style="display:none" id="city-box" @input="getVal">
  </div>
</template>

<script>
import Scroller from '@/components/Scroller';
import HeadBar from '@/components/HeadBar'
import CitySelector from '@/components/CitySelector'
export default {
name:'sourceList',
  data () {
    return {
        hasData:true,
        isShow:false,
        isFresh:false,
        isShowUp:true,
        isPullUpLoading:false,
        isPullDownLoading:false,
        pullUpMsg:"上拉加载更多",
        pullDownMsg:"下拉刷新",
        sourceList:[
          {
            id:"001",
            pic:require('../assets/images/mien2.png'),
            title:"菁蓉荟办公大厦4A-2",
            source_type:"办公室",
            open_time:"09:00-18:00",
            addr:"成都市高新区菁蓉大厦"
          },
          {
            id:"002",
            pic:require('../assets/images/mien2.png'),
            title:"菁蓉荟办公大厦4A-2",
            source_type:"办公室",
            open_time:"09:00-18:00",
            addr:"成都市高新区菁蓉大厦"
          },
          {
            id:"003",
            pic:require('../assets/images/mien2.png'),
            title:"菁蓉荟办公大厦4A-2",
            source_type:"办公室",
            open_time:"09:00-18:00",
            addr:"成都市高新区菁蓉大厦"
          },
          {
            id:"004",
            pic:require('../assets/images/mien2.png'),
            title:"菁蓉荟办公大厦4A-2",
            source_type:"办公室",
            open_time:"09:00-18:00",
            addr:"成都市高新区菁蓉大厦"
          },
          {
            id:"005",
            pic:require('../assets/images/mien2.png'),
            title:"菁蓉荟办公大厦4A-2",
            source_type:"办公室",
            open_time:"09:00-18:00",
            addr:"成都市高新区菁蓉大厦"
          }
        ]
    };
  },

  components: {
    HeadBar,
    Scroller,
    CitySelector
  },
  mounted(){},

  methods: {
    getVal(e) {
      console.log(e.target.value,e.target.getAttribute('codeStr'))
      this.$refs.trige.style="transform:rotate(0deg)";
        this.isShow = false;
    },
    chooseArea(){
      this.isShow=true;
      this.$refs.trige.style="transform:rotate(180deg)";
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
    goAppoint(){
      this.$router.push('/appoint')
    },
    seekInfo(id){
      this.$router.push( `/sourceInfo/${id}`);
    }
  }
}

</script>
<style lang='scss' scoped>
.sourceList-container{
    height: 100%;
    .right-btn{
        position: absolute;
        right: .5rem;
        top:0;
        color: #fff;
        line-height: 2rem;
    }
    .sele-bar{
      line-height: 2.5rem;
      padding: 0 .5rem;
      box-sizing: border-box;
      font-size: .75rem;
      border-bottom: 1px solid #f0f0f0;
      .trige{
        display: inline-block;
        width: .5rem;
        margin-left: .2rem;
        transition: .3s;
      }
    }
    .sourceList-contents{
        height: calc(100% - 4.5rem);
        .sourceListWraper{
          height: 100%;
          position: relative;
          .source-list{
            li{
              padding: .5rem;
              box-sizing: border-box;
              .source-wraps{
                display: flex;
                .source-pic{
                  width: 5rem;
                  height: 5rem;
                  overflow: hidden;
                  border-radius: 3px;
                  img{
                    height: 100%;
                  }
                }
                .source-info{
                  height: 5rem;
                  position: relative;
                  flex: 1;
                  margin-left: .5rem;
                  h2{
                    font-size: .75rem;
                    font-weight: normal;
                  }
                  .source-bottom{
                    position: absolute;
                    width: 100%;
                    left: 0;
                    bottom: 0;
                    p{
                      line-height: 1rem;
                      color: #808080;
                    }
                  }
                }
              }
              .li-bar{
                height: .3rem;
                background: #f0f0f0;
                margin-top: .5rem;
              }
            }
          }
        }
    }
}
</style>