<style lang="less">
    @import '../../styles/common.less';
    @import './components/table.less';

    
</style>


<template>  
    <div>
        <Alert show-icon closable v-if="!kj">
        信息提示
        <template slot="desc">1.本页面是指导记录页面，可录入记录、编辑、删除和查看信息。<br>2.开始时间：{{item.beginDate}}，结束时间：{{item.endDate}} </template>
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
           
            <Input v-model="condition" placeholder="请输入关键字" class="condition">
                 <Select v-model="level" placeholder="查询条件" clearable slot="prepend" class="select" >
                    <Option value="1">按竞赛名称</Option>
                    <Option value="2">按学生姓名</Option> 
                </Select>
                <Select v-model="check" placeholder="状态" clearable slot="prepend" class="select" >
                    <Option value="1">待审核</Option>
                    <Option value="0">审核通过</Option>
                    <Option value="2">审核不通过</Option>
                    
                </Select>
                <Button slot="append" @click="search" icon="ios-search" type="primary" style="outline: none"></Button>
            </Input>
            <i-button type="default" class="remove" v-if="kjMod"  icon="ios-trash-outline" @click="remove">批量删除</i-button>
             <i-button type="default"  icon="ios-download-outline" class="check" @click="exportGuideRecord">导出</i-button>
            <i-button type="default" class="check" v-if="kj"  icon="ios-checkmark-outline" @click="checkSuccess(0)">审核通过</i-button>
            <i-button type="default" class="check" v-if="kj" icon="ios-minus-outline" @click="checkSuccess(1)">审核不通过</i-button>
        
            <Gmodal :vis="vis" v-if="kjMod" ref="mod" @ee="changepage(currentPage)"></Gmodal>
           
            <Gdetail ref="det"></Gdetail>
           
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
import Gmodal from './components/gmodal.vue';
import batch from './components/batch.vue';
import Gdetail from './components/gdetail.vue';
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
const checkButton = (h,vm,params) => {
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
    },  '审核');
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
    name: 'guideRecord',
    components: {
        batch,
        Gmodal,
        Gdetail
    },
    props:["vis","InfojobNumber"],
    data () {
        return {
            // columnsList: [],
            sel:"",
            check:"",
            kjMod:false,
            kj:false,
            level:"",
            condition:"",
            identifyItem:"",
            identify:"",
            removeIds:[],
            jobNumber:"",
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
            query:[],
            item:{},
            columnsList : [
             {
                title: '全选',
                width: 80,
                type: 'selection', 
                className:'tableCheck'
            },
            {
                title: '竞赛名称',
                align: 'center',
                key: 'competitionName'
            },
            {
                title: '竞赛类别',
                align: 'center',
                key: 'competitionType'
            },
            {
                title: '指导时间',
                align: 'center',
                key: 'guideDate'
            },
            {
                title: '指导学生姓名',
                align: 'center',
                key: 'studentName'
            },
            {
                title: '指导学生学号',
                align: 'center',
                key: 'studentNumber'
            },
            {
                title: '指导学生类型',
                align: 'center',
                key: 'studentType',
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
                            },  this.checkType(params.row.studentType))

                            ]);
                        }
            },
            {
                title: '指导学生班级',
                align: 'center',
                key: 'studentClass'
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
                    if( localStorage.guideRecord==1 && this.InfojobNumber==undefined){
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
            }else if(localStorage.guideRecord==1){
                this.kjMod = false
            }else{
                this.kjMod = true
            }
        },
        getData () {
            this.get(2,{},1);
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
                this.$axios.post('/check/'+state+'?type=2',idList)
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
        changepage(index){
            if(this.level=="1"){
                this.get(2,{state:this.check,condition:this.condition},index)
            }else if(this.level=="2"){
                this.get(2,{state:this.check,nameCondition:this.condition},index)
            }
            else{
                this.get(2,{state:this.check},index)
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
            if(idList.length==0){
                this.$Message.info('请选择指导记录！！！');

            }else{
                this.handleDel(idList);
            }
            
        },
         exportGuideRecord(){
            let params= ''
            for(var key in this.query){
                params=params+key+"="+this.query[key]+"&"
                // alert(key+':'+this.query[key]);
                }
            window.location.href = "/exportGuideRecord?"+params
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
             this.query = query;;
             let vm = this;
             this.currentPage =  pageNum;
             this.$axios.get('/find', {params: query})
                .then(function (response) {
                    vm.dataCount = response.data.size;
                      vm.tableData = response.data.list;
                   
                })
                .catch((response) => {
                    // console.log(response);
                      
                       
                });
        },
        handleDel(ids){
            // alert(ids)
           
            var vm = this;
             this.$axios.post('/remove?type=2',ids, {headers: {"Content-Type": "application/json"}})
                    .then(function (response) {
                       if(response.data.code==0){
                            vm.$Notice.success({
                                title: '删除成功！！！',
                                duration: 2
                            });
                            var maxPage = Math.ceil((vm.dataCount-1)/vm.pageSize);
                            // alert(maxPage)

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
                this.$axios.get('/findConfig',{params:{id:2}})
                    .then(function (response) {
                        vm.item =response.data.list[0];
                         if(new Date()>new Date(vm.item.beginDate) && new Date()<new Date(vm.item.endDate) ){
                             localStorage.setItem("guideRecord",0);
                        }else{
                            localStorage.setItem("guideRecord",1);
                        }
                         vm.showMod()
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
    },
    mounted(){
        this.jobNumber = JSON.parse(localStorage.teacher).jobNumber;
        this.getData();
      
    }

};
</script>







