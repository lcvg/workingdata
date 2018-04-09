import Vue from 'vue';
import iView from 'iview';
import {router} from './router/index';
import {appRouter} from './router/router';
import store from './store';
import App from './app.vue';
import '@/locale';
import 'iview/dist/styles/iview.css';
import VueI18n from 'vue-i18n';
import util from '@/libs/util';
import { VirtualScroller } from 'vue-virtual-scroller';
import VueResource from 'vue-resource';
import axios from 'axios';
import qs from 'qs';
import  VueQuillEditor from 'vue-quill-editor'
import Cookies from 'js-cookie';
Vue.use(VueQuillEditor)









Vue.use(VueI18n);
Vue.use(iView);
Vue.component('virtual-scroller', VirtualScroller);
Vue.use(VueResource);
Vue.use(axios);
Vue.use(qs);
Vue.prototype.$axios = axios
new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App),
    data: {
        currentPageName: ''
    },
    mounted () {
        this.currentPageName = this.$route.name;
        // 显示打开的页面的列表
        this.$store.commit('setOpenedList');
        this.$store.commit('initCachepage');
        // 权限菜单过滤相关
        this.$store.commit('updateMenulist');
        // iview-admin检查更新
        // util.checkUpdate(this);
    },
    created () {
        let tagsList = [];
        appRouter.map((item) => {
            if (item.children.length <= 1) {
                tagsList.push(item.children[0]);
            } else {
                tagsList.push(...item.children);
            }
        });
        this.$store.commit('setTagsList', tagsList);
    }
});


axios.defaults.timeout = 5000;                        //响应时间
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';           //配置请求头
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'; 
axios.defaults.baseURL = 'http://localhost:8070';   //配置接口地址

axios.defaults.withCredentials = true;
// POST传参序列化(添加请求拦截器)
// axios.interceptors.request.use((config) => {
//     //在发送请求之前做某件事
//     if(config.method  === 'post'){
//         config.data = qs.stringify(config.data);
//     }
//     return config;
// },(error) =>{
//      _.toast("错误的传参", 'fail');
//     return Promise.reject(error);
// });
//返回状态判断(添加响应拦截器)
// axios.interceptors.response.use((res) =>{
//     //对响应数据做些事
//     if(!res.data.msg == 'ok'){
//         // _.toast(res.data.msg);
//         return Promise.reject(res);
//     }
//     return res;
// }, (error) => {
//     // _.toast("网络异常", 'fail');
//     return Promise.reject(error);
// });
//返回一个Promise(发送post请求)
export function fetch(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, params)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err);
            })
            .catch((error) => {
               reject(error)
            })
    })
}


