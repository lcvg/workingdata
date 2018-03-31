<style lang="less">
    @import './show.less';
</style>
<template>
    <div>
            <Modal
                v-model="modal1"
                title="教改课题信息">
                 <Row>
            <div class="line">
                <label>课题名称：</label><span>{{projectName}}</span>
            </div>
            
            <div class="line">
                <label>课题编号：</label><span>{{projectId}}</span>
            </div>
            <div class="line">
                <label>课题类型：</label><span>{{projectType}}</span>
            </div>
            <div class="line">
                <label>主持人：</label><span>{{compere}}</span>
            </div>
            <div class="line">
                <label>申报时间：</label><span>{{reportTime}}</span>
            </div>
           
            <div class="line">
                <label>课题简介：</label><span>{{projectIntroduce}}</span>
            </div>
            
            <div class="line">
                <label>状 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态：</label><span v-f>{{state}}</span>
            </div>
            <div class="line">
                <label>附 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;件：</label>
                <tr v-for="item of this.listData"><td><a :href="'http://localhost:8070/download?id='+item.id">{{item.dataName}}</a></td></tr>
                <!-- <span v-for="item of this.listData">{{item.dataName}}</span> -->
            </div>
           
            


            <!-- <div class="line">
                <label>状 &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;态</label><Input class="input" v-model="value1" @on-change="stateChange" disabled name="state"></Input>
            </div>  --> 
        
     
        <!-- <div class="wrapper">
            课程名称<Input v-model="value2" @on-change="value2Change"></Input>
        </div> -->
    </Row>
    <div slot="footer">
            <Button type="info" size="large" long  @click="close">关闭</Button>
        </div>
            </Modal>
    </div>

</template>

<script>
export default {
        name:"Tdetail",
        data () {
            return {
                modal1: false,
                id:'',
                projectId:'',
                projectName:'',
                projectIntroduce:'',
                projectType:'',
                compere:'',
                reportTime:'',
             
                state:''
               
                
            }
        },
        methods: {
           
           
            close(){
                this.modal1 = false;
            },
            show(type,data,edit){
               
                this.projectIntroduce = data.projectIntroduce;
                this.projectName = data.projectName;
                this.projectId = data.projectId;
                this.compere = data.compere;
                this.projectType = this.checkType(data.projectType);
                this.reportTime = data.reportTime;
                this.type = edit;
                this.listData = data.listData;
                this.id = data.id;
                 this.state = this.checkState(data.state); 


               
                  
                this.modal1 = true;

              
            },
            checkState(state){
            if(state=="1"){
                return "待审核";
            }
            if(state=="0"){
                return "审核通过";
            }
            if(state=="2"){
                return "审核不通过";
            }
            
        },
         checkType(type){
            if(type=="1"){
                return "重点";
            }
            if(type=="2"){
                return "一般";
            }
            
            
        },
        },
        
        mounted(){
            
        }
    }
</script>
