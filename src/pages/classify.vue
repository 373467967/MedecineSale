<template>
   <div class="container">
        <NavigationBar/>
        <div class="content">
           <div class="search">
                <Input v-model="keywords" search placeholder="请输入药名..." />
           </div>
           <div class="select-box">
                <p>热门搜索：</p>
                <p class="select">
                    <span @click="goSelect" v-for="(content, index) in contentlist" :key="index">{{content.title}}</span>
                </p>
                <div class="wrap" v-for="(item,index) in  filterArr() " :data-title='item.title' :key="index">
                    <h3>{{item.title}}</h3>
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
        </div>
        <TabBar/>
   </div>
</template>

<script>
import NavigationBar from '../components/navigationbar'
import TabBar        from '../components/tabbar'
import store         from '@/store'
export default {
    name:'Classify',
    data(){
        return{
            contentlist:[],
            keywords:'',
            infos:[]
        }
    },
    components:{
        TabBar,
        NavigationBar
    },
    methods:{
        
        goSelect(e){
            this.keywords = e.target.textContent
        },
         goDetails(e){
            let datailIndex = 0;
            let datailNumber = e.currentTarget.dataset.page;
            let datailTitle = e.currentTarget.parentElement.parentElement.dataset.title;
            switch(datailTitle){
                case "感冒发烧":{
                     datailIndex = 0;
                }break;
                case "肠胃用药":{
                     datailIndex = 1;
                }break;
                case "皮肤用药":{
                     datailIndex = 2;
                }break;
                return datailIndex
            }
            store.commit('changeNumber',datailNumber);
            store.commit('changeIndex',datailIndex);
            this.$router.push({
                name:'Details'
            })
            
        },
        filterArr(){
            return this.contentlist.filter((content) => {
                let reg = new RegExp(this.keywords);
                return reg.test(content.title)
            })
        }
    
    },
    created(){
        let url = '../static/json/medecine-kind.json'
        this.$axios.get(url,{
            params:{
            }
        })
        .then(res => {
            this.contentlist = res['data'];
        //     let infos = [];
        //     let contentwrap = this.contentlist
        //     contentwrap.forEach(function(item,index){
        //          (item.infos).forEach(function(item,index){
        //              infos.push(item)
        //          })
        //     })
        //     this.infos = infos
        //    console.log(this.infos)
        })
        .catch(error => {
            console.log(error)
        })
    },
     
}
</script>

<style scoped>
.el-input{
    width: 80%;
}
.el-button i::before{
    font-size: 18px;
}
.search{
    width: 90%;
    margin: 20px auto;
}
.select-box{
    margin: 5px 5px;
}
p{
     margin-top: 10px;
}
.select{
    padding: 1px;
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-start;
}
.select span{
    padding: 5px 10px;
    margin: 0 10px;
    font-size: 14px;
    color:  rgb(121, 118, 118);
    border-radius: 10px;
    border:  1px solid rgb(161, 161, 161);
}
.wrap{
    border: 1px solid transparent;
    margin: 30px auto;
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
.wrap p{
    height: 25px;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    position: relative;
}
.wrap p span{
    line-height: 25px;
}
.wrap .price{
    font-size: 18px;
}
.wrap .postage{
    box-sizing: border-box;
    margin-left: 10px;
    font-size: 10px;
    background: rgba(13, 119, 240, 0.644);
    color: #fff;
    padding: 3px;
    border-radius: 5px;
}
</style>