<template>
   <div class="container">
        <NavigationBar/>
        <div class="content">
            <Carousel autoplay v-model="value2" loop>
                <CarouselItem  v-for="(img, index) in imglink" :key='index'>
                    <img :src="img">
                </CarouselItem>
            </Carousel>
            <div class="wrap" v-for="(item,index) in classList" :data-curdex='index' :key="index">
                <h3 class="title">{{item.title}}</h3>
                <ul>
                    <li  v-for='(info,index) in item.infos' :key="index" :data-page='index' @click="goDetails">
                        <img :src="info.imgUrl" alt="">
                        <p>
                            <span class="price">￥{{info.price}}</span>
                            <span class="postage">{{info.postage}}</span>
                        </p>
                        <p class="drugname">{{info.drugName}}</p>
                    </li>
                </ul>
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
    name:'Home',
    data(){
        return{
            imglink:[
                "../../static/picture/banner1.jpg",
                "../../static/picture/banner2.jpg",
                "../../static/picture/banner3.jpg"
            ],
             value2: 0,
             classList:[]
        }
    },
     created(){
        let url = '../static/json/medecine-kind.json'
        this.$axios.get(url,{
            params:{}
        })
        .then(res => {
            this.classList = res['data'];
        })
        .catch(error => {
            console.log(error)
        });
        var current = Bmob.User.current();
        if(current == null){
            store.commit('changeState',false)
        }else{
            store.commit('changeState',true)
        }
    },
    methods:{
        goDetails(e){
            let datailIndex = e.currentTarget.parentElement.parentElement.dataset.curdex;
            let detailNumber = e.currentTarget.dataset.page;
            store.commit('changeNumber',detailNumber);
            store.commit('changeIndex',datailIndex)
            this.$router.push('Details')
        }
    },
    components:{
        TabBar,
        NavigationBar
    },
}
</script>

<style scoped>
.ivu-carousel-item{
    width: 100%;
    height: 125px;
}
.ivu-carousel-item img{
    width: 100%;
    height: 150px;
}
.wrap{
    border: 1px solid transparent;
    background: #fff;
    margin: 30px auto;
}
.title{
    width: 85px;
    border-bottom: 2px solid rgba(13, 119, 240, 0.644);
    padding-bottom: 5px;
    margin: 15px 10px 0;
}
.wrap ul{
    width:95%;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    margin: 0 auto 30px;
}
.wrap ul>li{
    box-sizing: border-box;
    width: 48%;
    padding: 3%;
    margin-top: 4%;
    border: 1px solid rgba(124, 124, 124,.3);
}
.wrap ul>li:nth-child(odd){
    margin-right: 4%;
}
.wrap ul>li img{
    width: 100%;
    height: 150px;
}
p{
    height: 25px;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    position: relative;
}
p span{
    line-height: 25px;
}
.price{
    font-size: 18px;
}
.postage{
    box-sizing: border-box;
    margin-left: 10px;
    font-size: 10px;
    background: rgba(13, 119, 240, 0.644);
    color: #fff;
    padding: 3px;
    border-radius: 5px;
}
</style>