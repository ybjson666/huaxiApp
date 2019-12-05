<template>
  <div class='center-container'>
      <head-bar title="个人中心" :showBack="isShowBack">
          <span class="sign-icon" @click="goSign" slot="right-btn"><img src="../assets/images/record.png" alt=""></span>
      </head-bar>
      <div class="contents">
        <div class="user-info-block block">
            <div class="user-pic-item">
                <img :src="userInfo.userPic" alt="">
            </div>
            <div class="info-item">
                <p>{{userInfo.userNick}}</p>
                <span v-if="userInfo.isvolunteer==0" class="common">普通用户</span>
                <span class="vip" v-else>志愿者</span>
            </div>
            <div class="voluntee-item" @click="goVoluntee">
                <span class="book"><img src="../assets/images/application.png" alt=""></span>
                <p>申请成为志愿者</p>
            </div>
        </div>
        <div class="section-one block">
            <ul class="item-list">
                <li>
                    <router-link to="/active">
                        <span class="item-icon"><img src="../assets/images/activities.png" alt=""></span>
                        <p class="item-name">我的活动</p>
                    </router-link>
                </li>
                <li>
                    <router-link to="/wish">
                        <span class="item-icon"><img src="../assets/images/aspiration.png" alt=""></span>
                        <p class="item-name">我的心愿</p>
                    </router-link>
                </li>
                <li>
                    <router-link to="/appoint">
                        <span class="item-icon"><img src="../assets/images/appointment.png" alt=""></span>
                        <p class="item-name">我的预约</p>
                    </router-link>
                </li>
            </ul>
        </div>
        <div class="section-two block">
            <ul class="skip-list">
                <li>
                    <router-link to="/message">
                        <span class="skip-icon fl"><img src="../assets/images/message.png" alt=""></span>
                        <span class="skip-name fl">消息中心</span>
                        <span  class="right-icon fr"><img src="../assets/images/into.png" alt=""></span>
                        <div class="cl"></div>
                    </router-link>
                </li>
                <li>
                    <router-link to="/person" >
                        <span class="skip-icon fl"><img src="../assets/images/information.png" alt=""></span>
                        <span class="skip-name fl">个人信息</span>
                        <span class="right-icon fr"><img src="../assets/images/into.png" alt=""></span>
                        <div class="cl"></div>
                    </router-link>
                </li>
                <li>
                    <router-link to="/volunTeam">
                        <span class="skip-icon fl"><img src="../assets/images/team.png" alt=""></span>
                        <span class="skip-name fl">我的志愿团队</span>
                        <span  class="right-icon fr"><img src="../assets/images/into.png" alt=""></span>
                        <div class="cl"></div>
                    </router-link>
                </li>
                <li @click="goShop">
                    <span class="skip-icon fl"><img src="../assets/images/shopping.png" alt=""></span>
                    <span class="skip-name fl">积分商城</span>
                    <span class="right-icon fr" ><img src="../assets/images/into.png" alt=""></span>
                    <!-- <router-link to="/shop" class="right-icon fr"><img src="../assets/images/into.png" alt=""></router-link> -->
                    <div class="cl"></div>
                </li>
            </ul>
        </div>
        <div class="section-two block section-three">
          <ul class="skip-list">
              <li>
                  <router-link to="/password">
                    <span class="skip-icon pwd-icon fl"><img src="../assets/images/revise.png" alt=""></span>
                    <span class="skip-name fl">更改密码</span>
                    <span class="right-icon fr"><img src="../assets/images/into.png" alt=""></span>
                    <div class="cl"></div>
                  </router-link>
              </li>
              <li @click="loginOut">
                  <span class="skip-icon fl"><img src="../assets/images/retreat.png" alt=""></span>
                  <span class="skip-name fl">退出登录</span>
                  <span class="right-icon fr" ><img src="../assets/images/into.png" alt=""></span>
                  <div class="cl"></div>
              </li>
          </ul>
       </div>
       <Loading v-show="isLoading"><span slot="contents" class="load-txt">数据加载中...</span></Loading>
    </div>
  </div>
</template>

<script>
import { mapState,mapActions } from 'vuex';
import { getShops} from '../utils/api.js'
import { toggleModal } from '../utils/tools'
import Loading from '@/components/Loading'
import HeadBar from '@/components/HeadBar'
export default {
name:'center',
  data () {
    return {
        uid:"",
        token:"",
        shopUrl:"",
        isShowBack:false,
        isLoading:true
    };
  },
  computed:{
      ...mapState('user',['userInfo'])
  },
  components:{
    HeadBar,
    Loading
  },
  methods: {
      ...mapActions('user',['req_getUser']),
      goVoluntee(){
          this.$router.push('/aplyVolunte')
      },
      goSign(){
          this.$router.push('/sign')
      },
      loginOut(){
          localStorage.removeItem('appToken');
          this.$router.replace('/login');
      },
      goShop(){
          window.location.href=this.shopUrl;
      }
  },
  created() {
    this.token=localStorage.getItem('appToken');
    this.uid=localStorage.getItem('uid');
    getShops().then(data=>{
        if(data.state===200){
            let result=data.data;
            result.map(item=>{
                if(item.SysKey==='SHOP_URL'){
                    this.shopUrl=item.SysValue+`&uid=${this.uid}&token=${this.token}`;
                }
            })
        }else{
            toggleModal(data.message)
        }
    })
    this.req_getUser(data=>{
        this.isLoading=false;
        if(data.state!==200&&data.state!==700004){
              toggleModal(data.message);
            }else if(data.state===700004){
            toggleModal(data.message);
            setTimeout(()=>{
            this.$router.push('/login');
            },1000);
        }
    })
  }
}

</script>
<style lang='scss' scoped>
    .center-container{
        height: 100%;
        .sign-icon{
            display: block;
            position: absolute;
            width: 1rem;
            right: .75rem;
            top:.7rem;
        }
        .contents{
            height:calc(100% - 2.5rem);
            overflow-y: scroll;
            box-sizing: border-box;
            -webkit-overflow-scrolling: touch;
            .user-info-block{
                display: flex;
                padding: 1rem .5rem;
                box-sizing: border-box;
                .user-pic-item{
                    width: 3.9rem;
                    height: 3.9rem;
                    border-radius: 50%;
                    overflow: hidden;
                    margin-right: .85rem;
                    box-sizing: border-box;
                    margin-left: .25rem;
                }
                .info-item{
                    padding-top: .3rem;
                    box-sizing: border-box;
                    flex: 2;
                    p{
                        font-size: .9rem;
                        color: rgb(26,26,26);
                        margin-bottom: .75rem;
                    }
                    span{
                        display: block;
                        width: 5rem;
                        height: 2.2rem;
                        color: #fff;
                        text-align: center;
                        line-height: 1.8rem;
                        border-radius: .8rem;
                        font-size: .7rem;
                        margin-left: -.3rem;
                    }
                    .vip{
                        background: url('../assets/images/user_bg_red.png') no-repeat;
                        background-size: 100% 100%; 
                    }
                    .common{
                        background: url('../assets/images/user_bg_blue.png') no-repeat;
                        background-size: 100% 100%; 
                    }
                }
                .voluntee-item{
                    text-align: center;
                    padding-top: .3rem;
                    box-sizing: border-box;
                    .book{
                        display:inline-block;
                        width: 1.2rem;
                        margin-bottom: .45rem;
                    }
                    p{
                        color: rgb(26,26,26);
                        font-size: .7rem;
                    }
                }
            }
            .section-one{
                padding: 1.25rem;
                box-sizing: border-box;
                margin-top: .2rem;
                .item-list{
                    display: flex;
                    justify-items: center;
                    align-items: center;
                    li{
                        flex: 1;
                        a{
                            display: block;
                            text-align: center;
                            color: rgb(26,26,26);
                            font-size: .7rem;
                            .item-icon{
                                display:inline-block;
                                width: 3rem;
                                margin: 0 auto;
                                margin-bottom: .75rem;
                            }
                            .item-name{
                                color: rgb(26,26,26);
                            }
                        }

                    }
                }
            }
            .section-two{
                margin-top: .25rem;
                box-sizing: border-box;
                .skip-list{
                    li{
                        a{
                            display: block;
                            color: rgb(26,26,26);
                            font-size: .7rem;
                        }
                        height: 3rem;
                        line-height: 3rem;
                        border-bottom: 1px solid #f5f5f5;
                        box-sizing: border-box;
                        padding: 0 .75rem;
                        box-sizing: border-box;
                        font-size: .7rem;
                        .skip-icon{
                            display:inline-block;
                            width: 1.2rem;
                            margin-right: .75rem;
                            img{
                                vertical-align: middle;
                            }
                        }
                        .skip-name{
                            display: block;
                            height: 3rem;
                            line-height: 3.1rem;
                        }
                        .right-icon{
                            display: inline-block;
                            width: .5rem;
                        }
                        .pwd-icon{
                            width: 1.1rem;
                        }
                    }
                }
            }
            .section-three{
                padding-bottom: 0;
            }
        }
    }
</style>
