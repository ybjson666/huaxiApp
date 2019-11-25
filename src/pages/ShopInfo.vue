<template>
  <div class='shopInfo-container'>
      <div class="goods-header">
          <head-bar title="商品详情"/>
      </div>
      <div class="goods-contents">
          <div class="goods-pic"><img :src="goodsInfo.img" alt=""></div>
          <div class="goods-brief-block block">
              <h2>{{goodsInfo.goods_name}}</h2>
              <p>{{goodsInfo.price}} 积分/袋</p>
          </div>
          <div class="info-block block">
              <div class="section-one">
                  <div class="first-row">
                      <span class="label">商品详情：</span>
                      <span class="firstrow-info">{{goodsInfo.goods_desc}}</span>
                  </div>
                  <div class="row">
                      <span class="label">库存：</span>
                      <span class="row-info">{{goodsInfo.remine}}</span>
                  </div>
                  <div class="row">
                      <span class="label">限购：</span>
                      <span class="row-info">{{goodsInfo.limit}}</span>
                  </div>
                  <div class="row">
                      <span class="label">兑换时间：</span>
                      <span class="row-info">{{goodsInfo.change_time}}</span>
                  </div>
              </div>
              <div class="section-two">
                  <div class="row">
                      <span class="label">领取方式：</span>
                      <span class="row-info">{{goodsInfo.get_method}}</span>
                  </div>
                  <div class="row">
                      <span class="label">兑换地址：</span>
                      <span class="row-info">{{goodsInfo.addr}}</span>
                  </div>
                  <div class="row">
                      <span class="label">联系人：</span>
                      <span class="row-info">{{goodsInfo.contact}}</span>
                  </div>
                  <div class="row">
                      <span class="label">联系电话</span>
                      <span class="row-info">{{goodsInfo.phone}}</span>
                  </div>
              </div>
          </div>
          <button class="change-btn">确认兑换</button>
      </div>
  </div>
</template>

<script>
import HeadBar from '@/components/HeadBar'
export default {
name:'shopInfo',
  data () {
    return {
        goodsId:"",
        goodsInfo:{
            id:"001",
            img:require('../assets/images/2.png'),
            goods_name:"精良干锅（花生、核桃、开心果）",
            price:"462",
            goods_desc:"袋装干果，颗粒饱满，优选精良品种，品质有保障",
            remine:"127袋",
            limit:"一个账号限购一袋",
            change_time:"2019-05-13至2019-06-12",
            get_method:"自提",
            addr:"四川省成都市锦江区三圣乡",
            contact:"王先生",
            phone:"13550836226"
        }
    };
  },
  mounted(){
      this.goodsId=this.$route.params.goodsId;
  },
  methods: {},
  components:{
      HeadBar
  }
}

</script>
<style lang='scss' scoped>
.shopInfo-container{
    height:100%;
    background: #f0f0f0;
    position: relative;
    .goods-header{
        position: fixed;
        width: 100%;
        left: 0;
        top:0;
        z-index: 5;
    }
    .goods-contents{
        height: 100%;
        padding-top: 2rem;
        box-sizing: border-box;
        .goods-pic{
            height: 9.25rem;
            img{
                height: 100%;
            }
        }
        .goods-brief-block{
            padding: 1rem;
            width: 16rem;
            position: absolute;
            left: 50%;
            margin-left: -8rem;
            top:9.8rem;
            z-index: 5;
            box-sizing: border-box;
            border-right:1px solid #f0f0f0;
            border-left:1px solid #f0f0f0;
             h2{
                font-size: .8rem;
                margin-bottom: .3rem;
                text-align: center;
            }
            p{
                color: #ff0000;
                text-align: center;
                font-size: .8rem;
            }
        }
        .info-block{
            margin-top: 1.5rem;
            padding-bottom: 1rem;
            padding-top: 3rem;
            box-sizing: border-box;
           .first-row{
               display: flex;
               margin-bottom: .3rem;
               .label{
                   color: #999;
                   margin-right: .3rem;
                   flex: 1;
               }
               .firstrow-info{
                   color: #000;
                   width: 13.5rem;
                   line-height: 1rem;
               }
           }
           .row{
               display: flex;
               margin-bottom: .3rem;
               .label{
                   color: #999;
                   margin-right: .3rem;
                  
               }
               .row-info{
                   color: #000;
                   line-height: 1rem;
               }
           }
           .section-one{
               border-bottom: 1px solid #f0f0f0;
               padding: 0 .5rem;
               box-sizing: border-box;
           }
           .section-two{
               padding: 0 .5rem;
               padding-top: .5rem;
               box-sizing: border-box;
           }
        }
        .change-btn{
            width: 8.8rem;
            height: 2rem;
            background: #ff0000;
            text-align: center;
            color: #fff;
            line-height: 2rem;
            font-size: .8rem;
            border-radius: 1rem;
            margin: 0 auto;
            margin-top: 1.5rem;
        }
        
    }
    
    
}
</style>