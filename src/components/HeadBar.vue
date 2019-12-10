<template>
  <div class='head-bar-container'>
      <h2>{{title}}</h2>
      <span @click="goBack" class="back-btn" v-if="showBack"><img src="../assets/images/return.png" alt=""></span>
      <slot name="right-btn" class="right-btn"></slot>
  </div>
</template>

<script>
export default {
    name:'headBar',
    props:{
        title:String,
        showBack:{
            type:Boolean,
            default:true
        }
    },
    methods: {
        goBack(){
          this.$router.go(-1);
      }
    }
}

</script>
<style lang='scss' scoped>
.head-bar-container{
    height: 2rem;
    position: relative;
    background: #ff0000;
    width: 100%;
    z-index: 50;
    h2{
        line-height: 2rem;
        text-align: center;
        color: #fff;
        font-size: .9rem;
    }
    .back-btn{
        display: block;
        position: absolute;
        width: .5rem;
        left: .5rem;
        top:.5rem;
    }
}
</style>