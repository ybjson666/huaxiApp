import { SET_USER,
    SET_TOKEN,
    SET_UID,
    SET_SERVICE_TYPE,
    SET_BACKGROUNDS,
    SET_SERVAREA,
    SET_CITYS
} from './mutation_types';


export default{
    [SET_USER](state,user){
        state.userInfo=user
    },
    [SET_TOKEN](state,token){
        state.token=token
    },
    [SET_UID](state,uid){
        state.uid=uid
    },
    [SET_SERVICE_TYPE](state,list){
        state.serviceTypes=list;
    },
    [SET_BACKGROUNDS](state,list){
        state.personBackgrounds=list;
    },
    [SET_SERVAREA](state,list){
        state.servAreas=list;
    },
    [SET_CITYS](state,list){
        state.cityDatas=list;
    },
    
}
