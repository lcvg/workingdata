<style lang="less">
    @import './add.less';
</style>
<template>
    <div>
        <Button type="default" icon="plus" @click="show(1,1,0)" class="addbtn">添加获奖记录</Button>
            <Modal
                v-model="modal1"
                title="获奖信息"
                @on-ok="ok"
                @on-cancel="cancel">
                 <Row>
        
       <form  id="buildprojectform" accept-charset="utf-8">
            <div class="line">
                 <label>获奖内容</label><Input   class="input" v-model="awardContent" @on-change="" name="projectId"></Input>
            </div>
            <div class="line">
                <label>获奖级别</label>
                <Select v-model="awardLevel" class="input"  clearable >
                    <Option value="1">
                        <span>一等奖</span>
                       
                    </Option>
                    <Option value="2">
                        <span>二等奖</span>
                       
                    </Option>
                    <Option value="3">
                        <span>三等奖</span>
                       
                    </Option>
                </Select>
                <!-- <Input  class="input" v-model="awardLevel" @on-change="" name="projectName"></Input> -->
            </div>
            <div class="line2">
                <label>获奖时间</label><Col span="12">
                <DatePicker  type="date" placeholder="Select date"  style="width: 200px" name="buildDate" v-model="awardDate"      format="yyyy-MM-dd"  @on-change="" ></DatePicker>
            </Col>
            </div>
            
            <div class="line bid">
                <Input class="input " v-model="id"  name="id"></Input>
            </div>
            <Upload ref="upload" multiple
                :show-upload-list="false"
                action="http://localhost:8070/uploadCover"
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
        
       </form>
        <!-- <div class="wrapper">
            课程名称<Input v-model="value2" @on-change="value2Change"></Input>
        </div> -->
    </Row>
            </Modal>
    </div>

</template>

<script>
export default {
        name:"Amodal",
        data () {
            return {
                modal1: false,
                id:'',
                awardContent:'',
                awardLevel:'',
                awardDate:'',
                state:'',
                uploadList:[],
                listData:[],
                type:'',
                sel:""
            }
        },
        methods: {
            ok () {
                

                if (this.awardDate == '' || this.awardContent == '' || this.awardLevel == '') {
                                this.$Message.error('信息填写不完整!')
                            }else{
                                    var item ={};
                                    var js = [];
                                    var d = new Date(this.awardDate);
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

                                    item["awardContent"] = this.awardContent;
                                    item["awardLevel"] = this.awardLevel;
                                    item["awardDate"] = d.getFullYear() + '-' + month + '-' + day;
                            
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
                .catch(function (err) {
                    
                      
                       
                });
            } ,
            show(type,data,edit){
               
                this.type = edit;

                if(edit==1){
                    this.awardContent = data.awardContent;
                    this.awardLevel = data.awardLevel;
                    this.awardDate = data.awardDate;
                   
                    this.listData = data.listData;
                    this.id = data.id;
                }else{
                   this.awardContent = "";
                    this.awardLevel = "";
                    this.awardDate = "";
                    this.type = edit;
                    this.listData= []; 
                }    
                 this.modal1 = true;
            }, 
            add(item){
                var vm = this;
                 this.$axios.post('/addAwardRecords?type=6',item, {headers: {"Content-Type": "application/json"}})
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

        }
    }
</script>
