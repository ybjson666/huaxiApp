<template>
  <div class='sign-container'>
      <head-bar title="签到"/>
      <div class="sign-contents">
          <div class="sign-wraper">
                <Scroller
                    @scrolling="scrolling" 
                    @touchEnded="touchEnded" 
                    :pullUpMsg="pullUpMsg"
                    :pullDownMsg="pullDownMsg"
                    :isPullUpLoading="isPullUpLoading"
                    :isPullDownLoading="isPullDownLoading"
                    :isFresh="isFresh"
                    :isShowUp="isShowUp"
                    :hasData="hasData"
                >
                <ul class="sign-list">
                    <li v-for="(item,index) in signList" :key="index">
                        <div class="sign-top">
                            <div class="sign-pic"><img :src="item.ActivityRecruit.cover" alt=""></div>
                            <div class="sign-infos">
                                <h2 class="sign-name">{{item.ActivityRecruit.activityname}}</h2>
                                <div class="sing-info-bottom">
                                    <p class="sign-num-wraps">
                                        <span class="num-icon"><img src="../assets/images/user.png" alt=""></span>
                                        <span class="sign-num" v-if="item.ActivityRecruit.recruitcount==0">{{item.ActivityRecruit.hascount}} / 不限制</span>
                                        <span class="sign-num" v-else>{{item.ActivityRecruit.hascount}}/{{item.ActivityRecruit.recruitcount}}</span>
                                    </p>
                                    <p class="sign-addr-wraps">
                                        <span class="addr-icon"><img src="../assets/images/address.png" alt=""></span>
                                        <span class="sign-addr">{{item.ActivityRecruit.address | curtWords(9)}}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="sign-bottom">
                            <div class="sign-time-wrapper">
                                <div class="sign-time-left">
                                    <p class="sign-hour">{{item.ActivityRecruit.activitystarttime |filterHour}}</p>
                                    <p class="sign-date">{{item.ActivityRecruit.activitystarttime |filterDate}}</p>
                                </div>
                                <div class="sign-time-middle">————</div>
                                <div class="sign-time-right">
                                    <p class="sign-hour">{{item.ActivityRecruit.activityendtime |filterHour}}</p>
                                    <p class="sign-date">{{item.ActivityRecruit.activityendtime |filterDate}}</p>
                                </div>
                            </div>
                            <div class="sign-btn-groups" v-if="item.state=='1'">
                                <span 
                                    class="start-btn" 
                                    @click="signs(item.ActivityRecruit.activityrecruitid,item.ActivityRecruit.addresslatitude,
                                    item.ActivityRecruit.addresslongitude,item.ActivityRecruit.checkrange,'sign')"
                                    >开始签到</span>
                                <span class="exit-btn">签退</span>
                            </div>
                            <div class="sign-btn-groups" v-else-if="item.state=='2'">
                                <span class="start-btn signed" >已完成</span>
                                <span 
                                class="exit-btn" 
                                @click="signs(item.ActivityRecruit.activityrecruitid,item.ActivityRecruit.addresslatitude,
                                    item.ActivityRecruit.addresslongitude,item.ActivityRecruit.checkrange,'signOut')"
                                >签退</span>
                            </div>
                            <!-- <div class="sign-btn-groups" v-else>
                                <span class="start-btn">开始签到</span>
                                <span class="exit-btn">签退</span>
                            </div> -->
                        </div>
                    </li>
                </ul>
              </Scroller>
                <Loading v-show="isLoading"><span slot="contents" class="load-txt">数据加载中...</span></Loading>
                <Loading v-show="isLocation">
                    <p class="locations" slot="contents">正在定位中....</p>
                </Loading>
              <p class="none-data" v-if="!signList.length">暂无数据</p>
          </div>
      </div>
      <div class="map" id="map" style="display:none"></div>
      
  </div>
</template>

<script>
import Scroller from '@/components/Scroller';
import HeadBar from '@/components/HeadBar'
import Loading from '@/components/Loading'
import { mapState,mapActions,mapMutations } from 'vuex';
import { sign,signOut } from '../utils/api';
import { toggleModal,pageSize,mapKey,loadMoreData,ReFreshDatas,fetchSyncDatas} from '../utils/tools'
import MapLoader from '../utils/aMap'
import aMap from '../utils/aMap';
export default {
name:'sign',
    data () {
        return {
            isFresh:false,
            isShowUp:true,
            isPullUpLoading:false,
            isPullDownLoading:false,
            isLocation:false,
            isLoading:false,
            pullUpMsg:"上拉加载更多",
            pullDownMsg:"下拉刷新",
            hasData:false,
            pageNo:1,
            state:0,
            activityRecruitId:"",
            startLonLat:"",
            curRadius:"",
            curActLat:"",
            curActLon:"",
            signType:""
        };
    },
    components: {
        HeadBar,
        Scroller,
        Loading
    },
    computed:{
        ...mapState({
            userInfo:state=>state.user.userInfo,
            signList:state=>state.volunteer.signList
        })
    },
    created(){
        this.customerid=localStorage.getItem('customerid');
        this.fetchData();
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
    filters:{
        filterHour(date){
            return date.slice(11,16);
        },
        filterDate(date){
            return date.slice(0,10);
        }
    },
    methods: {
        ...mapActions({
            req_signs:'volunteer/req_signs',
            req_getUser:'user/req_getUser'
            }),
        ...mapMutations('volunteer',['set_signin_list','set_signout_list']),
        signs(id,lat,lon,radius,type){
             const { isvolunteer } =this.userInfo;
            this.activityRecruitId=id;
            this.curActLat=parseFloat(lat);
            this.curActLon=parseFloat(lon);
            this.curRadius=parseInt(radius);
            this.signType=type;
            if(isvolunteer==1){
                this.isLocation=true;
                this.initMap();
            }else{
                toggleModal("您不是志愿者，请先成为志愿者吧~");
            }
            
        },
        touchEnded(pos,scroll){
            if(pos.y>60){
                this.refreshData();
            }else if(pos.y<scroll.maxScrollY-30){
                if(this.hasData){
                    this.loadMore();
                }
            }
        },
        scrolling(pos){
            if(pos.y>60){
                this.isPullDownLoading=true;
            }
        },
        calcList(data){
            if(data.state===200){
                this.hasData=this.signList.length>=pageSize?true:false; 
            }else{
                toggleModal(data.message);
            }
        },
        refreshData(){
            this.pageNo=1;
            ReFreshDatas(this,this.req_signs,{pageSize,pageNo:this.pageNo,state:this.state,id:this.customerid},data=>{
                this.calcList(data);
            })
        },
        loadMore(){
            loadMoreData(this,this.req_signs,{pageSize,pageNo:this.pageNo,state:this.state,id:this.customerid});
        },
        fetchData(){
            fetchSyncDatas(this,this.req_signs,{pageSize,pageNo:this.pageNo,state:this.state,id:this.customerid},data=>{
                this.calcList(data);
            })
        },
        onError(obj) {
            toggleModal(obj.message)
        },
        initMap(callBack){
            let that=this;
            MapLoader().then(AMap => {
                let map = new AMap.Map('map');

                map.plugin('AMap.Geolocation', function () {
                
                    var geolocation = new AMap.Geolocation({
                        enableHighAccuracy: true, // 是否使用高精度定位，默认:true
                        timeout: 10000,           // 超过10秒后停止定位，默认：无穷大
                        maximumAge: 0,            // 定位结果缓存0毫秒，默认：0
                        convert: true,            // 自动偏移坐标，偏移后的坐标为高德坐标，默认：true
                        showButton: true,         // 显示定位按钮，默认：true
                        buttonPosition: 'LB',     // 定位按钮停靠位置，默认：'LB'，左下角
                        buttonOffset: new AMap.Pixel(10, 20), // 定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                        showMarker: true,         // 定位成功后在定位到的位置显示点标记，默认：true
                        showCircle: true,         // 定位成功后用圆圈表示定位精度范围，默认：true
                        panToLocation: true,      // 定位成功后将定位到的位置作为地图中心点，默认：true
                        zoomToAccuracy:true       // 定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
                    });
                    
                        map.addControl(geolocation);
                        
                        geolocation.getCurrentPosition();
                        AMap.event.addListener(geolocation, 'complete', (map)=>{
                             if(map){
                                that.isLocation=false;
                                const pos=map.position;
                                const { lat,lng }=pos;
                                let p1=[lng,lat];
                                let p2=[that.curActLon,that.curActLat];
                                let r=parseInt((AMap.GeometryUtil.distance(p1, p2)));
                                if(that.curRadius-r>=0){
                                    if(that.signType==='sign'){
                                        sign({activityRecruitId:that.activityRecruitId,customerId:that.customerid}).then(data=>{
                                            if(data.state===200){
                                                that.set_signin_list(that.activityRecruitId);
                                                toggleModal('签到成功');
                                            }else{
                                                toggleModal(data.message);
                                            }
                                        })
                                    }else{
                                        signOut({activityRecruitId:that.activityRecruitId,customerId:that.customerid}).then(data=>{
                                            if(data.state===200){
                                                that.set_signout_list(that.activityRecruitId);
                                                toggleModal('签退成功');
                                            }else{
                                                toggleModal(data.message);
                                            }
                                        })
                                    }
                                    
                                }else{
                                    toggleModal('当前距离较远，不能签到！');
                                }  
                            }
                        }); // 返回定位信息
                        AMap.event.addListener(geolocation, 'error', that.onError);       // 返回定位出错信息
                    });
                }, e => {
                        console.log('地图加载失败' ,e)
            })
        }
    }
}

</script>
<style lang='scss' scoped>
.sign-container{
    height: 100%;
    .sign-contents{
        height: calc(100% - 2rem);
        background: #f0f0f0;
        .sign-wraper{
            position: relative;
            height: 100%;
            .sign-list{
                padding:0 .75rem;
                padding-top: 1rem;
                box-sizing: border-box;
                li{
                    background: #fff;
                    border-radius: 3px;
                    margin-bottom: .5rem;
                    padding: .65rem .5rem;
                    padding-bottom: 1rem;
                    box-sizing: border-box;
                    .sign-top{
                        display: flex;
                        .sign-pic{
                            width: 7.5rem;
                            height: 5rem;
                            margin-right: .5rem;
                            img{
                                height: 100%;
                            }
                        }
                        .sign-infos{
                            flex: 1;
                            position: relative;
                            height: 5rem;
                            .sign-name{
                                font-size: .85rem;
                                font-weight: normal;
                                margin-top: -0.14rem;
                            }
                            .sing-info-bottom{
                                width: 100%;
                                position: absolute;
                                left: 0;
                                bottom: -.1rem;
                                color: rgb(128,128,128);
                                .sign-num-wraps{
                                    margin-bottom: .5rem;
                                    .num-icon{
                                        display: inline-block;
                                        width: .75rem;
                                        margin-right: .1rem;
                                
                                    }
                                }
                                .sign-addr-wraps{
                                    .addr-icon{
                                        display: inline-block;
                                        width: .55rem;
                                        margin-right: .1rem;
                                        vertical-align: middle;
                                    }
                                }
                            }
                        }
                    }
                    .sign-bottom{
                        padding-top: 1rem;
                        .sign-time-wrapper{
                            display: flex;
                            justify-content: center;
                            padding: 0 1.5rem;
                            box-sizing: border-box;
                            color: #000;
                            div{
                                flex: 1;
                                text-align: center;
                                p{
                                    line-height: 1rem;
                                }
                                .sign-hour{
                                    font-size: 1rem;
                                    margin-bottom: .5rem;
                                }
                                .sign-date{
                                    color: rgb(128,128,128);
                                    font-size: .65rem;
                                }
                            }
                            .sign-time-middle{
                                flex: .8;
                            }
                        }
                        .sign-btn-groups{
                            margin-top: .8rem;
                            display: flex;
                            justify-content: flex-end;
                            span{
                                height: 1.5rem;
                                text-align: center;
                                color: #ff0000;
                                border:1px solid #ff0000;
                                border-radius: 1rem;
                                line-height: 1.5rem;
                                box-sizing: border-box;
                            }
                            .start-btn{
                                width: 5rem;
                                margin-right: .65rem;
                            }
                            .exit-btn{
                                width: 3.5rem;
                            }
                            .signed{
                                color: #fff;
                                background: #ff0000;
                            }
                        }
                        .unSigned{
                            .start-btn{
                                background: #ff0000;
                            }
                            .exit-btn{
                                background: #ff8338;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>