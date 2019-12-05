<template>
  <div class='upload-loading-container'>
      <div class="upload-wraper">
          <div class="upload-pic" :style="{width:`${size}rem`,height:`${size}rem`}">
                <div class='loader-ring'>
                    <div class='loader-ring-light'></div>
                    <div class='loader-ring-track'></div>
                </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    props:{
        size:{
            type:Number,
            default:2
        }
       
    }
}

</script>
<style lang='scss' scoped>
    .upload-loading-container{
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        z-index: 50;
        background-color: rgba(0, 0, 0, 0.8);
        .upload-wraper{
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            .upload-pic{
                position: relative;
                    .loader-ring {
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translateX(-50%) translateY(-50%);
                        width: 100%;
                        height: 100%;
                    }

                    .loader-ring-light {
                        width: 100%;
                        height: 100%;
                        border-radius: 100%;
                        box-shadow: 0 .1rem 0 #00abf2 inset;
                        animation: rotate-360 2s linear infinite;
                    }

                    .loader-ring-track {
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        border-radius: 100%;
                        box-shadow: 0 0 10px 4px rgba(0, 0, 0, 0.3) inset;
                    }

                    @keyframes rotate-360 {
                    from {
                        -moz-transform: rotate(0);
                        -ms-transform: rotate(0);
                        -webkit-transform: rotate(0);
                        transform: rotate(0);
                    }
                    to {
                        -moz-transform: rotate(360deg);
                        -ms-transform: rotate(360deg);
                        -webkit-transform: rotate(360deg);
                        transform: rotate(360deg);
                    }
                }
            }
        }
    }
</style>