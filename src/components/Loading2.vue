<template>
    <div class="loading-wrapper">
        <div class="loader"></div>
        <slot name="contents"></slot>
    </div>
</template>

<script>
export default {
  name:'loading',
}
</script>
<style lang="scss" scoped>
.loading-wrapper{
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    position: absolute;
    z-index: 20;
    left: 0;
    top:0;
    background:rgba(0,0,0,.8);
}
.loader{
    position: relative;
    width: 2.5rem;
    height: 2.5rem;
    transform: rotate(165deg);
    margin: 0 auto;
}
.loader:before, .loader:after{
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    display: block;
    width: .5rem;
    height: .5rem;
    border-radius: .25rem;
    transform: translate(-50%,-50%);
}
.loader:before{
    animation: before 2s infinite;
}
.loader:after{
    animation: after 2s infinite;
}
@keyframes before {
    0%{
        width: .5rem;
        box-shadow: 1rem -.5rem rgba(225,20,98,.75), -1rem .5rem rgba(111,202,220,.75);
    }
    35%{
        width: 2.5rem;
        box-shadow: 0rem -.5rem rgba(225,20,98,.75), 0 .5rem rgba(111,202,220,.75);
    }
    70%{
        width: .5rem;
        box-shadow: -1rem -.5rem rgba(225,20,98,.75), 1rem .5rem rgba(111,202,220,.75);
    }
    100%{
        box-shadow: 1rem -.5rem rgba(225,20,98,.75), -1rem .5rem rgba(111,202,220,.75);
    }
}

@keyframes after {
    0%{
        height: .5rem;
        box-shadow: .5rem 1rem rgba(61,184,143,.75), -.5rem -1rem rgba(233,169,32,.75);
    }
    35%{
        height: 2.5rem;
        box-shadow: .5rem 0 rgba(61,184,143,.75), -.5rem 0 rgba(233,169,32,.75);
    }
    70%{
        height: .5rem;
        box-shadow: .5rem -1rem rgba(61,184,143,.75), -.5rem -1rem rgba(233,169,32,.75);
    }
    100%{
        box-shadow: .5rem 1rem rgba(61,184,143,.75), -.5rem -1rem rgba(233,169,32,.75);
    }
}
</style>