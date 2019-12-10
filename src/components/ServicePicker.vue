<template>
    <div class='picker-container'>
        <mt-popup
            v-model="show"
            position="bottom"
            popup-transition="popup-fade"
            class="popuer"
            :closeOnClickModal="false"
        >
          <mt-picker 
            :slots="slots" 
            @change="onValuesChange" 
            :showToolbar="true"
            >
            <div class="picker-title-bar">
                <span class="cancel-btn" @click="closeFrame">取消</span>
                <h2 class="picker-title">{{title}}</h2>
                <span class="sure-btn" @click="sureChoose">确定</span>
            </div>
            </mt-picker>
        </mt-popup>
    </div>
</template>

<script>
import { Picker, Popup } from 'mint-ui';
export default {
name:'pickers',
    data () {
        return {
          seleId:""
        };
    },
    props:{
        dataSource:{
            type:Array,
            default:[]
        },
        title:String,
        show:{
            type:Boolean,
            default:false
        }
    },
    computed:{
        slots(){
            let arr=[
                {
                    flex:1,
                    values:[],
                    className: 'slot1',
                    textAlign: 'center'
                }
            ];
            arr[0].values=this.dataSource.map(item=>(item.dictionaryValue))
            return arr;
        }
    },
    methods: {
        closeFrame(){
            this.$emit('closeFrame');
        },
        onValuesChange(picker, values){
           this.dataSource.forEach(item=>{
               if(item.dictionaryValue==values[0]){
                   this.seleId=item.dictionaryId;
                   return;
               }
           })
        },
        sureChoose(){
            this.$emit('chooseItem',this.seleId)
        } 
    }
}

</script>
