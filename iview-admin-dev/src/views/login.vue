<style lang="less">
    @import './login.less';
</style>

<template>
    <div class="login" @keydown.enter="handleSubmit">
        <div class="login-con">
            <Card :bordered="false">
                <p slot="title">
                    <Icon type="log-in"></Icon>
                    欢迎登录
                </p>
                <div class="form-con">
                   <p class="login-msg"> {{tip}}</p>
                    <Form ref="loginForm" :model="form" :rules="rules">
                        
                        <FormItem prop="userName">
                            <Input v-model="form.userName" placeholder="请输入用户名">
                                <span slot="prepend">
                                    <Icon :size="16" type="person"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="password">
                            <Input type="password" v-model="form.password" placeholder="请输入密码">
                                <span slot="prepend">
                                    <Icon :size="14" type="locked"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem>
                            <Button @click="handleSubmit" type="primary" long>登录</Button>
                        </FormItem>
                    </Form>
                    <p class="login-tip">输入任意用户名和密码即可</p>
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
import Cookies from 'js-cookie';

export default {
    teacher:"",
    data () {
        return {
            tip:"",
            msg:'',
            form: {
                userName: '03442',
                password: ''
            },
            rules: {
                userName: [
                    { required: true, message: '账号不能为空', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        handleSubmit () {
            this.$refs.loginForm.validate((valid) => {
                if (valid) {
                    // Cookies.set('user', this.form.userName);
                    // Cookies.set('password', this.form.password);
                    this.$store.commit('setAvator', 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg');
                    this.login(this.form.userName,this.form.password);
                }
            });
        },
         login(userName,password){
             let vm = this;
            this.$axios.post('/login?jobNumber='+userName+'&password='+password)
                    .then(function (response) {
                        if(response.data.msg== "success"){
                            // Cookies.set('teacher',  response.data.teacher);
                            localStorage.setItem("teacher",JSON.stringify(response.data.teacher));
                            
                          
                            Cookies.set('user', response.data.teacher.name);
                            if(response.data.teacher.permission=="1"){
                                Cookies.set('access', 1);
                            }else{
                                Cookies.set('access', 0);
                            }
                            vm.$router.push({
                                // name: 'teacher'
                                name: 'home_index'
                            });
                        
                        }else{
                            console.log(response)
                            
                            vm.tip="用户名或密码错误";
                            vm.form.password=""
                        }
                    })
                    .catch((response) => {    
                    });
    }
    },
   
};
</script>

<style>

</style>
