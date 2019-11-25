<template>
  <div class='publish-container'>
    <head-bar title="发布心愿"/>
    <div class="publish-contents">
      <div class="bar"></div>
      <div class="publish-wraps">
        <div class="rows">
          <p class="row-title">
            <span class="flower">*</span>
            <span class="row-label">心愿标题</span>
          </p>
          <p class="row-content">
            <input type="text" placeholder="请填写心愿标题" v-model="title"/>
          </p>
        </div>
        <div class="rows">
          <p class="row-title">
            <span class="flower">*</span>
            <span class="row-label">心愿描述</span>
          </p>
          <p class="row-content">
            <textarea placeholder="请在此输入心愿描述" v-model="description"></textarea>
          </p>
        </div>
        <div class="sele-rows" @click="openFrame('service')">
          <span class="sele-label">服务类型</span>
          <input type="text" placeholder="请选择服务类型" v-model="serviceName" readonly class="sele-row-input"/>
          <span class="arrow"><img src="../assets/images/into.png" alt=""></span>
        </div>
        <div class="sele-rows" @click="openFrame('servArea')">
          <span class="sele-label">服务地区</span>
          <input type="text" placeholder="请选择服务地区" v-model="servAreaName" readonly class="sele-row-input" id="city-box" @input="getVal"/>
          <span class="arrow"><img src="../assets/images/into.png" alt=""></span>
        </div>
        <div class="sele-rows">
          <span class="sele-label">服务地址</span>
          <input type="text" placeholder="请填写服务地址" v-model="address"  class="sele-row-input"/>
          <span class="arrow"></span>
        </div>
        <div class="sele-rows" @click="chooseTime">
          <span class="sele-label">服务时间</span>
          <input type="text" placeholder="请选择服务时间" v-model="service_time" readonly class="sele-row-input"/>
          <span class="arrow"><img src="../assets/images/into.png" alt=""></span>
        </div>
        <div class="rows">
          <p class="row-title">
            <span class="flower">*</span>
            <span class="row-label">联系人</span>
          </p>
          <p class="row-content">
            <input placeholder="请填写联系人" v-model="contacter"/>
          </p>
        </div>
        <div class="rows">
          <p class="row-title">
            <span class="flower">*</span>
            <span class="row-label">联系手机</span>
          </p>
          <p class="row-content">
            <input placeholder="请填写联系手机" v-model="phone" oninput = "value=value.replace(/[^\d]/g,'')"/>
          </p>
        </div>
      </div>
      <button class="publish-btn btn " :disabled="ispublish" :class="{btnGray:ispublish}" @click="publish">确认发布</button>
    </div>
    <!-- <city-selector :column = 3  :show="isShow" idName="city-box" /> -->
    <ServicePicker :show="seekService" @closeFrame="closeFrame('service')" :dataSource="serviceTypes" @chooseItem="chooseService"/>
    <ServicePicker :show="seekServArea" @closeFrame="closeFrame('servArea')" :dataSource="servAreas" @chooseItem="chooseServArea"/>
    <DatePicker
        :visible="showDatePicker"
        :value="nowDate"
        :type="'ymdhms'"
        @confirmEventOuter="timeConfirm"
        @cancelEventOuter="timeCancel"
      />
  </div>
</template>

<script>
import HeadBar from '@/components/HeadBar'
import CitySelector from '@/components/CitySelector'
import ServicePicker from '@/components/ServicePicker'
import DatePicker from '@/components/datePicker/DatePicker'
import moment from 'moment'
import { formatTime,tranStamp,toggleModal,reg_phone} from '../utils/tools'
import { pubWishs } from '../utils/api'
import { mapState,mapActions} from 'vuex';
export default {
name:'publish',
  data () {
    return {
      isShow:false,
      ispublish:false,
      showFrame:false,
      showDatePicker:false,
      seekService:false,
      seekServArea:false,
      title:"",
      description:"",
      wishtype:"",
      areaid:"",
      address:"",
      service_time:"",
      serviceTime:"",
      contacter:"",
      phone:"",
      nowDate:""
    };
  },

  components: {
      HeadBar,
      CitySelector,
      ServicePicker,
      DatePicker
  },

  computed:{
    ...mapState('user',['serviceTypes','servAreas']),
    serviceName(){
      let name="";
      this.serviceTypes.map((item)=>{
          if(this.wishtype==item.dictionaryId){
              name=item.dictionaryValue;
          }
      })
      return name;
    },
    servAreaName(){
      let name="";
      this.servAreas.map((item)=>{
          if(this.areaid==item.dictionaryId){
              name=item.dictionaryValue;
          }
      })
      return name;
    }
  },

  mounted(){
    let time=Date.now();
    this.nowDate=moment(time).format('YYYY-MM-DD');
   
  },
  created(){
    this.req_getServices((data)=>{
        if(data.state!==200){
            toggleModal(data.message);
        }
    }),
    this.req_servAreas((data)=>{
        if(data.state!==200){
            toggleModal(data.message);
        }
    })
  },

  methods: {
    ...mapActions('user',['req_getServices','req_servAreas']),
    chooseService(item){
        this.seekService=false;
        this.wishtype=item.dictionaryId;
    },
    chooseServArea(item){
        this.seekServArea=false;
        this.areaid=item.dictionaryId;
    },
    openFrame(type){
      if(type==='service'){
          this.seekService=true;
      }else{
        this.seekServArea=true;
      }
      
    },
    closeFrame(type){
      if(type==='service'){
          this.seekService=false;
      }else{
        this.seekServArea=false;
      }
    },
    getVal(e) {
      console.log(e.target.value,e.target.getAttribute('codeStr'))
        this.isShow = false;
    },
    chooseTime(){
      this.showDatePicker=true;
    },
    timeCancel(){
      this.showDatePicker=false;
    },
    timeConfirm(value){
      this.service_time=formatTime(value);
      this.serviceTime=tranStamp(this.service_time);
      this.showDatePicker=false;
    },
    publish(){
      const { title,description,wishtype,areaid,address,serviceTime,contacter,phone } = this;
      
      if(!title){
        toggleModal('请输入标题');
        return;
      }else if(!description){
        toggleModal('请输入心愿描述');
        return;
      }else if(!wishtype){
        toggleModal('请选择服务类型');
        return;
      }else if(!areaid){
        toggleModal('请选择服务区域');
        return;
      }else if(!address){
        toggleModal('请输入详细地址');
        return;
      }else if(!serviceTime){
        toggleModal('请选择服务时间');
        return;
      }else if(!contacter){
        toggleModal('请填写联系人');
        return;
      }else if(!phone){
        toggleModal('请填写手机号');
        return;
      }else if(!reg_phone.test(phone)){
        toggleModal('手机号格式错误');
        return;
      }

      this.ispublish=true;
     
      pubWishs( { title,description,wishtype,areaid,address,serviceTime,contacter,phone } ).then( data => {
          if(data.state===200){
            toggleModal('发布成功');
            setTimeout(()=>{
               this.ispublish=false;
            },1000)
          }else{
            toggleModal(data.message)
          }
      })

    }
  }
}

</script>
<style lang='scss' scoped>
  .publish-container{
      height: 100%;
      .publish-contents{
        height: calc(100% - 2rem);
        overflow-y: scroll;
        .bar{
          background: .3rem;
          background: #f0f0f0;
        }
        .publish-wraps{
          padding: .5rem;
          box-sizing: border-box;
          .rows{
            margin-bottom: .5rem;
            .row-title{
              margin-bottom: .3rem;
              .flower{
                color: #ff0000;
                font-size: .8rem;
              }
            }
            .row-content{
              textArea{
                border:none;
                width: 100%;
                resize: none;
                border:1px solid #dbdbdb;
                border-radius: 3px;
                height: 5rem;
                padding: .3rem;
                box-sizing: border-box;
                outline: none;
              }
              input{
                border-bottom:1px solid #dbdbdb;
                width: 100%;
                line-height: 1.25rem;
                padding-left: .5rem;
                box-sizing: border-box;
              }
            }
          }
          .sele-rows{
            display: flex;
            height: 2.5rem;
            margin-bottom: .5rem;
            border-bottom:1px solid #dbdbdb;
            .sele-label{
              flex: 1;
              line-height: 2.5rem;
              padding-left: .5rem;
              box-sizing: border-box;
            }
            .sele-row-input{
              flex: 3;
              line-height: 2.5rem;
            }
            .arrow{
              width: .5rem;
              display: block;
              line-height: 2.5rem;
              margin-right: .2rem;
            }
          }
        }
        .publish-btn{
          margin: 0 auto;
          margin-top: 2rem;
          margin-bottom: 1.5rem;
        }
      }
  }
</style>