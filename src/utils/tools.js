export const reg_phone = /^(1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8})$/;
//密码正则
export const reg_pwd = /^(?![a-zA-Z]+$)(?!\d+$)(?![\W_]+$)\S{6,20}$/;
//图片地址域名
export const BASE_URL='http://39.100.155.1:8081';
//每页显示条数
export const pageSize=10;
export const mapKey='d02ce754ffe9c4a719a3ec20212d904c';
/**判断是否是英文 */
export const isEn = new RegExp("[A-Za-z]+");
//身份证正则
export const reg_idCard=/^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|31)|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}([0-9]|x|X)$/;
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


/*加载更多数据*/
export const loadMoreData=(that,actions,data)=>{
    that.isPullUpLoading=true;
    actions([data,false,data=>{
        if(data.state===200){
            if(data.data.length){
                that.pageNo++;
            }else{
                that.pullUpMsg="没有更多数据了~";
            }
            setTimeout(()=>{
                that.isPullUpLoading=false;
            },600);   
        }else if(data.state===700004){
            toggleModal(data.message);
            setTimeout(()=>{
            that.$router.push('/login');
            },1000);
        }else{
            toggleModal(data.message);
            setTimeout(()=>{
                that.isPullUpLoading=false;
            },600);
        }
    }])
}

/**获取数据 */
export const fetchSyncDatas=(that,actions,data,callBack)=>{
    that.pullUpMsg="上拉加载更多数据";
    that.isLoading=true;
    actions([data,true,data=>{
        if(data.state===200){
            if(data.data &&data.data.length){
                that.pageNo++;
            }
            that.$nextTick(()=>{
                setTimeout(()=>{
                    that.isLoading=false;
                    callBack(data);
                },500);
            })
        }else if(data.state===700004){
            toggleModal(data.message);
            that.isLoading=false;
            setTimeout(()=>{
                that.$router.push('/login');
            },1000);
                
        }else{
            that.isLoading=false;
            toggleModal(data.message)
        }
    }])
}

/**刷新数据 */
export const ReFreshDatas=(that,actions,data,callBack)=>{
    that.pullUpMsg="上拉加载更多数据";
    that.isLoading=true;
    actions([data,true,data=>{
        if(data.state===200){
            if(data.data&&data.data.length){
                that.pageNo++;
            }
            that.isLoading=false;
            setTimeout(()=>{
                that.isFresh=true;
                that.$nextTick(()=>{
                    setTimeout(()=>{
                        that.isFresh=false;
                        that.isPullDownLoading=false;
                        callBack(data);
                    },1000);
                })
            },500)
        }else if(data.state===700004){
            toggleModal(data.message);
            that.isLoading=false;
            setTimeout(()=>{
                that.$router.push('/login');
            },1000);
        }else{
            toggleModal(data.message);
            setTimeout(()=>{
                that.isFresh=true;
                setTimeout(()=>{
                    that.isFresh=false;
                },1000)
            },500);
        }
    }])
}


/**图片大小限制 */
export const maxPicFile=(file)=>{
    var fileMaxSize = 1024;//1M
    if(file){
        var size = Math.ceil(file.size / 1024);
        if (size > fileMaxSize) {
            toggleModal("文件大小不能大于1M！");
            return false;
        }else if (size <= 0) {
            toggleModal("文件大小不能为0M！");
            return false;
        }else{
            return true;
        }
    }else{
        return false;
    }
}