<template>
    <div style="width:100%;height:100%;" id="data_source_con"></div>
</template>

<script>
import echarts from 'echarts';

export default {
    name: 'dataSourcePie',
    data () {
        return {
            showData:{}
        };
    },
    methods:{
           setData(data){
            this.showData = data;
            this.init()
        },
        init(){
             this.$nextTick(() => {
            var dataSourcePie = echarts.init(document.getElementById('data_source_con'));
            const option = {
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)'
                },
                legend: {
                    orient: 'vertical',
                    left: 'right',
                    data: ['教改课题', '获奖记录', '出版教材', '建设课程', 'others']
                },
                series: [
                    {
                        name: '占比统计',
                        type: 'pie',
                        radius: '66%',
                        center: ['50%', '60%'],
                        data: [
                            {value:  this.showData.teachingReform, name: '教改课题', itemStyle: {normal: {color: '#9bd598'}}},
                            {value: this.showData.awardRecords, name: '获奖记录', itemStyle: {normal: {color: '#ffd58f'}}},
                            {value: this.showData.textBook, name: '出版教材', itemStyle: {normal: {color: '#abd5f2'}}},
                            {value: this.showData.buildProject, name: '建设课程', itemStyle: {normal: {color: '#ab8df2'}}},
                            // {value: 0, name: 'others', itemStyle: {normal: {color: '#e14f60'}}}
                        ],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };
            dataSourcePie.setOption(option);
            window.addEventListener('resize', function () {
                dataSourcePie.resize();
            });
        });
        }
    },
    mounted () {
       this.init()
    }
};
</script>
