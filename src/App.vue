<template>
  <div id="app" v-cloak>
    <transition name="fade" mode="out-in">
        <router-view/>
    </transition>
  </div>
</template>
<script>
import '@/assets/css/reset.css'
export default {
  name: 'App',
}
</script>


