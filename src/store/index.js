import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
    state:{
      title:'我在卖药',
      datailNumber:0,
      datailIndex:0,
      currentUser:'',
      Goods:[],
      islogin:false
    },
    //提交修改
    mutations:{
      changeTitle(state,title){
        state.title = title
      },
      changeLeft(state,left){
        state.left = left
      },
      changeNumber(state,datailNumber){
        state.datailNumber = datailNumber
      },
      changeIndex(state,datailIndex){
        state.datailIndex = datailIndex
      },
      changeUser(state,currentUser){
        state.currentUser = currentUser; 
      },
      changeGoods(state,Goods){
        state.Goods = Goods;
      },
      changeState(state,isLogin){
        state.isLogin = isLogin;
      }
    }
  })