<style lang="less">
    @import '../../styles/common.less';
    @import './components/tag.less';

    
</style>


<template>  
    <div>
        <div class="tags-con">
            <transition-group name="taglist-moving-animation">
                <Tag class="tt"
                    type="dot"
                    v-for="(item, index) in pageTagsList" 
                    :key="item.title"  
                    @click.native="linkTo(item.vis)"
                    :color="item.vis==currentTag?'blue':'default'"
                   
                >{{ item.title}}</Tag>
            </transition-group>
        </div>
        <guideRecord vis="false":key="key" v-if="currentTag == 4"  :InfojobNumber="infoJobNumber()"></guideRecord>
        <teachingReform vis="false" :key="key" v-if="currentTag == 1"   :InfojobNumber="infoJobNumber()"></teachingReform>
        <buildproject vis="false" :key="key" v-if="currentTag == 2"  :InfojobNumber="infoJobNumber()"></buildproject>
        <awardRecords vis="false" :key="key" v-if="currentTag == 3"  :InfojobNumber="infoJobNumber()"></awardRecords>
        <projectAssess vis="false" :key="key" v-if="currentTag == 5"  :InfojobNumber="infoJobNumber()"></projectAssess>
        <textBook vis="false" :key="key" v-if="currentTag == 6"  :InfojobNumber="infoJobNumber()"></textBook>
        
    </div>
        

    
    
 
</template>

<script>

import guideRecord from './guideRecord.vue';
import teachingReform from './teachingReform.vue';
import buildproject from './buildproject.vue';
import awardRecords from './awardRecords.vue';
import projectAssess from './projectAssess.vue';
import textBook from './textBook.vue';
export default {
    name: 'editable-table',
    components: {
       guideRecord,
       teachingReform,
       buildproject,
       awardRecords,
       projectAssess,
       textBook
    },
    data () {
        return {
            color:"blue",
            currentTag:1,
            jobNumber:"",
            pageTagsList:[
                {title:"教改课题",vis:1},
                {title:"建设课程",vis:2},
                {title:"获奖记录",vis:3},
                {title:"指导记录",vis:4},
                {title:"课程考核",vis:5},
                {title:"出版教材",vis:6}
                ]
            
        };
    },
    computed: {
    key() {
        return this.$route.name !== undefined? this.$route.name +new Date(): this.$route +new Date()
    }
 },
    methods: {
        linkTo(vis){
            this.currentTag = vis;
        },
        infoJobNumber(){
           if(this.$route.query.jobNumber==undefined){
               return "-1";
           }else{
               return this.$route.query.jobNumber
           }
        },
        init(){

            // this.jobNumber = this.$route.query.jobNumber;
           
          console.log("sffsfafsf",this.$route.query.jobNumber)
            
        }
      
    },
    created () {
      this.init();
    },
    mounted(){   
        // alert(this.$route.query.jobNumber)
        // alert(this.$route.query.jobNumber==undefined)
    }
   
    

};
</script>







