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


axios.defaults.timeout = 50000;                        //响应时间
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';           //配置请求头
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'; 
// axios.defaults.baseURL = 'http://180.76.101.81:8080';   //配置接口地址
// axios.defaults.baseURL = 'http://localhost:8070';
axios.defaults.baseURL =''
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
axios.interceptors.response.use(function (response) {

   
    // 对响应数据做点什么
    return response;
  }, function (err) {
    if (err && err.response) {
        switch (err.response.status) {
            case 400: err.message = '请求错误(400)' ; break;
            case 401: 
                err.message = '未授权，请重新登录(401)'; 
                Cookies.remove('user');
                Cookies.remove('password');
                Cookies.remove('access');
                // 恢复默认样式
                let themeLink = document.querySelector('link[name="theme"]');
                themeLink.setAttribute('href', '');
                // 清空打开的页面等数据，但是保存主题数据
                let theme = '';
                if (localStorage.theme) {
                    theme = localStorage.theme;
                }
                localStorage.clear();
                if (theme) {
                    localStorage.theme = theme;
                }
                window.location.href="/static/page/index.html#/login"
                break;
            case 403: err.message = '拒绝访问(403)'; break;
            case 404: err.message = '请求出错(404)'; break;
            case 408: err.message = '请求超时(408)'; break;
            case 500: err.message = '服务器错误(500)'; break;
            case 501: err.message = '服务未实现(501)'; break;
            case 502: err.message = '网络错误(502)'; break;
            case 503: err.message = '服务不可用(503)'; break;
            case 504: err.message = '网络超时(504)'; break;
            case 505: err.message = 'HTTP版本不受支持(505)'; break;
            default: err.message = `连接出错!`;
        }
    }else{
        
        err.message = '连接服务器失败!'
    }
    alert(err.message)
    message.error(err.message);
    return Promise.reject(err);
  });
// axios.interceptors.response.use((res) =>{
//     console.log(1111111,res)
//     //对响应数据做些事
//     if(res.status == 403){
//         // _.toast(res.data.msg);
//         alert(1)
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


