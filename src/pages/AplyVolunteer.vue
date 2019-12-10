<template>
  <div class='volunteer-container'>
    <div class="header-section">
      <head-bar title="志愿者申请"></head-bar>
    </div>
    <div class="volunteer-contents">
        <div class="contents-wraps">
          <div class="rows">
            <span class="label">姓名</span>
            <input type="text" class="row-input" placeholder="请填写真实姓名" v-model="userInfo.realName" readonly/>
          </div>
          <div class="rows">
            <span class="label">身份证号码</span>
            <input type="text" class="row-input" placeholder="请填写身份证号码" v-model="userInfo.idcardno" readonly/>
          </div>
          <div class="upload-row">
            <p class="upload-tags">身份证照片</p>
            <div class="upload-wraps">
              <div class="upload-item face-item">
                <img :src="userInfo.idcardfronturl" alt="" v-if="userInfo.idcardfronturl" />
                <img src="../assets/images/card1.png" alt="" v-else />
              </div>
              <div class="upload-item ">
                <img :src="userInfo.idcardbackurl" alt="" v-if="userInfo.idcardbackurl" />
                <img src="../assets/images/card2.png" alt="" v-else />
              </div>
            </div>
          </div>
          <div class="arrow-row">
            <span class="label">政治面貌</span>
            <input type="text" class="row-input" placeholder="请选择政治面貌" v-model="politName" readonly />
            <span class="arrow"><img src="../assets/images/into.png" alt=""/></span>
          </div>
          <div class="arrow-row">
            <span class="label">学历</span>
            <input type="text" class="row-input" placeholder="请选择学历" v-model="educaName" readonly/>
            <span class="arrow"><img src="../assets/images/into.png" alt=""/></span>
          </div>
          <div class="arrow-row" >
            <span class="label">服务类型</span>
            <input type="text" class="row-input" placeholder="请选择服务类型" v-model="serviceName" readonly/>
            <span class="arrow"><img src="../assets/images/into.png" alt=""/></span>
          </div>
          <div class="arrow-row">
            <span class="label">服务区域</span>
            <input type="text" class="row-input" placeholder="请选择服务区域" v-model="servAreaName" readonly/>
            <span class="arrow"><img src="../assets/images/into.png" alt=""/></span>
          </div>
          <div class="rows">
            <span class="label">家庭住址</span>
            <input type="text" class="row-input" placeholder="请填写家庭住址" v-model="userInfo.address" readonly/>
          </div>
          <div class="rows">
            <span class="label">电子邮箱</span>
            <input type="text" class="row-input" placeholder="请填写邮箱" v-model="userInfo.email" readonly/>
          </div>
          <div class="rows">
            <span class="label">联系电话</span>
            <input type="text" class="row-input" placeholder="请填写联系电话" v-model="userInfo.userMobile" readonly/>
          </div>
          <p class="info" v-show="!isOver">*信息不完善，请先到个人信息去完善</p>
          <button class="sub-btn btn" @click="apply" :disabled="isUse" :class="{btnGray:isUse}">提交申请</button>
        </div>
        <Loading v-show="isLoading"><span slot="contents" class="load-txt">数据加载中...</span></Loading>
    </div>
  </div>
</template>

<script>
import HeadBar from '@/components/HeadBar'
import Loading from '@/components/Loading'
import { applyVolun} from '../utils/api'
import { toggleModal,BASE_URL, loadMoreData } from '../utils/tools'
import { mapState,mapActions,mapGetters } from 'vuex';
export default {
name:'AplyVolunteer',
  data () {
    return {
      isUse:false,
      isLoading:true,
      isOver:true
    };
  },

  components: {
    HeadBar,
    Loading
  },
  created(){
    this.req_getServices((data)=>{
        if(data.state!==200&&data.state!==700004){
          toggleModal(data.message);
        }else if(data.state===700004){
          toggleModal(data.message);
          setTimeout(()=>{
              this.$router.push('/login');
          },1000);
        }
    })
    this.req_backgrounds((data)=>{
        if(data.state!==200&&data.state!==700004){
              toggleModal(data.message);
        }else if(data.state===700004){
          toggleModal(data.message);
          setTimeout(()=>{
              this.$router.push('/login');
          },1000);
        }
    })
    this.req_servAreas((data)=>{
        if(data.state!==200&&data.state!==700004){
              toggleModal(data.message);
        }else if(data.state===700004){
          toggleModal(data.message);
          setTimeout(()=>{
              this.$router.push('/login');
          },1000);
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
  },
  computed:{
    ...mapState('user',['userInfo','serviceTypes','servAreas']),
    ...mapGetters('user',['educations','politicls']),
    politName(){
        let name="";
        this.politicls.map((item)=>{
            if(this.userInfo.politicallevel==item.DictID){
                name=item.DictName;
            }
        })
        return name;
        //return  this.politicls.filter((item)=>this.userInfo.politicallevel==item.DictID).length?(this.politicls.filter((item)=>this.userInfo.politicallevel===item.DictID))[0].DictName:""
    },
    educaName(){
        let name="";
        this.educations.map((item)=>{
            if(this.userInfo.education==item.DictID){
                name=item.DictName;
            }
        })
        return name;
        // return  this.educations.filter((item)=>this.userInfo.education==item.DictID).length?this.educations.filter((item)=>this.userInfo.education===item.DictID)[0].DictName:""
    },
    serviceName(){
        let name="";
        this.serviceTypes.map((item)=>{
            if(this.userInfo.servicetype==item.dictionaryId){
                name=item.dictionaryValue;
            }
        })
        return name;
    },
    servAreaName(){
        let name="";
        this.servAreas.map((item)=>{
            if(this.userInfo.servicearea==item.dictionaryId){
                name=item.dictionaryValue;
            }
        })
        return name;
    }
  },
  methods: {
    ...mapActions('user',['req_restUserPic','req_getServices','req_backgrounds','req_servAreas','req_getUser']),
    apply(){
      const { realName,idcardno,idcardfronturl,idcardbackurl,politicallevel,education,servicetype,servicearea,address,email,userMobile,customerid}=this.userInfo;
      
      if(!realName||realName=='undefined'){
        toggleModal('请填写姓名');
        return;
      }else if(!idcardno||idcardno=='undefined'){
        toggleModal('请填写身份证号码');
        return;
      }else if(!idcardfronturl||idcardfronturl=='undefined'){
        toggleModal('请上传身份证正面照片');
        return;
      }else if(!idcardbackurl||idcardbackurl=='undefined'){
        toggleModal('请上传身份证背面照片');
        return;
      }else if(!politicallevel||politicallevel=='undefined'){
        toggleModal('请选择政治面貌');
        return;
      }else if(!education||education=='undefined'){
        toggleModal('请选择学历');
        return;
      }else if(!servicetype||servicetype=='undefined'){
        toggleModal('请选择服务类型');
        return;
      }else if(!servicearea||servicearea=='undefined'){
        toggleModal('请选择服务区域');
        return;
      }else if(!address||address=='undefined'){
        toggleModal('请填写家庭住址');
        return;
      }else if(!email||email=='undefined'){
        toggleModal('请填写邮箱');
        return;
      }else if(!userMobile||userMobile=='undefined'){
        toggleModal('请填写手机号');
        return;
      }

      this.isUse=true;
      applyVolun({customername:realName,idcardno,servicetype,servicearea,email,education,politicallevel,address,idcardfronturl,idcardbackurl,customerid}).then(data=>{
        if(data.state===200){
          toggleModal("申请成功");
          this.isUse=false;
          setTimeout(()=>{
              this.$router.go(-1);
          },1000)
        }else{
          toggleModal(data.message);
          this.isUse=false;
        }
      })
    }
  },
  watch:{
    userInfo(val){
      const { realName,idcardno,idcardfronturl,idcardbackurl,politicallevel,education,servicetype,servicearea,address,email,userMobile}=val;
      const user={ realName,idcardno,idcardfronturl,idcardbackurl,politicallevel,education,servicetype,servicearea,address,email,userMobile}
      Object.keys(user).forEach(key=>{
        if(!user[key]){
          this.isUse=true;
          this.isOver=false;
          return;
        }
      })
    }
  }
}

</script>
<style lang='scss' scoped>
.volunteer-container{
  height: 100%;
  .header-section{
    position: fixed;
    width: 100%;
    left: 0;
    top:0;
    z-index: 50;
  }
  .volunteer-contents{
    background: #fff;
    padding: 1.5rem .75rem;
    padding-bottom: 0;
    box-sizing: border-box;
    height: 100%;
    padding-top: 3rem;
    position: relative;
    .rows{
      border-bottom: 1px solid #f5f5f5;
      display: flex;
      padding: 1rem 0;
      box-sizing: border-box;
      .label{
        width: 5.45rem;
        font-size: .85rem;
      }
      .row-input{
        flex: 1;
      }
      .row-input::-webkit-input-placeholder{
        color: rgb(153,153,153);
        font-size: .75rem;
      }
    }
    .arrow-row{
      border-bottom: 1px solid #f5f5f5;
      display: flex;
      padding: 1rem 0;
      box-sizing: border-box;
      position: relative;
      .label{
        width: 5.45rem;
        font-size: .85rem;
      }
      .row-input{
        flex: 1;
      }
      .arrow{
        position: absolute;
        display: block;
        width: .5rem;
        right: .5rem;
        top:1rem;
      }
    }
    .upload-row{
      padding: 1rem 0;
      border-bottom: 1px solid #f5f5f5;
      box-sizing: border-box;
      .upload-tags{
        line-height: 1.25rem;
      }
      .upload-wraps{
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: .8rem;
        .upload-item{
          width: 7rem;
          height: 4.8rem;
          img{
            height: 100%;
          }
        }
        .face-item{
          margin-right: 1.5rem;
        }
      }
    }
    .sub-btn{
      margin: 2rem auto;
    }
    .info{
      color: #ff0000;
      font-size: .6rem;
      margin: .5rem 0;
      font-weight: bold;
    }
  }
}
</style>