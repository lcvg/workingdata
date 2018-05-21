<style lang="less">
    @import '../../styles/common.less';
    @import './components/table.less';

    
</style>


<template>  
    <div>
        <Alert show-icon closable v-if="!kj">
        信息提示
        <template slot="desc">1.本页面是课程考核页面，可录入记录、编辑、删除和查看信息。<br>2.开始时间：{{item.beginDate}}，结束时间：{{item.endDate}} </template>
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
            <Input v-model="condition" placeholder="课程名称" class="condition">
                 <Select v-model="level" placeholder="考核方式" clearable slot="prepend" class="select" >
                    <Option value="1">试卷</Option>
                    <Option value="2">大作业</Option>
                    <Option value="3">其他</Option>
                </Select>
                <Select v-model="check" placeholder="状态" clearable slot="prepend" class="select" >
                    <Option value="1">待审核</Option>
                    <Option value="0">审核通过</Option>
                    <Option value="2">审核不通过</Option>
                    
                </Select>
                <Button slot="append" @click="search" icon="ios-search" type="primary" style="outline: none"></Button>
            </Input>
            <i-button type="default" class="remove" v-if="kjMod" icon="ios-trash-outline" @click="remove">批量删除</i-button>
            <i-button type="default"  icon="ios-download-outline" class="check" @click="exportProjectAssess">导出</i-button>
            <i-button type="default" class="check" v-if="kj"  icon="ios-checkmark-outline" @click="checkSuccess(0)">审核通过</i-button>
            <i-button type="default" class="check" v-if="kj" icon="ios-minus-outline" @click="checkSuccess(1)">审核不通过</i-button>
        
            <Pmodal ref="mod" v-if="kjMod" @ee="changepage(currentPage)"></Pmodal>
            <Pdetail ref="det"></Pdetail>
           
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
import Pmodal from './components/pmodal.vue';
import batch from './components/batch.vue';
import Pdetail from './components/pdetail.vue';
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
                console.log(vm.$refs.det)
                // vm.$refs.mod.show(1,params.row,1)
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
    name: 'projectAssess',
    components: {
        batch,
        Pmodal,
        Pdetail
    },
     props:["vis","InfojobNumber"],
    data () {
        return {
            sel:"",
            check:"",
            kjMod:false,
            level:"",
            item:{},
            query:[],
            condition:"",
            removeIds:[],
            jobNumber:"",
            identify:"",
            identifyItem:"",
            kj:"",
            // 初始化信息总条数
            dataCount:0,
            // 每页显示多少条
            pageSize:6,
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
                title: '考核方式',
                align: 'center',
                key: 'assessMode',
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
                            },  this.checkLevel(params.row.assessMode))

                            ]);
                        }
            },
            {
                title: '考核时间',
                align: 'center',
                key: 'assessDate'
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
                    if( localStorage.projectAssess==1 && this.InfojobNumber==undefined){
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
        showMod:function() {
            if(this.kj==true){
                this.kjMod = false
            }else if(localStorage.projectAssess==1){
                this.kjMod = false
            }else{
                this.kjMod = true
            }
        },
        getData () {
            this.get(3,{},1);
        },
         exportProjectAssess(){
            let params= ''
            for(var key in this.query){
                params=params+key+"="+this.query[key]+"&"
                // alert(key+':'+this.query[key]);
                }
            window.location.href = "/exportProjectAssess?"+params
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
        },
        changepage(index){
            this.get(3,{state:this.check,assessMode:this.level,condition:this.condition},index)
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
                this.$Message.info('请选择考核记录！！！');

            }else{
                this.handleDel(idList);
            }
            
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
                this.$axios.post('/check/'+state+'?type=3',idList)
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
             this.query = query;
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
             this.$axios.post('/remove?type=3',ids)
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
                this.$axios.get('/findConfig',{params:{id:3}})
                    .then(function (response) {
                        vm.item =response.data.list[0];
                      
                         if(new Date()>new Date(vm.item.beginDate) && new Date()<new Date(vm.item.endDate) ){
                             localStorage.setItem("projectAssess",0);
                        }else{
                            localStorage.setItem("projectAssess",1);
                        }
                         vm.showMod()
                     
                })
                .catch((err) => {   
                });
            }

       
    },
    created () {
        this.jobNumber = JSON.parse(localStorage.teacher).jobNumber;
        this.getData();  
        if(this.vis=='false'){
            this.kj = true;
        }
        this.getConfig()
    }

};
</script>







