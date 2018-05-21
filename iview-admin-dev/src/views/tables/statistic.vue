<style lang="less">
    @import ".././home/home.less";
    @import "../../styles/common.less";
    @import './components/statistic.less'; 
</style>
<template>
    <div >
        
        
            <!-- <Row :gutter="10" class="margin-top-10"> -->
                工号： <Input v-model="query.jobNumber" :style="{marginRight: '10px'}" placeholder="教师工号" class="like"></Input>
                姓名：<i-input v-model="query.nameCondition"  :style="{marginRight: '10px'}" placeholder="教师姓名" class="like"></i-input>
                开始时间：<DatePicker  type="datetime" :style="{marginRight: '10px'}" placeholder="开始时间"  style="width: 200px"  v-model="time.beginDate" ></DatePicker>
                结束时间：<DatePicker  type="datetime" :style="{marginRight: '10px'}" placeholder="结束时间"  style="width: 200px"  v-model="time.endDate" ></DatePicker>
                
        <i-button type="default"   icon="stats-bars" @click="statistic">统计</i-button>
        <i-button type="default"  icon="stats-bars" @click="exportxls">导出</i-button>
     
            <!-- </Row> -->
           
       
       
        
        <!-- <div class="line-gray"></div> -->
        <!-- <i-button type="default" class="check"   icon="ios-checkmark-outline" @click="checkSuccess(0)">审核通过</i-button>
        <i-button type="default" class="check"   icon="ios-minus-outline" @click="checkSuccess(1)">审核不通过</i-button>
         -->
    
        <Row :gutter="10" class="margin-top-10">
            <Col :md="24" :lg="8" :style="{marginBottom: '10px'}">
                <Card>
                    <p slot="title" class="card-title">
                        <Icon type="android-map"></Icon>
                        上周每日来访量统计
                    </p>
                    <div class="data-source-row">
                        <visite-volume ref="vv" ></visite-volume>
                    </div>
                </Card>
            </Col>
            <Col :md="24" :lg="8" :style="{marginBottom: '10px'}">
                <Card>
                    <p slot="title" class="card-title">
                        <Icon type="ios-pulse-strong"></Icon>
                        数据占比统计
                    </p>
                    <div class="data-source-row">
                        <data-source-pie ref="dsp" ></data-source-pie>
                    </div>
                </Card>
            </Col>
            
        </Row>
        <!-- <Row class="margin-top-10">
            <Card>
                <p slot="title" class="card-title">
                    <Icon type="ios-shuffle-strong"></Icon>
                    上周每日服务调用量(万)
                </p>
                <div class="line-chart-con">
                    <service-requests></service-requests>
                </div>
            </Card>
        </Row> -->
    </div>
</template>

<script>

import dataSourcePie from '.././home/components/dataSourcePie.vue';
import visiteVolume from '.././home/components/visiteVolume.vue';

export default {
    name: 'statistic',
    components: {
      
        dataSourcePie,
        visiteVolume,
       
    },
    data () {
        return {
           showData:{},
           query:{},
           time:{}
        };
    },
    computed: {
       
    },
    methods: {
      statistic(){
          delete this.query.beginDate;
          delete this.query.endDate;
          if(this.time.beginDate!=""){
             this.query["beginDate"]=this.dateTransfer(this.time.beginDate)
          }
          if(this.time.endDate!=""){
            this.query["endDate"]=this.dateTransfer(this.time.endDate)
          }
          
          this.query["sortType"]="1,4,5,6"
        
          this.getData(this.query)
      },
      dateTransfer(date){
             var d = new Date(date);
             var month = "";
             var day = "";
             var hours = "";
             var minutes = "";
             
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
            if (d.getHours()<10){
                hours = "0"+d.getHours();
            }else{
                hours = ""+d.getHours()
             } 
             
            if (d.getMinutes()<10){
                minutes = "0"+d.getMinutes();
            }else{
                minutes = ""+d.getMinutes()
             } 
            return d.getFullYear() + '-' + month + '-' + day+' '+hours+':'+minutes;
        },
      exportxls(){
          let params = ""
          if(this.query.jobNumber != undefined && this.query.jobNumber!="" ){
              params+="&jobNumber="+this.query.jobNumber;
          }
          if(this.query.nameCondition != undefined && this.query.nameCondition!="" ){
              params+="&nameCondition="+this.query.nameCondition;
          }
           if(this.time.beginDate!=""){
            params+="&beginDate="+JSON.stringify(this.time.beginDate).substring(1,11);
            
          }
          if(this.time.endDate!=""){
             params+="&endDate="+JSON.stringify(this.time.endDate).substring(1,11);
          }
        window.location.href="/export?sortType=1,4,5,6"+params;
      },
      getData(query){
             let vm = this;
             this.$axios.get('/statistic', {params: query})
                .then(function (response) {
                   
                    vm.showData = response.data;
                    vm.$refs.vv.setData(response.data)
                    vm.$refs.dsp.setData(response.data)
                })
                .catch((err) => {
                    console.log(err)
                });
                //   this.$refs.vv.setData(this.showData)
               
      },
      
    },
    mounted(){
        this.getData({sortType:"1,4,5,6"});
    }
};
</script>
