<style lang="less">
    @import '../../styles/common.less';
    @import './components/table.less';
</style>

<template>
    <div class="message-main-con">
        <div class="message-content-con" > 
            <Upload ref="upload" multiple
                :show-upload-list="false"
                :action="action"
                :on-format-error="handleFormatError"
                :on-success="handleSuccess"
                :on-error="handleError" class="attacheInput"
                name="file" >
                <span>请选择文件</span>
                <Button type="ghost" icon="ios-cloud-upload-outline">上传资料文件</Button>
                
            </Upload>

              <i-button type="default" class="remove" icon="ios-download-outline" @click="db">下载</i-button>
            <transition name="view-message">
                 
                <div v-if="showMesTitleList" class="message-title-list-con">
                    <Table ref="messageList" :columns="mesTitleColumns" :data="currentMesList" :no-data-text="noDataText"  @on-selection-change="selectChange"></Table>
                     <Page class="page" :total="dataCount" :page-size="pageSize" @on-change="changepage" show-total :current="currentPage"></Page>
                </div>
            </transition>
          
        </div>
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
        h('a', {
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

const show = (h,vm,params) => {
    return h('div', {
            style: {
                margin: '0 5px'
            },
            props: {
                
            }
        }, params.dataName)
   
};
export default {
    name: 'message_index',
    props:[
        "type"
   ],
    data () {
    
        return {
            showMesTitleList: true,
            dataCount:0,
            pageSize:10,
            jobNumber:'',
            currentPage:1,
            removeIds:[],
            action:"http://localhost:8070/uploadPlan",
            mesTitleColumns: [
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
                    title: '资料名称',
                    key: 'dataName',
                    align: 'left',
                    ellipsis: true,
                      render: (h, params) => {
                          return h('div', {
                                style: {
                                    margin: '0 5px'
                                },
                                props: {
                                    
                                }
                            }, params.row.dataName.substring(13))
                        }
                    
                },
                {
                    title: ' ',
                    key: 'createDate',
                    align: 'center',
                    width: 180,
                    render: (h, params) => {
                        return h('div', [
                             deleteButton(h,this,params)
                            ]);
                    }
                },
            ]
        };
    },
    methods: {
       handleSuccess (res, file) {
                this.changepage(1);
               
                this.$Notice.success({
                    title: '文件上传成功',
                    desc: '文件 ' + file.name + ' 上传成功。'
                });
                
               
                
            },
            handleError (event, file) {

                this.$Notice.error({
                    title: '文件上传成功',
                    desc: '文件 ' + file.name + ' 上传失败。'
                });
            },
       changepage(index){
            this.get(9,{},index)    
        },
        selectChange(selection){
             this.removeIds = selection;
        },
        handleDel(ids){
            var vm = this;
             this.$axios.post('/remove?type=9',ids, {headers: {"Content-Type": "application/json"}})
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
        db(){
            var idList = [];
            this.removeIds.forEach(function(value,index,array){
                idList.push(value.id) 
                  
            });
           this.downloadBatch(idList)
            
        },
       
       downloadBatch(ids){
           let params = "";
           for(let id of ids){
               params+="ids="+id+"&";
           }
           window.location.href="http://localhost:8070/downloadBybatch?"+params
          
       },
         get(type,query,pageNum){
             query["type"]=type;
             query["pageNum"]=pageNum;
             query["pageSize"]=this.pageSize;
             query["jobNumber"] = this.jobNumber;
             query["dataType"] = "9";
             let vm = this;
             this.currentPage =  pageNum;
             this.$axios.get('/find', {params: query})
                .then(function (response) {
                    vm.dataCount = response.data.size;
                      vm.currentMesList = response.data.list;
                   
                })
                .catch((response) => {    
                });
        },
    },
    
    mounted () {
         this.jobNumber = JSON.parse(localStorage.teacher).jobNumber;
         this.action = this.action+"?jobNumber="+this.jobNumber+"&name="+JSON.parse(localStorage.teacher).name;
        this.get(9,{},1);
    },
    watch: {
       
    }
};
</script>

