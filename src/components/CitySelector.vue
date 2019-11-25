<template>
  <div class="picker">
    <div class="gearArea" v-show="show"></div>
  </div>
</template>
<script>
  import Picker from '../utils/pickr'
  import dat from '../utils/cityData'
  import "../assets/css/picker.css"
  export default {
    name: 'picker',
    props: {
      datas: {
        type: Array,
        default () {
          return dat
        }
      },
      column: {
        type: Number,
        default: 3
      },
      show:{
        type:Boolean,
        default:false
      },
      idName:{
        type:String,
        default:""
      }
    },
   
    mounted() {
      
      this.render()
    },
    methods: {
      render() {
        const _this = this
        this.picker = new Picker()
        this.picker.init({
          'trigger': `#${this.idName}`,
          'keys': {
            id: 'id',
            name: 'name'
          },
          'data': _this.datas,
          'column': _this.column
        })
      }
    }
  }

</script>


