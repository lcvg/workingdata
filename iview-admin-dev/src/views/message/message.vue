<style lang="less">
    @import './message.less';
</style>

<template>
    <div class="message-main-con">
        <!-- <div class="message-mainlist-con">
            <div>
                <Button @click="setCurrentMesType('unread')" size="large" long type="text"><transition name="mes-current-type-btn"><Icon v-show="currentMessageType === 'unread'" type="checkmark"></Icon></transition><span class="mes-type-btn-text">未读消息</span><Badge class="message-count-badge-outer" class-name="message-count-badge" :count="unreadCount"></Badge></Button>
            </div>
            <div>
                <Button @click="setCurrentMesType('hasread')" size="large" long type="text"><transition name="mes-current-type-btn"><Icon v-show="currentMessageType === 'hasread'" type="checkmark"></Icon></transition><span class="mes-type-btn-text">已读消息</span><Badge class="message-count-badge-outer" class-name="message-count-badge" :count="hasreadCount"></Badge></Button>
            </div>
            <div>
                <Button @click="setCurrentMesType('recyclebin')" size="large" long type="text"><transition name="mes-current-type-btn"><Icon v-show="currentMessageType === 'recyclebin'" type="checkmark"></Icon></transition><span class="mes-type-btn-text">回收站</span><Badge class="message-count-badge-outer" class-name="message-count-badge" :count="recyclebinCount"></Badge></Button>
            </div>
        </div> -->
        <div class="message-content-con">
            <transition name="view-message">
                <div v-if="showMesTitleList" class="message-title-list-con">
                    <Table ref="messageList" :columns="mesTitleColumns" :data="currentMesList" :no-data-text="noDataText"></Table>
                     <Page class="page" :total="dataCount" :page-size="pageSize" @on-change="changepage" show-total :current="currentPage"></Page>
                </div>

           
            </transition>
            <!-- <transition name="back-message-list"> -->
                <div v-if="!showMesTitleList" class="message-view-content-con">
                    <div class="message-content-top-bar">
                        <span class="mes-back-btn-con"><Button type="text" @click="backMesTitleList"><Icon type="chevron-left"></Icon>&nbsp;&nbsp;返回</Button></span>
                        <h3 class="mes-title">{{ mes.title }}</h3>
                    </div>
                    <p class="mes-time-con"><Icon type="android-time"></Icon>&nbsp;&nbsp;{{ mes.time }}</p>
                    <div class="message-content-body">
                        <div v-html="mes.content" class="message-content"></div>
                        <!-- <hr style="height:5px;border:none;border-top:5px ridge green;" /> -->

                        <div class="msg-title">以下是附件信息：</div>
                          <p  class="message-content" v-for="item of mes.listData"><a :href="'http://localhost:8070/download?id='+item.id">{{item.dataName.substring(13)}}</a></p>
                    </div>
                    
                </div>
            <!-- </transition> -->
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
export default {
    name: 'message_index',
    props:[
        "type"
   ],
    data () {
    
        return {
            currentMesList: [],
            unreadMesList: [],
            hasreadMesList: [],
            recyclebinList: [],
            currentMessageType: 'unread',
            showMesTitleList: true,
            unreadCount:1,
            hasreadCount: 0,
            dataCount:0,
            pageSize:10,
            currentPage:1,
            recyclebinCount: 1,
            noDataText: '暂无未读消息',
            mes: {
                title: '',
                time: '',
                content: '',
                listData:[]
            },
            mesTitleColumns: [
                {
                    title: ' ',
                    key: 'title',
                    align: 'left',
                    ellipsis: true,
                    render: (h, params) => {
                        return h('a', {
                            on: {
                                click: () => {
                                    this.showMesTitleList = false;
                                    this.mes.title = params.row.title;
                                    this.mes.time = this.formatDate(params.row.createDate);
                                    this.getContent(params.row);
                                }
                            }
                        }, params.row.title);
                    }
                },
                {
                    title: ' ',
                    key: 'createDate',
                    align: 'center',
                    width: 180,
                    render: (h, params) => {
                        if(this.type=='1'){
                             return h('div', [
                             deleteButton(h,this,params)
                            ]);
                            
                        }else{
                            return h('span', [
                            h('Icon', {
                                props: {
                                    type: 'android-time',
                                    size: 12
                                },
                                style: {
                                    margin: '0 5px'
                                }
                            }),
                            h('span', {
                                props: {
                                    type: 'android-time',
                                    size: 12
                                }
                            }, this.formatDate(params.row.createDate))
                        ]);
                        }
                        
                    }
                },
            ]
        };
    },
    methods: {
        formatDate (time) {
          
            let date =  new Date(time);
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let day = date.getDate();
            let hour = date.getHours();
            let minute = date.getMinutes();
            let second = date.getSeconds();
            return year + '/' + month + '/' + day + '  ' + hour + ':' + minute + ':' + second;
        },
        backMesTitleList () {
            this.showMesTitleList = true;
        },
       changepage(index){
            this.get(7,{},index)    
        },
        getContent (index) {
            let mesContent = index.content;
            this.mes.content = mesContent;
            this.mes.listData = index.listData;
            
        },
        handleDel(ids){
            var vm = this;
             this.$axios.post('/remove?type=7',ids, {headers: {"Content-Type": "application/json"}})
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
         get(type,query,pageNum){
             query["type"]=type;
             query["pageNum"]=pageNum;
             query["pageSize"]=this.pageSize;
             query["department"]=JSON.parse(localStorage.teacher).depId;
             
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
        
        localStorage.setItem("messageCount",0);
        // alert( localStorage.getItem("messageCount"))
        this.get(7,{},1);
    },
    watch: {
       
    }
};
</script>

