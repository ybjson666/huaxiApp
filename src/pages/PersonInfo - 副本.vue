<template>
  <div class='person-container'>
      <head-bar title="个人信息"/>
      <div class="person-contents">
          <div class="section-one">
              <div class="section-wraps">
                    <div class="pic-row">
                        <span class="pic-label fl">头像</span>
                        <div class="pic-wraps fr" @click="choosePic('head')">
                            <img :src="userInfo.userPic" alt=""/>
                            <UploadLoading v-show="headUpload" :size='headSize'/>
                        </div>
                        <input 
                            type="file" 
                            style="display:none" 
                            id="picFile" 
                            ref="picFile"  
                            @change="changeImage($event,'head')" 
                            accept="image/*"
                        />
                        <div class="span"></div>
                    </div>
                    <div class="rows">
                        <span class="label">昵称</span>
                        <input type="text" class="rows-input place-input" v-model="userInfo.userNick" placeholder="请填写昵称"/>
                    </div>
                    <div class="rows" @click="showAddr">
                        <span class="label">区域</span>
                        <input type="text" class="rows-input" v-model="cityName" @input="getAddr" id="addr-box" readonly />
                        <span class="arrow"><img src="../assets/images/into.png" alt=""/></span>
                    </div>
              </div>
          </div>
          <div class="bar"></div>
          <div class="section-two" v-if="userInfo.state==0">
              <div class="section-wraps">
                    <div class="rows">
                        <span class="label">姓名</span>
                        <input type="text" class="rows-input place-input" v-model="userInfo.realName" placeholder="请填写姓名"/>
                    </div>
                    <div class="rows">
                        <span class="label">身份证号</span>
                        <input type="text" class="rows-input place-input" v-model="userInfo.idcardno" placeholder="请填写身份证号"/>
                    </div>
                    <div class="upload-row">
                        <p class="upload-tags">身份证照片</p>
                        <input 
                            type="file" 
                            id="face" 
                            style="display:none" 
                            accept="image/*" 
                            @change="changeImage($event,'face')"
                            ref="faceInput"
                        />
                        <input 
                            type="file" 
                            id="back" 
                            style="display:none" 
                            accept="image/*" 
                            @change="changeImage($event,'back')"
                            ref="backInput"
                        />
                        <div class="upload-wraps">
                            <div class="upload-item face-item" @click="emitUpload('face')">
                                <img :src="userInfo.idcardfronturl" alt="" v-if="userInfo.idcardfronturl"/>
                                <img src="../assets/images/card1.png" alt="" v-else/>
                                <UploadLoading v-show="faceUpload"/>
                            </div>
                            <div class="upload-item " @click="emitUpload('back')">
                                <img :src="userInfo.idcardbackurl" alt="" v-if="userInfo.idcardbackurl"/>
                                <img src="../assets/images/card2.png" alt="" v-else/>
                                <UploadLoading v-show="backUpload"/>
                            </div>
                        </div>
                    </div>
                    <div class="rows" @click="openFrame('polit')">
                        <span class="label">政治面貌</span>
                        <input type="text" class="rows-input" v-model="politName" readonly placeholder="未选择"/>
                        <span class="arrow"><img src="../assets/images/into.png" alt=""/></span>
                    </div>
                    <div class="rows" @click="openFrame('educa')">
                        <span class="label">学历</span>
                        <input type="text" class="rows-input" v-model="educaName" readonly placeholder="未选择"/>
                        <span class="arrow"><img src="../assets/images/into.png" alt=""/></span>
                    </div>
                    <div class="rows" @click="openFrame('service')">
                        <span class="label">服务类型</span>
                        <input type="text" class="rows-input" v-model="serviceName" readonly placeholder="未选择"/>
                        <span class="arrow"><img src="../assets/images/into.png" alt=""/></span>
                    </div>
                    <div class="rows" @click="openFrame('servArea')">
                        <span class="label">服务区域</span>
                        <input type="text" class="rows-input" v-model="servAreaName" readonly placeholder="未选择"/>
                        <span class="arrow"><img src="../assets/images/into.png" alt=""/></span>
                    </div>
                    <div class="rows">
                        <span class="label">家庭住址</span>
                        <input type="text" class="rows-input place-input" v-model="userInfo.address" placeholder="请填写家庭住址"/>
                    </div>
                    <div class="rows">
                        <span class="label">邮箱</span>
                        <input type="text" class="rows-input place-input" v-model="userInfo.email" placeholder="请填写邮箱"/>
                    </div>
                    <div class="rows" @click="changePhone">
                        <span class="label">联系电话</span>
                        <input type="text" class="rows-input " v-model="userInfo.userMobile" readonly placeholder="请填写电话"/>
                        <span class="arrow"><img src="../assets/images/into.png" alt=""/></span>
                    </div>
              </div>
          </div>
          <div class="section-two" v-else>
              <div class="section-wraps">
                    <div class="rows">
                        <span class="label">姓名</span>
                        <input type="text" class="rows-input place-input" v-model="userInfo.realName" readonly placeholder="请填写姓名"/>
                    </div>
                    <div class="rows">
                        <span class="label">身份证号</span>
                        <input type="text" class="rows-input place-input" v-model="userInfo.idcardno" readonly placeholder="请填写身份证"/>
                    </div>
                    <div class="upload-row">
                        <p class="upload-tags">身份证照片</p>
                        <input type="file" 
                            id="face" 
                            style="display:none" 
                            accept="image/png,image/jpeg,image/gif,image/jpg" 
                            ref="faceInput"
                        />
                        <input 
                            type="file" 
                            id="back" 
                            style="display:none" 
                            accept="image/png,image/jpeg,image/gif,image/jpg" 
                            ref="backInput"
                        />
                        <div class="upload-wraps">
                            <div class="upload-item face-item">
                                <img :src="userInfo.idcardfronturl" alt="" v-if="userInfo.idcardfronturl"/>
                                <img src="../assets/images/card1.png" alt="" v-else/>
                            </div>
                            <div class="upload-item ">
                                <img :src="userInfo.idcardbackurl" alt="" v-if="userInfo.idcardbackurl"/>
                                <img src="../assets/images/card2.png" alt="" v-else/>
                            </div>
                        </div>
                    </div>
                    <div class="rows" >
                        <span class="label">政治面貌</span>
                        <input type="text" class="rows-input" v-model="politName" readonly placeholder="未选择"/>
                        <span class="arrow"><img src="../assets/images/into.png" alt=""/></span>
                    </div>
                    <div class="rows" >
                        <span class="label">学历</span>
                        <input type="text" class="rows-input" v-model="educaName" readonly placeholder="未选择"/>
                        <span class="arrow"><img src="../assets/images/into.png" alt=""/></span>
                    </div>
                    <div class="rows">
                        <span class="label">服务类型</span>
                        <input type="text" class="rows-input" v-model="serviceName" readonly placeholder="未选择"/>
                        <span class="arrow"><img src="../assets/images/into.png" alt=""/></span>
                    </div>
                    <div class="rows">
                        <span class="label">服务区域</span>
                        <input type="text" class="rows-input" v-model="servAreaName" readonly placeholder="未选择"/>
                        <span class="arrow"><img src="../assets/images/into.png" alt=""/></span>
                    </div>
                    <div class="rows">
                        <span class="label">家庭住址</span>
                        <input type="text" class="rows-input place-input" v-model="userInfo.address" readonly placeholder="请填写家庭住址"/>
                    </div>
                    <div class="rows">
                        <span class="label">邮箱</span>
                        <input type="text" class="rows-input place-input" v-model="userInfo.email" readonly placeholder="请填写邮箱"/>
                    </div>
                    <div class="rows">
                        <span class="label">联系电话</span>
                        <input type="text" class="rows-input" v-model="userInfo.userMobile" readonly placeholder="请填写联系电话"/>
                        <span class="arrow"><img src="../assets/images/into.png" alt=""/></span>
                    </div>
              </div>
          </div>
          <button class="save-btn btn" :disabled="isSaved" @click="saveUser" :class="{btnGray:isSaved}">保存</button>
          <Loading v-show="isLoading"><span slot="contents" class="load-txt">数据加载中...</span></Loading>
      </div>
      <city-selector :column = 3  :show="isShowAddr" idName="addr-box" :cityDatas="cityDatas"/>
      <Picker :show="showFrame" @closeFrame="closeFrame('educa')" :dataSource="educations" @chooseItem="chooseItem" title="选择学历"/>
      <Picker :show="showPolit" @closeFrame="closeFrame('polit')" :dataSource="politicls" @chooseItem="choosePolit" title="选择政治面貌"/>
      <ServicePicker :show="seekService" @closeFrame="closeFrame('service')" :dataSource="serviceTypes" @chooseItem="chooseService" title="选择服务类型"/>
      <ServicePicker :show="seekServArea" @closeFrame="closeFrame('servArea')" :dataSource="servAreas" @chooseItem="chooseServArea" title="选择服务地区"/>
  </div>
</template>

<script>
import HeadBar from '@/components/HeadBar'
import CitySelector from '@/components/CitySelector'
import Picker from '@/components/Picker'
import ServicePicker from '@/components/ServicePicker'
import Loading from '@/components/Loading'
import UploadLoading from '@/components/UploadLoading'
import { mapState,mapActions,mapGetters } from 'vuex';
import { upLoads,resetUser,resetUserPic} from '../utils/api';
import { BASE_URL, toggleModal,searchArr,reg_idCard,reg_phone,maxPicFile } from '../utils/tools'

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
        isLoading:true,
        proviceId:"",
        faceUpload:false,
        backUpload:false,
        headUpload:false,
        headSize:1
    };
  },
    components: {
        HeadBar,
        CitySelector,
        Picker,
        ServicePicker,
        Loading,
        UploadLoading
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
                    const { proviceId}=this;
                    let prName="";
                    let ciName="";
                    let diName="";
                    let curCity={};
                    let curDist={};
                    let curProv={};
                
                    if(proviceId){
                        this.cityDatas.forEach((pro,i)=>{
                            if(pro.id==proviceId){
                                curProv=pro;
                                prName=pro.name;
                            }
                        })
                        return prName;

                    }else if(areaid==900000){
                         this.cityDatas.forEach((pro,i)=>{
                            if(pro.id==areaid){
                                curProv=pro;
                                prName=pro.name;
                            }
                        })
                        return prName;
                    }else{
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
                    
                    
                }
            },
            set(newVal){
                
            }
        }      
    },
    methods: {
        ...mapActions('user',['req_restUserPic','req_getServices','req_backgrounds','req_servAreas','req_citys','req_getUser']),
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
                    break;
                default:
                    break;
            }
        },
        showAddr(){
            this.isShowAddr=true;
        },
        getAddr(e){
            if(e.target.getAttribute('codeStr')){
               
                if(e.target.getAttribute('codeStr').length>6){
                    this.userInfo.areaid=e.target.getAttribute('codeStr').slice(14,20);
                    this.proviceId="";
                }else{
                    this.userInfo.areaid=e.target.getAttribute('codeStr');
                    this.proviceId=e.target.getAttribute('codeStr');
                }
                
            }
            this.isShowAddr= false;
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
            if(maxPicFile(file)){//判断图片大小是否超过1M
                reader.readAsDataURL(file)
                reader.onload = function(ev) {
                    switch (type){
                        case 'face':
                            that.faceUpload=true;
                            upLoads({file:this.result}).then((data)=>{
                                if(data.state===200){
                                    toggleModal('上传成功');
                                    that.userInfo.idcardfronturl=BASE_URL+'/'+data.data;
                                    setTimeout(()=>{
                                        that.faceUpload=false;
                                    },1000)
                                }
                            })
                            break;
                        case 'back':
                            that.backUpload=true;
                            upLoads({file:this.result}).then((data)=>{
                                if(data.state===200){
                                    toggleModal('上传成功');
                                    that.userInfo.idcardbackurl=BASE_URL+'/'+data.data;
                                    setTimeout(()=>{
                                        that.backUpload=false;
                                    },1000)
                                }
                            })
                            break;
                        case 'head':
                            that.headUpload=true;
                            resetUserPic({base64Code:this.result}).then((data)=>{
                                if(data.state===200){
                                    toggleModal('上传成功');
                                    that.userInfo.userPic=data.data;
                                    setTimeout(()=>{
                                        that.headUpload=false;
                                    },1000)
                                }
                            })
                        default:
                            break;
                    }
                
                }       
            }
            
        },
        changePhone(){
            this.$router.push('/phone')
        },
        saveUser(){
            const { idcardbackurl,idcardfronturl,realName,userNick,email,idcardno,
            address,politicallevel,education,servicetype,servicearea,areaid} =this.userInfo;

            if(!reg_idCard.test(idcardno)){
                toggleModal("身份证号码格式不正确");
                return;
            }else if(!reg_phone.test()){}
            this.isSaved=true;
            
            resetUser({ idCardBackUrl:idcardbackurl,idCardFrontUrl:idcardfronturl,realName,email,idcardno,address,
            nickname:userNick,politicallevel,education,servicetype,servicearea,areaId:areaid}).then(data=>{
                if(data.state==200){
                    toggleModal("保存成功");
                    setTimeout(()=>{
                        this.$router.go(-1);
                    },1000)
                    
                    setTimeout(()=>{
                        this.isSaved=false;
                    },1000);
                    
                }
            });
        },
        getCityDatas(){
            this.isLoading=true;
            this.req_citys(data=>{
                if(data.state!==200){
                   toggleModal(data.message);
                   setTimeout(()=>{
                       this.isLoading=false;
                   },500)
                   
                }else{
                    this.isLoading=false;
                }
            })
        }
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
        if(!localStorage.getItem('cityDatas')){
            this.getCityDatas()
        }
        this.req_getUser(data=>{
            setTimeout(()=>{
                this.isLoading=false;
            },1000)
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
.person-container{
    height: 100%;
    .person-contents{
        height: calc(100% - 2rem);
        overflow-y: scroll;
        padding-top: 1rem;
        box-sizing: border-box;
        -webkit-overflow-scrolling: touch;
        .section-wraps{
            padding: 0 .5rem;
            box-sizing: border-box;
            .rows{
                display: flex;
                border-bottom: 1px solid #f5f5f5;
                height: 2.5rem;
                box-sizing:border-box;
                .label{
                    width: 4rem;
                    line-height: 2.5rem;
                    font-size: .85rem;
                }
                .rows-input{
                    flex: 1;
                    font-size: .75rem;
                    text-align: right;
                    font-size: .85rem;
                }
                .place-input{
                    padding-right: 1.25rem;
                    box-sizing: border-box;
                }
                .rows-input::-webkit-input-placeholder{
                    text-align: right;
                    font-size: .85rem;
                }
                .arrow{
                    width: .5rem;
                    padding-top: .8rem;
                    box-sizing: border-box;
                    margin-left: .75rem;
                }
            }
            .pic-row{
                border-bottom: 1px solid #f5f5f5;
                height: 2.5rem;
                .pic-label{
                    line-height: 2.5rem;
                    font-size: .85rem;
                }
                .pic-wraps{
                    display: block;
                    width: 2rem;
                    height: 2rem;
                    border-radius: 50%;
                    overflow: hidden;
                    position: relative;
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
                    font-size: .85rem;
                }
                .upload-wraps{
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-top: .8rem;
                    .upload-item{
                    width: 7rem;
                    height: 4.8rem;
                    position: relative;
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
    .person-contents::-webkit-scrollbar{
        display: none;
    }
}
</style>