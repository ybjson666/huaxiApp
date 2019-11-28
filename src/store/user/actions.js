import { login,getUser,getServiceType,getEducation,getServArea,getCitys} from '../../utils/api';
import { SET_USER,
        SET_TOKEN,
        SET_UID,
        SET_SERVICE_TYPE,
        SET_BACKGROUNDS,
        SET_SERVAREA,
        SET_CITYS
} from './mutation_types';

function assignUser(result){
    const {sex,sourceType,userMobile,userName,userNick,userPic,userToken,id,groupName,groupId,birthday,realName}=result.r;
    const user_r={sex,sourceType,userMobile,userName,userNick,userPic,userToken,id,groupName,groupId,birthday,realName}
    const { education,email,areaid,idcardno,politicallevel,servicetype,servicearea,address,idcardfronturl,idcardbackurl,isvolunteer,customerid }=result.l;
    const user_l={ education,email,areaid,idcardno,politicallevel,servicetype,servicearea,address,idcardfronturl,idcardbackurl,isvolunteer,customerid }
    return Object.assign({},user_l,user_r);
}

export default {
    async req_login({commit},[data,callBack]){//登录
        const res=await login(data);
        if(res.state===200){
            const result=res.data;
            const {userToken,id}=result.r;
            const { customerid }=result.l;
            const user=assignUser(result);
                localStorage.setItem('appToken',userToken);
                localStorage.setItem('uid',id);
                localStorage.setItem('customerid',customerid);
            commit(SET_TOKEN,userToken);
            commit(SET_UID,id);
            commit(SET_USER,user);
        }
        callBack(res)
    },
    async req_getUser({commit},callBack){//获取用户信息
        const res=await getUser();
        if(res&&res.state===200){
            const result=res.data;
            const { customerid }=result.l;
            localStorage.setItem('customerid',customerid);
            const user=assignUser(result);
            commit(SET_USER,user);
        }
        callBack(res)
    },
    async req_getServices({commit},callBack){//获取服务类型
        const res=await getServiceType();
        if(res&&res.state===200){
            const result=res.data;
            const serviceList=result;
            commit(SET_SERVICE_TYPE,serviceList);
        }
        callBack(res)
    },
    async req_backgrounds({commit},callBack){//获取政治面貌、学历
        const res=await getEducation();
        if(res&&res.state===200){
            const result=res.data;
            const list=result;
            commit(SET_BACKGROUNDS,list);
        }
        callBack(res)
    },
    async req_servAreas({commit},callBack){//获取服务区域
        const res=await getServArea();
        if(res&&res.state===200){
            const result=res.data;
            const list=result;
            commit(SET_SERVAREA,list);
        }
        callBack(res)
    },
    async req_citys({commit},callBack){//获取行政区域
        const res=await getCitys();
        if(res&&res.state===200){
            const result=res.data.childAreaDtos;
            localStorage.setItem('cityDatas',JSON.stringify(result));
            commit(SET_CITYS,result);
        }
        callBack(res)
    }

}