<style lang="less">
    @import '../../styles/common.less';
    @import './components/table.less';

    
</style>


<template>  

    
       <!-- <Modal :visible.sync="modal1" title="普通的Modal对话框标题" @on-ok="ok" @on-cancel="cancel">
       
            </Modal> -->
    
    <div>
    
        <Row class="margin-top-10 margin-bottom-10" >
            <!-- <i-input placeholder="small size"  ></i-input> -->
           <!--  <Input v-model="condition" class="search">
                <span slot="prepend"></span>
                <Select v-model="select2" slot="append" style="width: 70px">
                    <Option value="com">.com</Option>
                    <Option value="org">.org</Option>
                    <Option value="io">.io</Option>
                </Select>
            </Input> -->

            <Input v-model="condition"  class="condition">
                <Select v-model="sel" clearable slot="prepend" class="select" >
                    <Option value="11">按名称</Option>
                    <Option value="22">按专业</Option>
                    <Option value="33">按编号</Option>
                    
                </Select>
                <Select v-model="check" clearable slot="prepend" class="select" >
                    <Option value="1">待审核</Option>
                    <Option value="0">审核通过</Option>
                    <Option value="2">审核不通过</Option>
                    
                </Select>
                <Button slot="append" @click="search" icon="ios-search" type="primary" style="outline: none"></Button>
            </Input>
            <i-button type="primary" class="remove" shape="circle" icon="ios-search" @click="remove">批量删除</i-button>
           <!--  <i-button type="primary" shape="circle" icon="ios-search" @click="get(1)">查询</i-button> -->
            <modal ref="mod" @ee="get(1,{},1)"></modal>
            <!-- <i-button type="primary" class="addbtn" @click="openModal">添加教改课题</i-button> -->
            <bdetail ref="det"></bdetail>
           
        </Row> 

        <Row>
            <Col span="24" class="padding-left-0">
                <Card >
                    <div class="edittable-con-1 padding-left-10">
                       <!--  <can-edit-table refs="table1" @refreshList="search" @on-delete="handleDel" v-model="tableData" :columns-list="columnsList"></can-edit-table> -->
                       <!-- <CheckboxGroup v-model="ssc"> -->
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
import modal from './components/modal.vue';
import batch from './components/batch.vue';
import bdetail from './components/buildProjectDetail.vue';
const editButton = (h,vm,params) => {
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
              
               
                // vm.thisTableData.splice(index, 1);
                // vm.$emit('input', vm.handleBackdata(vm.thisTableData));
                // vm.$emit('on-delete', vm.handleBackdata(vm.thisTableData), index);
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
    name: 'editable-table',
    components: {
        batch,
        modal,
        bdetail
    },
    data () {
        return {
            // columnsList: [],
            sel:"",
            check:"",
            condition:"",
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
                // className:'selectiond'
               
            },
            
            {
                title: '序号',
                type: 'index',
                width: 80,
                align: 'center'
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
                     return h('div', [
                            editButton(h,this,params),
                            showButton(h,this,params),
                            deleteButton(h,this,params)
                            ]);
                        }
                
            }
        
        ]
            
        };
    },
    methods: {
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
        // 获取历史记录信息
        handleListApproveHistory(){
                
                // 保存取到的所有数据
                this.ajaxHistoryData = testData.histories
                this.dataCount = testData.histories.length;
                // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
                if(testData.histories.length < this.pageSize){
                    this.historyData = this.ajaxHistoryData;
                }else{
                    this.historyData = this.ajaxHistoryData.slice(0,this.pageSize);
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
            // alert(ids)
           
            var vm = this;
             this.$axios.post('/remove?type=1',ids, {headers: {"Content-Type": "application/json"}})
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
                            // vm.get(1,vm.currentPage);
                                 
                            
                        }else{
                             vm.$Notice.error({
                            title: '删除失败！！！',
                            duration: 2
                        });
                        }
                       
                    })
                    .catch(function (response) {
                        // alert(JSON.stringify(response))
                       
                    
                      
                       
                    })

        }

       
    },
    created () {
        this.getData();
        // this.handleListApproveHistory();
    }

};
</script>







