
<template>
  <div id="app">
      <div id="first" style="width: 75%;height:400px;"></div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            TaxBidByCompany:[]
        }
    },
    name: "app",
    methods: {
        //绘制各大集团入厂标单（含税）排名情况
        drawChart() {
            let firstChart = this.$echarts.init(document.getElementById("first"));
            this.$axios.get("/findTaxBidByCompany")
            .then(Response => {
                this.TaxBidByCompany = Response.data;
                var data1 = Response.data;
                var length = data1.length;
                // console.log(data1);  
                var arrayForDate = []; // 存储日期数据
                var dataArrayForCoalComing = [];
                var dataArrayForCalorificValue = [];
                var dataArrayForTaxBid = [];

                for(var i =0;i<data1.length;i++){
                    dataArrayForCoalComing[i]=new Array(data1[0].length);
                    dataArrayForCalorificValue[i]=new Array(data1[0].length);
                    dataArrayForTaxBid[i]=new Array(data1[0].length);
                }

                for(var i=0;i<data1.length;i++){
                    for(var j=0;j<data1[i].length;j++){
                        dataArrayForCoalComing[i][j]=data1[i][j].coalComing;
                        dataArrayForCalorificValue[i][j] = data1[i][j].calorificValue;
                        dataArrayForTaxBid[i][j] = data1[i][j].taxBid;
                    }
                }

                for(var i=0;i<data1[0].length;i++){
                    arrayForDate[i]=data1[0][i].datetime.substr(0,7);
                }
                // console.log(dataArrayForCoalComing);
                // console.log(dataArrayForCalorificValue);
                // console.log(dataArrayForTaxBid);
                // console.log(arrayForDate);
                var colors = ['#5793f3', '#d14a61', '#675bba'];
                
                let options1 = {
                    backgroundColor:'#FFFFFF',
                    title: {
                        text: '各大集团入厂标单（含税）排名情况'
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: { // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    toolbox: {
                        feature: {
                            dataView: {show: true, readOnly: false},
                            //magicType: {show: true, type: ['stack', 'tiled']},
                            restore: {show: true},
                            saveAsImage: {show: true}
                        }
                    },
                    legend: {
                        data: ['华电', '华能', '国家能源','国电投']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    dataZoom:[{
                        end:'20'
                    },{
                        type:'inside'
                    }],
                    xAxis: [{
                        type: 'category',
                        data: arrayForDate
                    }],
                    yAxis: [{
                        type: 'value',
                        axisLabel: {
                            formatter: '{value}'
                        }
                    }],
                    series: [{
                        name: '华电',
                        type: 'bar',
                        itemStyle:{
                            normal:{color:'#01949B'},
                        },

                        data: dataArrayForTaxBid[0]
                    }, {
                        name: '华能',
                        type: 'bar',
                        itemStyle:{
                            normal:{color:'#EBA954'},
                        },

                        data: dataArrayForTaxBid[1]
                    }, {
                        name: '国家能源',
                        type: 'bar',
                        itemStyle:{
                            normal:{color:'#C23531'},
                        },

                        data: dataArrayForTaxBid[2]
                    }, {
                        name: '国电投',
                        type: 'bar',
                        itemStyle:{
                            normal:{color:'#33CC33'},
                        },
                        data: dataArrayForTaxBid[3]
                    }]
                };

                firstChart.setOption(options1);
            })
        },
    },


    mounted() {
        this.drawChart();
    }
};
</script>

