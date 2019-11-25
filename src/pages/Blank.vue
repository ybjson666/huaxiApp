<template>
  <div class='blank-container' @click="showMe($event)" v-html="renderHtml()">
  </div>
</template>

<script>
export default {
name:'blank',
  data () {
    return {
    };
  },
  components: {

  },
  mounted(){
  //  console.log(this.$route.params.id)
  },

  methods: {
    renderHtml(){
        return `<h2 class="title">我是模板页面${this.$route.params.id}</h2>`
    },
    showMe(e){
      console.log(e.target.className)
      if(e.target.className==='title'){
        console.log(111)
      }
      
    }
  }
}

</script>
<style lang='scss' scoped>
</style>