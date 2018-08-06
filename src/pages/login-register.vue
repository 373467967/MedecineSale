<template>
    <div class="container">
        <NavigationBar  :goback='true'/>
        <div class="content">
            <p class="button-group">
                <span @click='goLogin' :class="{'border':isborder}">登录</span>
                <span @click="goRegister" :class="{'border':!isborder}">注册</span>
            </p>
           <form action="#" name="myForm">
                <section class="login-input" v-if="isborder">
                    <p class="input-group">
                        <Icon type="md-phone-portrait" size='25' />
                        <input type="tel" v-model='loMobile' placeholder="请输入您的手机号">
                    </p>
                    <p class="input-group">
                        <Icon type="md-lock" size='25'/>
                        <input type="password" v-model='loPassword' placeholder="请输入您的密码">
                    </p>
                    <span class="button" @click='login'>登录</span>
                </section>
                <section class="register-input" v-if="!isborder">
                    <p class="input-group" data-msg="请输入正确手机号">
                        <Icon type="md-phone-portrait" size='25' />
                        <input class="mobile" @blur='checkInput' v-model='mobile' type="tel" placeholder="请输入您的手机号">
                    </p>
                    <p class="input-group" data-msg="请输入您的昵称">
                        <Icon type="md-contact" size='25' />
                        <input class="username" @blur='checkInput' v-model="username" type="text" placeholder="请输入您的昵称">
                    </p>
                    <p class="input-group" data-msg="密码不合法，4到16位（字母，数字，下划线，减号)">
                        <Icon type="ios-lock-outline" size='25' />
                        <input class="password" @blur='checkInput' v-model='password' type="password" placeholder="请输入您的密码">
                    </p>
                    <p class="input-group" data-msg='两次密码输入不一致'>
                        <Icon type="md-lock" size='25'/>
                        <input class="repassword" @blur='checkInput' v-model='repassword' type="password" placeholder="请确认您的密码">
                    </p>
                    <span @click='register' class="button">注册</span>
                </section>
           </form>
        </div>

    </div>
</template>

<script>
import store         from '@/store'
import NavigationBar from '../components/navigationbar'
export default {
    name:'LoginRegister',
    data(){
        return{
            isborder:true,
            loMobile:'',
            loPassword:'',
            mobile:'',
            username:'',
            password:'',
            repassword:'',
            isThough:true
        }
    },
    components:{
        NavigationBar
    },
    methods:{
        goLogin(){
            this.isborder = true;
            store.commit('changeTitle','登录');
            $(".input-group").removeClass("error");
            this.username = '';
            this.password = '';
            this.mobile ='';
            this.repassword =''
        },
        goRegister(){
            this.isborder = false;
            store.commit('changeTitle','注册');
            $(".input-group").removeClass("error");
            this.loMobile='';
            this.loPassword=''
        },
        checkInput(e){
            let $target = $(e.target);
            if(!$target.val()){
                this.$Notice.error({
                    title:"请完善信息",
                    desc:"账号或密码错误",
                    top:150
                })
            }else{
                var res = null;
                switch ($target.prop("className")) {
                    case "mobile": {
                        // 1. 手机 
                        res = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0-1,5-9]))\d{8}$/.test($target.val());
                    } break;
                    case "password": {
                        // 2. 密码正则，4到16位（字母，数字，下划线，减号）
                        res = /^[A-Za-z0-9_-]{4,16}$/.test($target.val());
                    } break;
                    case "username":{
                        res = /[\u4e00-\u9fa5]{2,8}/.test($target.val());
                    }break;
                    case "repassword":{
                        if(this.password == ($target.val())){
                            res = $target.val()
                        }
                    }break;
                }
                if(!res){
                    $target.parent().addClass("error");
                }else{
                    $target.parent().removeClass("error");
                }
            }
        },
        login(){
            if(!this.loMobile || !this.loPassword){
                this.$Notice.warning({
                    title:"登录失败",
                    desc:"请完善信息"
                })
            }else{
                 Bmob.User.logIn(this.loMobile,this.loPassword,{
                    success: () => {
                        this.$store.state.isLogin = true;
                        this.$Message.success({
                            content:'登陆成功',
                            onclose:this.$router.push('Mine')
                        });
                    },
                    error: () => {
                        this.$Notice.error({
                            title:"登录失败",
                            desc:"账号或密码错误",
                            duration:0,
                            top:150
                        })
                    }
                })
            }
        },
        register(){
            let isThough = true;
            $(".input-group").each((index, el) => {    
                if($(el).hasClass("error")) {
                    isThough = false;
                    return isThough;
                }  
            });
            if(!this.mobile || !this.password || !this.username || !this.repassword){
                this.$Notice.warning({
                    title:"注册失败",
                    desc:"请完善信息"
                })
            }else if(!isThough){
                this.$Notice.warning({
                    title:"注册失败",
                    desc:"输入不合法"
                })
            }else{
                //注册用户
                let user = new Bmob.User();
                //设置用户属性
                user.set("username",this.username);
                user.set("password",this.password);
                user.set("mobilePhoneNumber",this.mobile);
                //执行注册
                user.signUp(null,{
                    success : (user) => {
                        this.$store.state.isLogin = true;
                        this.$Message.success({
                            content:'注册成功',
                            onclose:this.$router.push('Mine')
                        });
                    },
                    error:(user,error) => {
                        let alertMsg = "";
                        switch (error.code) {
                            case 202 : {
                                alertMsg = "用户名已存在";
                            }break;
                            case 209 : {
                                alertMsg = "手机已被注册";
                            }break;
                        }
                        this.$Notice.error({
                            title:alertMsg,
                            duration:0,
                            top:150
                        })
                    }
                })
            }
        }
    }
}
</script>

<style scoped>
.content{
    margin: 0 10px;
    background: #fff;
}
.button-group{
    height: 50px;
    border-bottom:1px solid rgb(165, 163, 163);
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-around;
    align-items: center;
    text-align: center;
}
.button-group span{
    width: 30%;
    line-height: 47px;
    font-size: 20px;
    display: inline-block;
    letter-spacing: 20px;
    padding-left: 20px
}
.border{
     border-bottom: 2px solid rgba(13, 119, 240, 0.644);;
}
form section{
    margin-top: 50px;
    line-height: 50px;
}
form section p{
    height: 50px;
    margin-top: 30px;
}
form input{
    width: 100%;
    box-sizing: border-box;
    letter-spacing: 4px;
    font-size: 16px;
    padding-left: 80px;
    outline-style: none;
    border:none;
    border-bottom:1px solid rgb(165, 163, 163);
}
[name="myForm"] .input-group::after {
    display: none;
    content: attr(data-msg);
    font-size: 12px;
    color: red;
    position: absolute;
    top: 100%;
    left: 0;
}

[name="myForm"] .error::after {
    display: block;
}
.input-group{
    position: relative;
}
.ivu-icon{
    position: absolute;
    top:50%;
    left: 20px;
    transform: translateY(-55%);
}
.button{
    display: block;
    text-align: center;
    font-size: 20px;
    letter-spacing: 20px;
    background: rgba(6, 117, 243, 0.644);
    color: #fff;
    margin-top: 40px;
    border-radius: 10px;
}
</style>
