<style lang="less">
    @import './own-space.less';
</style>

<template>
    <div>
        <Card>
            <p slot="title">
                <Icon type="person"></Icon>
                个人信息
            </p>
            <div>
                <Form 
                    ref="userForm"
                    :model="userForm" 
                    :label-width="100" 
                    label-position="right"
                    :rules="inforValidate"
                >
                    <FormItem label="用户姓名：" prop="name">
                        <div style="display:inline-block;width:300px;">
                            <Input v-model="userForm.name" :disabled="disabledInput" ></Input>
                        </div>
                    </FormItem>
                    <FormItem label="用户手机：" prop="cellphone" >
                        <div style="display:inline-block;width:204px;">
                            <Input v-model="userForm.cellphone" :disabled="disabledInput" @on-keydown="hasChangePhone"></Input>
                        </div>
                        <!-- <div style="display:inline-block;position:relative;">
                            <Button @click="getIdentifyCode" :disabled="canGetIdentifyCode">{{ gettingIdentifyCodeBtnContent }}</Button>
                            <div class="own-space-input-identifycode-con" v-if="inputCodeVisible">
                                <div style="background-color:white;z-index:110;margin:10px;">
                                    <Input v-model="securityCode" placeholder="请填写短信验证码" ></Input>
                                    <div style="margin-top:10px;text-align:right">
                                        <Button type="ghost" @click="cancelInputCodeBox">取消</Button>
                                        <Button type="primary" @click="submitCode" :loading="checkIdentifyCodeLoading">确定</Button>
                                    </div>
                                </div>
                            </div>
                        </div> -->
                    </FormItem>
                      <FormItem label="工号：">
                        <span>{{ userForm.jobNumber }}</span>
                    </FormItem>

                    <FormItem label="职称：">
                        <span>{{ userForm.professionalTitle }}</span>
                    </FormItem>
                    <FormItem label="职务：">
                        <span>{{ userForm.duty }}</span>
                    </FormItem>
                    <FormItem label="部门：">
                        <span>{{ userForm.department }}</span>
                    </FormItem>
                    <FormItem label="登录密码：">
                        <Button type="text" size="small" @click="showEditPassword">修改密码</Button>
                    </FormItem>
                    <div>
                          <Button type="text" @click="editForm">编辑</Button>
                        <Button type="text" style="width: 100px;" @click="cancelEditUserInfor">取消</Button>
                        <Button type="primary" style="width: 100px;" :loading="save_loading" @click="saveEdit">保存</Button>
                    </div>
                </Form>
            </div>
        </Card>
        <Modal v-model="editPasswordModal" :closable='false' :mask-closable=false :width="500">
            <h3 slot="header" style="color:#2D8CF0">修改密码</h3>
            <Form ref="editPasswordForm" :model="editPasswordForm" :label-width="100" label-position="right" :rules="passwordValidate">
                <!-- <FormItem label="原密码" prop="oldPass" :error="oldPassError">
                    <Input v-model="editPasswordForm.oldPass" placeholder="请输入现在使用的密码" ></Input>
                </FormItem> -->
                <FormItem label="新密码" prop="newPass">
                    <Input v-model="editPasswordForm.newPass" placeholder="请输入新密码，至少6位字符" ></Input>
                </FormItem>
                <FormItem label="确认新密码" prop="rePass">
                    <Input v-model="editPasswordForm.rePass" placeholder="请再次输入新密码" ></Input>
                </FormItem>
            </Form>
            <div slot="footer">
              
                <Button type="text" @click="cancelEditPass">取消</Button>
                <Button type="primary" :loading="savePassLoading" @click="saveEditPass">保存</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
import Cookies from 'js-cookie';
export default {
    name: 'ownspace_index',
    data () {
        const validePhone = (rule, value, callback) => {
            var re = /^1[0-9]{10}$/;
            if (!re.test(value)) {
                callback(new Error('请输入正确格式的手机号'));
            } else {
                callback();
            }
        };

        const valideRePassword = (rule, value, callback) => {
            if (value !== this.editPasswordForm.newPass) {
                callback(new Error('两次输入密码不一致'));
            } else {
                callback();
            }
        };
        return {
            userForm: {
                name: '',
                cellphone: '',
                jobNumber: '',
                duty:'',
                professionalTitle:'',
                department: ''
            },
            disabledInput:true,
            permission:"",
            id: '',
            uid: '', // 登录用户的userId
            securityCode: '', // 验证码
            phoneHasChanged: false, // 是否编辑了手机
            save_loading: false,
            identifyError: '', // 验证码错误
            editPasswordModal: false, // 修改密码模态框显示
            savePassLoading: false,
            oldPassError: '',
            identifyCodeRight: false, // 验证码是否正确
            hasGetIdentifyCode: false, // 是否点了获取验证码
            canGetIdentifyCode: false, // 是否可点获取验证码
            checkIdentifyCodeLoading: false,
            inforValidate: {
                name: [
                    { required: true, message: '请输入姓名', trigger: 'blur' }
                ],
                cellphone: [
                    { required: true, message: '请输入手机号码' },
                    { validator: validePhone }
                ]
            },
            editPasswordForm: {
                // oldPass: '',
                newPass: '',
                rePass: ''
            },
            passwordValidate: {
                // oldPass: [
                //     { required: true, message: '请输入原密码', trigger: 'blur' }
                // ],
                newPass: [
                    { required: true, message: '请输入新密码', trigger: 'blur' },
                    { min: 6, message: '请至少输入6个字符', trigger: 'blur' },
                    { max: 32, message: '最多输入32个字符', trigger: 'blur' }
                ],
                rePass: [
                    { required: true, message: '请再次输入新密码', trigger: 'blur' },
                    { validator: valideRePassword, trigger: 'blur' }
                ]
            },
            // inputCodeVisible: false, // 显示填写验证码box
            initPhone: '',
            // gettingIdentifyCodeBtnContent: '获取验证码' // “获取验证码”按钮的文字
        };
    },
    methods: {
        editForm(){
            this.disabledInput=false;
        },
        // getIdentifyCode () {
        //     this.hasGetIdentifyCode = true;
        //     this.$refs['userForm'].validate((valid) => {
        //         if (valid) {
        //             this.canGetIdentifyCode = true;
        //             let timeLast = 60;
        //             let timer = setInterval(() => {
        //                 if (timeLast >= 0) {
        //                     this.gettingIdentifyCodeBtnContent = timeLast + '秒后重试';
        //                     timeLast -= 1;
        //                 } else {
        //                     clearInterval(timer);
        //                     this.gettingIdentifyCodeBtnContent = '获取验证码';
        //                     this.canGetIdentifyCode = false;
        //                 }
        //             }, 1000);
        //             this.inputCodeVisible = true;
        //             // you can write ajax request here
        //         }
        //     });
        // },
        showEditPassword () {
            this.editPasswordModal = true;
        },
        cancelEditUserInfor () {
            this.disabledInput = true;
            history.back(-1)
            // this.$store.commit('removeTag', 'ownspace_index');
            // localStorage.pageOpenedList = JSON.stringify(this.$store.state.app.pageOpenedList);
            // let lastPageName = '';
            // if (this.$store.state.app.pageOpenedList.length > 1) {
            //     lastPageName = this.$store.state.app.pageOpenedList[1].name;
            // } else {
            //     lastPageName = this.$store.state.app.pageOpenedList[0].name;
            // }
            // this.$router.push({
            //     name: lastPageName
            // });
        },
        saveEdit () {
            this.$refs['userForm'].validate((valid) => {
                if (valid) {
                    let item = {};
                    item["phoneNumber"]=this.userForm.cellphone;
                    item["jobNumber"] = this.userForm.jobNumber;
                    item["name"]= this.userForm.name;
                    item["id"]= this.id;
                    item["permission"]=this.permission;
                    if(this.editPasswordForm.newPass!=""){
                        item["password"]=this.editPasswordForm.newPass;
                    }
                    console.log(item)
                var vm = this;
                this.$axios.post('/addTeacher', item)
                    .then(function(response) {
                        if (response.data.code == 0) {
                            vm.$Message.destroy();
                            vm.$Message.success({
                                content: '保存成功！！！',
                                duration: 2
    
                            });
                             Cookies.set('user', this.userForm.name);
                             this.disabledInput=true;
    
                        } else {
                            vm.$Notice.error({
                                content: '保存失败！！！',
                                duration: 2
    
                            });
    
                        }
                    })
    
                    .catch(function(err) {
                    })




                }
            });
        },
        cancelEditPass () {
            this.editPasswordModal = false;
        },
        saveEditPass () {
      
            this.$refs['editPasswordForm'].validate((valid) => {
                if (valid) {
                    
                    this.editPasswordModal = false
                    // this.savePassLoading = true;
                    // you can write ajax request here
                }
            });
        },
        init () {
             let vm = this;
             this.$axios.get('/findTeacher', {params: {jobNumber:JSON.parse(localStorage.teacher).jobNumber}})
                .then(function (response) {
                    console.log(response.data)
                    let data = response.data.teacher[0];
                    vm.userForm.name = data.name;
                    vm.userForm.cellphone = data.phoneNumber;
                    // this.initPhone = '17712345678';
                    vm.userForm.jobNumber = data.jobNumber;
                    vm.userForm.duty = data.duty;
                    vm.userForm.professionalTitle = data.professionalTitle;
                    vm.userForm.department = data.department;
                    vm.id = data.id;
                    vm.permission = data.permiss;
                   
                })
                .catch((response) => {
                    
                       
                });
            
        },
        cancelInputCodeBox () {
            this.inputCodeVisible = false;
            this.userForm.cellphone = this.initPhone;
        },
        hasChangePhone () {
            this.phoneHasChanged = true;
            this.hasGetIdentifyCode = false;
            this.identifyCodeRight = false;
        }
    },
    mounted () {
        this.init();
    }
};
</script>
