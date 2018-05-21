<style lang="less">
    @import "./home.less";
    @import "../../styles/common.less";
</style>
<template>
    <div class="home-main">
        <img class="img" src="./main.jpg" alt="">
    </div>
</template>

<script>

export default {
    name: 'home',
    components: {
       
    },
    data () {
        return {
        }
    },
    computed: {
       
    },
    methods: {
      
    },
    mounted(){
        this.$axios.get('/isLive')
                .then(function (response) {
                })
                .catch((response) => {
                });
    }
};
</script>
