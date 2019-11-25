import { getVots,getActvInfo} from '../../utils/api';

import { SET_VOT_list,SET_DEFAULT_VOT_list,SET_ACTV_INFO} from './mutation_types';

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
    async req_actvInfo({commit},[data,callBack]){//获取志愿活动详情
        const res=await getActvInfo(data);
        if(res.state==200){
            const result=res.data;
            commit(SET_ACTV_INFO,result);
        }
        callBack(res)
    }
}