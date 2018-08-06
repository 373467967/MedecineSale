// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store  from './store'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import '../static/css/common.css'
import './assets/key'
import '../node_modules/distpicker/dist/distpicker'
import '../node_modules/distpicker/dist/distpicker.common'
import Tool from '../static/js/tool.js'
import Axios from 'axios'
import { 
  Button, 
  Select,
  Input,
  Carousel,
  CarouselItem,
  DatePicker,
  RadioGroup,
  RadioButton,
  Checkbox,
  CheckboxGroup
} from 'element-ui';
 
Vue.prototype.$axios = Axios;
Vue.config.productionTip = false
Vue.use(Button)
Vue.use(Select)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Input)
Vue.use(iView)
Vue.use(Tool)
Vue.use(DatePicker)
Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
