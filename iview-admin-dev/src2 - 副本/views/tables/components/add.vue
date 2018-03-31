<style lang="less">
    @import './add.less';
   
</style>

<template>
    <Row>
        <div class="wrapper">
            <h4>
                <Icon type="heart"></Icon>&nbsp;save
            </h4>
        </div>
        <div >
            <label>课程编号</label><Input class="input" v-model="value1" @on-change="value1Change"></Input>
        </div>
        <div class="wrapper">
            课程名称<Input v-model="value2" @on-change="value2Change"></Input>
        </div>
    </Row>
</template>
<script>
    export default {  
        name: 'add',
        data() {
            return {
                value1:'',
                value2:''
            }
        },
        methods:{
            value1Change:function() {
                var obj = this
                this.$emit('value1', obj.value1)
            },
            value2Change:function() {
                var obj = this
                this.$emit('value2', obj.value2)
            }
        } 
    }
</script>