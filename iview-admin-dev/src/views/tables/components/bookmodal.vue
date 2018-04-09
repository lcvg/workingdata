<style lang="less">
    @import './add.less';
</style>
<template>
    <div>
        <Button type="default" icon="plus" @click="show(1,1,0)" class="addbtn">添加出版教材</Button>
            <Modal
                v-model="modal1"
                title="出版教材信息"
                @on-ok="ok">
                 <Row>
       <form  id="textbook" accept-charset="utf-8">
            <div class="line">
                 <label>教材名称：</label><Input class="input" v-model="textbook" />
            </div>
            <div class="line">
                <label>教材类型：</label><Input class="input" v-model="btype"></Input>
            </div>
            <div class="line">
                <label>isbn：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label><Input class="input" v-model="isbn"  ></Input>
            </div>
            <div class="line">
                <label>出&nbsp;&nbsp;版&nbsp;&nbsp;社：</label><Input class="input" v-model="press"  ></Input>
            </div>
            <div class="line2">
                <label>出版时间：</label>
                <Col span="12">
                    <DatePicker  type="date" placeholder="请选择时间"  style="width: 200px"  v-model="publishDate"      format="yyyy-MM-dd"  @on-change="" ></DatePicker>
                </Col>
            </div>
             <div class="line">
                <label>撰写内容：</label><Input class="input" type="textarea" v-model="compose"  ></Input>
            </div>
             <div class="line">
                <label>教材简介：</label><Input class="input" type="textarea" v-model="introduce"  ></Input>
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
                <span>请选择文件：</span>
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
      
    </Row>
            </Modal>
    </div>

</template>

<script>
import axios from "axios";
export default {
        name:"Tbmodal",
        data () {
            return {
                modal1: false,
                id:'',
                textbook:'',
                btype:'',
                publishDate:'',
                press:'',
                isbn:'',
                compose:'',
                introduce:'',
                uploadList:[],
                listData:[],
                type:'',
                sel:""
            }
        },
        methods: {
            ok () {
                if (this.textbook == '' || this.publishDate == '' || this.btype == '' || this.press == '' || this.isbn == '') {
                                this.$Message.error('信息填写不完整!')
                            }else{
                                    var item ={};
                                    var js = [];
                                    var d = new Date(this.publishDate);
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

                                    item["textbook"] = this.textbook;
                                    item["type"] = this.btype;
                                    item["publishDate"] = d.getFullYear() + '-' + month + '-' + day;
                                    item["isbn"] = this.isbn;
                                    item["press"] = this.press;
                                    item["compose"] = this.compose;
                                    item["introduce"] = this.introduce;
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
                this.$axios.post('/deleteAttachment', current.listData[index])
                .then(function (response) {
                      current.listData.splice(index,1);
                    current.$Message.success('文件删除成功');
                   
                })
                .catch(function (response) {
                  
                      
                       
                });
            } ,
            show(type,data,edit){
                
                if(edit==1){
                    this.textbook = data.textbook;
                    this.btype = data.type;
                    this.publishDate = data.publishDate;
                    this.isbn = data.isbn;
                    this.compose = data.compose;
                    this.press = data.press;
                    this.introduce = data.introduce;
                    this.type = edit;
                    this.listData = data.listData;
                    this.id = data.id;
                }else{
                    this.textbook = "";
                    this.btype = "";
                    this.publishDate = "";
                    this.isbn = "";
                    this.compose = "";
                    this.press = "";
                    this.introduce = "";
                    this.type = edit;
                    this.listData= [];
                }
                       
                 this.modal1 = true;

              
            }, 
            add(item){
                var vm = this;
                 this.$axios.post('/addTextBook',item)
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
