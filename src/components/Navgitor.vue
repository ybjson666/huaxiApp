<template>
  <div class='navgitior-container'>
      <ul class="navgitor-list">
          <li v-for="(item,index) in dataSource" :key="index">
              <div class="navgitor-wraps" @click="skipTo(item.path,item.needVolun)">
                  <span class="nav-icons"><img :src="item.icon" alt=""></span>
                  <p class="nav-name">{{item.name}}</p>
              </div>
          </li>
      </ul>
  </div>
</template>

<script>
import { mapActions,mapState } from 'vuex'
import { toggleModal } from '../utils/tools'
export default {
name:'navgatior',
  props:{
      dataSource:{
          type:Array
      }
  },
  computed:{
    ...mapState({
         userInfo:state=>state.user.userInfo
      }),
  },
  created(){
     this.req_getUser(data=>{
        if(data.state!==200&&data.state!==700004){
              toggleModal(data.message);
        }else if(data.state===700004){
            toggleModal(data.message);
            setTimeout(()=>{
                this.$router.push('/login');
            },1000);
        }
    })
  },
  methods: {
    ...mapActions({
       req_getUser:'user/req_getUser'
    }),
    skipTo(path,needVolun){
      const { isvolunteer} =this.userInfo;
      if(needVolun){
        if(isvolunteer==1){
          this.$router.push(path)
        }else{
          toggleModal('志愿者方可进行此操作~');
        }
      }else{
        this.$router.push(path);
      }
          
    }
  }
}

</script>
<style lang='scss' scoped>
.navgitior-container{
    height: 100%;
    background: #fff;
    .navgitor-list{
        display: flex;
        padding-top: .8rem;
        box-sizing: border-box;
        li{
            flex: 1;
            text-align: center;
            box-sizing: border-box;
            .nav-icons{
                display: block;
                width: 2.5rem;
                height: 2.5rem;
                margin: 0 auto;
                margin-bottom: .8rem;
                line-height: 2.5rem;
            }
            &:last-child{
                border-left:1px solid #f0f0f0; 
            }
        }
    }
}
</style>