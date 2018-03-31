<style lang="less">
    @import './add.less';
</style>
<template>
    <div>
        <Button type="default" icon="plus" @click="show(1,1,0)" class="addbtn" v-if="kj">添加教改课题</Button>
            <Modal
                v-model="modal1"
                title="添加建设课程信息"
                @on-ok="ok">
                 <Row>
       <form  id="buildprojectform" accept-charset="utf-8">
            <div class="line">
                 <label>课程编号</label><Input class="input" v-model="projectId" />
            </div>
            <div class="line">
                <label>课程名称</label><Input class="input" v-model="projectName" @on-change="" name="projectName"></Input>
            </div>
            <div class="line2">
                <label>建设时间</label><Col span="12">
                <DatePicker  type="date" placeholder="Select date"  style="width: 200px" name="buildDate" v-model="buildDate"      format="yyyy-MM-dd"  @on-change="" ></DatePicker>
            </Col>
            </div>
            <div class="line">
                <label>授课方式</label>
           
                <Select v-model="teachingMethod" class="input"  clearable >
                    <Option value="在线授课">
                        <span>在线授课</span>
                       
                    </Option>
                    <Option value="教室授课">
                        <span>教室授课</span>
                       
                    </Option>
                </Select>
             
            </div>
            <div class="line">
                <label>所属专业</label>
                <Select v-model="major" class="input"  clearable >
                    <Option value="软件工程">
                        <span>软件工程</span>
                       
                    </Option>
                    <Option value="信息工程">
                        <span>信息工程</span>
                       
                    </Option>
                </Select>
            </div>
            <div class="line bid">
                <Input class="input " v-model="id"  name="id"></Input>
            </div>
            <Upload ref="upload" multiple
                :show-upload-list="false"
                action="http://localhost:8070/uploadCover"
                :on-format-error="handleFormatError"
                :before-upload="handleBeforeUpload"
                :on-progress="handleProgress"
                :on-success="handleSuccess"
                :on-error="handleError" class="line upload"
                name="file" >
                <span>请选择文件</span>
                <Button type="ghost" icon="ios-cloud-upload-outline">上传附件</Button>
                
            </Upload>

            <div class="tip" ref="tip" v-if="true">
                <ul>
                     <li v-for="(list,index) of listData" >
                        <div class="tip-one" >
                        <Icon type="document-text" size="15"></Icon>
                        <span ref="dd">{{ list["dataName"] }}</span>
                        <Icon type="close" @click.native="handleClick(index)" class="icon"></Icon>
                        </div>
                    </li>
                </ul>
            </div>
       </form>
    </Row>
            </Modal>
    </div>

</template>

<script>
import axios from "axios";
export default {
        name:"modal",
        data () {
            return {
                modal1: false,
                id:'',
                kj:false,
                projectId:'',
                projectName:'',
                buildDate:'',
                teachingMethod:'',
                major:'',
                uploadList:[],
                listData:[],
                type:'',
                sel:""
            }
        },
        props:["vis"],
        methods: {
            ok () {
                

                if (this.projectId == '' || this.projectName == '' || this.buildDate == '' || this.teachingMethod == '' || this.marjor == '') {
                                this.$Message.error('信息填写不完整!')
                            }else{
                                    var item ={};
                                    var js = [];
                                    var d = new Date(this.buildDate);
                                    var month = "";
                                    var day = ""
                                    if((d.getMonth()+1)<10){
                                        month = "0"+(d.getMonth()+1);
                                    }else{
                                        month = ""+d.getMonth()+1;
                                    }
                                     
                                    if (d.getDate()<10){
                                        day = "0"+d.getDate();
                                    }else{
                                        day = ""+d.getDate()
                                    }

                                    item["projectName"] = this.projectName;
                                    item["projectId"] = this.projectId;
                                    item["buildDate"] = d.getFullYear() + '-' + month + '-' + day;
                                    item["teachingMethod"] = this.teachingMethod;
                                    item["major"] = this.major;
                                    item["listData"] = this.listData;
                                    item["state"]="1";
                                    item["jobNumber"]=JSON.parse(localStorage.teacher).jobNumber;
                                    item["name"]=JSON.parse(localStorage.teacher).name;

                                    js.push(item);
                              
                                 if (this.type == 0) {
                                    this.add(js)
                                    msg = this.$Message.loading({
                                        content: '正在保存..',
                                        duration: 0
                                    })
                                }else{
                                    item["id"]=this.id;
                                    this.add(js)
                                    msg = this.$Message.loading({
                                        content: '正在更新..',
                                        duration: 0
                                    })
                                }
                                 

                            }
                     
            },
           
            
            handleFormatError (file) {
                this.$Notice.warning({
                    title: '文件格式不正确',
                    desc: '文件 ' + file.name + ' 格式不正确，请选择图片文件。'
                });
            },
            handleBeforeUpload (file) {
                this.$Notice.warning({
                    title: '文件准备上传',
                    desc: '文件 ' + file.name + ' 准备上传。'
                });
            },
            handleProgress (event, file) {
               
                this.$Notice.info({
                    title: '文件正在上传',
                    desc: '文件 ' + file.name + ' 正在上传。'
                });
            },
            handleSuccess (res, file) {
                var fileName = res.paths[0];
                var item = {};
                
                if(res.paths[0].lastIndexOf("/")==-1){
                    item["dataName"]=fileName.substring(fileName.lastIndexOf("\\")+1);
                     item["dataPath"]=fileName.substring(0,fileName.lastIndexOf("\\"));
                }else{
                    item["dataName"]=fileName.substring(fileName.lastIndexOf("/")+1);
                    item["dataPath"]=fileName.substring(0,fileName.lastIndexOf("/")); 
                }
                this.listData.push(item)
                this.uploadList.push(item["dataName"]);
                console.log(this.uploadList)
                console.log(this.listData)
                // this.uploadList.push(res.paths[0]);
               
                this.$Notice.success({
                    title: '文件上传成功',
                    desc: '文件 ' + file.name + ' 上传成功。'
                });
                
               
                
            },
            handleError (event, file) {

                this.$Notice.error({
                    title: '文件上传成功',
                    desc: '文件 ' + file.name + ' 上传失败。'
                });
            },
            handleClick (index) {
                var current = this;
                // current.$refs.dd[index].innerText,
                this.$axios.post('/deleteAttachment', {
                    path: current.listData[index]
                    
                })
                .then(function (response) {
                      current.listData.splice(index,1);
                    current.$Message.success('文件删除成功');
                   
                })
                .catch(function (response) {
                  
                      
                       
                });
            } ,
            show(type,data,edit){
                this.projectId = "";
                this.projectName = "";
                this.buildDate = "";
                this.major = "";
                this.teachingMethod = "";
                this.type = edit;
                this.listData= [];
                if(edit==1){
                     this.projectId = data.projectId;
                    this.projectName = data.projectName;
                    this.buildDate = data.buildDate;
                    this.major = data.major;
                    this.teachingMethod = data.teachingMethod;
                    this.type = edit;
                    this.listData = data.listData;
                    this.id = data.id;
                }
                
               
                       
                 this.modal1 = true;

            }, 
            add(item){
                var vm = this;
                 this.$axios.post('/addBuildProject?type=1',item, {headers: {"Content-Type": "application/json"}})
                    .then(function (response) {
                        if(response.data.code == 0){
                             vm.$Message.destroy();
                               vm.$Notice.success({
                                    title: '操作成功！！！',
                                    duration: 2
                                });
                            vm.$emit("ee");
                        }else{
                            vm.$Message.destroy();
                               vm.$Notice.error({
                                    title: '操作失败！！！',
                                    duration: 2
                                });
                        }
                        
                    })
                    .catch(function (err) {
                       
                      
                       
                    })

            }
        },
        mounted(){
         if(this.vis=='false'){
               this.kj = false
               
            }else{
                this.kj = true
            }
        }
    }
</script>
