<template>
  <div class='nav-container'>
      <mt-tabbar v-model="selected" :fixed='true'>
        <mt-tab-item v-for="(item,index) in navs" :key="index" :id="item.pathId" :class="{on:item.pathId===$route.path}">
              <img slot="icon" :src="item.pathId===$route.path?item.seleIcon:item.icon">
          {{item.pathName}}
        </mt-tab-item>
      </mt-tabbar>
  </div>
</template>

<script>
import { Tabbar, TabItem } from 'mint-ui';

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
      ],
      selected:""
    };
  },
  mounted(){
    // console.log(this.$route)
  },
  watch:{
    selected(val){
      this.$router.push(val)
    }
  }
  
}

</script>
<style lang='scss' scoped>
.nav-container{
   background:#fff;
}

</style>