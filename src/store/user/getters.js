export default{
    educations:(state)=>{
        return state.personBackgrounds.filter(item=>item.DictType==='JYXL');
    },
    politicls:(state)=>{
        return state.personBackgrounds.filter(item=>item.DictType==='ZZMM');
    }
}