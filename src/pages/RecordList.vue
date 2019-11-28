<template>
  <div class='record-container'>
      <HeadBar title="兑换记录"/>
      <div class="record-contents" ref="wrapers">
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
            <ul class="record-list" ref="list">
                <li v-for="(item,index) in convertList" :key="index">
                    <p class="score-name">
                        <span v-if="item.goodsName">{{item.goodsName}}</span>
                        <span v-else>兑换积分商品</span>
                        </p>
                    <div class="score-wraps">
                        <span class="score-date">{{moment(item.createTime).format('YYYY-MM-DD HH:mm:ss')}}</span>
                        <span class="score-num gray" >-{{item.price}}分</span>
                    </div>
                </li>
            </ul>
          </Scroller>
          <Loading v-show="isLoading"/>
          <p class="none-data" v-if="!convertList.length">暂无数据</p>
      </div>
  </div>
</template>

<script>
import HeadBar from '@/components/HeadBar'
import Scroller from '@/components/Scroller'
import Loading from '@/components/Loading'
import { mapActions,mapState } from 'vuex'
import { pageSize, toggleModal } from '../utils/tools'
import moment from 'moment';
export default {
name:'record',
  data () {
    return {
        isFresh:false,
        isShowUp:true,
        hasData:false,
        isPullUpLoading:false,
        isPullDownLoading:false,
        pullUpMsg:"上拉加载更多",
        pullDownMsg:"下拉刷新",
        pageno:1,
        isLoading:false,
    };
  },

  components: {
      HeadBar,
      Scroller,
      Loading
  },
  created(){
      this.isLoading=true;
      this.req_convert([{pageno:this.pageno,pageSize},true,(data)=>{
        if(data.state===200){
            if(data.data &&data.data.length){
                this.pageno++;
            }
            this.$nextTick(()=>{
                setTimeout(()=>{
                    this.hasData=this.convertList.length>=pageSize?true:false;
                    this.isLoading=false; 
                },1000);
            })
        }else{
            this.isLoading=false;
            toggleModal(data.message)
        }
      }])
  },
  computed:{
      ...mapState('shop',['convertList'])
  },
  methods: {
      ...mapActions('shop',['req_convert']),
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
        this.req_convert([{pageno:this.pageno,pageSize},true,(data)=>{
            this.isFresh=true;
            if(data.state===200 && data.data.length){
                this.pageno++;
                this.$nextTick(()=>{
                    setTimeout(()=>{
                        this.hasData=this.convertList.length>=pageSize?true:false; 
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
      this.req_convert([{pageno:this.pageno,pageSize},false,(data)=>{
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
  }
}

</script>
<style lang='scss' scoped>
.record-container{
    height: 100%;
    .record-contents{
        height: calc(100% - 2rem);
        position: relative;
        .record-list{
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
</style>