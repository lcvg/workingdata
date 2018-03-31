<style lang="less">
    @import './add.less';
</style>
<template>
    <div>
    
        <Button type="default" @click="show(1,1,0)" icon="android-add" class="addbtn" >添加教师</Button>
        <Modal v-model="modal1" title="添加教师" @on-ok="ok">
    
            <Row>
    
                <form id="buildprojectform" accept-charset="utf-8">
    
                    <div class="line">
    
                        <label>姓名</label>
    
                        <Input class="input" v-model="name" />
    
                    </div>
    
                    <div class="line">
    
                        <label>工号</label>
    
                        <Input class="input" v-model="jobNumber"></Input>
    
                    </div>
    
                    <div class="line">
    
                        <label>性别</label>
    
                         <RadioGroup v-model="sex">
                            <Radio label="男">男</Radio>
                            <Radio label="女">女</Radio>
                            
                        </RadioGroup>
    
                    </div>
    
                    <div class="line">
                        <label>部门</label>
                        <Select v-model="department" class="input" clearable>
                        <Option v-for="item of dep" :value=item.depId>
                            <span>{{item.depName}}</span>
                        </Option>
    
                      
    
                    </Select>
                    </div>
    
                    <div class="line">
    
                        <label>职称</label>
                        <Input class="input" v-model="professionalTitle" ></Input>
                       
    
                    </div>
    
                    <div class="line">
    
                        <label>职务</label>
    
                        <Input class="input" v-model="duty" ></Input>
    
                    </div>
                    
    
                    <div class="line">
    
                        <label>电话</label>
                        <Input class="input" v-model="phoneNumber" @on-change="" name="projectName"></Input>
    
                    </div>
                    <div class="line">
                        <label>权限</label>
                        <Select v-model="authority" class="input" clearable>
                        <Option value="2" selected>
                            <span>用户</span>
                        </Option>
                        <Option value="1">
                            <span>管理员</span>
                        </Option>
    
                    </Select>
                  
                    </div>
    
                </form>
    
    
    
            </Row>
    
        </Modal>
    
    </div>
</template>

<script>
    import axios from "axios";
    
    export default {
    
        name: "modal",
    
        data() {
    
            return {
    
                modal1: false,
    
                id: '',
                name: '',
                authority:'',
                jobNumber: '',
    
                sex: '',
    
                department: '',
                dep:[],
                professionalTitle: '',
    
                duty: '',
    
                phoneNumber: '',
    
                type: '',
    
                sel: ""
    
            }
    
        },
    
        methods: {
    
            ok() {
    
                var item = {};
    
                var js = [];
    
                item["jobNumber"] = this.jobNumber;
    
                item["name"] = this.name;
    
                item["professionalTitle"] = this.professionalTitle;
    
                item["sex"] = this.sex;
    
                item["phoneNumber"] = this.phoneNumber;
    
                item["duty"] = this.duty;
    
                item["department"] = this.department;
                item["password"] = "184593";
                item["permission"] = "1";
                // js.push(item);
                if (this.type == 0) {
    
                    this.add(item)
    
                    msg = this.$Message.loading({
    
                        content: '正在保存..',
    
                        duration: 0
    
                    })
    
                } else {
                   
    
                    item["id"] = this.id;
    
                    this.add(item)
    
                    msg = this.$Message.loading({
    
                        content: '正在更新..',
    
                        duration: 0
    
                    })
    
                }
            },
            show(type, data, edit) {
 
                 this.type = edit;
                if (edit == 1) {
    
                     this.jobNumber = data.jobNumber;
                    this.name = data.name;
                    this.sex = data.sex;
                    this.professionalTitle = data.professionalTitle;
                    this.duty = data.duty;
                    this.department = data.department;
                    this.phoneNumber=data.phoneNumber;
                    if(data.permission=="1"){
                        this.authority = data.permission;
                    }else{
                        this.authority = "2";
                    }
                    this.id = data.id;
    
                }else{
                    this.jobNumber = "";
                    this.phoneNumber="";
                    this.name = "";
                    this.sex = "";
                    this.professionalTitle = "";
                    this.duty = "";
                    this.department = "";
                    this.authority = "";
                }
                this.modal1 = true;
            },
            add(item) {
                var vm = this;
                this.$axios.post('/addTeacher', item)
                    .then(function(response) {
                        if (response.data.code == 0) {
                            vm.$Message.destroy();
                            vm.$Notice.success({
                                title: '操作成功！！！',
                                duration: 2
                            });
    
                            vm.$emit("ee");
    
                        } else {
                            vm.$Message.destroy();
                            vm.$Notice.error({
    
                                title: '操作失败！！！',
                                duration: 2
                            });
                        }
                    })
    
                    .catch(function(err) {
                    })
    
            }
        },
        mounted() {
            let vm = this;
             this.$axios.get('/find', {params: {type:10}})
                .then(function (response) {
                  // console.log(response);
                      vm.dep = response.data.list;
                      
                   
                })
                .catch((response) => {
                });
        }
    
    }
</script>
