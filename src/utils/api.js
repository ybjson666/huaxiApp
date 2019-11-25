import {$post,$get} from './request';



/*获取验证码*/
export const getVerifyCode=(phone)=>{
    return $get(`/customer/api/registersms?phone=${phone}&tenantid=default&stag=A`)
}
/*注册*/
export const regist= (data)=>{
    return $post(`/customer/api/register`,data)
}
/*登录*/
export const login=(data)=>{
    return $post(`/customer/api/login`,data)
}
/*修改密码*/
export const modifyPwd=async (data)=>{
    return $post(`/customer/api/mpass`,data)
}
/*上传图片*/
export const upLoads=async (data)=>{
    return $post(`/picture/api/upload`,data)
}
/*修改用户信息*/
export const resetUser=async (data)=>{
    return $post(`/customer/api/modifyinfo`,data)
}
/*修改头像*/
export const resetUserPic=async (data)=>{
    return $post(`/customer/api/uploadFace`,data)
}
/*获取用户信息*/
export const getUser=async ()=>{
    return $post(`/customer/api/show`)
}
/*获取用户积分兑换记录*/
export const getConvert=async (data)=>{
    return $post(`/customer/api/exchanges`,data)
}
/*获取用户积分历史记录*/
export const getScoreList=async (data)=>{
    return $post(`/customer/api/scores`,data)
}
/*获取服务类型*/
export const getServiceType=async ()=>{
    return $post(`/other/api/servertype`)
}
/*获取学历和政治*/
export const getEducation=async ()=>{
    return $get(`/dict/api/all`)
}
/*获取服务区域*/
export const getServArea=async ()=>{
    return $post(`/other/api/serverarea`)
}
/*获取心愿列表*/
export const getWishs=async (data)=>{
    return $post(`/wish/api/list`,data)
}
/*发布心愿列表*/
export const pubWishs=async (data)=>{
    return $post(`/wish/api/addWish`,data)
}
/*获取心愿详情*/
export const getWishInfo=async (data)=>{
    return $post(`/wish/api/info`,data)
}
/*获取志愿者活动列表*/
export const getVots=async (data)=>{
    return $post(`/activityRecruit/api/list`,data)
}
/*获取志愿活动详情*/
export const getActvInfo=async (id)=>{
    return $get(`/activityRecruit/api/info?id=${id}`)
}