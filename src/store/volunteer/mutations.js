import { 
    SET_VOT_list,
    SET_DEFAULT_VOT_list,
    SET_ACTV_INFO,
    SET_DEFAULT_SIGN_list,
    SET_SIGN_LIST,
    set_SIGNIN_LIST,
    set_SIGNOUT_LIST,
    SET_ACTV_list,
    SET_DEFAULT_ACTV_list,
    SET_CANCEL_ACTV_list
} from './mutation_types';

export default{
    [SET_VOT_list](state,list){
        state.votList=state.votList.concat(list);
    },
    [SET_DEFAULT_VOT_list](state,list){
        state.votList=list
    },
    [SET_ACTV_INFO](state,actvInfo){
        state.actvInfo=actvInfo
    },
    [SET_SIGN_LIST](state,list){
        state.signList=state.signList.concat(list);
    },
    [SET_DEFAULT_SIGN_list](state,list){
        state.signList=list
    },
    [set_SIGNIN_LIST](state,id){//签到
        state.signList=state.signList.map(item=>{
            if(item.ActivityRecruit.activityrecruitid==id){
                item.state='2'
            }
            return item;
        })
    },
    [set_SIGNOUT_LIST](state,id){//签退
        state.signList=state.signList.map(item=>{
            if(item.ActivityRecruit.activityrecruitid==id){
                item.state='3'
            }
            return item;
        })
    },
    [SET_ACTV_list](state,list){
        state.actvList=state.actvList.concat(list);
    },
    [SET_DEFAULT_ACTV_list](state,list){
        state.actvList=list
    },
    [SET_CANCEL_ACTV_list](state,id){//取消申请
        // state.actvList=state.actvList.filter(item=>item.activityrecruitid!=id)
        state.actvList=state.actvList.map(item=>{
            if(item.activityrecruitid==id){
                item.applyState='4'
            }
            return item;
        })
    }
}
