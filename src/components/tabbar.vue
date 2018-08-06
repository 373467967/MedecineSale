<template>
 <div class="tabBar">
       <!-- 游标 -->
    <div class="cursor" :style="{'left':this.$store.state.left}"></div>
    <ul class="tabBar-list">
        <li class="item" v-for='(link,idx) in links' :key='idx'>
            <Icon class="icon" :type="types[idx]" size='25' color='#fff'></Icon>
            <router-link :to='link.href'>
                {{link.title}}
            </router-link>
        </li>
    </ul>
 </div>
</template>

<script>
export default {
    name:'TabBar',
    data(){
        return{
            types: [
                'ios-home',
                'md-medkit',
                'ios-cart',
                'ios-person'
            ],
            links:[
                {
                    title:'主页',
                    href:'/'
                },
                 {
                    title:'分类',
                    href:'/classify'
                },
                 {
                    title:'购物车',
                    href:'/shoppingcar'
                },
                 {
                    title:'我的',
                    href:'/mine'
                }
            ]
        }
    }
}
</script>

<style scoped>
.tabBar{
      height: 49px;
      position: relative;
      background: rgba(6, 117, 243, 0.644);
}

.cursor{
    width: 25%;
    height: 49px;
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(13, 119, 240, 0.644);
}
.tabBar-list{
     height: 49px;
}
.item{
    padding: 3px 0;
    width: 25%;
    height: 100%;
    background-color: transparent;
    cursor: pointer;
    float: left;
    position: relative;
}
.item .icon{
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;
}
.item a{
    width: 100%;
    height: 100%;
    color: #fff;
    font-size: 11px;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    position: relative;
    z-index: 10;
}
</style>