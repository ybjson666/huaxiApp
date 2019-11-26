import { getVots,getActvInfo,signList,actvList} from '../../utils/api';

import { 
    SET_VOT_list,
    SET_DEFAULT_VOT_list,
    SET_ACTV_INFO,
    SET_DEFAULT_SIGN_list,
    SET_SIGN_LIST,
    SET_ACTV_list,
    SET_DEFAULT_ACTV_list
} from './mutation_types';

export default {
    async req_Vots({commit},[data,isFresh,callBack]){//获取志愿活动列表
        const res=await getVots(data);
        if(res.state===200){
            const list=res.data;
            if(isFresh){
                commit(SET_DEFAULT_VOT_list,list);
            }else{
                commit(SET_VOT_list,list);
            }
            
        }
        callBack(res)
    },
    async req_actvInfo({commit},[id,cumId,callBack]){//获取志愿活动详情
        const res=await getActvInfo(id,cumId);
        if(res.state==200){
            const result=res.data;
            const {state,ActivityInfo}=result;
            let isApply=state;
            let actv={...ActivityInfo,isApply}
            commit(SET_ACTV_INFO,actv);
        }
        callBack(res)
    },
    async req_signs({commit},[data,isFresh,callBack]){//获取志愿者签到列表
        const res=await signList(data);
        if(res.state===200){
            const list=res.data;
            if(isFresh){
                commit(SET_DEFAULT_SIGN_list,list);
            }else{
                commit(SET_SIGN_LIST,list);
            }
        }
        callBack(res)
    },
    async req_actvs({commit},[data,isFresh,callBack]){//获取个人中心我的活动列表
        const res=await actvList(data);
        if(res.state===200){
            const list=res.data;
            if(isFresh){
                commit(SET_DEFAULT_ACTV_list,list);
            }else{
                commit(SET_ACTV_list,list);
            }
            
        }
        callBack(res)
    },
}