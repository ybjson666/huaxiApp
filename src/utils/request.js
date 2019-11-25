import axios from 'axios';



// const isDev=process.env.NODE_ENV==='development';
// const baseUrl="http://39.100.155.1:8081/spider-newera";
 
var baseUrl = process.env.API_ROOT;

const service=axios.create({
    baseURL:baseUrl
})

// const service=axios.create();

service.interceptors.request.use((config)=>{
    
    config.data=Object.assign({},config.data,{
        access_token:localStorage.getItem('appToken')||"",
        uid:localStorage.getItem('uid')||"",
        tenantid:'default',
        stag:'A'
    })
    return config
})
service.interceptors.response.use((res)=>{
    return res.data;
    // if(res.data.state===200){//统一处理状态码，体验不好，改为手动处理
    //     if(res.data.data&&res.data.data.l){
    //         return res.data;
    //     }else{
    //         toggleModal(res.data.message)
    //         return res.data;
    //     }  
    // }else{
    //     if(res.data.message){
    //         toggleModal(res.data.message)
    //     }
    // }
})
export const $post=(url,data)=>{
     return service({
         method:'post',
         url,
         data,
         transformRequest:[function (data) {//将默认提交方式改为formData形式
            let ret = ''
            for (let it in data) {
                ret += encodeURIComponent(it) + '='+ encodeURIComponent(data[it]) + '&'
            }
            return ret
        }],
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
}

export const $get=(url)=>{
    return service({method:'get',url,headers:{
        access_token:localStorage.getItem('appToken')||"",
        uid:localStorage.getItem('uid')||"",
        tenantid:'default',
        stag:'A'
    }})
}