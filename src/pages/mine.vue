<template>
   <div class="container">
        <NavigationBar/>
        <div class="content">
            <div class="myImg_box">
                <div class="opacity"></div>
                <div class="profile">
                </div>
                <p class="button" @click="goLogin" v-if="!isLogin" key="relogin">您还未登录,点击登录</p>
                <p class="state" v-if="isLogin" key="login">{{username}}</p>
            </div>
            <ul class="mine-list">
                <li class="personal" @click="goPersonal">个人资料 <Icon class="right" type="ios-arrow-forward" size="18" /></li>
                <li class="address" @click="goAddress">收货地址 <Icon class="right" type="ios-arrow-forward" size="18" /></li>
                <li>我的订单 <Icon class="right" type="ios-arrow-forward" size="18" /></li>
                <li>商品收藏 <Icon class="right" type="ios-arrow-forward" size="18" /></li>
                <li>店铺收藏 <Icon class="right" type="ios-arrow-forward" size="18" /></li>
                <li>浏览记录 <Icon class="right" type="ios-arrow-forward" size="18" /></li>
            </ul>
            <p @click="goExit" class="exit">退出登录</p>
        </div>
        <TabBar/>
   </div>
</template>

<script>
import NavigationBar from '../components/navigationbar'
import TabBar from '../components/tabbar'
import store         from '@/store'
export default {
    name:'Mine',
    data(){
        return{
            isLogin:true,
            username:'',
        }
    },
    created(){
        var current = Bmob.User.current();
        var currentUser = [];
        var $this = this;
        if(current == null){
            this.isLogin = false;
            currentUser = [];
        }else{
            var currentUser = current['attributes'];
            this.isLogin = true;
            let currentId = current.id,
            query = new Bmob.Query(Bmob.User);
            query.get(currentId,{
                success:function(user){
                    $this.username = currentUser.username;
                    store.commit('changeUser',currentUser);
                }
            })
        }
    },
    methods:{
        goLogin(){
            this.$router.push({
                name:'LoginRegister'
            })
        },
        goExit(){
            Bmob.User.logOut();
            this.isLogin = false;
        },
        goPersonal(){
            this.$router.push('Personal');
        },
        goAddress(){
            this.$router.push('Address')
        }
    },
    components:{
        TabBar,
        NavigationBar
    },
}
</script>

<style scoped>
.myImg_box{
    width: 100%;
    height: 180px;
    position: relative;
}
.opacity{
    width: 100%;
    height: 180px;
    position:absolute;
    top: 0;
    left: 0;
    opacity: .4;
    background: url('../../static/picture/cat.jpg')no-repeat center center;
    background-size: cover;
}
.profile{
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    width: 110px;
    height: 110px;
    border-radius: 50%;
    border: 1px solid rgb(44, 42, 42);
    background: url('../../static/picture/cat.jpg') center center;
    background-size: cover;
    opacity: 1;
}
.myImg_box p{
     font-size: 20px;
    opacity: 1;
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
}

.button{
    font-size: 16px !important;
}
.mine-list{
    background: #fff;
    margin-top: 30px;
    width: 100%;
    font-size: 18px;
}
.mine-list li {
    width: 100%;
    height: 49px;
    line-height: 49px;
    padding-left: 20px;
    border-top:1px solid #ececec;
    position: relative;
}
.right{
    position: absolute;
    top: 50%;
    right: 4%;
    transform: translateY(-50%)
}
.personal,.address{
    cursor: pointer;
}

.exit{
    width: 90%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    letter-spacing: 5px;
    font-size: 18px;
    margin: 30px auto 40px;
    background: rgb(250, 5, 5);
    border-radius: 10px;
    color: #fff;
}
</style>