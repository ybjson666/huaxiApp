<template>
  <div class='person-container'>
      <head-bar title="个人信息"/>
      <div class="person-contents">
          <div class="section-one">
              <div class="section-wraps">
                    <div class="pic-row">
                        <span class="pic-label fl">头像</span>
                        <span class="pic-wraps fr" @click="choosePic('head')"><img :src="userInfo.userPic" alt=""></span>
                        <input type="file" style="display:none" id="picFile" ref="picFile"  @change="changeImage($event,'head')">
                        <div class="span"></div>
                    </div>
                    <div class="rows">
                        <span class="label">昵称</span>
                        <input type="text" class="rows-input" v-model="userInfo.userNick">
                    </div>
                    <div class="rows" @click="showAddr">
                        <span class="label">区域</span>
                        <input type="text" class="rows-input" v-model="cityName" @input="getAddr" id="addr-box">
                        <span class="arrow"><img src="../assets/images/into.png" alt=""></span>
                    </div>
              </div>
          </div>
          <div class="bar"></div>
          <div class="section-two">
              <div class="section-wraps">
                    <div class="rows">
                        <span class="label">姓名</span>
                        <input type="text" class="rows-input" v-model="userInfo.realName">
                    </div>
                    <div class="rows">
                        <span class="label">身份证号</span>
                        <input type="text" class="rows-input" v-model="userInfo.idcardno">
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
                            <div class="upload-item face-item" @click="emitUpload('face')">
                                <img :src="userInfo.idcardfronturl" alt="" v-if="userInfo.idcardfronturl">
                                <img src="../assets/images/card1.png" alt="" v-else>
                            </div>
                            <div class="upload-item " @click="emitUpload('back')">
                                <img :src="userInfo.idcardbackurl" alt="" v-if="userInfo.idcardbackurl">
                                <img src="../assets/images/card2.png" alt="" v-else>
                            </div>
                        </div>
                    </div>
                    <div class="rows" @click="openFrame('polit')">
                        <span class="label">政治面貌</span>
                        <input type="text" class="rows-input" v-model="politName" readonly>
                        <span class="arrow"><img src="../assets/images/into.png" alt=""></span>
                    </div>
                    <div class="rows" @click="openFrame('educa')">
                        <span class="label">学历</span>
                        <input type="text" class="rows-input" v-model="educaName">
                        <span class="arrow"><img src="../assets/images/into.png" alt=""></span>
                    </div>
                    <div class="rows" @click="openFrame('service')">
                        <span class="label">服务类型</span>
                        <input type="text" class="rows-input" v-model="serviceName" readonly>
                        <span class="arrow"><img src="../assets/images/into.png" alt=""></span>
                    </div>
                    <div class="rows" @click="openFrame('servArea')">
                        <span class="label">服务区域</span>
                        <input type="text" class="rows-input" v-model="servAreaName" id="service-box" @input="getService">
                        <span class="arrow"><img src="../assets/images/into.png" alt=""></span>
                    </div>
                    <div class="rows">
                        <span class="label">家庭住址</span>
                        <input type="text" class="rows-input" v-model="userInfo.address">
                    </div>
                    <div class="rows">
                        <span class="label">邮箱</span>
                        <input type="text" class="rows-input" v-model="userInfo.email">
                    </div>
                    <div class="rows" @click="changePhone">
                        <span class="label">联系电话</span>
                        <input type="text" class="rows-input" v-model="userInfo.userMobile" readonly>
                        <span class="arrow"><img src="../assets/images/into.png" alt=""></span>
                    </div>
              </div>
          </div>
          <button class="save-btn btn" :disabled="isSaved" @click="saveUser" :class="{btnGray:isSaved}">保存</button>
          <Loading v-show="isLoading"/>
      </div>
      <city-selector :column = 3  :show="isShowAddr" idName="addr-box" :cityDatas="cityDatas"/>
      <Picker :show="showFrame" @closeFrame="closeFrame('educa')" :dataSource="educations" @chooseItem="chooseItem"/>
      <Picker :show="showPolit" @closeFrame="closeFrame('polit')" :dataSource="politicls" @chooseItem="choosePolit" />
      <ServicePicker :show="seekService" @closeFrame="closeFrame('service')" :dataSource="serviceTypes" @chooseItem="chooseService"/>
      <ServicePicker :show="seekServArea" @closeFrame="closeFrame('servArea')" :dataSource="servAreas" @chooseItem="chooseServArea"/>
  </div>
</template>

<script>
import HeadBar from '@/components/HeadBar'
import CitySelector from '@/components/CitySelector'
import Picker from '@/components/Picker'
import ServicePicker from '@/components/ServicePicker'
import Loading from '@/components/Loading'
import { mapState,mapActions,mapGetters } from 'vuex';
import { upLoads,resetUser,resetUserPic} from '../utils/api';
import { BASE_URL, toggleModal,searchArr } from '../utils/tools'

export default {
name:'person',
  data () {
    return {
        isShowAddr:false,
        isSaved:false,
        showFrame:false,
        showPolit:false,
        seekService:false,
        seekServArea:false,
        isLoading:true
    };
  },

    components: {
        HeadBar,
        CitySelector,
        Picker,
        ServicePicker,
        Loading
    },
    computed:{
        ...mapState('user',['userInfo','serviceTypes','servAreas','cityDatas']),
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
        },
        cityName:{
            get(){
                if(JSON.stringify(this.userInfo)!='{}'){
                    const { areaid } =this.userInfo;
                    let prName="";
                    let ciName="";
                    let diName="";
                    let curCity={};
                    let curDist={};
                    let curProv={};
                    this.cityDatas.forEach((pro,i)=>{
                        if(pro.childAreaDtos&&pro.childAreaDtos.length){
                            pro.childAreaDtos.forEach((city,m)=>{
                                if(city.childAreaDtos&&city.childAreaDtos.length){
                                    city.childAreaDtos.forEach((area,n)=>{
                                        if(area.id==areaid){
                                            curDist=area;
                                            diName=area.name;
                                        }
                                    })
                                }
                            })
                        }
                    })

                    this.cityDatas.forEach((pro,i)=>{
                        if(pro.childAreaDtos&&pro.childAreaDtos.length){
                            pro.childAreaDtos.forEach((city,m)=>{
                                if(city.id==curDist.parentId){
                                    curCity=city;
                                    ciName=city.name;
                                }
                            })
                        }
                    })
                    
                    this.cityDatas.forEach((pro,i)=>{
                        if(pro.id==curCity.parentId){
                            curProv=pro;
                            prName=pro.name;
                        }
                    })
                    if(areaid){
                        return `${prName} / ${ciName} / ${diName}`;
                    }else{
                        return '';
                    }
                    
                }
            },
            set(newVal){
                
            }
        }      
    },
    methods: {
        ...mapActions('user',['req_restUserPic','req_getServices','req_backgrounds','req_servAreas','req_citys']),
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
        getAddr(e){
            this.userInfo.areaid=e.target.getAttribute('codeStr').slice(14,20);
            this.isShowAddr= false;
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
                    case 'head':
                        resetUserPic({base64Code:this.result}).then((data)=>{
                            if(data.state===200){
                                toggleModal('上传成功');
                                that.userInfo.userPic=data.data;
                            }
                        })
                    default:
                        break;
                }
             
            }
        },
        changePhone(){
            this.$router.push('/phone')
        },
        saveUser(){
            const { idcardbackurl,idcardfronturl,realName,userNick,email,idcardno,
            address,politicallevel,education,servicetype,servicearea,areaid } =this.userInfo;

            this.isSaved=true;
            
            resetUser({ idCardBackUrl:idcardbackurl,idCardFrontUrl:idcardfronturl,realName,email,idcardno,address,
            nickname:userNick,politicallevel,education,servicetype,servicearea,areaId:areaid}).then(data=>{
                if(data.state==200){
                    toggleModal("保存成功");
                    setTimeout(()=>{
                        this.isSaved=false;
                    },1000);
                    
                }
            });
        },
        getCityDatas(){
            this.req_citys(data=>{
                if(data.state!==200){
                   toggleModal(data.message);
                }
            })
        }
    },
    created(){
        this.req_getServices((data)=>{
            this.isLoading=false;
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

        if(!localStorage.getItem('cityDatas')){
            this.getCityDatas()
        }
        
    }
    
}

</script>
<style lang='scss' scoped>
.person-container{
    height: 100%;
    .person-contents{
        height: calc(100% - 2rem);
        overflow-y: scroll;
        padding-top: 1rem;
        box-sizing: border-box;
        .section-wraps{
            padding: 0 .5rem;
            box-sizing: border-box;
            .rows{
                display: flex;
                border-bottom: 1px solid #f5f5f5;
                height: 2.5rem;
                .label{
                    width: 4rem;
                    line-height: 2.5rem;
                }
                .rows-input{
                    flex: 1;
                    font-size: .75rem;
                }
                .arrow{
                    width: .5rem;
                    padding-top: .8rem;
                    box-sizing: border-box;
                }
            }
            .pic-row{
                border-bottom: 1px solid #f5f5f5;
                height: 2.5rem;
                .pic-label{
                    line-height: 2.5rem;
                }
                .pic-wraps{
                    display: block;
                    width: 2rem;
                    height: 2rem;
                    border-radius: 50%;
                    overflow: hidden;
                    img{
                        height: 100%;
                    }
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
        }
        .bar{
            height: .8rem;
            background: #f0f0f0;
        }
        .save-btn{
            margin: 1.5rem auto;
        }
    }
}
</style>