<style lang="less">
    @import '../../styles/common.less';
    @import './components/table.less';

    
</style>


<template>  
    <div>
    
        <Row class="margin-top-10 margin-bottom-10" >
             <!-- <RadioGroup class="solt" v-model="sortType">
                <Radio class="solt-check" label="1">
                   <span>按建设课程排序</span>
                </Radio>
                <Radio class="solt-check" label="4">
                     <span>按教改课题排序</span>
                </Radio>
                <Radio class="solt-check" label="5">
                    <span>出版教材</span>
                </Radio>
                 <Radio class="solt-check" label="6">
                    <span>按获奖记录排序</span>
                </Radio>
            </RadioGroup> -->
           
            <Checkbox-group class="solt" v-model="sortType">
                <Checkbox class="solt-check" v-model="buildProjectSort" label="1">
                    <span>按建设课程排序</span>
                </Checkbox>
                <Checkbox class="solt-check" v-model="teacherRefromSort" label="2">
                    <span>按教改课题排序</span>
                </Checkbox>
                 <Checkbox class="solt-check" v-model="textBookSort" label="3">
                    <span>出版教材</span>
                </Checkbox>
                <Checkbox class="solt-check" v-model="awardRecordSort" label="4">
                    <span>按获奖记录排序</span>
                </Checkbox>
                
            </Checkbox-group>
            <Input v-model="condition" placeholder="请输入关键字" class="condition">
                <Select v-model="sel" clearable slot="prepend" placeholder="查询类型" class="select" >
                    <Option value="11">按名字</Option>
                    <Option value="22">按部门</Option>
                    <Option value="33">按工号</Option>
                    
                </Select>
               
                <Button slot="append" @click="search" icon="ios-search" type="primary" style="outline: none"></Button>
            </Input>
            <i-button type="default" class="remove"  icon="ios-search" @click="remove">批量删除</i-button>
            <i-button type="default"  icon="ios-download-outline" class="export" @click="get(1)">导出</i-button>
            <teacher class="teacherMod" ref="mod" @ee="get(1,{},1)"></teacher>
        
           
        </Row> 

        <Row>
            <Col span="24" class="padding-left-0">
                <Card >
                    <div class="edittable-con-1 padding-left-10">
                        <Table stripe  ref="selection" :columns="columnsList" :data="tableData"  @on-selection-change="selectChange"></Table>
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
import teacher from './components/teacher.vue';
import textBookVue from './textBook.vue';


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
              
              let query = {jobNumber: params.row.jobNumber};
            
                                    vm.$router.push({
                                        name: 'teacherInfo-table',
                                        query: query
                                    });
              
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
    name: 'teacher-table',
    components: {
   
        teacher,
        
    },
    data () {
        return {
            // columnsList: [],
            sel:"",
            condition:"",
            removeIds:[],
            buildProjectSort:"",
            textBookSort:"",
            awardRecordSort:"",
            teacherRefromSort:"",
            // 初始化信息总条数
            dataCount:0,
            // 每页显示多少条
            pageSize:5,
         
            tableData: [],
            attachment:[],
            sortType:"",
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
                title: '姓名',
                align: 'center',
                key: 'name'
            },
            {
                title: '工号',
                align: 'center',
                key: 'jobNumber'
            },
            {
                title: '性别',
                align: 'center',
                key: 'sex'
            },
             {
                title: '所属部门',
                align: 'center',
                key: 'department'
            },
            {
                title: '职称',
                align: 'center',
                key: 'professionalTitle'
            },
             {
                title: '职务',
                align: 'center',
                key: 'duty'
            },
            {
                title: '联系电话',
                align: 'center',
                key: 'phoneNumber'
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
     
        changepage(index){
            if(this.sel=="11"){
               this.get(1,{teacherName:this.condition},index)
            }
            else if(this.sel=="22"){
                 this.get(1,{department:this.condition},index)
            }else if(this.sel=="33"){
                 this.get(1,{jobNumber:this.condition},index)
            }else{
                this.get(1,{},index)
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
             
             query["pageNum"]=pageNum;
             query["pageSize"]=this.pageSize;
            //  query["pageSize"]=100;
            //  query["sortType"]=this.sortType;
            query["buildProjectSort"]=this.buildProjectSort;
            query["awardRecordSort"]=this.awardRecordSort;
            query["textBookSort"]=this.textBookSort;
            query["teacherRefromSort"]=this.teacherRefromSort;
            
             let vm = this;
             this.currentPage =  pageNum;
             this.$axios.get('/findTeacher', {params: query})
                .then(function (response) {
                  // console.log(response);
                      vm.dataCount = response.data.size;
                      vm.tableData = response.data.teacher;
                   
                })
                .catch((response) => {
                    
                       
                });
        },
        handleDel(ids){
            // alert(ids)
           
            var vm = this;
             this.$axios.post('/removeTeacher',ids)
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







