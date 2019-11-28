import { getWishs,getWishInfo} from '../../utils/api';

import { SET_WISH_LIST,SET_DEFAULT_WISH_LIST,SET_WISH} from './mutation_types';

export default {
    async req_Wish({commit},[data,isFresh,callBack]){//获取心愿列表
        const res=await getWishs(data);
        if(res.state===200){
            const list=res.data;
            if(isFresh){
                commit(SET_DEFAULT_WISH_LIST,list);
            }else{
                commit(SET_WISH_LIST,list);
            }
            
        }
        callBack(res)
    },
    async req_WishInfo({commit},[data,callBack]){//获取心愿详情
        const res=await getWishInfo(data);
        if(res.state===200){
            const wish=res.data;
            commit(SET_WISH,wish);
        }
        callBack(res)
    }
}