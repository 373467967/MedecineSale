<template>
   <div class="container">
        <NavigationBar/>
        <div class="content">
            <div class="shopping"  v-if='!isLogin'>
                <p>您还没有登录</p>
                <button type="button">点击登录</button>
            </div>
            <div class="empty" v-else-if='isEmpty'>购物车空空如也~</div>
            <div class="shopping" v-else>
                <div class="tit-style">
                    <el-checkbox v-show='isShow' :indeterminate="isIndeterminate" class="all" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                    <span class="cancel" @click='goCancel' v-show="isShow">取消</span>
                    <span class="del" @click="goDelete" v-show="isShow">删除全部</span>
                    <span class="compile"  v-show="!isShow" @click="compileClick">编辑</span>
                </div>
                <el-checkbox-group v-model="checkedGoods" @change="handleCheckedCitiesChange">
                    <el-checkbox class="shopping-box" v-for="(order,index) in orderList" :key="index" :data-index="index" :label="order">
                            <section class="shopping-img">
                            <img :src="order.imgUrl" alt="">
                            </section>
                            <section class="shopping-right">
                                <p class="headline"><span>名称：</span>{{order.title}}</p>
                                <p class="money"><span>价格:</span> {{order.price}}</p>
                                <p class="add">
                                    <span>数量：</span>
                                    <InputNumber :max=order.stock :min="1" v-model="order.number"></InputNumber>
                                </p>
                            </section>
                    </el-checkbox>
                </el-checkbox-group>
                <p :style="{'background':Background}" class="pay" @click="goPay">前往支付</p>
            </div>
        </div>
        <TabBar/>
   </div>
</template>

<script>
import NavigationBar from '../components/navigationbar'
import TabBar        from '../components/tabbar'
import store         from '@/store'
export default {
    name:'ShoppingCar',
    data(){
        return{
            orderList:[],
            img:'',
            goods:[],
            isLogin:false,
            isEmpty:true,
            isShow:false,
            Background:'#ccc',
            checkAll: false,
            checkedGoods: [],
            isIndeterminate: true,
            goodsAccount:{

            }
        }
    },
    created(){
        var current = Bmob.User.current();
        if(current == null){
            this.isLogin = false
        }else{
            this.isLogin = true
        }
        this.orderList = this.$store.state.Goods;
        if(this.orderList.length == 0){
            this.isEmpty = true;
        }else{
            this.isEmpty = false;
        }
    },
    components:{
        TabBar,
        NavigationBar
    },
    methods:{
        compileClick(){
            this.isShow = true;
        },
        goPay(){
            this.Background = 'rgb(161, 161, 161)';
        },
        goCancel(){
            this.isShow = false;
        },
        goDelete(){
            let $this = this
            $('.shopping-box').each(function(idx,item){
                if($(this).hasClass('is-checked')){
                    $(this).remove();
                }
                
            })
            store.commit('changeGoods',this.orderList)
        },
        handleCheckAllChange(val) {
            this.checkedGoods = val ? this.orderList : [];
            this.isIndeterminate = false;
        },
        handleCheckedCitiesChange(value) {
            let checkedCount = value.length;
            this.checkAll = checkedCount === this.orderList.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.orderList.length;
        }
    }
}
</script>

<style scoped>
section{
    display: inline-block;
    vertical-align: middle;
}
.el-checkbox-group{
    background: white;
}
.el-checkbox{
    text-align: left;
    width: 100%;
    border-bottom: 1px solid rgb(161, 161, 161);
    box-sizing: border-box !important;
    margin-left: 0;
    position: relative;
}
.box{
    width: 100%;
    box-sizing: border-box;
    padding: 5px;
}
.el-checkbox__label{
    width: 100%;
    height: 170px;
    background: white;
    box-sizing: border-box !important;
    display: flex !important;
    justify-content: space-between;
    align-items: center;
    margin: 0;
}
.shopping-img{
    width: 145px;
    height: 160px;
    margin-right: 8px;
    overflow: hidden;
}
.shopping-img img{
    width: 100%;
    height: 100%;
    background-size: cover;
}
.shopping-right{
    width: 50%;
    overflow: hidden;
}
.shopping-right p span{
    color: #333;
    font-size: 12px;
    font-weight: normal;
}
.headline{
    padding: 10px 0;
    font-size: 12px;
    font-weight: bold;
    color: rgb(63, 62, 62);
}
.money{
    margin: 10px 0;
    font-size: 20px;
    font-weight: normal;
    color: red;
}
.ivu-input-number{
    margin-left: -6px;
}
.all{
    width: 30px;
    border-bottom: transparent;
    position: absolute;
    top: 50%;
    left: 5px;
    transform: translateY(-50%)
}
.tit-style{
    font-size: 16px;
    margin: 10px 5px 20px 0;
    text-align: right;
    position: relative;
}
.compile{
    color: rgb(46, 115, 206);
}
.cancel{
    color: rgb(46, 115, 206);
}
.del{
    color: rgb(192, 49, 31); 
}
.radio{
    padding-left: 7px;
    color: black;
    font-size: 20px;
}
.pay{
    width: 90%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    letter-spacing: 5px;
    font-size: 18px;
    margin: 30px auto 10px;
    border-radius: 10px;
    color: #fff;
    background: #ccc;
}

</style>