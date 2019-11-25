<template>
  <div class='subscribe-container'>
    <head-bar title="资源预约"/>
    <div class="subscribe-contents">
      <div class="section-one">
        <p class="title-bar">
          <span class="rect"></span>
          <span>资源名称</span>
        </p>
        <p class="title">{{title}}</p>
      </div>
      <div class="section-two block">
          <p class="oppoint-title"><span class="flower">*</span>预约使用时间</p>
          <div class="rows" @click="chooseTime">
            <input type="text" v-model="oppint_time" placeholder="选择使用时间" readonly/>
            <span class="arrow"><img src="../assets/images/into.png" alt=""></span>
          </div>
          <div class="info-block">
            <p>资源预约内容</p>
            <textarea v-model="oppint_content" placeholder="请填写资源详细内容，说明等"></textarea>
          </div>
      </div>
      <button class="btn publish-btn">确认发布</button>
    </div>
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
import DatePicker from '@/components/datePicker/DatePicker'
import moment from 'moment'
import { formatTime } from '../utils/tools'
export default {
name:'subscribe',
  data () {
    return {
      sourceId:"",
      nowDate:"",
      showDatePicker:false,
      title:"菁蓉汇4A-1",
      oppint_time:"",
      oppint_content:""
    };
  },

  components: {
      HeadBar,
      DatePicker
  },

  computed:{},

  mounted(){
    let time=Date.now();
    this.nowDate=moment(time).format('YYYY-MM-DD');
    this.sourceId=this.$route.params.sourceId;
    console.log(this.sourceId)
  },

  methods: {
    chooseTime(){
      this.showDatePicker=true;
    },
    timeCancel(){
      this.showDatePicker=false;
    },
    timeConfirm(value){
      this.oppint_time=formatTime(value);
      this.showDatePicker=false;
    }
  }
}

</script>
<style lang='scss' scoped>
.subscribe-container{
  height: 100%;
  .subscribe-contents{
    height: calc(100% - 2rem);
    background: #f0f0f0;
    padding: .8rem;
    box-sizing: border-box;
    .section-one{
      margin-bottom: 1rem;
      .title-bar{
        line-height: 1rem;
        margin-bottom: .2rem;
        span{
          vertical-align: middle;
        }
        .rect{
          display: inline-block;
          width: .25rem;
          height: .7rem;
          background: #ff0000;
          margin-right: .15rem;
        }
      }
      .title{
        font-size: .9rem;
        padding-left: .5rem;
        box-sizing: border-box;
      }
    }
    .section-two{
      padding:.8rem;
      box-sizing: border-box;
      border-radius: 4px;
      .oppoint-title{
        font-size: .75rem;
        .flower{
          color: #ff0000;
          font-size: 1.2rem;
          vertical-align: middle;
          margin-right: .2rem;
          margin-left: -.6rem;
        }
      }
      .rows{
        display: flex;
        line-height: 1.5rem;
        border-bottom: 1px solid#f0f0f0;
        input{
          flex: 1
        }
        span{
          display: inline-block;
          width: .4rem;
          margin-left: .5rem;
        }
      }
      .info-block{
        margin-top: .8rem;
        p{
          font-size: .75rem;
          margin-bottom: .5rem;
        }
        textarea{
          width: 100%;
          height: 9rem;
          resize: none;
          padding: .2rem;
          box-sizing: border-box;
          border:none;
        }
      }
    }
    .publish-btn{
      margin: 0 auto;
      margin-top: 3rem;
    }
  }
}
</style>