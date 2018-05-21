webpackJsonp([20],{736:function(e,t,s){"use strict";function o(e){l||s(899)}Object.defineProperty(t,"__esModule",{value:!0});var r=s(858),n=s.n(r);for(var a in r)"default"!==a&&function(e){s.d(t,e,function(){return r[e]})}(a);var i=s(901),d=s.n(i),l=!1,u=s(24),c=o,p=u(n.a,d.a,!1,c,null,null);p.options.__file="src\\views\\own-space\\own-space.vue",t.default=p.exports},858:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=s(42),r=function(e){return e&&e.__esModule?e:{default:e}}(o);t.default={name:"ownspace_index",data:function(){var e=this;return{userForm:{name:"",cellphone:"",jobNumber:"",duty:"",professionalTitle:"",department:""},disabledInput:!0,permission:"",id:"",uid:"",securityCode:"",phoneHasChanged:!1,save_loading:!1,identifyError:"",editPasswordModal:!1,savePassLoading:!1,oldPassError:"",identifyCodeRight:!1,hasGetIdentifyCode:!1,canGetIdentifyCode:!1,checkIdentifyCodeLoading:!1,inforValidate:{name:[{required:!0,message:"请输入姓名",trigger:"blur"}],cellphone:[{required:!0,message:"请输入手机号码"},{validator:function(e,t,s){/^1[0-9]{10}$/.test(t)?s():s(new Error("请输入正确格式的手机号"))}}]},editPasswordForm:{newPass:"",rePass:""},passwordValidate:{newPass:[{required:!0,message:"请输入新密码",trigger:"blur"},{min:6,message:"请至少输入6个字符",trigger:"blur"},{max:32,message:"最多输入32个字符",trigger:"blur"}],rePass:[{required:!0,message:"请再次输入新密码",trigger:"blur"},{validator:function(t,s,o){s!==e.editPasswordForm.newPass?o(new Error("两次输入密码不一致")):o()},trigger:"blur"}]},initPhone:""}},methods:{editForm:function(){this.disabledInput=!1},showEditPassword:function(){this.editPasswordModal=!0},cancelEditUserInfor:function(){this.disabledInput=!0,history.back(-1)},saveEdit:function(){var e=this;this.$refs.userForm.validate(function(t){if(t){var s={};s.phoneNumber=e.userForm.cellphone,s.jobNumber=e.userForm.jobNumber,s.name=e.userForm.name,s.id=e.id,s.permission=e.permission,""!=e.editPasswordForm.newPass&&(s.password=e.editPasswordForm.newPass),console.log(s);var o=e;e.$axios.post("/addTeacher",s).then(function(e){0==e.data.code?(o.$Message.destroy(),o.$Message.success({content:"保存成功！！！",duration:2}),r.default.set("user",this.userForm.name),this.disabledInput=!0):o.$Notice.error({content:"保存失败！！！",duration:2})}).catch(function(e){})}})},cancelEditPass:function(){this.editPasswordModal=!1},saveEditPass:function(){var e=this;this.$refs.editPasswordForm.validate(function(t){t&&(e.editPasswordModal=!1)})},init:function(){var e=this;this.$axios.get("/findTeacher",{params:{jobNumber:JSON.parse(localStorage.teacher).jobNumber}}).then(function(t){console.log(t.data);var s=t.data.teacher[0];e.userForm.name=s.name,e.userForm.cellphone=s.phoneNumber,e.userForm.jobNumber=s.jobNumber,e.userForm.duty=s.duty,e.userForm.professionalTitle=s.professionalTitle,e.userForm.department=s.department,e.id=s.id,e.permission=s.permiss}).catch(function(e){})},cancelInputCodeBox:function(){this.inputCodeVisible=!1,this.userForm.cellphone=this.initPhone},hasChangePhone:function(){this.phoneHasChanged=!0,this.hasGetIdentifyCode=!1,this.identifyCodeRight=!1}},mounted:function(){this.init()}}},899:function(e,t,s){var o=s(900);"string"==typeof o&&(o=[[e.i,o,""]]),o.locals&&(e.exports=o.locals);s(61)("18c17f19",o,!1,{})},900:function(e,t,s){t=e.exports=s(60)(!1),t.push([e.i,"\n.own-space-btn-box {\n  margin-bottom: 10px;\n}\n.own-space-btn-box button {\n  padding-left: 0;\n}\n.own-space-btn-box button span {\n  color: #2D8CF0;\n  transition: all .2s;\n}\n.own-space-btn-box button span:hover {\n  color: #0C25F1;\n  transition: all .2s;\n}\n.own-space-tra {\n  width: 10px;\n  height: 10px;\n  transform: rotate(45deg);\n  position: absolute;\n  top: 50%;\n  margin-top: -6px;\n  left: -3px;\n  box-shadow: 0 0 2px 3px rgba(0, 0, 0, 0.1);\n  background-color: white;\n  z-index: 100;\n}\n.own-space-input-identifycode-con {\n  position: absolute;\n  width: 200px;\n  height: 100px;\n  right: -220px;\n  top: 50%;\n  margin-top: -50px;\n  border-radius: 4px;\n  box-shadow: 0 0 2px 3px rgba(0, 0, 0, 0.1);\n}\n",""])},901:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",[s("Card",[s("p",{attrs:{slot:"title"},slot:"title"},[s("Icon",{attrs:{type:"person"}}),e._v("\n            个人信息\n        ")],1),e._v(" "),s("div",[s("Form",{ref:"userForm",attrs:{model:e.userForm,"label-width":100,"label-position":"right",rules:e.inforValidate}},[s("FormItem",{attrs:{label:"用户姓名：",prop:"name"}},[s("div",{staticStyle:{display:"inline-block",width:"300px"}},[s("Input",{attrs:{disabled:e.disabledInput},model:{value:e.userForm.name,callback:function(t){e.$set(e.userForm,"name",t)},expression:"userForm.name"}})],1)]),e._v(" "),s("FormItem",{attrs:{label:"用户手机：",prop:"cellphone"}},[s("div",{staticStyle:{display:"inline-block",width:"204px"}},[s("Input",{attrs:{disabled:e.disabledInput},on:{"on-keydown":e.hasChangePhone},model:{value:e.userForm.cellphone,callback:function(t){e.$set(e.userForm,"cellphone",t)},expression:"userForm.cellphone"}})],1)]),e._v(" "),s("FormItem",{attrs:{label:"工号："}},[s("span",[e._v(e._s(e.userForm.jobNumber))])]),e._v(" "),s("FormItem",{attrs:{label:"职称："}},[s("span",[e._v(e._s(e.userForm.professionalTitle))])]),e._v(" "),s("FormItem",{attrs:{label:"职务："}},[s("span",[e._v(e._s(e.userForm.duty))])]),e._v(" "),s("FormItem",{attrs:{label:"部门："}},[s("span",[e._v(e._s(e.userForm.department))])]),e._v(" "),s("FormItem",{attrs:{label:"登录密码："}},[s("Button",{attrs:{type:"text",size:"small"},on:{click:e.showEditPassword}},[e._v("修改密码")])],1),e._v(" "),s("div",[s("Button",{attrs:{type:"text"},on:{click:e.editForm}},[e._v("编辑")]),e._v(" "),s("Button",{staticStyle:{width:"100px"},attrs:{type:"text"},on:{click:e.cancelEditUserInfor}},[e._v("取消")]),e._v(" "),s("Button",{staticStyle:{width:"100px"},attrs:{type:"primary",loading:e.save_loading},on:{click:e.saveEdit}},[e._v("保存")])],1)],1)],1)]),e._v(" "),s("Modal",{attrs:{closable:!1,"mask-closable":!1,width:500},model:{value:e.editPasswordModal,callback:function(t){e.editPasswordModal=t},expression:"editPasswordModal"}},[s("h3",{staticStyle:{color:"#2D8CF0"},attrs:{slot:"header"},slot:"header"},[e._v("修改密码")]),e._v(" "),s("Form",{ref:"editPasswordForm",attrs:{model:e.editPasswordForm,"label-width":100,"label-position":"right",rules:e.passwordValidate}},[s("FormItem",{attrs:{label:"新密码",prop:"newPass"}},[s("Input",{attrs:{placeholder:"请输入新密码，至少6位字符"},model:{value:e.editPasswordForm.newPass,callback:function(t){e.$set(e.editPasswordForm,"newPass",t)},expression:"editPasswordForm.newPass"}})],1),e._v(" "),s("FormItem",{attrs:{label:"确认新密码",prop:"rePass"}},[s("Input",{attrs:{placeholder:"请再次输入新密码"},model:{value:e.editPasswordForm.rePass,callback:function(t){e.$set(e.editPasswordForm,"rePass",t)},expression:"editPasswordForm.rePass"}})],1)],1),e._v(" "),s("div",{attrs:{slot:"footer"},slot:"footer"},[s("Button",{attrs:{type:"text"},on:{click:e.cancelEditPass}},[e._v("取消")]),e._v(" "),s("Button",{attrs:{type:"primary",loading:e.savePassLoading},on:{click:e.saveEditPass}},[e._v("保存")])],1)],1)],1)},r=[];o._withStripped=!0;var n={render:o,staticRenderFns:r};t.default=n}});