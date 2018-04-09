<style lang="less">
    @import './show.less';
</style>
<template>
    <div>
            <Modal
                v-model="modal1"
                title="考核方式">
                 <Row>
        
      
           <div class="line">
                 <label>教材名称：</label><span>{{textbook}}</span>
            </div>
            <div class="line">
                <label>教材类型：</label><span>{{btype}}</span>
            </div>
            <div class="line">
                <label>isbn：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label><span>{{isbn}}</span>
            </div>
            <div class="line">
                <label>出&nbsp;&nbsp;版&nbsp;&nbsp;社：</label><span>{{press}}</span>
            </div>
            <div class="line">
                <label>出版时间：</label><span>{{publishDate}}</span>
            </div>
             <div class="line">
                <label>撰写内容：</label><span>{{compose}}</span>
            </div>
             <div class="line">
                <label>教材简介：</label><span>{{introduce}}</span>
            </div>
            
         
           
            <div class="line">
                <label>状 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态：</label><span>{{state}}</span>
            </div>
            <div class="line">
                <label>附 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;件：</label>
                <tr v-for="item of this.listData"><td><a :href="'http://localhost:8070/download?id='+item.id">{{item.dataName.substring(13)}}</a></td></tr>
                <!-- <span v-for="item of this.listData">{{item.dataName}}</span> -->
            </div>
    </Row>
    <div slot="footer">
            <Button type="info" size="large" long  @click="close">关闭</Button>
        </div>
            </Modal>
    </div>

</template>

<script>
export default {
        name:"Btdetail",
        data () {
            return {
                modal1: false,
                id:'',
                textbook:'',
                btype:'',
                publishDate:'',
                isbn:'',
                press:'',
                introduce:'',
                isbn:'',
                listData:[],
                state:""
                
            }
        },
        methods: {
           
           
            close(){
                this.modal1 = false;
            },
            show(type,data,edit){
                this.textbook = data.textbook;
                this.btype = data.type;
                this.publishDate = data.publishDate;
                this.isbn = data.isbn;
                this.compose = data.compose;
                this.press = data.press;
                this.introduce = data.introduce;
               
                this.listData = data.listData;
                this.id = data.id;
                    
                this.state = this.checkState(data.state);    
                this.modal1 = true;

              
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
      
        },
        
        mounted(){
            
        }
    }
</script>
