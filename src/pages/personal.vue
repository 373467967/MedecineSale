<template>
   <div class="container">
        <NavigationBar :goback='true'/>
        <div class="content">
            <section>
                <span>昵称</span>
                <input type="text" class="username" v-model="name" placeholder="请输入昵称">
            </section>
            <section>
                <span>E-mail</span><input v-model="email" type="text" placeholder="请输入安全邮箱">
            </section>
            <section>
                <span>性别</span>
                <el-radio-group v-model="gender">
                    <el-radio-button label="男"></el-radio-button>
                    <el-radio-button label="女"></el-radio-button>
                    <el-radio-button label="保密"></el-radio-button>
                </el-radio-group>
            </section>
            <section class="block">
                <span>生日</span>
                <el-date-picker
                v-model="birthday"
                type="date"
                placeholder="选择日期">
                </el-date-picker>
            </section>
            <section>
                <span>身份证号</span><input v-model='idcard' type="text" placeholder="请输入18位生份证号">
            </section>
            <section>
                <span>个人描述</span>
                <textarea v-model="introduce" cols="30" rows="2" placeholder="请谈谈您对自己的认识"></textarea>
            </section>
            <p class="modify" @click='goModify'>确认修改</p>
        </div>
   </div>
</template>

<script>
import NavigationBar from '../components/navigationbar'
import store         from '@/store'
export default {
    name:'Personal',
    data(){
        return{
            pickerOptions1: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                }
            },
            birthday: '',
            gender:'男',
            name:'',
            email:'',
            introduce:'',
            idcard:'',
        }
    },
    components:{
        NavigationBar
    },
    created(){
        this.name      = this.$store.state.currentUser.username;
        this.birthday  = this.$store.state.currentUser.birthday;
        this.gender    = this.$store.state.currentUser.gender;
        this.email     = this.$store.state.currentUser.email;
        this.introduce = this.$store.state.currentUser.introduce;
        this.idcard    = this.$store.state.currentUser.idcard;
    },
   
    methods:{
        goModify(){
            var $this = this;
            var current = Bmob.User.current();
            let currentId = current.id,
            query = new Bmob.Query(Bmob.User);
            query.get(currentId,{
                success:function(userAgain){
                    userAgain.set("username", $this.name);
                    userAgain.set("birthday", $this.birthday);
                    userAgain.set("gender", $this.gender);
                    userAgain.set("email", $this.email);
                    userAgain.set("introduce", $this.introduce);
                    userAgain.set("idCard", $this.idcard);
                    userAgain.save({
                        success:function(){
                            $this.store.commit('changeUser',currentUser);
                            }
                        },
                        {
                        error:function(error){
                            alert("哎呀！出错了请稍后再试！")
                        }
                    });
                },
                error:function(error){
                    console.log("sahi")
                }
                
            })
        }
    }
}
</script>

<style scoped>
.content{
    height:calc(100% - 64px);
    background: #fff;
}
input,textarea{
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
.block{
    margin-left: -5px;
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