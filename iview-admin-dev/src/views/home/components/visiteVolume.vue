<template>
    <div style="width:100%;height:100%;" id="visite_volume_con"></div>
</template>

<script>
import echarts from 'echarts';
export default {
    name: 'visiteVolume',
    data () {
        return {
           showData:{
    
    textBook: 0,
 
    awardRecords: 1,
    buildProject: 9,
    teachingReform: 1
}
        };
    },
  
     methods: {
      
      setData(data){
            this.showData = data;
            this.init()
        },
        init(){
             this.$nextTick(() => {
            let visiteVolume = echarts.init(document.getElementById('visite_volume_con'));
            let xAxisData = [];
            let data1 = [];
            let data2 = [];
            for (let i = 0; i < 20; i++) {
                xAxisData.push('类目' + i);
                // data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
                // data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
            }

            const option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                grid: {
                    top: 0,
                    left: '2%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                      type: 'category',
                        data: ['教改课题', '获奖记录', '出版教材', '建设课程'],
                        nameTextStyle: {
                            color: '#c3c3c3'
                        }
                    
                },
                yAxis: {
                    type: 'value',
                    boundaryGap: [0, 0.01]
                },
               
                series: [
                    {
                        name: '记录数',
                        type: 'bar',
                        data: [
                            {value:  this.showData.teachingReform, name: '教改课题', itemStyle: {normal: {color: '#2d8cf0'}}},
                            {value:  this.showData.awardRecords, name: '获奖记录', itemStyle: {normal: {color: '#2d8cf0'}}},
                            {value:  this.showData.textBook, name: '出版教材', itemStyle: {normal: {color: '#2d8cf0'}}},
                            {value:  this.showData.buildProject, name: '建设课程', itemStyle: {normal: {color: '#2d8cf0'}}},
                           
                        ]
                    }
                ]
            };

            visiteVolume.setOption(option);

            window.addEventListener('resize', function () {
                visiteVolume.resize();
            });
        });
        }
      
    },
    mounted () {
       this.init()
    }
};
</script>
