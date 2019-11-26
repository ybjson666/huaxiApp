<template>
  <div class='volunteer-container'>
    <div class="header-section">
      <head-bar title="志愿者申请"></head-bar>
    </div>
    <div class="volunteer-contents">
        <div class="rows">
          <span class="label">姓名</span>
          <input type="text" class="row-input" placeholder="请填写真实姓名" v-model="userInfo.realName">
        </div>
        <div class="rows">
          <span class="label">身份证号码</span>
          <input type="text" class="row-input" placeholder="请填写身份证号码" v-model="userInfo.idcardno" oninput = "value=value.replace(/[^\d]/g,'')">
        </div>
        <div class="upload-row">
          <p class="upload-tags">身份证照片</p>
          <input type="file" 
            id="face" 
            style="display:none" 
            accept="image/png,image/jpeg,image/gif,image/jpg" 
            @change="changeImage($event,'face')"
            ref="faceInput"
          >
          <input 
            type="file" 
            id="back" 
            style="display:none" 
            accept="image/png,image/jpeg,image/gif,image/jpg" 
            @change="changeImage($event,'back')"
            ref="backInput"
          >
          <div class="upload-wraps">
            <div class="upload-item face-item" @click="emitUpload('face')"><img :src="userInfo.idcardfronturl" alt=""></div>
            <div class="upload-item " @click="emitUpload('back')"><img :src="userInfo.idcardbackurl" alt=""></div>
          </div>
        </div>
        <div class="arrow-row" @click="openFrame('polit')">
          <span class="label">政治面貌</span>
          <input type="text" class="row-input" placeholder="请选择政治面貌" v-model="politName" readonly >
          <span class="arrow"><img src="../assets/images/into.png" alt=""></span>
        </div>
        <div class="arrow-row" @click="openFrame('educa')">
          <span class="label">学历</span>
          <input type="text" class="row-input" placeholder="请选择学历" v-model="educaName" readonly>
          <span class="arrow"><img src="../assets/images/into.png" alt=""></span>
        </div>
        <div class="arrow-row" @click="openFrame('service')">
          <span class="label">服务类型</span>
          <input type="text" class="row-input" placeholder="请选择服务类型" v-model="serviceName" readonly>
          <span class="arrow"><img src="../assets/images/into.png" alt=""></span>
        </div>
        <div class="arrow-row" @click="openFrame('servArea')">
          <span class="label">服务区域</span>
          <input type="text" class="row-input" placeholder="请选择服务区域" v-model="servAreaName" readonly>
          <span class="arrow"><img src="../assets/images/into.png" alt=""></span>
        </div>
        <div class="rows">
          <span class="label">家庭住址</span>
          <input type="text" class="row-input" placeholder="请填写家庭住址" v-model="userInfo.address">
        </div>
        <div class="rows">
          <span class="label">电子邮箱</span>
          <input type="text" class="row-input" placeholder="请填写邮箱" v-model="userInfo.email">
        </div>
        <div class="rows">
          <span class="label">联系电话</span>
          <input type="text" class="row-input" placeholder="请填写联系电话" v-model="userInfo.userMobile">
        </div>
        <button class="sub-btn">提交</button>
        <Picker :show="showFrame" @closeFrame="closeFrame('educa')" :dataSource="educations" @chooseItem="chooseItem"/>
        <Picker :show="showPolit" @closeFrame="closeFrame('polit')" :dataSource="politicls" @chooseItem="choosePolit" />
        <ServicePicker :show="seekService" @closeFrame="closeFrame('service')" :dataSource="serviceTypes" @chooseItem="chooseService"/>
        <ServicePicker :show="seekServArea" @closeFrame="closeFrame('servArea')" :dataSource="servAreas" @chooseItem="chooseServArea"/>
    </div>
  </div>
</template>

<script>
import HeadBar from '@/components/HeadBar'
import ServicePicker from '@/components/ServicePicker'
import Picker from '@/components/Picker'
import { applyVolun} from '../utils/api'
import { toggleModal,BASE_URL } from '../utils/tools'
import { mapState,mapActions,mapGetters } from 'vuex';
export default {
name:'AplyVolunteer',
  data () {
    return {
      showPolit:false,
      showFrame:false,
      seekService:false,
      seekServArea:false
    };
  },

  components: {
    HeadBar,
    Picker,
    ServicePicker
  },
  created(){
    this.req_getServices((data)=>{
        if(data.state!==200){
            toggleModal(data.message);
        }
    })
    this.req_backgrounds((data)=>{
        if(data.state!==200){
            toggleModal(data.message);
        }
    })
    this.req_servAreas((data)=>{
        if(data.state!==200){
            toggleModal(data.message);
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
    ...mapActions('user',['req_restUserPic','req_getServices','req_backgrounds','req_servAreas']),
    openFrame(type){
        if(type==='educa'){
            this.showFrame=true;
        }else if(type==="polit"){
            this.showPolit=true;
        }else if(type==='service'){
            this.seekService=true;
        }else{
            this.seekServArea=true;
        }
        
        
    },
    closeFrame(type){
        if(type==='educa'){
            this.showFrame=false;
        }else if(type==='polit'){
            this.showPolit=false;
        }else if(type==='service'){
            this.seekService=false;
        }else{
            this.seekServArea=false;
        }
        
    },
    chooseItem(item){
        this.showFrame=false;
        this.userInfo.education=item.DictID;
    },
    choosePolit(item){
        this.showPolit=false;
        this.userInfo.politicallevel=item.DictID;
    },
    chooseService(item){
        this.seekService=false;
        this.userInfo.servicetype=item.dictionaryId;
    },
    chooseServArea(item){
        this.seekServArea=false;
        this.userInfo.servicearea=item.dictionaryId;
    },
    choosePic(type){ 
        switch(type){
            case 'head':
                this.$refs.picFile.dispatchEvent(new MouseEvent('click'));
            default:
                return;
        }
    },
    showAddr(){
        this.isShowAddr=true;
    },
    showService(){
        this.isShowServ= true;
    },
    getService(e){
        console.log(e.target.value,e.target.getAttribute('codeStr'))
        this.isShowServ= false;
    },
    emitUpload(type){
        if(type==='face'){
            this.$refs.faceInput.dispatchEvent(new MouseEvent("click"));
        }else{
            this.$refs.backInput.dispatchEvent(new MouseEvent("click"));
        }
    },
    changeImage(e,type){
        var file = e.target.files[0]
        var reader = new FileReader()
        var that = this;
        reader.readAsDataURL(file)
        reader.onload = function(ev) {
            switch (type){
                case 'face':
                    upLoads({file:this.result}).then((data)=>{
                        if(data.state===200){
                            toggleModal('上传成功');
                            that.userInfo.idcardfronturl=BASE_URL+'/'+data.data;
                        }
                    })
                    break;
                case 'back':
                    upLoads({file:this.result}).then((data)=>{
                        if(data.state===200){
                            toggleModal('上传成功');
                            that.userInfo.idcardbackurl=BASE_URL+'/'+data.data;
                        }
                    })
                    break;
                default:
                    break;
            }
        }
    },
  }
}

</script>
<style lang='scss' scoped>
.volunteer-container{
  height: 100%;
  .header-section{
    position: fixed;
    width: 100%;
  }
  .volunteer-contents{
    background: #fff;
    padding: .5rem;
    box-sizing: border-box;
    height: 100%;
    padding-top: 3rem;
    overflow-y: scroll;
    .rows{
      height: 2.5rem;
      line-height: 2.5rem;
      border-bottom: 1px solid #f5f5f5;
      display: flex;
      box-sizing: border-box;
      .label{
        margin-right: .8rem;
        flex: 1;
      }
      .row-input{
        width: 13rem;
      }
    }
    .arrow-row{
      height: 2.5rem;
      line-height: 2.5rem;
      border-bottom: 1px solid #f5f5f5;
      display: flex;
      box-sizing: border-box;
      position: relative;
      .label{
        margin-right: .8rem;
        flex: 1;
      }
      .row-input{
        width: 13rem;
      }
      .arrow{
        position: absolute;
        display: block;
        width: .5rem;
        right: .5rem;
        top:.75rem;
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
      margin: 0 auto;
      margin-top: 2rem;
      background: #ff0000;
      height: 2rem;
      width: 8.5rem;
      line-height: 2rem;
      color: #fff;
      font-size: .8rem;
      border-radius: .8rem;
    }
  }
}
</style>