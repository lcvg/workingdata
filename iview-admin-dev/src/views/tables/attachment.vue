<style lang="less">
    @import '../../styles/common.less';
    @import './components/table.less';
</style>
<template>  

    
    <div>
    
        <Row class="margin-top-10 margin-bottom-10" >
            <span class="precondition">
             教师姓名：<Input v-model="name" placeholder="教师姓名" class="log">
            </Input>
            工号：<Input v-model="jobNumber" placeholder="工号" class="log">
            </Input>
            
            </span>
               



              <Input v-model="condition" placeholder="请输入关键字" class="condition">
                 <Select v-model="level" placeholder="附件类型" clearable slot="prepend" :style="{width:'110px'}" class="select attachmentType" >
                   <Option value="1">建设课程</Option>
                    <Option value="4">教改课题</Option> 
                    <Option value="6">获奖记录</Option> 
                    <Option value="2">指导记录</Option> 
                    <Option value="3">课程考核</Option> 
                    <Option value="7">公告</Option>
                     <Option value="9">其他资料</Option>
                    <Option value="5">出版教材</Option>
                </Select>
                <Select v-model="check" placeholder="查询条件" clearable slot="prepend" class="select" >
                   <Option value="1">按名称</Option>
                    <!-- <Option value="2">按所属人</Option> -->
                </Select>
                <Button slot="append" @click="search" icon="ios-search" type="primary" style="outline: none"></Button>
            </Input>

            <i-button type="default" class="remove" icon="ios-download-outline" @click="db">下载</i-button>
            
            <!-- <Gmodal :vis="vis" ref="mod" @ee="get(9,{},1)"></Gmodal> -->
           
            <!-- <Gdetail ref="det"></Gdetail> -->
           
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
// <Icon type="ios-download-outline"></Icon>
// <Icon type="ios-download"></Icon>
const showButton = (h,vm,params) => {
    return h('Icon', {
        props: {
            type:  'ios-download-outline',
            size:20
            //  shape: 'circle',
            
            
        },
        style: {
            
            margin: '0 5px'
        },
        
    });
};

export default {
    name: 'attachmnet',
    components: {
       
    },
    props:{
        vis:""
    },
    data () {
        return {
            // columnsList: [],
            sel:"",
            check:"",
            kj:false,
            level:"",
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
            jobNumber:'',
            name:'',
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
                title: '附件名称',
                align: 'center',
                key: 'dataName',
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
                            },  params.row.dataName.substring(13))

                            ]);
                        }
            },
             {
                title: '附件编号',
                align: 'center',
                key: 'dataId'
            },
            {
                title: '附件类型',
                align: 'center',
                key: 'dataType',
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
                            },  this.checkType(params.row.dataType))

                            ]);
                        }
            },
            {
                title: '所属人',
                align: 'center',
                key: 'ownerName'
            },
            
           
           {
                title: '操作',
                align: 'center',
                width: 190,
                key: 'handle',
                // handle: ['edit','show', 'delete'],
                render: (h, params) => {
                     return h('div',{
                         on: {
                            'click': () => {
                           this.download(params.row.id)
                            
                            }
                        }
                     }, [
                           
                            showButton(h,this,params)
                            ]);
                        }
                        
            }
        
        ]
            
        };
    },
    methods: {
        getData () {
            this.get(9,{},1);
        },
        
        checkType(state){
            if(state=="1"){
                return "建设课程";
            }
            if(state=="4"){
                return "教改课题";
            }
            if(state=="6"){
                return "获奖记录";
            }
            if(state=="5"){
                return "出版教材";
            }
             if(state=="2"){
                return "指导记录";
            }
            if(state=="3"){
                return "课程考核";
            }
            if(state=="9"){
                return "教案";
            }
            if(state=="7"){
                return "公告";
            }
        },
         selectChange(selection){
             this.removeIds = selection;
        },
        
        changepage(index){
            if(this.check=="1"){
                this.get(9,{dataType:this.level,condition:this.condition},index)
            // }
            // else if(this.check=="2"){
            //     this.get(9,{dataType:this.level,name:this.condition},index)
            }else{
                 this.get(9,{dataType:this.level},index)
            }
        },
        search(){
            this.current = 1;
            this.changepage(1)
              
        },
        db(){
            var idList = [];
            this.removeIds.forEach(function(value,index,array){
                idList.push(value.id) 
                  
            });
           this.downloadBatch(idList)
            
        },
        download(id){
            window.location.href="/download?id="+id;
        },
       downloadBatch(ids){
           let params = "";
           for(let id of ids){
               params+="ids="+id+"&";
           }
           window.location.href="/downloadBybatch?"+params
          
       },
         get(type,query,pageNum){
             query["type"]=type;
             query["pageNum"]=pageNum;
             query["pageSize"]=this.pageSize;
             query["jobNumber"]=this.jobNumber;
             query["name"]=this.name;
             let vm = this;
             this.currentPage =  pageNum;
             this.$axios.get('/find', {params: query})
                .then(function (response) {
                    vm.dataCount = response.data.size;
                    // for(d of response.data.list){
                    //     d["dataName"] = d["dataName"].substring(13)
                    //     console.log(d.dataName)
                    // }
                      vm.tableData = response.data.list;
                   
                })
                .catch((response) => {
                    // console.log(response);
                      
                       
                });
        },
       


       
    },
    created () {
    },
    mounted(){
        //  this.jobNumber = JSON.parse(localStorage.teacher).jobNumber;
        this.getData();
        if(this.vis=='false'){
            this.kj = true;
        }
    }

};
</script>







