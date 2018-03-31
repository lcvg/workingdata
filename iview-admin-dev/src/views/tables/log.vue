<style lang="less">
    @import '../../styles/common.less';
    @import './components/table.less';

    
</style>


<template>  
    <div>
        <Row class="margin-top-10 margin-bottom-10" >
             
            
            操作名称：<Input v-model="condition" placeholder="操作名称" class="log">
            </Input>
            教师姓名：<Input v-model="name" placeholder="教师姓名" class="log">
            </Input>
            工号：<Input v-model="jobNumber" placeholder="工号" class="log">
            </Input>
             
            开始时间：<DatePicker  type="datetime" placeholder="开始时间" format="yyyy-MM-dd HH:mm" style="width: 140px" v-model="beginDate"   ></DatePicker>
            结束时间：<DatePicker  type="datetime" placeholder="结束时间" format="yyyy-MM-dd HH:mm" style="width: 140px"  v-model="endDate" ></DatePicker></Col>
             <i-button type="default" icon="ios-search"   @click="search">搜索</i-button>
            
            <i-button type="default" icon="ios-trash-outline" class="log-remove"  @click="remove">批量删除</i-button>
            
       
           
        </Row> 

        <Row>
            <Col span="24" class="padding-left-0">
                <Card >
                    <div class="edittable-con-1 padding-left-10">
                        <Table stripe ref="selection" :columns="columnsList" :data="tableData"  @on-selection-change="selectChange"></Table>
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
                width:"70px",
                margin: '0 5px'
            },
            props: {
                icon:"ios-trash-outline",
                type: 'error',
                placement: 'top'
            }
        }, '删除')
    ]);
};
export default {
    name: 'log',
    components: {
       
    },
    data () {
        return {
            // columnsList: [],
            sel:"",
            check:"",
            level:"",
            condition:"",
            identifyItem:"",
            identify:"",
            removeIds:[],
            beginDate:"",
            endDate:"",
          
            // 初始化信息总条数
            dataCount:0,
            // 每页显示多少条
            pageSize:6,
            jobNumber:"",
        
            historyColumns: [],
            tableData: [],
            attachment:[],
            currentPage:1,
            columnsList : [
             {
                title: '全选',
                width: 80,
                type: 'selection',  
                className:'tableCheck'
            },
            {
                title: '操作名称',
                align: 'center',
                key: 'step'
            },
            {
                title: '教师姓名',
                align: 'center',
                key: 'operatorName',
               
            },
            {
                title: '工号',
                align: 'center',
                key: 'operator',
               
            },
            {
                title: '操作时间',
                align: 'center',
                key: 'operationTime'
            },
             
           {
                title: '操作',
                align: 'center',
                width: 190,
                key: 'handle',
                // handle: ['edit','show', 'delete'],
                render: (h, params) => {
                     return h('div', [
                            deleteButton(h,this,params)
                            ]);
                        }
            }
        ]    
        };
    },
  
    methods: {
        getData () {
            this.get(8,{},1);
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
           
            this.get(8,{condition:this.condition,name:this.name,jobNumber:this.jobNumber},index)
           
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
         
         get(type,query,pageNum){
             query["type"]=type;
             query["pageNum"]=pageNum;
             query["pageSize"]=this.pageSize;
            if(this.beginDate!=""){
                query["beginDate"]=this.dateTransfer(this.beginDate);
            }
            if(this.endDate!=""){
                query["endDate"]=this.dateTransfer(this.endDate);
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
             this.$axios.post('/remove?type=8',ids, {headers: {"Content-Type": "application/json"}})
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
        }

       
    },
    created () {
    },
    mounted(){
        this.getData();
       
    }

};
</script>







