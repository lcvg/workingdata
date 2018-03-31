<style lang="less">
  
    @import './components/batch.less';

   
</style>


<template>  

    
       <!-- <Modal :visible.sync="modal1" title="普通的Modal对话框标题" @on-ok="ok" @on-cancel="cancel">
       
            </Modal> -->
    
    <div>
      
     <Input type="file" @on-change="importf($event.target)" id="file" />
     <table class="bordered">

         <div id="demo"></div>
     </table>
        
         <!-- <Table border ref="selection" :columns="columnsList" :data="tableData"></Table> -->
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
           columnsList:[{
            title:"1",
            key:"也"
           },{
            title:"2",
            key:"是"
           }
           
           ],
           tableData:[{是:"ss"}]
            
        };
    },
    methods: {
       importf(obj) {//导入
                var wb = this.wb;
                var rABS = this.rABS;
                console.log(obj)
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
                    //wb.SheetNames[0]是获取Sheets中第一个Sheet的名字
                    //wb.Sheets[Sheet名]获取第一个Sheet的数据
                     var data = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
                     var $th = $("<tr><th>诉求主题</th><th>联系人</th><th>联系人</th><th>操作</th></tr>");
                     $th.appendTo("#demo")
                    
                    for( var i = 0; i < data.length; i++ ) {
                        var $trTemp = $("<tr  class='info'></tr>");

                //往行里面追加 td单元格
                        $trTemp.append("<td>"+ data[i].诉求主题 +"</td>");
                        $trTemp.append("<td>"+ data[i].交办人 +"</td>");
                        $trTemp.append("<td>"+ data[i].联系人 +"</td>");
                        $trTemp.append("<td><Button @click.native='delete' >删除</Button></td>");
                // $("#J_TbData").append($trTemp);
              
                    }
                    // alert(html)
                    // document.getElementById("demo").innerHTML = '<Table border  :columns="columnsList" :data="tableData"></Table> '
                    $trTemp.appendTo("#demo");
                    // document.getElementById("demo").append("<td>ffff</td>");

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

            delete(){
                  alert(1)
            }
                          
       
    },
    created () {
       
    }

};
</script>







