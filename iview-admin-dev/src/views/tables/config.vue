<style lang="less">
    @import '../../styles/common.less';
   
    @import './components/config.less';

    
</style>


<template>  

    
    <div>
        <h3 class="title">设置有效时间</h3>
        <div class="content">
            <Row class="margin-top-10 margin-bottom-10" >
            <p>建设课程：</p>
            开始时间：<DatePicker class="time"  type="datetime" placeholder="开始时间" format="yyyy-MM-dd HH:mm" v-model="buildProject.beginDate"   ></DatePicker>
            结束时间：<DatePicker class="time" type="datetime" placeholder="结束时间" format="yyyy-MM-dd HH:mm"  v-model="buildProject.endDate" ></DatePicker>
            <!-- <i-button type="primary" class=""  icon="ios-search" @click="remove">应用到全部</i-button> -->
        </Row> 

        <Row class="margin-top-10 margin-bottom-10" >
            <p>获奖记录：</p>
            开始时间：<DatePicker class="time" type="datetime" placeholder="开始时间" format="yyyy-MM-dd HH:mm" v-model="awardRecord.beginDate"   ></DatePicker>
            结束时间：<DatePicker class="time" type="datetime" placeholder="结束时间" format="yyyy-MM-dd HH:mm"  v-model="awardRecord.endDate" ></DatePicker>
        </Row> 

         <Row class="margin-top-10 margin-bottom-10" >
            <p>指导记录：</p>
            开始时间：<DatePicker class="time" type="datetime" placeholder="开始时间" format="yyyy-MM-dd HH:mm"  v-model="guideRecord.beginDate"   ></DatePicker>
            结束时间：<DatePicker class="time" type="datetime" placeholder="结束时间" format="yyyy-MM-dd HH:mm"  v-model="guideRecord.endDate" ></DatePicker>
        </Row> 

         <Row class="margin-top-10 margin-bottom-10" >
            <p>出版教材：</p>
            开始时间：<DatePicker class="time"  type="datetime" placeholder="开始时间" format="yyyy-MM-dd HH:mm"  v-model="textBook.beginDate"   ></DatePicker>
            结束时间：<DatePicker class="time" type="datetime" placeholder="结束时间" format="yyyy-MM-dd HH:mm"   v-model="textBook.endDate" ></DatePicker>
        </Row> 

         <Row class="margin-top-10 margin-bottom-10" >
            <p>教改课题：</p>
            开始时间：<DatePicker class="time"  type="datetime" placeholder="开始时间" format="yyyy-MM-dd HH:mm"  v-model="teacherReform.beginDate"   ></DatePicker>
            结束时间：<DatePicker class="time" type="datetime" placeholder="结束时间" format="yyyy-MM-dd HH:mm"   v-model="teacherReform.endDate" ></DatePicker>
        </Row> 

         <Row class="margin-top-10 margin-bottom-10" >
            <p>课程考核：</p>
            开始时间：<DatePicker class="time"  type="datetime" placeholder="开始时间" format="yyyy-MM-dd HH:mm"  v-model="projectAssess.beginDate"   ></DatePicker>
            结束时间：<DatePicker class="time"  type="datetime" placeholder="结束时间" format="yyyy-MM-dd HH:mm"   v-model="projectAssess.endDate" ></DatePicker>
        </Row> 
        <i-button type="primary" class="add"  icon="ios-search" @click="apply">应用到全部</i-button>
         <i-button type="primary" class="save"  icon="ios-search" @click="save">保存</i-button>
          <i-button type="default" class="can"  icon="ios-search" @click="remove">取消</i-button>
        </div>
    </div>
 
</template>

<script>

export default {
    name: 'attachmnet',
    components: {
       
    },
    props:{
        vis:""
    },
    data () {
        return {
           buildProject:{
               id:"",
               beginDate:"",
               endDate:''
           },
           awardRecord:{
               id:"",
               beginDate:"",
               endDate:''
           },
           guideRecord:{
               id:"",
               beginDate:"",
               endDate:''
           },
           textBook:{
               id:"",
               beginDate:"",
               endDate:''
           },
           teacherReform:{
               id:"",
               beginDate:"",
               endDate:''
           },
            projectAssess:{
               id:"",
               beginDate:"",
               endDate:''
           }
        }
    },
    methods: {
        apply(){
            this.guideRecord.beginDate = this.buildProject.beginDate;
            this.guideRecord.endDate = this.buildProject.endDate;

            this.awardRecord.beginDate = this.buildProject.beginDate;
            this.awardRecord.endDate = this.buildProject.endDate;

            this.projectAssess.beginDate = this.buildProject.beginDate;
            this.projectAssess.endDate = this.buildProject.endDate;

             this.textBook.beginDate = this.buildProject.beginDate;
            this.textBook.endDate = this.buildProject.endDate;

            this.teacherReform.beginDate = this.buildProject.beginDate;
            this.teacherReform.endDate = this.buildProject.endDate;
        },
       
         get(){
                 let vm = this;
                this.$axios.get('/findConfig')
                    .then(function (response) {
                        for(var item of response.data.list){
                            console.log(item)
                            if(item.id==1){
                               vm.buildProject=item;
                            }
                            if(item.id==2){
                                vm.guideRecord = item;
                            }
                            if(item.id==3){
                                vm.projectAssess = item;
                            }
                            if(item.id==4){
                                vm.textBook = item
                            }
                            if(item.id==5){
                                vm.teacherReform = item
                            }
                            if(item.id==6){
                                vm.awardRecord = item
                            }
                        }
                        
                    })
                    .catch((err) => {   
                    });
        },
        save(){
            let param = [];
            param.push(this.buildProject);
            param.push(this.awardRecord);
            param.push(this.textBook);
            param.push(this.teacherReform);
            param.push(this.projectAssess);
            param.push(this.guideRecord);
            param.push(this.awardRecord);
             var vm = this;
            this.$axios.post('/updateConfigByBatch', param)
                    .then(function(response) {
                        if (response.data.code == 0) {
                            vm.$Message.destroy();
                            vm.$Notice.success({
                                title: '操作成功！！！',
                                duration: 2
                            });
    
                            vm.$emit("ee");
    
                        } else {
                            vm.$Message.destroy();
                            vm.$Notice.error({
    
                                title: '操作失败！！！',
                                duration: 2
                            });
                        }
                    })
    
                    .catch(function(err) {
                    })
    

        }
       


       
    },
    created () {
    },
    mounted(){
       this.get()
        
    }

};
</script>







