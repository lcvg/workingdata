<style lang="less">
    @import '../../styles/common.less';
    @import './components/table.less';

    
</style>


<template>  
    <div>
        <Alert show-icon closable v-if="!kj">
        信息提示
        <template slot="desc">1.本页面是获奖记录页面，可录入记录、编辑、删除和查看信息。<br>2.开始时间：{{item.beginDate}}，结束时间：{{item.endDate}} </template>
        </Alert>
        <!-- <Alert show-icon type="warning" closable>
        信息提示
        <template slot="desc">1.本页面是获奖记录页面，可录入记录和查看信息。<br>2.开始时间：{{item.beginDate}}，结束时间：{{item.endDate}} </template>
        </Alert> -->
        <Row class="margin-top-10 margin-bottom-10" >
             <span v-if="this.InfojobNumber=='-1'">
                <Input v-model="identify"  placeholder="请输入关键字" class="identify">
                <Select v-model="identifyItem" clearable slot="prepend" placeholder="查询类型" style="width: 70px;"  >
                    <Option value="11">姓名</Option>
                    <Option value="22">工号</Option>
                </Select>
            </Input>
            </span>
            <Input v-model="condition" placeholder="获奖内容" class="condition">
                 <Select v-model="level" placeholder="获奖级别" clearable slot="prepend" class="select" >
                    <Option value="1">一等奖</Option>
                    <Option value="2">二等奖</Option>
                    <Option value="3">三等奖</Option>
                    
                </Select>
                <Select v-model="check" placeholder="状态" clearable slot="prepend" class="select" >
                    <Option value="1">待审核</Option>
                    <Option value="0">审核通过</Option>
                    <Option value="2">审核不通过</Option>
                    
                </Select>
                <Button slot="append" @click="search" icon="ios-search" type="primary" style="outline: none"></Button>
            </Input>
            <i-button type="default" icon="ios-trash-outline" v-if="kjMod" class="remove"  @click="remove">批量删除</i-button>
             <i-button type="default" class="check" v-if="kj"  icon="ios-checkmark-outline" @click="checkSuccess(0)">审核通过</i-button>
            <i-button type="default" class="check" v-if="kj" icon="ios-minus-outline" @click="checkSuccess(1)">审核不通过</i-button>
        
            <Amodal v-if="kjMod" ref="mod" @ee="changepage(currentPage)"></Amodal>
            <Adetail ref="det"></Adetail>
           
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
// import canEditTable from './components/canEditTable.vue';
import Amodal from './components/Amodal.vue';
import batch from './components/batch.vue';
import Adetail from './components/adetail.vue';
const editButton = (h,vm,params) => {
     if(vm.InfojobNumber!=undefined){
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
    },  '审核');
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
               vm.$refs.mod.show(6,params.row,1)
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
               
                vm.$refs.det.show(6,params.row,1)
              
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
    name: 'awardRecords',
    components: {
        batch,
        Amodal,
        Adetail
    },
    data () {
        return {
            kjMod:true,
            sel:"",
            check:"",
            level:"",
            item:{},
            condition:"",
            identifyItem:"",
            identify:"",
            removeIds:[],
            ajaxHistoryData:[],
            // 初始化信息总条数
            dataCount:0,
            // 每页显示多少条
            pageSize:6,
            jobNumber:"",
            kj:"",
            historyColumns: [],
            tableData: [],
            attachment:[],
            opt:true,
            modal1: false,
            currentPage:1,
            columnsList : [
             {
                title: '全选',
                width: 80,
                type: 'selection',  
                className:'tableCheck'
            },
            {
                title: '获奖内容',
                align: 'center',
                key: 'awardContent'
            },
            {
                title: '获奖级别',
                align: 'center',
                key: 'awardLevel',
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
                            },  this.checkLevel(params.row.awardLevel))

                            ]);
                        }
            },
            {
                title: '获奖时间',
                align: 'center',
                key: 'awardDate'
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
                 render: (h, params) => {
                    if( localStorage.awardRecord==1 && this.InfojobNumber==undefined){
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
    props:["vis","InfojobNumber"],
    methods: {
        getData () {
            this.get(6,{},1);
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
                return "一等奖";
            }
            if(level=="2"){
                return "二等奖";
            }
            if(level=="3"){
                return "三等奖";
            }
        },
        changepage(index){
            if(this.level==""){
                this.get(6,{state:this.check,nameCondition:this.condition},index)
            }else{
                this.get(6,{state:this.check,nameCondition:this.condition,idCondition:this.level},index)
            }
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
           this.handleDel(idList);    
        },
        selectChange(selection){
             this.removeIds = selection;
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
                this.$axios.post('/check/'+state+'?type=6',idList)
                        .then(function (response) {
                        if(response.data.code==0){
                            
                                vm.$Message.success('审核成功！！！');
                                var maxPage = Math.ceil((vm.dataCount-1)/vm.pageSize);
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
        showMod:function() {
            if(this.kj==true){
                this.kjMod = false
            }else if(localStorage.awardRecord==1){
                this.kjMod = false
            }
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
             this.$axios.get('/find', {params: query})
                .then(function (response) {
                    vm.dataCount = response.data.size;
                      vm.tableData = response.data.list;
                   
                })
                .catch((err) => { 
                });
        },
        handleDel(ids){
            var vm = this;
             this.$axios.post('/remove?type=6',ids, {headers: {"Content-Type": "application/json"}})
                    .then(function (response) {
                       
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
                    })
        },
        getConfig(){
                let vm = this;
                this.$axios.get('/findConfig',{params:{id:6}})
                    .then(function (response) {
                        vm.item =response.data.list[0];
                      
                         if(new Date()>new Date(vm.item.beginDate) && new Date()<new Date(vm.item.endDate) ){
                             localStorage.setItem("awardRecord",0);
                        }else{
                            localStorage.setItem("awardRecord",1);
                        }
                    
                })
                .catch((err) => {   
                });
            }
        

       
    },
    created () {
        if(this.vis=='false'){
            this.kj = true; 
        }
        this.getConfig()
         this.showMod()
    },
    mounted(){
        
        this.jobNumber = JSON.parse(localStorage.teacher).jobNumber;
        
        this.getData();
    }

};
</script>







