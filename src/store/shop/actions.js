import { getConvert,getScoreList} from '../../utils/api';
import { SET_CONVERT_LIST,
    REFRESH_CONVERT_LIST,
    SET_SCORE_LIST,
    REFRESH_SCORE_LIST
} from './mutation_types';

export default {
    async req_convert({commit},[data,isRefresh,callBack]){
        const res=await getConvert(data);
        if(res.state===200){
            const result=res.data;
            if(isRefresh){
                commit(REFRESH_CONVERT_LIST,result)
            }else{
                commit(SET_CONVERT_LIST,result)
            }
        }
        callBack(res)
    },
    async req_scoreList({commit},[data,isRefresh,callBack]){//获取用户积分历史

        const res=await getScoreList(data);
        if(res.state===200){
            const result=res.data.list;
            if(isRefresh){
                commit(REFRESH_SCORE_LIST,result)
            }else{
                commit(SET_SCORE_LIST,result)
            }
        }
        callBack(res)
    }
       
}