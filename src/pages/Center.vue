<template>
  <div class='center-container'>
      <div class="header-bars">
          <h2>个人中心</h2>
          <span class="sign-icon" @click="goSign"><img src="../assets/images/record.png" alt=""></span>
      </div>
      <div class="contents">
        <div class="user-info-block block">
            <div class="user-pic-item">
                <img :src="userInfo.userPic" alt="">
            </div>
            <div class="info-item">
                <p>{{userInfo.userNick}}</p>
                <span>普通用户</span>
            </div>
            <div class="voluntee-item">
                <span class="book"><img src="../assets/images/application.png" alt=""></span>
                <p @click="goVoluntee">申请成为志愿者</p>
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
                    <span class="skip-icon fl"><img src="../assets/images/message.png" alt=""></span>
                    <span class="skip-name fl">消息中心</span>
                    <router-link to="/message" class="right-icon fr"><img src="../assets/images/into.png" alt=""></router-link>
                    <div class="cl"></div>
                </li>
                <li>
                    <span class="skip-icon fl"><img src="../assets/images/information.png" alt=""></span>
                    <span class="skip-name fl">个人信息</span>
                    <router-link to="/person" class="right-icon fr"><img src="../assets/images/into.png" alt=""></router-link>
                    <div class="cl"></div>
                </li>
                <li>
                    <span class="skip-icon fl"><img src="../assets/images/team.png" alt=""></span>
                    <span class="skip-name fl">我的志愿团队</span>
                    <router-link to="/volunTeam" class="right-icon fr"><img src="../assets/images/into.png" alt=""></router-link>
                    <div class="cl"></div>
                </li>
                <li>
                    <span class="skip-icon fl"><img src="../assets/images/shopping.png" alt=""></span>
                    <span class="skip-name fl">积分商城</span>
                    <router-link to="/shop" class="right-icon fr"><img src="../assets/images/into.png" alt=""></router-link>
                    <div class="cl"></div>
                </li>
            </ul>
        </div>
        <div class="section-two block">
          <ul class="skip-list">
              <li>
                  <span class="skip-icon pwd-icon fl"><img src="../assets/images/revise.png" alt=""></span>
                  <span class="skip-name fl">更改密码</span>
                  <router-link to="/password" class="right-icon fr"><img src="../assets/images/into.png" alt=""></router-link>
                  <div class="cl"></div>
              </li>
              <li>
                  <span class="skip-icon fl"><img src="../assets/images/retreat.png" alt=""></span>
                  <span class="skip-name fl">退出登录</span>
                  <router-link to="" class="right-icon fr"><img src="../assets/images/into.png" alt=""></router-link>
                  <div class="cl"></div>
              </li>
          </ul>
       </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
name:'center',
  data () {
    return {
    };
  },
  computed:{
      ...mapState('user',['userInfo'])
  },
  mounted(){
      
  },
  methods: {
      goVoluntee(){
          this.$router.push('/aplyVolunte')
      },
      goSign(){
          this.$router.push('/sign')
      }
  }
}

</script>
<style lang='scss' scoped>
    .center-container{
        height: 100%;
        .header-bars{
            height: 2rem;
            background: #ff0000;
            position: fixed;
            width: 100%;
            h2{
                text-align: center;
                color: #fff;
                line-height: 2rem;
                font-size: .8rem;
            }
            .sign-icon{
                display: block;
                position: absolute;
                width: 1rem;
                right: .5rem;
                top:.4rem;
            }
        }
        .contents{
            height:100%;
            padding-top: 2rem;
            overflow-y: scroll;
            padding-bottom: 1rem;
            box-sizing: border-box;
            .user-info-block{
                display: flex;
                padding: 1rem .5rem;
                box-sizing: border-box;
                .user-pic-item{
                    width: 3.9rem;
                    height: 3.9rem;
                    border-radius: 50%;
                    overflow: hidden;
                    margin-right: .8rem;
                    // border: 1px solid #e0e0e0;
                    box-sizing: border-box;
                }
                .info-item{
                    padding-top: .3rem;
                    box-sizing: border-box;
                    flex: 2;
                    p{
                        font-size: .9rem;
                        color: #000;
                        margin-bottom: .5rem;
                    }
                    span{
                        display: block;
                        width: 4rem;
                        height: 1.5rem;
                        color: #fff;
                        background: #21b8f7;
                        text-align: center;
                        line-height: 1.5rem;
                        border-radius: .8rem;
                    }
                }
                .voluntee-item{
                    text-align: center;
                    padding-top: .3rem;
                    box-sizing: border-box;
                    .book{
                        display:inline-block;
                        width: 1.2rem;
                        margin-bottom: .3rem;
                    }
                    p{
                        color: #000;
                        font-size: .8rem;
                    }
                }
            }
            .section-one{
                padding: 1rem 1.25rem;
                box-sizing: border-box;
                margin-top: .5rem;
                .item-list{
                    display: flex;
                    justify-items: center;
                    align-items: center;
                    li{
                        flex: 1;
                        a{
                            display: block;
                            text-align: center;
                            color: #000;
                            font-size: .7rem;
                            .item-icon{
                                display:inline-block;
                                width: 3rem;
                                margin: 0 auto;
                                margin-bottom: .2rem;
                            }
                        }
                        
                    }
                }
            }
            .section-two{
                padding: 1rem 0;
                margin-top: .5rem;
                box-sizing: border-box;
                .skip-list{
                    li{
                        height: 3rem;
                        line-height: 3rem;
                        border-bottom: 1px solid #f5f5f5;
                        box-sizing: border-box;
                        padding: 0 .5rem;
                        box-sizing: border-box;
                        .skip-icon{
                            display:inline-block;
                            width: 1.2rem;
                            margin-right: 1rem;
                        }
                        .right-icon{
                            display: inline-block;
                            width: .5rem;
                        }
                    }
                }
            }
        } 
    }
</style>