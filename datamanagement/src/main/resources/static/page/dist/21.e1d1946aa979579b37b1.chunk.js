webpackJsonp([21],{723:function(e,t,n){"use strict";function s(e){l||n(792)}Object.defineProperty(t,"__esModule",{value:!0});var a=n(765),i=n.n(a);for(var o in a)"default"!==o&&function(e){n.d(t,e,function(){return a[e]})}(o);var r=n(794),c=n.n(r),l=!1,p=n(24),g=s,m=p(i.a,c.a,!1,g,null,null);m.options.__file="src\\views\\message\\message.vue",t.default=m.exports},765:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=function(e,t,n){return e("Poptip",{props:{confirm:!0,title:"您确定要删除这条数据吗?",transfer:!0},on:{"on-ok":function(){var e=[];e.push(n.row.id),t.handleDel(e)}}},[e("a",{style:{margin:"0 5px"},props:{type:"error",placement:"top"}},"删除")])};t.default={name:"message_index",props:["type"],data:function(){var e=this;return{currentMesList:[],unreadMesList:[],hasreadMesList:[],recyclebinList:[],currentMessageType:"unread",showMesTitleList:!0,unreadCount:1,hasreadCount:0,dataCount:0,pageSize:10,currentPage:1,recyclebinCount:1,noDataText:"暂无未读消息",mes:{title:"",time:"",content:"",listData:[]},mesTitleColumns:[{title:" ",key:"title",align:"left",ellipsis:!0,render:function(t,n){return t("a",{on:{click:function(){e.showMesTitleList=!1,e.mes.title=n.row.title,e.mes.time=e.formatDate(n.row.createDate),e.getContent(n.row)}}},n.row.title)}},{title:" ",key:"createDate",align:"center",width:180,render:function(t,n){return"1"==e.type?t("div",[s(t,e,n)]):t("span",[t("Icon",{props:{type:"android-time",size:12},style:{margin:"0 5px"}}),t("span",{props:{type:"android-time",size:12}},e.formatDate(n.row.createDate))])}}]}},methods:{formatDate:function(e){var t=new Date(e);return t.getFullYear()+"/"+(t.getMonth()+1)+"/"+t.getDate()+"  "+t.getHours()+":"+t.getMinutes()+":"+t.getSeconds()},backMesTitleList:function(){this.showMesTitleList=!0},changepage:function(e){this.get(7,{},e)},getContent:function(e){var t=e.content;this.mes.content=t,this.mes.listData=e.listData},handleDel:function(e){var t=this;this.$axios.post("/remove?type=7",e,{headers:{"Content-Type":"application/json"}}).then(function(e){if(0==e.data.code){t.$Notice.success({title:"删除成功！！！",duration:2});var n=Math.ceil((t.dataCount-1)/t.pageSize);n<t.currentPage&&(t.currentPage=n),t.changepage(t.currentPage)}else t.$Notice.error({title:"删除失败！！！",duration:2})}).catch(function(e){})},get:function(e,t,n){t.type=e,t.pageNum=n,t.pageSize=this.pageSize,"1"!=this.type&&(t.department=JSON.parse(localStorage.teacher).depId+"@");var s=this;this.currentPage=n,this.$axios.get("/find",{params:t}).then(function(e){s.dataCount=e.data.size,s.currentMesList=e.data.list}).catch(function(e){})}},mounted:function(){localStorage.setItem("messageCount",0),this.get(7,{},1)},watch:{}}},792:function(e,t,n){var s=n(793);"string"==typeof s&&(s=[[e.i,s,""]]),s.locals&&(e.exports=s.locals);n(61)("485a178f",s,!1,{})},793:function(e,t,n){t=e.exports=n(60)(!1),t.push([e.i,"\n.message-main-con {\n  position: absolute;\n  left: 0px;\n  top: 0px;\n  right: 0px;\n  bottom: 0px;\n}\n.message-mainlist-con {\n  position: absolute;\n  left: 0;\n  top: 10px;\n  width: 300px;\n  bottom: 0;\n  padding: 10px 0;\n}\n.message-mainlist-con div {\n  padding: 10px;\n  margin: 0 20px;\n  border-bottom: 1px dashed #d2d3d2;\n}\n.message-mainlist-con div:last-child {\n  border: none;\n}\n.message-mainlist-con div .message-count-badge-outer {\n  float: right;\n}\n.message-mainlist-con div .message-count-badge {\n  background: #d2d3d2;\n}\n.message-mainlist-con div:first-child .message-count-badge {\n  background: #ed3f14;\n}\n.message-mainlist-con div .mes-type-btn-text {\n  margin-left: 10px;\n}\n.message-content-con {\n  margin-left: 10px;\n  margin-right: 10px;\n  background: white;\n  border-radius: 3px;\n  box-shadow: 2px 2px 10px 2px rgba(0, 0, 0, 0.1);\n  overflow: auto;\n}\n.message-content-con .message-title-list-con {\n  width: 100%;\n  height: 100%;\n}\n.message-content-con .message-content-top-bar {\n  height: 40px;\n  width: 100%;\n  background: white;\n  position: absolute;\n  left: 0;\n  top: 0;\n  border-bottom: 1px solid #dededb;\n}\n.message-content-con .message-content-top-bar .mes-back-btn-con {\n  position: absolute;\n  width: 70px;\n  height: 30px;\n  left: 0;\n  top: 5px;\n}\n.message-content-con .message-content-top-bar .mes-title {\n  position: absolute;\n  top: 0;\n  right: 70px;\n  bottom: 0;\n  left: 70px;\n  line-height: 40px;\n  padding: 0 30px;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  text-align: center;\n}\n.message-content-con .mes-time-con {\n  position: absolute;\n  width: 100%;\n  top: 40px;\n  left: 0;\n  padding: 20px 0;\n  text-align: center;\n  font-size: 14px;\n  color: #b7b7b5;\n  background: white;\n}\n.message-content-con .message-content-body {\n  background: white;\n  position: absolute;\n  top: 90px;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  overflow: auto;\n}\n.message-content-con .message-content-body .message-content {\n  font-size: 14px;\n  margin-left: 20px;\n  margin-right: 20px;\n  margin-bottom: -20px;\n  padding: 10px 20px;\n}\n.back-message-list-enter,\n.back-message-list-leave-to {\n  opacity: 0;\n}\n.back-message-list-enter-active,\n.back-message-list-leave-active {\n  transition: all .5s;\n}\n.back-message-list-enter-to,\n.back-message-list-leave {\n  opacity: 1;\n}\n.view-message-enter,\n.view-message-leave-to {\n  opacity: 0;\n}\n.view-message-enter-active,\n.view-message-leave-active {\n  transition: all .5s;\n}\n.view-message-enter-to,\n.view-message-leave {\n  opacity: 1;\n}\n.mes-current-type-btn-enter,\n.mes-current-type-btn-leave-to {\n  opacity: 0;\n  width: 0;\n}\n.mes-current-type-btn-enter-active,\n.mes-current-type-btn-leave-active {\n  transition: all .3s;\n}\n.mes-current-type-btn-enter-to,\n.mes-current-type-btn-leave {\n  opacity: 1;\n  width: 12px;\n}\n.msg-title {\n  margin-left: 44px;\n  margin-top: 40px;\n  color: #FF0000;\n  font-weight: bold;\n}\n.page {\n  margin-left: 20px;\n  margin-top: 10px;\n  margin-bottom: 15px;\n}\n",""])},794:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"message-main-con"},[n("div",{staticClass:"message-content-con"},[n("transition",{attrs:{name:"view-message"}},[e.showMesTitleList?n("div",{staticClass:"message-title-list-con"},[n("Table",{ref:"messageList",attrs:{columns:e.mesTitleColumns,data:e.currentMesList,"no-data-text":e.noDataText}}),e._v(" "),n("Page",{staticClass:"page",attrs:{total:e.dataCount,"page-size":e.pageSize,"show-total":"",current:e.currentPage},on:{"on-change":e.changepage}})],1):e._e()]),e._v(" "),e.showMesTitleList?e._e():n("div",{staticClass:"message-view-content-con"},[n("div",{staticClass:"message-content-top-bar"},[n("span",{staticClass:"mes-back-btn-con"},[n("Button",{attrs:{type:"text"},on:{click:e.backMesTitleList}},[n("Icon",{attrs:{type:"chevron-left"}}),e._v("  返回")],1)],1),e._v(" "),n("h3",{staticClass:"mes-title"},[e._v(e._s(e.mes.title))])]),e._v(" "),n("p",{staticClass:"mes-time-con"},[n("Icon",{attrs:{type:"android-time"}}),e._v("  "+e._s(e.mes.time))],1),e._v(" "),n("div",{staticClass:"message-content-body"},[n("div",{staticClass:"message-content",domProps:{innerHTML:e._s(e.mes.content)}}),e._v(" "),n("div",{staticClass:"msg-title"},[e._v("以下是附件信息：")]),e._v(" "),e._l(e.mes.listData,function(t){return n("p",{staticClass:"message-content"},[n("a",{attrs:{href:"http://localhost:8070/download?id="+t.id}},[e._v(e._s(t.dataName.substring(13)))])])})],2)])],1)])},a=[];s._withStripped=!0;var i={render:s,staticRenderFns:a};t.default=i}});