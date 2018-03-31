<style lang="less">
    @import '../../styles/common.less';
    @import './components/table.less';

    /*@import './components/add.less';*/
</style>


<template>  

    
       <!-- <Modal :visible.sync="modal1" title="普通的Modal对话框标题" @on-ok="ok" @on-cancel="cancel">
       
            </Modal> -->
    
    <div>
    
        <Row class="margin-top-10 margin-bottom-10" >
            <i-input placeholder="small size" class="search" v-model="msg"></i-input>
            <i-button type="primary" shape="circle" icon="ios-search" @click="search">搜索</i-button>
            <i-button type="primary" shape="circle" icon="ios-search" @click="get(1)">查询</i-button>
            <i-button type="primary" class="addbtn" @click="openModal">添加教改课题</i-button>
           
        </Row> 


        


        <Row>
            <!-- <Col span="6">
                <Card>
                    <p slot="title">
                        <Icon type="load-b"></Icon>
                        简单说明
                    </p>
                    <div class="edittable-test-con">
                        可编辑单元格可配置可编辑的列，可设置编辑整行的可编辑单元格，也可配置单个编辑可编辑单元格，也可两种形式同时可用。可配置单元格内编辑的图标显示方式。
                    </div>
                </Card>
            </Col> -->
            <Col span="24" class="padding-left-0">
                <Card >
                    <div class="edittable-con-1 padding-left-10">
                        <can-edit-table refs="table1" @on-delete="handleDel" v-model="tableData" :columns-list="columnsList"></can-edit-table>
                    </div>
                     <div class="page">
                        <Page :total="dataCount" :page-size="pageSize" @on-change="changepage" show-total></Page>
                    </div>
                   

                </Card>

            </Col>

        </Row>
    </div>

    
</template>

<script>
import canEditTable from './components/canEditTable.vue';
import tableData from './components/table_data.js';
import add from './components/add.vue'
export default {
    name: 'editable-table',
    components: {
        canEditTable,
        add
    },
    data () {
        return {
            // modal1: false,
            msg: "",
            columnsList: [],
            
            v1:'',
            v2:'',
            ajaxHistoryData:[],
            // 初始化信息总条数
            dataCount:60,
            // 每页显示多少条
            pageSize:4,
            historyColumns: [],
            tableData: []
            
        };
    },
    methods: {
        getData () {
            this.columnsList = tableData.buildproject;
            this.get(1);
           
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
                alert(index);
                // var _start = ( index - 1 ) * this.pageSize;
                // var _end = index * this.pageSize;
                // this.historyData = this.ajaxHistoryData.slice(_start,_end);
        },
        handleNetConnect (state) {
            this.breakConnect = state;
        },
        handleLowSpeed (state) {
            this.lowNetSpeed = state;
        },
        getCurrentData () {
            this.showCurrentTableData = true;
        },
        handleDel (val, index) {
            this.$Message.success('删除了第' + (index + 1) + '行数据');
        },
        
        ok () {
            this.$Message.info('点击了确定');
        },
        cancel () {
            this.$Message.info('点击了取消');
        },
        openModal: function() {
             this.$Modal.confirm({
                        scrollable:true,
                        okText:'保存',
                        cancelText:'取消',
                        render: (h) => {
                            return h(add, {
                                props: {
                                   
                                },
                                on: {
                                    value1: (value1) => {
                                        this.v1 = value1
                                    },
                                    value2: (value2) => {
                                        this.v2 = value2
                                    }
                                }
                            })
                        },
                        onOk: () => {
                            if (this.v1 == '' || this.v2 == '') {
                                this.$Message.error('信息填写不完整!')
                            }
                            const msg = this.$Message.loading({
                                content: '正在保存..',
                                duration: 0
                            })
                            this.saveLink(msg)
                        }                        
                    })
                   
        },
        search(){
            alert(this.msg)
        },
        get(type){
            this.$http.get('http://10.3.4.100:8070/find',{params: {type:type}}).then((response) => {
                 // 响应成功回调
                 this.tableData = response.body.list;
                 // alert(JSON.stringify(response.body.list))
            }, (response) => {
                 // 响应错误回调
            });
        }
       
    },
    created () {
        this.getData();
        this.handleListApproveHistory();
    }

};
</script>







