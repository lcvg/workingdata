<style lang="less">
    // @import '../../styles/common.less';
    // @import './components/table.less';

    
</style>


<template>  
    <div>
    
        <Row class="margin-top-10 margin-bottom-10" >
            <Button type="primary" @click="modal1 = true">添加部门</Button>
            <Modal
                v-model="modal1"
                title="部门信息"
                @on-ok="ok"
                @on-cancel="cancel">
                <div class="line">
                    <label>部门名称</label>
                    <Input class="input" v-model="department.depName" ></Input>
                </div>
                <div class="line">
                     <label>部门编号</label>
                    <Input class="input" v-model="department.depId" ></Input>
                </div>
            </Modal>
        
           
        </Row> 

        <Row>
            <Col span="24" class="padding-left-0">
                <Card >
                    <div class="edittable-con-1 padding-left-10">
                        <Table stripe  ref="selection" :columns="columnsList" :data="tableData"  @on-selection-change="selectChange"></Table>
                    </div>
                     
                </Card>
            </Col>
        </Row>
    </div>
 
</template>

<script>
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
               vm.department.depId = params.row.depId;
              vm.department.depName = params.row.depName;
              vm.department.id = params.row.id;
              vm.modal1=true
            }
        }
    },  '编辑');
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
   
      
        
    },
    data () {
        return {
            modal1:false,
            removeIds:[],
            tableData: [],
            department:{},
            currentPage:1,
            columnsList : [
             {
                title: '全选',
                width: 80,
                type: 'selection',
                className:'tableCheck'
               
            },
            
            
            {
                title: '部门名称',
                align: 'center',
                key: 'depName'
            },
            {
                title: '部门编号',
                align: 'center',
                key: 'depId'
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
                            deleteButton(h,this,params)
                            ]);
                        }
                
            }
        
        ]
            
        };
    },
    methods: {
        ok(){
            let vm =this;
            this.$axios.post('/addDepartment',this.department)
                    .then(function (response) {
                       if(response.data.code==0){
                            vm.$Message.success("添加成功");
                            vm.get();
                            vm.department.depId = "";
                            vm.department.depName = "";
                            vm.department.id = "";
                        }else{
                              vm.$Message.success("添加失败");
                        }
                       
                    })
                    .catch(function (response) {  
                    })
        },
        cancel(){
            this.department.depId = "";
            this.department.depName = "";
            this.department.id = "";
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
        
         get(){
             
             let vm = this;
             this.$axios.get('/find', {params: {type:10}})
                .then(function (response) {
                      vm.tableData = response.data.list;
                     
                })
                .catch((response) => {  
                });
        },
        handleDel(ids){
            var vm = this;
             this.$axios.post('/remove?type=10',ids)
                    .then(function (response) {
                       if(response.data.code==0){
                            vm.$Notice.success({
                                title: '删除成功！！！',
                                duration: 2
                            });
                            vm.get();
                            
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
      this.get()
    }

};
</script>







