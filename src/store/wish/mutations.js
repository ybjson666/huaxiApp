import { SET_WISH_list,SET_DEFAULT_WISH_list,SET_WISH} from './mutation_types';

export default{
    [SET_WISH_list](state,list){
        state.wishList=state.wishList.concat(list);
    },
    [SET_DEFAULT_WISH_list](state,list){
        state.wishList=list
    },
    [SET_WISH](state,wish){
        state.wish=wish
    },
}
