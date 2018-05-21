<style lang="less">
    @import './show.less';
</style>
<template>
    <div>
            <Modal
                v-model="modal1"
                title="建设课程信息">
                 <Row>
        
      
            <div class="line">
                 <label>课程编号：</label> <span>{{projectId}}</span>
            </div>
            
            <div class="line">
                <label>课程名称：</label><span>{{projectName}}</span>
            </div>
            
            <div class="line">
                <label>建设时间：</label><span>{{buildDate}}</span>
            </div>
            
            <div class="line">
                <label>授课方式：</label><span>{{teachingMethod}}</span>
            </div>
            
            <div class="line">
                <label>所属专业：</label><span>{{major}}</span>
            </div>
           
            <div class="line">
                <label>状 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态：</label><span v-f>{{state}}</span>
            </div>
            <div class="line">
                <label>附 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;件：</label>
                <tr v-for="item of this.listData"><td><a :href="'/download?id='+item.id">{{item.dataName.substring(13)}}</a></td></tr>
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
        name:"bdetail",
        data () {
            return {
                modal1: false,
                id:'',
                projectId:'',
                projectName:'',
                buildDate:'',
                teachingMethod:'',
                major:'',
                listData:[],
                type:'',
                state:"",
                sel:""
            }
        },
        methods: {
           
            cancel () {
                this.$Message.info('Clicked cancel');
            },
            close(){
                this.modal1 = false;
            },
            show(type,data,edit){
                this.projectId = "";
                this.projectName = "";
                this.buildDate = "";
                this.major = "";
                this.teachingMethod = "";
                this.type = edit;
                this.listData= [];
                this.state = "";
                if(edit==1){
                     this.projectId = data.projectId;
                    this.projectName = data.projectName;
                    this.buildDate = data.buildDate;
                    this.major = data.major;
                    this.teachingMethod = data.teachingMethod;
                    this.type = edit;
                    this.listData = data.listData;
                    this.id = data.id;
                    this.state = this.checkState(data.state);
                }
                // console.log(this.listData)
                
               
                       
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
        },
        
        mounted(){
            
        }
    }
</script>
