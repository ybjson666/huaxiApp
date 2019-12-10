<template>
  <div class='main-container'>
    <transition>
      <keep-alive>
          <router-view v-if="this.$route.meta.keepAlive"/>
      </keep-alive>
    </transition>
    <router-view v-if="!this.$route.meta.keepAlive"></router-view>
      <div class="nav-bars">
        <Nav-bar></Nav-bar>
      </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
export default {
name:'mains',
  data () {
    return {
    };
  },

  components: {
    NavBar
  },
  mounted(){},
  created(){
    // console.log(this.$route)
  }
}

</script>
<style lang='scss' scoped>
.main-container{
  background: #f5f5f5;
  height: calc(100% - 2.8rem);
  overflow: hidden;
  .nav-bars{
    position: fixed;
    width: 100%;
    left: 0;
    bottom: 0;
  }
}

</style>