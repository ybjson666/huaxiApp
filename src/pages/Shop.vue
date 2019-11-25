<template>
  <div class='shop-container'>
    <head-bar title="积分商城">
      <span slot="right-btn" class="change-btn" @click="goChange">兑换记录</span>
    </head-bar>
    <div class="swiper-container">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(item,index) in banners" :key="index"><img :src="item" alt=""></div>
        </div>
        <div class="swiper-pagination"></div>
    </div>
    <div class="main-contents">
      <div class="score-block">
          <div class="score-left">
            <p class="score-wraps"><span class="scores">{{curScore}}</span>积分</p>
            <p class="remind-wraps">当前余额</p>
          </div>
          <div class="score-right">
            <div class="detail-wraps" @click="seekScore">
              <span class="seek-icon"><img src="../assets/images/details.png" alt=""></span>
              <span class="seek-btn">查看明细</span>
            </div>
          </div>
      </div>
      <div class="shop-block">
          <Scroller 
              @scrolling="scrolling" 
              @touchEnded="touchEnded" 
              :pullUpMsg="pullUpMsg"
              :isPullUpLoading="isPullUpLoading"
          >
          <ul class="shop-list">
              <li v-for="(item,index) in shopList" :key="index" @click="goInfo(item.id)">
                <div class="shop-pic"><img :src="item.img" alt=""></div>
                <div class="shop-info">
                  <p class="shop-name">{{item.title}}</p>
                  <div class="shop-details">
                    <div class="detail-left fl">
                      <span class="coin"><img src="../assets/images/star.png" alt=""></span>
                      <span class="cost">{{item.price}}积分</span>
                    </div>
                    <div class="detail-right fr">剩余:{{item.remine}}</div>
                    <div class="cl"></div>
                  </div>
                </div>
              </li>
          </ul>
          </Scroller>
      </div>
    </div>
  </div>
</template>

<script>
import HeadBar from '@/components/HeadBar'
import Scroller from '@/components/Scroller'
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css';
export default {
name:'shop',
  data () {
    return {
      banners:[require('../assets/images/1.png'),require('../assets/images/2.png'),
      require('../assets/images/3.png'),require('../assets/images/4.png')],
      curScore:"4578.00",
      pullUpMsg:"上拉加载更多",
      isPullUpLoading:false,
      page:1,
      shopList:[
        {
          id:"001",
          img:require('../assets/images/picture2.png'),
          title:"猫眼石项链饰品",
          price:"12",
          remine:"12"
        },
        {
          id:"002",
          img:require('../assets/images/picture3.png'),
          title:"矩形框精致耳饰(金色耳环饰品)",
          price:"23",
          remine:"10"
        },
        {
          id:"003",
          img:require('../assets/images/picture4.png'),
          title:"家具装饰花瓶",
          price:"156",
          remine:"25"
        },
        {
          id:"004",
          img:require('../assets/images/picture5.png'),
          title:"墙面相框组合",
          price:"120",
          remine:"5"
        },
        {
          id:"005",
          img:require('../assets/images/picture3.png'),
          title:"床上四件套",
          price:"240",
          remine:"36"
        },
        {
          id:"006",
          img:require('../assets/images/picture2.png'),
          title:"水杯",
          price:"8",
          remine:"60"
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
    this.$nextTick(()=>{
        this._initSwiper()
    })
  },

  methods: {
    goChange(){
      this.$router.push('/record')
    },
    seekScore(){
      this.$router.push('/scoreInfo')
    },
    goInfo(id){
      this.$router.push(`/shop/${id}`)
    },
    touchEnded(pos,scroll){
      if(pos.y>60){
          // this.refreshData();
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
      },1000)
    },
    loadMore(){
      this.isPullUpLoading=true;
      this.page++;
    },
    _initSwiper(){
      var swiper=new Swiper('.swiper-container',{
          direction : 'horizontal',
          autoplay:{
            delay: 3000,
            stopOnLastSlide: true,
            disableOnInteraction: true,
          },
          loop:true,
          pagination:{
            el:'.swiper-pagination'
          }
        })
    }
  }
}

</script>
<style lang='scss' scoped>
.shop-container{
  height: 100%;
    .change-btn{
      position: absolute;
      right: .5rem;
      top:0;
      color: #fff;
      line-height: 2rem;
    }
    .swiper-container{
      height: 8.75rem;
      background: #ccc;
      .swiper-wrapper{
        height: 100%;
        .swiper-slide{
          height: 100%;
          overflow: hidden;
        }
      }
    }
    .main-contents{
      padding:.5rem .3rem;
      padding-bottom: 0;
      background: #f0f0f0;
      box-sizing: border-box;
      height: calc(100% - 10.25rem);
      overflow: hidden;
      .score-block{
        height: 5rem;
        background: url('../assets/images/bg.png') no-repeat;
        background-size:100% 100%;
        display: flex;
        .score-left{
          flex: 2;
          padding: 1rem;
          box-sizing: border-box;
          color: #fff;
          .score-wraps{
            font-size: .9rem;
            margin-bottom: .5rem;
            .scores{
              margin-right: .3rem;
            }
          }
        }
        .score-right{
          flex: 1;
          position: relative;
          .detail-wraps{
            position: absolute;
            width: 6rem;
            height: 2rem;
            line-height: 2rem;
            background: rgba(255,255,255,.2);
            top:50%;
            margin-top: -1rem;
            right: .45rem;
            border-radius: .8rem 0 0 .8rem;
            color: #fff;
            padding-left: 1rem;
            box-sizing: border-box;
            .seek-icon{
              display: inline-block;
              width: .8rem;
              vertical-align: middle;
              margin-right: .2rem;
            }
          }
        }
      }
      .shop-block{
        margin-top: .5rem;
        height: 5rem;
        padding: 0 .3rem;
        box-sizing: border-box;
        position: relative;
        height: calc(100% - 6rem);
        .shop-list{
          display: flex;
          flex-wrap: wrap;
          padding-left: .55rem;
          box-sizing: border-box;
          li{
            width: 8.2rem;
            margin-right: .6rem;
            margin-bottom: .6rem;
            background: #fff;
            .shop-pic{
              height: 7.25rem;
              overflow: hidden;
              img{
                height: 100%;
              }
            }
            .shop-info{
              padding: .5rem;
              box-sizing: border-box;
              .shop-name{
                line-height: 1rem;
                margin-bottom: .5rem;
                height: 2rem;
              }
              .coin{
                display: inline-block;
                width: .6rem;
              }
            }
          }
        }
      }
    }
  
}
</style>