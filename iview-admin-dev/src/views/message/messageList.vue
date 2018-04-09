<style lang="less">
    @import './message.less';
</style>

<template>
    <div class="message-main-con">
        <messageIndex :type="1"></messageIndex>
    </div>
</template>

<script>
import messageIndex from './message.vue';
export default {
    name: 'notice_index',
    components: {
        messageIndex
        },
    data () {
    
        return {
           
        };
    },
    methods: {
      
    },
    
    mounted () {
      
    },
    watch: {
       
    }
};
</script>

