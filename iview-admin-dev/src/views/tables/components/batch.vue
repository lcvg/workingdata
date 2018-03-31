<style lang="less">
    @import './add.less';
</style>
<template>
    <div>
        <Modal
                v-model="modal2"
                title="添加建设课程信息"
                @on-ok="ok"
                @on-cancel="cancel">
        <Button type="primary" @click="show" class="addbtn">添加教改课题</Button>
        <div id="tb"></div>
        <Input type="file" ref="inpu" @on-change="importf($event.target)" />
        
         <!-- <Table border ref="selection" :columns="columnsList" :data="tableData"></Table> -->
        
        
     </Modal>
    </div>
</template>
<script src="https://cdn.bootcss.com/xlsx/0.11.9/xlsx.core.min.js"></script>

<script>
import XLSX from 'xlsx';
import Vue from 'vue';

export default {
        name:"batch",
        data () {
        return {
           wb:'',
           rABS:false
            
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
                   

                    // document.getElementById("tb").innerHTML= JSON.stringify( XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]) );
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
                        }

       
    },
    created () {
       
    }
}
     
    
</script>
