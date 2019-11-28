export const reg_phone = /^(1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8})$/;
//密码正则
export const reg_pwd = /^(?![a-zA-Z]+$)(?!\d+$)(?![\W_]+$)\S{6,20}$/;
//图片地址域名
export const BASE_URL='http://39.100.155.1:8081';
//每页显示条数
export const pageSize=10;
export const mapKey='d02ce754ffe9c4a719a3ec20212d904c';
/**
 * 模态框开关切换
*/
export const toggleModal=(msg)=>{
    var modal=document.createElement("div");
    modal.className="error-block";
    var child=document.createElement("span");
    child.className="error-txt";
    modal.appendChild(child);
    child.innerHTML=msg;
    document.body.appendChild(modal);
    modal.style.opacity="1";
    setTimeout(function(){
        child.innerHTML="";
        modal.style.opacity="0";
        setTimeout(function(){
            document.body.removeChild(modal);
        },500);
    },1000);
}

/**
 * ios 软键盘bug, dom高度重计算
 */
export const reCalHeight=()=>{
    setTimeout(function (){
       var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
       window.scrollTo(0, Math.max(scrollHeight - 1, 0));
    }, 100);
}

export const formatTime=(dateArr)=>{
    let year=dateArr[0];
    let month=dateArr[1]
    let day=dateArr[2];
    let hour=dateArr[3];
    let min=dateArr[4];
    let sec=dateArr[5];
    return `${year}-${month}-${day}  ${hour}:${min}:${sec}`;
}

export const tranStamp=(dateStr)=>{//将日期字符串转为时间戳
    let dateTmp = dateStr.replace(/-/g,'/')   //为了兼容IOS，需先将字符串转换为'2018/9/11 9:11:23'
    return Date.parse(dateTmp)                 //返回'2018-9-12 9:11:23'的时间戳
}

export const resetObject=(oldObjectStr,newObject)=>{
    let objects={};
    let oldObject=JSON.parse(localStorage.getItem(oldObjectStr));
    objects=Object.assign({},oldObject,newObject);
    localStorage.setItem(oldObjectStr,JSON.stringify(objects));
    return objects; 
}
