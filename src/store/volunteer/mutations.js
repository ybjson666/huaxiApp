import { SET_VOT_list,SET_DEFAULT_VOT_list,SET_ACTV_INFO} from './mutation_types';

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
}
