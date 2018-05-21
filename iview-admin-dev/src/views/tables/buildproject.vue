<style lang="less">
    @import '../../styles/common.less';
    @import './components/table.less';

    
</style>


<template>  
    <div>
         <Alert show-icon closable v-if="!kj">
        信息提示
        <template slot="desc">1.本页面是建设课程页面，可录入记录、编辑、删除和查看信息。<br>2.开始时间：{{item.beginDate}}，结束时间：{{item.endDate}} </template>
        </Alert>
        <Row class="margin-top-10 margin-bottom-10" >
            <span v-if="this.InfojobNumber=='-1'">
                <Input v-model="identify"  placeholder="请输入关键字" class="identify">
                <Select v-model="identifyItem" clearable slot="prepend" placeholder="查询类型" style="width: 70px;"  >
                    <Option value="11">姓名</Option>
                    <Option value="22">工号</Option>
                </Select>
            </Input>
            </span>
           
            <Input v-model="condition" placeholder="请输入内容"  class="condition">
                <Select v-model="sel" clearable slot="prepend" placeholder="查询方式"  class="select" >
                    <Option value="11">按名称</Option>
                    <Option value="22">按专业</Option>
                    <Option value="33">按编号</Option>
                </Select>
                <Select v-model="check" clearable slot="prepend" placeholder="审核状态" class="select" >
                    <Option value="1">待审核</Option>
                    <Option value="0">审核通过</Option>
                    <Option value="2">审核不通过</Option>
                    
                </Select>
                <Button slot="append" @click="search" icon="ios-search" type="primary" style="outline: none"></Button>
            </Input>
            <i-button type="default" class="remove" v-if="kjMod" icon="ios-trash-outline" @click="remove">批量删除</i-button>
            <i-button type="default"  icon="ios-download-outline" class="check" @click="exportBuildProject">导出</i-button>
            <i-button type="default" class="check" v-if="kj"  icon="ios-checkmark-outline" @click="checkSuccess(0)">审核通过</i-button>
            <i-button type="default" class="check" v-if="kj" icon="ios-minus-outline" @click="checkSuccess(1)">审核不通过</i-button>
            <modal :vis="vis" v-if="kjMod" ref="mod" @ee="changepage(currentPage)"></modal>
            <bdetail ref="det"></bdetail>
           
        </Row> 

        <Row>
            <Col span="24" class="padding-left-0">
                <Card >
                    <div class="edittable-con-1 padding-left-10">
                        <Table border ref="selection" :columns="columnsList" :data="tableData"  @on-selection-change="selectChange"></Table>
                    </div>
                     <div class="page">
                        <Page :total="dataCount" :page-size="pageSize" @on-change="changepage" show-total :current="currentPage"></Page>
                    </div>
                </Card>
            </Col>
        </Row>
    </div>
 
</template>

<script>
import modal from './components/modal.vue';
import batch from './components/batch.vue';
import bdetail from './components/buildProjectDetail.vue';
const editButton = (h,vm,params) => {
 if(vm.InfojobNumber!=undefined){
       return;
    }


    return h('Button', {
        props: {
            type: 'primary'
        },
        style: {
            margin: '0 5px'
        },
        on: {
            'click': () => {  
               vm.$refs.mod.show(1,params.row,1)
            }
        }
    },  '编辑');
};


const showButton = (h,vm,params) => {
    return h('Button', {
        props: {
            type:  'primary'
        },
        style: {
            margin: '0 5px'
        },
        on: {
            'click': () => {
                vm.$refs.det.show(1,params.row,1)
            }
        }
    },  '查看');
};
const deleteButton = (h,vm,params) => {
    return h('Poptip', {
        props: {
            confirm: true,
            title: '您确定要删除这条数据吗?',
            transfer: true
        },
        on: {
            'on-ok': () => {
                 var param = [];
                param.push(params.row.id);
                vm.handleDel(param);
            }
        }
    }, [
        h('Button', {
            style: {

                margin: '0 5px'
            },
            props: {
                type: 'error',
                placement: 'top'
            }
        }, '删除')
    ]);
};
export default {
    name: 'buildproject',
    components: {
        batch,
        modal,
        bdetail
    },
   props:["vis","InfojobNumber"],
    data () {
        return {
            sel:"",
            check:"",
            kjMod:false,
            condition:"",
            identifyItem:"",
            identify:"",
            removeIds:[],
            item:{},
            // 初始化信息总条数
            dataCount:0,
            // 每页显示多少条
            pageSize:6,
            historyColumns: [],
            tableData: [],
            attachment:[],
            opt:true,
            kj:false,
            modal1: false,
            currentPage:1,
            jobNumber:'',
            query:'',
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
                title: '课程名称',
                align: 'center',
                key: 'projectName'
            },
            {
                title: '课程编号',
                align: 'center',
                key: 'projectId'
            },
            {
                title: '建设时间',
                align: 'center',
                key: 'buildDate'
            },
             {
                title: '授课方式',
                align: 'center',
                key: 'teachingMethod'
            },
            {
                title: '所属专业',
                align: 'center',
                key: 'major'
            },
            {
                title: '状态',
                align: 'center',
                key: 'state',
                render: (h, params) => {
                     return h('div', [
                           h('span', {
                                style: {

                                    margin: '0 5px'
                                },
                                props: {
                                    type: 'error',
                                    placement: 'top'
                                }
                            },  this.checkState(params.row.state))

                            ]);
                        }
            },
           {
                title: '操作',
                align: 'center',
                width: 190,
                key: 'handle',
                // handle: ['edit','show', 'delete'],
                render: (h, params) => {
                    if( localStorage.buildProject==1 && this.InfojobNumber==undefined){
                        return h('div', [
                            showButton(h,this,params),
                            ]);
                    }else{
                            return h('div', [
                            editButton(h,this,params),
                            showButton(h,this,params),
                            deleteButton(h,this,params)
                            ]);
                    }
                     
                }
            }
        
        ]
            
        };
    },
   
    methods: {
        exportBuildProject(){
            let params= ''
            for(var key in this.query){
                params=params+key+"="+this.query[key]+"&"
                // alert(key+':'+this.query[key]);
                }
            window.location.href = "/exportBuildProject?"+params
        },
        showMod:function() {
            if(this.kj==true){
                this.kjMod = false
            }else if(localStorage.buildProject==1){
                this.kjMod = false
            }else{
                this.kjMod = true
            }
        },
        getData () {
            this.get(1,{},1);
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
          checkSuccess(state){
            var idList = [];
            this.removeIds.forEach(function(value,index,array){
                idList.push(value.id) 
                  
            });
            if(idList.length==0){
                this.$Message.info('请选择指导记录！！！');

            }else{
                var vm = this;
                this.$axios.post('/check/'+state+'?type=1',idList)
                        .then(function (response) {
                        if(response.data.code==0){
                            
                                vm.$Message.success('审核成功！！！');
                                var maxPage = Math.ceil((vm.dataCount-1)/vm.pageSize);
                                // alert(maxPage)

                                if (maxPage<vm.currentPage){
                                    vm.currentPage = maxPage;
                                    
                                }
                                vm.changepage(vm.currentPage)
                            }else{
                                vm.$Message.error( '审核失败！！！');
                            }
                        
                        })
                        .catch(function (response) {
                            
                        })

            }
             

        },
        changepage(index){
            if(this.sel=="11"){

               this.get(1,{nameCondition:this.condition,state:this.check},index)
            }
            else if(this.sel=="22"){
                 this.get(1,{majorCondition:this.condition,state:this.check},index)
            }else if(this.sel=="33"){
                 this.get(1,{idCondition:this.condition,state:this.check},index)
            }else{
                this.get(1,{state:this.check},index)
            }
                // alert(index);
                // var _start = ( index - 1 ) * this.pageSize;
                // var _end = index * this.pageSize;
                // this.historyData = this.ajaxHistoryData.slice(_start,_end);
        },
        search(){
            this.current = 1;
            this.changepage(1)
              
        },
        remove(){
            var idList = [];
            this.removeIds.forEach(function(value,index,array){
                idList.push(value.id) 
                  
            });
            if(idList.length==0){
                this.$Message.info('请选择建设课程！！！');

            }else{
                this.handleDel(idList);
            }
        },
       
        selectChange(selection){
             this.removeIds = selection;
        },
        
         get(type,query,pageNum){
             query["type"]=type;
             query["pageNum"]=pageNum;
             query["pageSize"]=this.pageSize;
            
              if(this.InfojobNumber==undefined){
                 query["jobNumber"]=this.jobNumber;
             }else if(this.InfojobNumber!="-1"){
                 query["jobNumber"]=this.InfojobNumber;
             }else if(this.InfojobNumber=="-1" && this.identify!=""){
                 if(this.identifyItem=="11"){
                     query["name"]=this.identify;
                 }
                 if(this.identifyItem=="22"){
                      query["jobNumber"]=this.identify;
                 }
                
             }
            let vm = this;
             this.currentPage =  pageNum;
             this.query = query;
             this.$axios.get('/find', {params: query})
                .then(function (response) {
                      vm.dataCount = response.data.size;
                      vm.tableData = response.data.list;
                   
                })
                .catch((err) => {
                    // console.log(response);
                    
                       
                });
        },
        getConfig(){
                let vm = this;
                this.$axios.get('/findConfig',{params:{id:1}})
                    .then(function (response) {
                        vm.item =response.data.list[0];
                      
                         if(new Date()>new Date(vm.item.beginDate) && new Date()<new Date(vm.item.endDate) ){
                             localStorage.setItem("buildProject",0);
                        }else{
                            localStorage.setItem("buildProject",1);
                        }
                         vm.showMod()
                     
                })
                .catch((err) => {   
                });
            },
        handleDel(ids){
            let vm = this;
             this.$axios.post('/remove?type=1',ids)
                    .then(function (response) {
                         
                          alert(response)
                        console.log(response);
                        alert(response.data.code)
                         if(response.data.code==0){

                            vm.$Notice.success({
                                title: '删除成功！！！',
                                duration: 2
                            });
                            var maxPage = Math.ceil((vm.dataCount-1)/vm.pageSize);
                            if (maxPage<vm.currentPage){
                                vm.currentPage = maxPage;
                                
                            }
                            vm.changepage(vm.currentPage)
                        
                                 
                            
                        }else{
                             vm.$Notice.error({
                            title: '删除失败！！！',
                            duration: 2
                        });
                        }
                    
                       
                    })
                    .catch(function (response) {
                        console.log(response)
                        alert(JSON.stringify(response))
                    })

        },
       

       
    },
     created () {
        if(this.vis=='false'){
            this.kj = true; 
        }
        this.getConfig()
    },
    mounted () {
     this.jobNumber = JSON.parse(localStorage.teacher).jobNumber;
     this.getData();
       
    }

};
</script>







