import { SET_CONVERT_LIST,
        SET_SCORE_USED_LIST,
        REFRESH_CONVERT_LIST,
        SET_SCORE_LIST,
        REFRESH_SCORE_LIST
} from './mutation_types';

export default{
    [SET_CONVERT_LIST](state,list){
        state.convertList=state.convertList.concat(list)
    },
    [SET_SCORE_USED_LIST](state,list){
        state.scoreUsedList=state.scoreUsedList.concat(list)
    },
    [REFRESH_CONVERT_LIST](state,list){
        state.convertList=list
    },
    [SET_SCORE_LIST](state,list){
        state.scoreList=state.scoreList.concat(list)
    },
    [REFRESH_SCORE_LIST](state,list){
        state.scoreList=list
    },
}
