<template>
  <div class='nav-container'>
      <ul class="nav-list">
        
        <li v-for="(item,index) in navs" :key="index">
          <router-link :to="item.pathId">
            <span class="nav-icon"><img :src="item.pathId===$route.path?item.seleIcon:item.icon" alt=""></span>
            <span class="nav-name">{{item.pathName}}</span>
          </router-link>
        </li>
      </ul>
  </div>
</template>

<script>
export default {
name:'navs',
  data () {
    return {
      navs:[
        {
          icon:require('../assets/images/nochoice_practice.png'),
          seleIcon:require('../assets/images/choice_practice.png'),
          pathName:"实践中心",
          pathId:"/main/shijian123"
        },
        {
          icon:require('../assets/images/nochoice_volunteer.png'),
          seleIcon:require('../assets/images/choice_volunteer.png'),
          pathId:"/main/hunger",
          pathName:"志愿活动"
        },
        {
          icon:require('../assets/images/nochoice_aspiration.png'),
          seleIcon:require('../assets/images/choice_aspiration.png'),
          pathId:"/main/desire",
          pathName:"心愿活动"
        },
        {
          icon:require('../assets/images/nochoice_me.png'),
          seleIcon:require('../assets/images/choice_me.png'),
          pathId:"/main/center",
          pathName:"个人中心"
        }
      ]
    };
  },
  mounted(){
    // console.log(this.$route)
  }
  
}

</script>
<style lang='scss' scoped>
.nav-container{
   background:#fff;
  .nav-list{
    display: flex;
    height: 2.8rem;
    padding-top: .3rem;
    box-sizing: border-box;
    border-top:1px solid #f0f0f0;
    li{
      flex: 1;
      text-align: center;
      a{
        display: block;
        text-align: center;
        color: #b3b3b3;
        font-size:.75rem;
          .nav-icon{
          display: block;
          width: .8rem;
          height: .8rem;
          margin: 0 auto;
          margin-bottom: .3rem;
        }
      }
      
      
      .router-link-active{
        color: #ff0000;
      }
    }
  }
}

</style>