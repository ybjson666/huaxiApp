<template>
  <div class='main-container'>
    <transition name="bounce" mote="out-in">
      <keep-alive>
        <router-view/>
      </keep-alive>
    </transition>
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
  height: calc(100% - 3rem);
  overflow: hidden;
  .nav-bars{
    position: fixed;
    width: 100%;
    left: 0;
    bottom: 0;
  }
}

</style>