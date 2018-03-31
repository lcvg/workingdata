<style lang="less">
    @import '../../styles/common.less';
    @import './components/table.less';

    
</style>


<template>  
    <div>
        <Row class="margin-top-10 margin-bottom-10" >
            <span v-if="this.InfojobNumber=='-1'">
                <Input v-model="identify"  placeholder="请输入关键字" class="identify">
                <Select v-model="identifyItem" clearable slot="prepend" placeholder="查询类型" style="width: 70px;"  >
                    <Option value="11">姓名</Option>
                    <Option value="22">工号</Option>
                </Select>
            </Input>
            </span>
            <Input v-model="condition" placeholder="请输入关键字"  class="condition">
                <Select v-model="sel" clearable slot="prepend" placeholder="查询类型" class="select" >
                    <Option value="11">按名称</Option>
                    <Option value="22">按类型</Option>  
                </Select>
                <Select v-model="check" clearable slot="prepend" placeholder="状态" class="select" >
                    <Option value="1">待审核</Option>
                    <Option value="0">审核通过</Option>
                    <Option value="2">审核不通过</Option>
                    
                </Select>
                <Button slot="append" @click="search" icon="ios-search" type="primary" style="outline: none"></Button>
            </Input>
            <i-button type="default" class="remove"  icon="ios-trash-outline" @click="remove">批量删除</i-button>
             <i-button type="default" class="check" v-if="kj"  icon="ios-checkmark-outline" @click="checkSuccess(0)">审核通过</i-button>
            <i-button type="default" class="check" v-if="kj" icon="ios-minus-outline" @click="checkSuccess(1)">审核不通过</i-button>
        
            <Tbmodal ref="mod" v-if="kjMod" @ee="get(5,{},1)"></Tbmodal>
           
            <Btdetail ref="det"></Btdetail>
           
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

import Tbmodal from './components/bookmodal.vue';
import batch from './components/batch.vue';
import Btdetail from './components/tbdetail.vue';
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
                console.log(vm.$refs.det)
                // vm.$refs.mod.show(1,params.row,1)
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
    name: 'textBook',
    components: {
        batch,
        Tbmodal,
        Btdetail
    },
    props:["vis","InfojobNumber"],
    data () {
        return {
            sel:"",
            kjMod:true,
            check:"",
            kj:"",
            condition:"",
            jobNumber:"",
            identifyItem:"",
            identify:"",
            removeIds:[],
            ajaxHistoryData:[],
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
                // key: 'id',
                width: 80,
                // align: 'center',s
                // checkable: true,
                type: 'selection',
                className:'tableCheck'
               
            },
            {
                title: '教材名称',
                align: 'center',
                key: 'textbook'
            },
            {
                title: '教材类型',
                align: 'center',
                key: 'type'
            },
            {
                title: 'isbn',
                align: 'center',
                key: 'isbn'
               
            },
            {
                title: '出版社',
                align: 'center',
                key: 'press'
            },
            {
                title: '出版时间',
                align: 'center',
                key: 'publishDate'
            },
             
            // {
            //     title: '撰写内容',
            //     align: 'center',
            //     key: 'compose'
            // },
            // {
            //     title: '教材简介',
            //     align: 'center',
            //     key: 'introduce'
            // },
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
                    if( localStorage.textBook==1 && this.InfojobNumber==undefined){
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
            }else if(localStorage.textBook==1){
                this.kjMod = false
            }
        },
        getData () {
            this.get(5,{},1);
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
        changepage(index){
            if(this.sel=="11"){

               this.get(5,{nameCondition:this.condition,state:this.check},index)
            }
            else if(this.sel=="22"){
                 this.get(5,{majorCondition:this.condition,state:this.check},index)
            }else{
                this.get(5,{state:this.check},index)
            }
        },
        search(){
            this.current = 1;
            this.changepage(1)
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
                this.$axios.post('/check/'+state+'?type=5',idList)
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
        
         get(type,query,pageNum){
            let vm = this;
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
             this.currentPage =  pageNum;
             this.$axios.get('/find', {params: query})
                .then(function (res) {
                    console.log('res',res)
                   vm.dataCount = res.data.size;
                      vm.tableData = res.data.list;
                })
                .catch((err) => {
                    console.log('err',err);      
                });
        },
        handleDel(ids){
            var vm = this;
             this.$axios.post('/remove?type=5',ids)
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
                    .catch(function (err) {
                        console.log(JSON.stringify(err))
                    })

        }

       
    },
    created () {
        this.jobNumber = JSON.parse(localStorage.teacher).jobNumber;
        this.getData();
         if(this.vis=='false'){
            this.kj = true;
        }
       this.showMod()
    }

};
</script>







