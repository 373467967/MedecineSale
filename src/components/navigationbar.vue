<template>
<ul class="navigationbar">
    <Icon class="goback-btn" @click="gohomeClick" v-if="goback" size='25' type="ios-arrow-back"></Icon>
    <h3 class="title">{{this.$store.state.title}}</h3>
</ul>
</template>

<script>
export default {
    name:'NavigationBar',
    props:{
        goback:{
            type:Boolean,
            default:false
        }
    },
    methods:{
        gohomeClick(){
            this.$router.go(-1)
        }
    }
}
</script>

<style scoped>
.navigationbar{
    height: 64px;
    background: rgba(6, 117, 243, 0.644);
    color: #fff;
    position: relative;
}
.goback-btn{
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
}
.title{
    text-align: center;
    line-height: 64px;
    letter-spacing: 5px;
}
</style>