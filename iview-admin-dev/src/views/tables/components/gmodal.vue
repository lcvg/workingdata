<style lang="less">
    @import './add.less';
</style>
<template>
    <div>
        <Button type="default" icon="plus" @click="show(1,1,0)" class="addbtn" v-if="kj">添加指导记录</Button>
            <Modal
                v-model="modal1"
                title="指导记录"
                @on-ok="ok"
                @on-cancel="cancel">
                 <Row>
        
      
            <div class="line">
                 <label>竞赛名称：</label><Input   class="input" v-model="competitionName" ></Input>
            </div>
             <div class="line">
                 <label>竞赛类别：</label><Input   class="input" v-model="competitionType" ></Input>
            </div>
             <div class="line">
                 <label>学生姓名：</label><Input   class="input" v-model="studentName" ></Input>
            </div>
             <div class="line">
                 <label>学生学号：</label><Input   class="input" v-model="studentNumber" ></Input>
            </div>
             <div class="line">
                 <label>学生班级：</label><Input   class="input" v-model="studentClass" ></Input>
            </div>
            <div class="line">
                <label>学生类型：</label>
                <Select v-model="studentType" class="input"  clearable >
                    <Option value="1">
                        <span>本科</span>
                       
                    </Option>
                    <Option value="2">
                        <span>研究生</span>
                       
                    </Option>
                </Select>
                <!-- <Input  class="input" v-model="awardLevel" @on-change="" name="projectName"></Input> -->
            </div>
            <div class="line2">
                <label>指导时间：</label><Col span="12">
                <DatePicker  type="date" placeholder="Select date"  style="width: 200px"  v-model="guideDate"      format="yyyy-MM-dd"  @on-change="" ></DatePicker>
            </Col>
            </div>
            
            <div class="line bid">
                <Input class="input " v-model="id"  name="id"></Input>
            </div>
            <Upload ref="upload" multiple
                :show-upload-list="false"
                action="/uploadCover"
                :on-format-error="handleFormatError"
                
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
                        <span ref="dd">{{ list["dataName"].substring(13) }}</span>
                        <Icon type="close" @click.native="handleClick(index)" class="icon"></Icon>
                        </div>
                    </li>
                </ul>
            </div>
    </Row>
            </Modal>
    </div>

</template>

<script>
export default {
        name:"Gmodal",
        data () {
            return {
                modal1: false,
                id:'',
                competitionName:'',
                competitionType:'',
                guideDate:'',
                studentName:'',
                studentNumber:'',
                studentType:'',
                studentClass:'',
                state:'',
                uploadList:[],
                listData:[],
                type:'',
                kj:false,
                sel:""
            }
        },
        props:["vis"],
        methods: {
           
            ok () {
                if (this.competitionName == '' || this.competitionType == '' || this.guideDate == ''|| this.studentName == ''|| this.studentType == ''|| this.studentClass == '') {
                                this.$Message.error('信息填写不完整!')
                            }else{
                                    var item ={};
                                    var js = [];
                                    var d = new Date(this.guideDate);
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

                                    item["competitionName"] = this.competitionName;
                                    item["competitionType"] = this.competitionType;
                                    item["studentName"] = this.studentName;
                                    item["studentNumber"] = this.studentNumber;
                                    item["studentType"] = this.studentType;
                                    item["studentClass"] = this.studentClass;
                                    item["guideDate"] = d.getFullYear() + '-' + month + '-' + day;
                            
                                    item["listData"] = this.listData;
                                    item["state"]="1";
                                    item["jobNumber"]= JSON.parse(localStorage.teacher).jobNumber;;
                                    item["name"]= JSON.parse(localStorage.teacher).name;

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
            cancel () {
               
            },
            
            handleFormatError (file) {
                this.$Notice.warning({
                    title: '文件格式不正确',
                    desc: '文件 ' + file.name + ' 格式不正确，请选择图片文件。'
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
                this.$axios.post('/deleteAttachment', current.listData[index])
                .then(function (response) {
                     current.listData.splice(index,1);
                    console.log(JSON.stringify(current.listData))
                    current.$Message.success('文件删除成功');
                      
                   
                })
                .catch(function (error) {
                   
                       
                });
            } ,
            show(type,data,edit){
               
                this.type = edit;

                if(edit==1){
                    this.competitionName = data.competitionName;
                    this.competitionType = data.competitionType;
                    this.guideDate = data.guideDate;
                    this.studentName = data.studentName;
                    this.studentNumber = data.studentNumber;
                    this.studentType = data.studentType;
                    this.studentClass = data.studentClass;
                    this.listData = data.listData;
                    this.id = data.id;
                }else{
                   this.competitionName = "";
                    this.competitionType = "";
                    this.studentName = data.studentName;
                    this.guideDate = "";
                    this.studentNumber = "";
                    this.studentType = "";
                    this.studentClass = "";
                    this.listData= []; 
                }    
                 this.modal1 = true;
            }, 
            add(item){
                var vm = this;
                 this.$axios.post('/addGuideRecord?type=2',item, {headers: {"Content-Type": "application/json"}})
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
