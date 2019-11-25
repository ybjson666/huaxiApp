<template>
  <div class='home-container'>
      <h2>首页</h2>
      <div class="map" id="map"></div>
  </div>
</template>

<script>
import MapLoader from '../utils/aMap'
export default {
name:'home',
  data () {
    return {

    }
  },
  methods:{
    onComplete(obj){
      console.log(obj)
        var res = '经纬度：' + obj.position + 
                '\n精度范围：' + obj.accuracy + 
                '米\n定位结果的来源：' + obj.location_type + 
                '\n状态信息：' + obj.info + 
                '\n地址：' + obj.formattedAddress + 
                '\n地址信息：' + JSON.stringify(obj.addressComponent, null, 4);
        console.log(res);
    },
    onError(obj) {
        alert(obj.info + '--' + obj.message);
        console.log(obj);
    }
  },
  mounted(){
    let that=this;
    MapLoader().then(AMap => {
      var map = new AMap.Map('map');

      map.plugin('AMap.Geolocation', function () {
       
       var geolocation = new AMap.Geolocation({
            enableHighAccuracy: true, // 是否使用高精度定位，默认:true
            timeout: 10000,           // 超过10秒后停止定位，默认：无穷大
            maximumAge: 0,            // 定位结果缓存0毫秒，默认：0
            convert: true,            // 自动偏移坐标，偏移后的坐标为高德坐标，默认：true
            showButton: true,         // 显示定位按钮，默认：true
            buttonPosition: 'LB',     // 定位按钮停靠位置，默认：'LB'，左下角
            buttonOffset: new AMap.Pixel(10, 20), // 定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            showMarker: true,         // 定位成功后在定位到的位置显示点标记，默认：true
            showCircle: true,         // 定位成功后用圆圈表示定位精度范围，默认：true
            panToLocation: true,      // 定位成功后将定位到的位置作为地图中心点，默认：true
            zoomToAccuracy:true       // 定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        });
       
        map.addControl(geolocation);
        
        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, 'complete', that.onComplete); // 返回定位信息
        AMap.event.addListener(geolocation, 'error', that.onError);       // 返回定位出错信息
    });
    }, e => {
      console.log('地图加载失败' ,e)
    })
  }
}

</script>
<style lang='scss' scoped>
.map{
  height: 200px;
}
</style>