<style lang="less">
    @import './show.less';
</style>
<template>
    <div>
            <Modal
                v-model="modal1"
                title="指导记录信息">
                 <Row>
        
      
         
            
            <div class="line">
                <label>竞赛名称：</label><span>{{competitionName}}</span>
            </div>
            
            <div class="line">
                <label>竞赛类别：</label><span>{{competitionType}}</span>
            </div>
            <div class="line">
                <label>获奖时间：</label><span>{{guideDate}}</span>
            </div>
            <div class="line">
                <label>学生姓名：</label><span>{{studentName}}</span>
            </div>
            <div class="line">
                <label>学生学号：</label><span>{{studentNumber}}</span>
            </div>
           
            <div class="line">
                <label>学生类型：</label><span>{{studentType}}</span>
            </div>
            <div class="line">
                <label>学生班级：</label><span>{{studentClass}}</span>
            </div>
            
         
           
            <div class="line">
                <label>状 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态：</label><span v-f>{{state}}</span>
            </div>
            <div class="line">
                <label>附 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;件：</label>
                <tr v-for="item of this.listData"><td><a :href="'http://localhost:8070/download?id='+item.id">{{item.dataName.substring(13)}}</a></td></tr>
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
        name:"Gdetail",
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
                state:""
                
            }
        },
        methods: {
           
           
            close(){
                this.modal1 = false;
            },
            show(type,data,edit){
                this.competitionName = data.competitionName;
                this.competitionType = data.competitionType;
                this.guideDate = data.guideDate;
                this.studentName = data.studentName;
                this.studentNumber = data.studentNumber;
                this.studentType = this.checkType(data.studentType);
                this.studentClass = data.studentClass;
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
                return "本科";
            }
            if(type=="2"){
                return "研究生";
            }
            if(type=="3"){
                return "其他";
            }
            
        },
        },
        
        mounted(){
            
        }
    }
</script>
