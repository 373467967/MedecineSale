<template>
    <div class="container">
        <NavigationBar  :goback='true'/>
        <div class="content">
            <div class="content-top">
                 <section class="left">
                    <img :src="infos.imgUrl">
                 </section>
                <section class="right">
                    <p>
                        <span class="title">药品名称：</span>
                        <span>{{infos.drugName}}</span>
                    </p>
                    <p>
                        <span class="title">批准文号：</span>
                        <span>{{infos.pzwh}}</span>
                    </p>
                     <p>
                        <span class="title">生产厂家：</span>
                        <span>{{infos.manu}}</span>
                    </p>
                    <p>
                        <span class="title">规格含量：</span>
                        <span>{{infos.ggxh}}</span>
                    </p>
                    <p>
                        <span class="title">发售价格：</span>
                        <span class="price">￥{{infos.price}}</span>
                    </p>
                </section>
            </div>
            <div class="content-center">
                <p class="buy">购买数量&nbsp;&nbsp;
                    <span class="con" @click="reduce">-</span>
                    <input class="number-ipt" type="number" min="1" v-model.number="value">
                    <span class="con" @click="increase">+</span>
                    <span class="stock">库存</span>
                    <span>{{infos.stock}}件</span>
                </p>
                <div class="shopping">
                    <Button type="primary" @click="addShoppingCar">加入购物车</Button>
                    <Button type="primary">立即购买</Button>
                </div>
            </div>
            <div class="content-bottom">
                <section>
                    <h3>主要成分</h3>
                    <p>{{infos.zycf}}</p>
                </section>
                <section>
                    <h3>适用症</h3>
                    <p>{{infos.syz}}</p>
                </section>
                <section>
                    <h3>用法用量</h3>
                    <p>{{infos.yfyl}}</p>
                </section>
                <section>
                    <h3>注意事项</h3>
                    <p>{{infos.zysx}}</p>
                </section>
                 <section class="forbid">
                    <h3>禁忌</h3>
                    <p>{{infos.jj}}</p>
                </section>
            </div>
            
        </div>
    </div>
</template>

<script>
import Tool          from '../../static/js/tool.js'
import NavigationBar from '../components/navigationbar'
import store         from '@/store'
export default {
    name:'Details',
    components:{
        NavigationBar
    },
     data(){
        return{
            infos:{},
            value:1,
            state:false
        }
    },
    created(){
        let url = '../static/json/medecine-kind.json'
        this.$axios.get(url,{
            params:{}
        })
        .then(res => {
            let curdex = this.$store.state.datailIndex;
            let index = this.$store.state.datailNumber
            this.infos = res['data'][curdex]['infos'][index]
        })
        .catch(error => {
            console.log(error)
        })
        var current = Bmob.User.current();
        if(current == null){
            this.state = false
        }else{
            this.state = true
        }
    },
    watch:{
        value(newVal){
            //验证
           if((newVal != '' &&  /^(-|0)/.test(newVal + '')) || /\D/.test(newVal)){
               this.value = 1;
           }else if(newVal != '' && newVal > this.stock){
               this.value = this.stock;
           }
           //传递数据
           this.$emit('numchange',this.value)
        }
    },
    methods:{
        increase(){
             if(this.value < this.infos.stock){
                this.value++;
            }
        },
        reduce(){
            if(this.value > 1){
                this.value--;
            }
        },
        addShoppingCar(){
            if(this.state){
                var goods = {
                'title'  : this.infos.drugName,
                'imgUrl' : this.infos.imgUrl,
                'price'  : this.infos.price,
                'stock'  : this.infos.stock,
                'number' : this.value
                };
                var Goods = this.$store.state.Goods;
                Goods[Goods.length] = goods;
                this.$store.commit('changeGoods',Goods);
            }else{
                alert('请登录！')
                this.$router.push('/login-register')
            }
        }
    }
}
</script>

<style scoped>
.content{
    height:calc(100% - 64px);
    background: #eee;
}
.content-top,.shopping{
    box-sizing: border-box;
    background: #fff;
    padding: 15px;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
}
.content-top .left{
    width: 37%;
    height: 135px;
    position: relative;
    border: 1px solid #eee;
}
.content-top .right{
    width: 59%;
}
.content-top section img{
    margin: auto;
    width: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%)
}
.content-top span{
    font-size: 12px;
}
.content-top .title{
    color: grey;
    margin-right: 5px;
}
.price{
    color: red;
}
.buy{
    background: #fff;
    padding-left: 15px;
}
.stock{
    margin-left: 20px;
}
.content-bottom{
    margin-top: 30px;
    padding: 15px;
    background: #fff;
}
.content-bottom section{
    margin-top: 10px;
}
.content-bottom h3{
    margin:5px 0;
}
.content-bottom p{
    text-indent: 2em;
}
.forbid h3{
    color: red;
}
button{
    width: 48%;
    height: 40px;
}
.number-ipt{
    display: inline-block;
    width: 20%;
    height: 35px;
    text-align: center;
    background: white;
    line-height: 35px;
    cursor: pointer;
    outline: none;
}
.con{
    display:inline-block;
    text-align: center;
    width: 15px;
    height: 35px;
}

</style>
