<template>
  <div class='volunteer-container'>
    <div class="header-section">
      <head-bar title="志愿者申请"></head-bar>
    </div>
    <div class="volunteer-contents">
        <div class="rows">
          <span class="label">姓名</span>
          <input type="text" class="row-input" placeholder="请填写真实姓名" v-model="userName">
        </div>
        <div class="rows">
          <span class="label">身份证号码</span>
          <input type="text" class="row-input" placeholder="请填写身份证号码" v-model="idCard" oninput = "value=value.replace(/[^\d]/g,'')">
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
            <div class="upload-item face-item" @click="emitUpload('face')"><img :src="facePic" alt=""></div>
            <div class="upload-item " @click="emitUpload('back')"><img :src="backPic" alt=""></div>
          </div>
        </div>
        <div class="arrow-row">
          <span class="label">政治面貌</span>
          <input type="text" class="row-input" placeholder="请选择政治面貌" v-model="politics" readonly >
          <span class="arrow"><img src="../assets/images/into.png" alt=""></span>
        </div>
        <div class="arrow-row">
          <span class="label">学历</span>
          <input type="text" class="row-input" placeholder="请选择学历" v-model="education" readonly @click="openFrame">
          <span class="arrow"><img src="../assets/images/into.png" alt=""></span>
        </div>
        <div class="arrow-row">
          <span class="label">服务类型</span>
          <input type="text" class="row-input" placeholder="请选择服务类型" v-model="serviceType" readonly>
          <span class="arrow"><img src="../assets/images/into.png" alt=""></span>
        </div>
        <div class="arrow-row">
          <span class="label">服务区域</span>
          <input type="text" class="row-input" placeholder="请选择服务区域" v-model="serviceArea" readonly id="city-box" @click="showPicker" @input="getVal">
          <span class="arrow"><img src="../assets/images/into.png" alt=""></span>
        </div>
        <div class="rows">
          <span class="label">家庭住址</span>
          <input type="text" class="row-input" placeholder="请填写家庭住址" v-model="userAddr">
        </div>
        <div class="rows">
          <span class="label">电子邮箱</span>
          <input type="text" class="row-input" placeholder="请填写邮箱" v-model="userEmail">
        </div>
        <div class="rows">
          <span class="label">联系电话</span>
          <input type="text" class="row-input" placeholder="请填写联系电话" v-model="userPhone">
        </div>
        <button class="sub-btn">提交</button>
        <city-selector :column = 3  :show="isShow" idName="city-box" />
        <Picker :show="showFrame" @closeFrame="closeFrame" :dataSource="educationList" @chooseItem="chooseItem" ref="child"/>
    </div>
  </div>
</template>

<script>
import HeadBar from '@/components/HeadBar'
import CitySelector from '@/components/CitySelector'
import Picker from '@/components/Picker'
export default {
name:'AplyVolunteer',
  data () {
    return {
      isShow:false,
      showFrame:false,
      userName:"",
      idCard:"",
      facePic:require('../assets/images/card1.png'),
      backPic:require('../assets/images/card2.png'),
      politics:"",
      education:"",
      serviceType:"",
      serviceArea:"",
      userAddr:"",
      userEmail:"",
      userPhone:"",
      educationList:[
        {
          id:"1",
          name:"小学"
        },
        {
          id:"2",
          name:"中学"
        },
        {
          id:"3",
          name:"高中"
        },
        {
          id:"4",
          name:"大专"
        },
        {
          id:"5",
          name:"本科"
        },
        {
          id:"6",
          name:"研究生"
        },
        {
          id:"7",
          name:"博士"
        },
        {
          id:"4",
          name:"大专"
        },
        {
          id:"5",
          name:"本科"
        },
        {
          id:"6",
          name:"研究生"
        },
        {
          id:"7",
          name:"博士"
        }
      ],
      politicList:[
        {
          id:"1",
          name:"团员"
        },
        {
          id:"2",
          name:"党员"
        }
      ],
    };
  },

  components: {
    HeadBar,
    CitySelector,
    Picker
  },
  mounted(){
    
  },
  methods: {
     showPicker(){
        this.isShow=true;
      },
      openFrame(type){
       this.showFrame=true;
      },
      closeFrame(){
        this.showFrame=false;
      },
      chooseItem(item){
        console.log(item)
        this.showFrame=false;
      },
      getVal(e) {
        console.log(e.target.value,e.target.getAttribute('codeStr'))
         this.isShow = false;
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
            if(type==='face'){
              that.facePic=this.result;
            }else{
              that.backPic=this.result;
            }
        }
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