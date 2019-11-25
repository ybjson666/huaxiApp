<template>
  <div class='caption-container'>
      <div class="caption-wraps">
          <span class="disc-wraps left-warps">
              <span class="disc left-disc"></span>
          </span>
          <span class="cap-title">{{captionTxt}}</span>
          <span class="disc-wraps right-warps">
              <span class="disc right-disc"></span>
          </span>
      </div>
      
  </div>
</template>

<script>
export default {
name:'captions',
 props:{
     captionTxt:String
 }
}

</script>
<style lang='scss' scoped>
.caption-container{
    height: 100%;
    text-align: center;
    background: #fff;
    .caption-wraps{
        display: flex;
        width: 10rem;
        margin: 0 auto;
        height: 3rem;
        .cap-title{
            line-height: 3rem;
            flex: 1;
            text-align: center;
            font-size: .8rem;
            color: #000;
        }
        .disc-wraps{
            flex: 1;
            line-height: 3rem;
            .disc{
                width: .3rem;
                height: .3rem;
                display: inline-block;
                position: relative;
                background: #666;
                border-radius: 50%;
            }
            .left-disc:after{
                content: "";   
                position: absolute;
                width: 2.5rem;
                height: 1px;
                background: #000;
                top:.15rem;
                left: .35rem;
                display: block;
            }
            .right-disc::before{
                content: "";   
                position: absolute;
                width: 2.5rem;
                height: 1px;
                background: #000;
                top:.15rem;
                right: .35rem;
                display: block;
            }
        }
        .left-warps{
            text-align: left;
        }
        .right-warps{
            text-align: right;
        }
        

    }
}
</style>