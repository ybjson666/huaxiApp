<template>
    <div class="loading-wrapper">
        <div class="loader"><img src="../assets/images/loding.gif" alt=""></div>
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
    background:rgba(255,255,255,1);
}
.loader{
    width: 3.5rem;
    height: 3.5rem;
    margin: 0 auto;
}

</style>