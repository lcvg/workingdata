<style lang="less">
  
    @import './components/batch.less';

   
</style>


<template>  

    
       <!-- <Modal :visible.sync="modal1" title="普通的Modal对话框标题" @on-ok="ok" @on-cancel="cancel">
       
            </Modal> -->
    
    <div>
      
     <input type="file" ref="finp" @change="getFile"  id="file" />
     <i-button type="default" class="remove"  icon="plus" @click="add">批量添加</i-button>
     <i-button type="default"  icon="ios-download-outline" class="export" @click="download">样表下载</i-button>
     <Row>
            <Col span="24" class="padding-left-0">
                <Card >
                    <div class="edittable-con-1 padding-left-10">
                      <Table border ref="selection" :columns="columnsList" :data="tableData"></Table>
                    </div>
                </Card>
            </Col>
        </Row>
        
      </div>
</template>
 

<script>

import $ from 'jquery';
import './components/jquery-3.1.1.min.js'
import XLSX from 'xlsx';
import Vue from 'vue';



export default {
    name: 'batch-insert',
    components: {
       
    },
    data () {
        return {
           wb:'',
           rABS:false,
           columnsList : [
             {
                title: '全选',
                // key: 'id',
                width: 80,
                // align: 'center',s
                // checkable: true,
                type: 'selection',
                className:'tableCheck'
               
            },
            
            
            {
                title: '姓名',
                align: 'center',
                key: 'name'
            },
            {
                title: '工号',
                align: 'center',
                key: 'jobNumber'
            },
            {
                title: '性别',
                align: 'center',
                key: 'sex'
            },
             {
                title: '所属部门',
                align: 'center',
                key: 'department'
            },
            {
                title: '职称',
                align: 'center',
                key: 'professionalTitle'
            },
             {
                title: '职务',
                align: 'center',
                key: 'duty'
            },
            {
                title: '联系电话',
                align: 'center',
                key: 'phoneNumber'
            },
            
           {
                title: '权限',
                align: 'center',
                key: 'permission'   
            },
             {
                title: '密码',
                align: 'center',
                key: 'password'   
            }
        
        ],
            
        
          tableData:[]
            
        };
    },
    methods: {
          getFile (e) {
              this.importf(this);
             },
             download(){
                window.location.href = "/infoDownload"
             },
             add(tem) {
                var vm = this;
                this.$axios.post('/addTeacherByBatch', this.tableData)
                    .then(function(response) {
                        if (response.data.code == 0) {
                            vm.$Message.destroy();
                            vm.$Notice.success({
                                title: '添加成功！！！',
                                duration: 2
                            });
                            vm.tableData=[]
    
                        } else {
                            vm.$Message.destroy();
                            vm.$Notice.error({
    
                                title: '添加失败！！！',
                                duration: 2
                            });
                        }
                    })
                    .catch(function(err) {
                    })
    
            },
            importf(vm) {//导入
                let obj = document.getElementById("file")
                console.log(this.$refs.finp.files)
                var wb = this.wb;
                var rABS = this.rABS;
               
                console.log(document.getElementById('file').files)
                if(!obj.files) {
                    return;
                }
                var f = obj.files[0];
                var reader = new FileReader();
                reader.onload = function(e) {
                    var data = e.target.result;
                    if(rABS) {
                        wb = XLSX.read(btoa(fixdata(data)), {//手动转化
                            type: 'base64'
                        });
                    } else {
                        wb = XLSX.read(data, {
                            type: 'binary'
                        });
                    }
                    
                    console.log(XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]))
                    let resData  = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
                    
                    
                    for(let d of resData){
                        let item = {};
                        item["jobNumber"] = d["工号"];
                        item["name"] = d["姓名"];
                        item["professionalTitle"] = d["职称"];
                        item["sex"] = d["性别"];
                        item["phoneNumber"] = d["联系电话"];
                        item["duty"] = d["职务"];
                        item["department"] = d["部门"];
                        item["password"] = d["密码"];
                        item["permission"] = 2;
                        vm.tableData.push(item)
                    }
                    console.log(vm.tableData)
                    // vm.tableData = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);

                };
                if(rABS) {
                    reader.readAsArrayBuffer(f);
                } else {
                    reader.readAsBinaryString(f);
                }
            },

            fixdata(data) { //文件流转BinaryString
                            var o = "",
                                l = 0,
                                w = 10240;
                            for(; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)));
                            o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
                            return o;
            },

    },
    created () {
       
    }

};
</script>







