<template>
   <div class="container">
        <NavigationBar :goback='true'/>
        <div class="content">
            <section>
                <span>姓名</span>
                <input type="text" class="realname" v-model="realname" placeholder="请填写您的真实姓名">
            </section>
            <section>
                <span>联系电话</span>
                <input type="text" class="phone" v-model="phone" placeholder="请填写我们联系您的电话">
            </section>
            <section>
                <span>邮政编码</span>
                <input type="text" class="post" v-model="post" placeholder="请填写您的邮政编码">
            </section>
            <section>
               <div class="adderss" data-toggle="distpicker"><!-- container -->
                    <select></select><!-- 省 -->
                    <select></select><!-- 市 -->
                    <select></select><!-- 区 -->
                </div> 
            </section>
            <section>
                <span>详细地址</span>
                <input type="text" class="detailaddress" v-model="detailaddress" placeholder="请填写您的详细地址">
            </section>
            <p class="modify">确认修改</p>
        </div>
   </div>
</template>

<script>
import NavigationBar from '../components/navigationbar'
export default {
    name:'Address',
    data(){
        return{
            realname:'',
            phone:'',
            post:'',
            detailaddress:'',
        }
    },
    components:{
        NavigationBar
    },
    mounted(){
        $('.address').distpicker();
    },
}
</script>

<style scoped>
.content{
    height:calc(100% - 64px);
    background: #fff;
}
input{
    border: none;
    outline: none;
}
section{
    line-height: 48px;
    border-bottom: 1px solid #ccc;
    padding:5px 0;
}
span{
    box-sizing: border-box;
    padding:0 10px;
    display: inline-block;
    width:30%;
    vertical-align: top;
}
option{
    width: 50px;
}
.modify{
    width: 90%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    letter-spacing: 5px;
    font-size: 18px;
    margin: 30px auto;
    border-radius: 10px;
    color: #fff;
    background: rgba(6, 117, 243, 0.644);
}
</style>