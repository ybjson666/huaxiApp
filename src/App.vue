<template>
  <div id="app" v-cloak>
    <!-- <transition 
      enter-active-class="animated fadeInRight"
      leave-active-class="animated fadeInRight"
      :duration="300">
        <router-view/>
    </transition> -->
    <transition>
      <keep-alive>
          <router-view v-if="this.$route.meta.keepAlive"/>
      </keep-alive>
    </transition>
    <router-view v-if="!this.$route.meta.keepAlive"></router-view>
  </div>
</template>
<script>
import '@/assets/css/reset.css'
export default {
  name: 'App'
}
</script>


