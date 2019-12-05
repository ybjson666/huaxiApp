<template>
  <div class='volu-container'>
      <head-bar title="我的志愿团队"/>
      <div class="volun-contents">
          <div class="type-bar block">
              <ul class="type-list">
                    <li v-for="(item,index) in typeList" :key="index" @click="seleType(item.type)" :class="{on:curType===item.type}">
                        <span>{{item.name}}</span>
                    </li>
              </ul>
          </div>
          <div class="team-wraper">
                <Scroller
                    @scrolling="scrolling" 
                    @touchEnded="touchEnded" 
                    :pullUpMsg="pullUpMsg"
                    :pullDownMsg="pullDownMsg"
                    :isPullUpLoading="isPullUpLoading"
                    :isPullDownLoading="isPullDownLoading"
                    :isFresh="isFresh"
                    :isShowUp="isShowUp"
                >
                    <ul class="team-list">
                        <li v-for="(item,index) in teamList" :key="index">
                            <div class="team-pic"><img :src="item.pic" alt=""></div>
                            <div class="team-infos">
                                <h2 class="team-name">{{item.team_name}}</h2>
                                <p v-if="item.team_type==='软件开发'" class="team-type blue">软件开发</p>
                                <p v-else-if="item.team_type==='医疗救助'" class="team-type orange">医疗救助</p>
                                <p v-else-if="item.team_type==='公益活动'" class="team-type green">公益活动</p>
                                <p class="time-tags">加入时间：</p>
                                <p class="add-time">{{item.add_time}}</p>
                                <span class="join" v-if="item.isJoind==='待确认'">确认加入</span>
                                <span class="isJoind joined" v-if="item.isJoind==='已加入'">已加入</span>
                                <span class="isJoind unJoin" v-else-if="item.isJoind==='待确认'">待确认</span>
                            </div>
                        </li>
                    </ul>
                </Scroller>
          </div>
      </div>
  </div>
</template>

<script>
import Scroller from '@/components/Scroller';
import HeadBar from '@/components/HeadBar'
export default {
name:'volunTeam',
    data () {
        return {
            curType:"1",
            typeList:[
                {
                    name:"全部",
                    type:"1"
                },
                {
                    name:"待确认",
                    type:"2"
                },
                {
                    name:"已添加",
                    type:"3"
                }
            ],
            isFresh:false,
            isShowUp:true,
            isPullUpLoading:false,
            isPullDownLoading:false,
            pullUpMsg:"上拉加载更多",
            pullDownMsg:"下拉刷新",
            teamList:[
                {
                    id:"1",
                    pic:require('../assets/images/team_pic.png'),
                    team_name:"高新区实践站",
                    team_type:"软件开发",
                    add_time:"2019-06-15 10:30:22",
                    isJoind:"已加入"
                },
                {
                    id:"2",
                    pic:require('../assets/images/team_pic.png'),
                    team_name:"流浪动物寻家救助站",
                    team_type:"医疗救助",
                    add_time:"2019-06-15 10:30:22",
                    isJoind:"待确认"
                },
                {
                    id:"3",
                    pic:require('../assets/images/team_pic.png'),
                    team_name:"慰问养老院敬老院活动",
                    team_type:"公益活动",
                    add_time:"2019-06-15 10:30:22",
                    isJoind:"已加入"
                },
                {
                    id:"4",
                    pic:require('../assets/images/team_pic.png'),
                    team_name:"高新区实践站",
                    team_type:"软件开发",
                    add_time:"2019-06-15 10:30:22",
                    isJoind:"已加入"
                },
                {
                    id:"5",
                    pic:require('../assets/images/team_pic.png'),
                    team_name:"高新区实践站",
                    team_type:"软件开发",
                    add_time:"2019-06-15 10:30:22",
                    isJoind:"待确认"
                },
                {
                    id:"6",
                    pic:require('../assets/images/team_pic.png'),
                    team_name:"高新区实践站",
                    team_type:"软件开发",
                    add_time:"2019-06-15 10:30:22",
                    isJoind:"已加入"
                },
                {
                    id:"7",
                    pic:require('../assets/images/team_pic.png'),
                    team_name:"高新区实践站",
                    team_type:"软件开发",
                    add_time:"2019-06-15 10:30:22",
                    isJoind:"已加入"
                },
                {
                    id:"8",
                    pic:require('../assets/images/team_pic.png'),
                    team_name:"高新区实践站",
                    team_type:"软件开发",
                    add_time:"2019-06-15 10:30:22",
                    isJoind:"已加入"
                }
            ]
        };
    },
    components: {
        HeadBar,
        Scroller
    },
    computed:{},
    mounted(){},
    methods: {
        seleType(type){
            this.curType=type;
            },
        touchEnded(pos,scroll){
            if(pos.y>60){
                this.refreshData();
            }else if(pos.y<scroll.maxScrollY-30){
                this.loadMore();
            }
        },
        scrolling(pos){
            if(pos.y>60){
                this.isPullDownLoading=true;
            }
        },
        refreshData(){
            setTimeout(()=>{
                this.isPullDownLoading=false;
                this.isFresh=true;
                setTimeout(()=>{
                    this.isFresh=false;
                },1000)     
            },1000)
        },
        loadMore(){
            this.isPullUpLoading=true;
            setTimeout(()=>{
                this.isPullUpLoading=false;
            },1000)
        },
    }
}

</script>
<style lang='scss' scoped>
.volu-container{
    height: 100%;
    .volun-contents{
        height: calc(100% - 2.5rem);
        background: #f0f0f0;
        .type-bar{
            height: 2rem;
            .type-list{
                display: flex;
                li{
                    flex: 1;
                    line-height: 2rem;
                    text-align: center;
                    span{
                        color: #333;
                        font-size: .75rem;
                        display: inline-block;
                        height: 1.9rem;
                    }
                }
                .on{
                    span{
                        color: #ff0000;
                        border-bottom: 2px solid #ff0000;
                    }
                }
            }
        }
        .team-wraper{
            margin-top: .5rem;
            height: calc(100% - 2.5rem);
            position: relative;
            .team-list{
                li{
                    background: #fff;
                    padding: .8rem .5rem;
                    box-sizing: border-box;
                    margin-bottom: .5rem;
                    display: flex;
                    font-size: .6rem;
                    &:last-child{
                        margin: 0;
                    }
                    .team-pic{
                        width: 4.8rem;
                        height: 4.8rem;
                        border-radius: 3px;
                        overflow: hidden;
                        margin-right: .4rem;
                        img{
                            height: 100%;
                        }
                    }
                    .team-infos{
                        flex: 1;
                        height: 4.8rem;
                        position: relative;
                        .team-name{
                            font-size: .75rem;
                            color: #000;
                            font-weight: normal;
                        }
                        .team-type{
                            border-radius:.8rem;
                            color: #fff;
                            width: 3.75rem;
                            height: 1.25rem;
                            line-height: 1.25rem;
                            text-align: center;
                            margin: .3rem 0; 
                        }
                        .blue{
                            background: #78cafe;
                        }
                        .orange{
                            background: #feda78
                        }
                        .green{
                            background: #96df79;
                        }
                        .isJoind{
                            position: absolute;
                            right:0;
                            top:0
                        }
                        .unJoin{
                            color: #ff8338;
                        }
                        .join{
                            position: absolute;
                            display: block;
                            width: 4rem;
                            height: 1.5rem;
                            line-height: 1.5rem;
                            text-align: center;
                            color: #fff;
                            background: #ff0000;
                            border-radius: .8rem;
                            right: 0;
                            bottom: 0;
                        }
                        .time-tags{
                            margin-top: .7rem;
                        }
                    }
                }
            }
        }
    }
}
</style>