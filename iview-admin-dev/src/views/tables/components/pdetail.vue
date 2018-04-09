<style lang="less">
    @import './show.less';
</style>
<template>
    <div>
            <Modal
                v-model="modal1"
                title="考核方式">
                 <Row>
        
      
            <div class="line">
                 <label>课程名称：</label> <span>{{projectName}}</span>
            </div>
            
            <div class="line">
                <label>课程编号：</label><span>{{projectId}}</span>
            </div>
             <div class="line">
                <label>考核方式：</label><span>{{assessMode}}</span>
            </div>
            
            <div class="line">
                <label>考核时间：</label><span>{{assessDate}}</span>
            </div>
            
         
           
            <div class="line">
                <label>状 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态：</label><span>{{state}}</span>
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
        name:"Pdetail",
        data () {
            return {
                modal1: false,
                id:'',
                projectName:'',
                projectId:'',
                assessDate:'',
                assessMode:'',
                listData:[],
                state:""
                
            }
        },
        methods: {
           
           
            close(){
                this.modal1 = false;
            },
            show(type,data,edit){
                this.projectName = data.projectName;
                this.projectId = data.projectId;
                this.assessMode = this.checkLevel(data.assessMode);
                this.assessDate = data.assessDate;
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
        checkLevel(level){
            if(level=="1"){
                return "试卷";
            }
            if(level=="2"){
                return "大作业";
            }
            if(level=="3"){
                return "其他";
            }
        }
        },
        
        mounted(){
            
        }
    }
</script>
