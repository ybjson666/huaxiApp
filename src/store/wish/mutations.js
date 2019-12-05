import { SET_WISH_LIST,SET_DEFAULT_WISH_LIST,SET_WISH,CANCEL_WISH} from './mutation_types';

export default{
    [SET_WISH_LIST](state,list){
        state.wishList=state.wishList.concat(list);
    },
    [SET_DEFAULT_WISH_LIST](state,list){
        state.wishList=list
    },
    [SET_WISH](state,wish){
        state.wishInfo=wish
    },
    [CANCEL_WISH](state,id){
        state.wishList=state.wishList.map(item=>{
            if(item.wishid==id){
                item.state='4'
            }
            return item;
        })
    },
}
