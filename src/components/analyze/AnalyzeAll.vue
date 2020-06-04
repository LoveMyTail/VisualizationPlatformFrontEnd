
<template>
  <div id="app">
        <div class="up">
            <!-- 日期以及单位选择器 -->
            <div class="block">
                <span class="demonstration">日期</span>
                <el-date-picker
                    v-model="selectMonth"
                    type="month"
                    placeholder="选择月"
                    value-format="yyyy-MM">
                </el-date-picker>
            </div>
            <div>
                <span class="demonstration">单位</span>
                <el-select v-model="selectArea" placeholder="请选择">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <el-button type="primary" icon="el-icon-search" round @click="refresh()" style="padding-left:20px">确认</el-button>
        </div>

        <div class="down">
            <div class="left">
                <!-- 入厂入炉标单 -->
                <div id="first" class="chartOne" ></div>
                <!-- 库存量质价-图 -->
                <div id="third" class="chartThree"></div>
                <!-- 厂后费用 及 厂后费用构成 -->
                <div id="fifth" class="chartFive" ></div>
            </div>
            <div class="right">
                <div class="first">
                    <!-- 入炉综合标煤单价构成分析 -->
                    <div class="tableOnePage" style="width: 50%;height:400px;">
                        <v-table
                            :columns="tableOneConfig.columns"
                            :table-data="tableOneConfig.tableOneData"
                        ></v-table>
                    </div>
                    <!-- 入炉综合标煤单价构成分析  --分项影响，饼状图 -->
                    <div id="second" class="chartTwo" style="width: 50%;height:400px;"></div>
                </div>
                <div class="second">
                    <!-- 库存量质价-表 库存煤量 -->
                    <div class="tableTwoPage">
                        <v-table
                            :columns="tableTwoConfig.columns"
                            :table-data="tableTwoConfig.tableTwoData"
                        ></v-table>
                    </div>
                    <div id="forth" class="chartFour" style="width: 50%;height:400px;"></div>
                </div>
                <div class="third">
                    <div class="tableThreePage">
                        <v-table
                            :columns="tableThreeConfig.columns"
                            :table-data="tableThreeConfig.tableThreeData"
                        ></v-table>
                    </div>
                    <div id="sixth" class="chartSix" style="width: 50%;height:400px;"></div>
                </div>
                
            </div>
        </div> 
  </div>
</template>

<script>
export default {
    data(){
        return{
            pickerOptions: {
                disabledDate(time) {
                    console.log(time.getTime());
                    return time.getTime() > Date.now();
                },
            },
            selectMonth: '',
            options:[
                {value:'湖北区域',label:'湖北区域'},{value:'青山电厂',label:'青山电厂'},
                ],
            selectArea:'',
            tableOneConfig: {
                tableOneData: [],
                allData:[],
                columns: [
                    {
                        field: 'type',
                        title: '',
                        width: 120,
                        columnAlign: 'center',
                    },{
                        field: 'BQ',
                        title: '本期',
                        width: 80,
                        columnAlign: 'center',
                    },{
                        field: 'HB',
                        title: '环比',
                        width: 80,
                        columnAlign: 'center',
                    },{
                        field: 'TB',
                        title: '同比',
                        width: 80,
                        columnAlign: 'center',
                    }
                ]
            },
            tableTwoConfig: {
                tableTwoData: [],
                columns: [
                    {
                        field: 'type',
                        title: '',
                        width: 120,
                        columnAlign: 'center',
                    },{
                        field: 'BQ',
                        title: '本期',
                        width: 80,
                        columnAlign: 'center',
                    },{
                        field: 'HB',
                        title: '环比',
                        width: 80,
                        columnAlign: 'center',
                    },{
                        field: 'TB',
                        title: '同比',
                        width: 80,
                        columnAlign: 'center',
                    }
                ]
            },
            tableThreeConfig: {
                tableThreeData: [],
                columns: [
                    {
                        field: 'type',
                        title: '费用名称',
                        width: 160,
                        columnAlign: 'center',
                    },{
                        field: 'je',
                        title: '费用金额(万元)',
                        width: 120,
                        columnAlign: 'center',
                    }
                ]
            },
        }
    },
    created () {
        this.getMonthAndArea()
    },
    name: "app",
    methods: {
        getMonthAndArea(){
            var url = location.search; //获取url中"?"符后的字串
            if (url.indexOf("?") != -1) {
            var str = url.substr(1);
            var strs;
            strs = str.split("&");
            this.selectMonth = decodeURIComponent(strs[0].replace("selectMonth=",""));//获取url中的id
            this.selectArea= decodeURIComponent(strs[1].replace("selectArea=",""));//获取url中的name
            }
            if(this.selectMonth==''){
                this.selectMonth='2018-11';
            }
            if(this.selectArea==''){
                this.selectArea='青山电厂';
            }
        },
        //入炉入厂煤量
        drawChartOne() {
            let firstChart = this.$echarts.init(document.getElementById("first"));
            
            this.$axios.get("/getRLRCBDByMonth?month="+this.selectMonth+"&area="+this.selectArea)
            .then(Response => {
                var curData = [];
                curData = Response.data;
                //console.log(curData);
                var arrayForDate = [];
                var arrayForThisYearRCBD = [];
                var arrayForThisYearRLBD = [];
                var arrayForLastYearRCBD = [];
                var arrayForLastYearRLBD = [];

                // 去年数据
                for(var i =0;i<12;i++){
                    arrayForLastYearRCBD[i] = curData[i].rcbd;
                    arrayForLastYearRLBD[i] = curData[i].rlbd;
                }
                // 今年数据
                for(var i =12;i<curData.length;i++){
                    arrayForDate[i-12] = curData[i].yf;
                    arrayForThisYearRCBD[i-12] = curData[i].rcbd;
                    arrayForThisYearRLBD[i-12] = curData[i].rlbd;
                }

                let options1 = {
                    title:{
                        text:"入炉入厂标单"
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            crossStyle: {
                                color: '#999'
                            }
                        }
                    },
                    toolbox: {
                        feature: {
                            dataView: {show: true, readOnly: false},
                            magicType: {show: true, type: ['line', 'bar']},
                            restore: {show: true},
                            saveAsImage: {show: true}
                        }
                    },
                    legend: {
                        data: ['当年入厂标单', '当年入炉标单', '上年入厂标单','上年入炉标单']
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: arrayForDate,
                            axisPointer: {
                                type: 'shadow'
                            }
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            name: '元/吨',
                            axisLabel: {
                                formatter: '{value} '
                            }
                        }
                    ],
                    series: [
                        {
                            name: '当年入厂标单',
                            type: 'line',
                            data: arrayForThisYearRCBD
                        },
                        {
                            name: '当年入炉标单',
                            type: 'line',
                            data: arrayForThisYearRLBD
                        },
                        {
                            name: '上年入厂标单',
                            type: 'line',
                            data: arrayForLastYearRCBD, 
                            //areaStyle: {}
                        },
                        {
                            name: '上年入炉标单',
                            type: 'line',
                            //yAxisIndex: 1,
                            data: arrayForLastYearRLBD
                        }
                    ]
                };
                firstChart.setOption(options1);
                window.addEventListener("resize",function(){
                    firstChart.resize();
                })
            })
        },

        // 入炉综合标煤单价构成分析
        drawChartTwoAndTableOne(){
            let secondChart = this.$echarts.init(document.getElementById("second"));
            this.$axios.get("/getRLBD?month="+this.selectMonth+"&area="+this.selectArea)
            .then(Response=>{
                var curData = [];
                curData = Response.data;
                //console.log(curData);
                this.tableOneConfig.tableOneData=[
                    {"type":"入炉综合标单","BQ":curData[0],"HB":curData[12],"TB":curData[6]},
                    {"type":"入场煤价","BQ":curData[1],"HB":curData[13],"TB":curData[7]},
                    {"type":"热值差","BQ":curData[2],"HB":curData[14],"TB":curData[8]},
                    {"type":"耗油","BQ":curData[3],"HB":curData[15],"TB":curData[9]},
                    {"type":"厂后费用","BQ":curData[4],"HB":curData[16],"TB":curData[10]},
                    {"type":"期初","BQ":curData[5],"HB":curData[17],"TB":curData[11],}
                ]

                let options2 = {
                    title: {
                        text: '分项影响',
                        subtext: '',
                        left: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {c} ({d}%)'
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'right',
                        data: ['入厂煤价','热值差','燃油耗用','厂内费用','期初']
                    },
                    series: [
                        {
                            name: '',
                            type: 'pie',
                            radius: '55%',
                            center: ['50%', '60%'],
                            data:[
                                {name:'入厂煤价',value:curData[1]},
                                {name:'热值差',value:curData[2]},
                                {name:'燃油耗用',value:curData[3]},
                                {name:'厂内费用',value:curData[4]},
                                {name:'期初',value:curData[5]}
                            ],
                            emphasis: {
                                itemStyle: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                }; 
                
                secondChart.setOption(options2);
                window.addEventListener("resize",function(){
                    secondChart.resize();
                })
            })
        },

        // 库存量质价-图
        drawChartThree(){
            let thirdChart = this.$echarts.init(document.getElementById("third"));
            this.$axios.get("/getKCLZJByMonth?month="+this.selectMonth+"&area="+this.selectArea)
            .then(Response=>{
                var curData = [];
                curData = Response.data;
                //console.log(curData);

                var arrayForDate = [];
                var dataForKCL = [];
                var dataForKCRZ = [];
                var dataForKCBD = [];
                for(var i =0;i<curData.length;i++){
                    arrayForDate[i] = curData[i].yf;
                    dataForKCL[i] = curData[i].kcml;
                    dataForKCRZ[i] = curData[i].kcrz;
                    dataForKCBD[i] = curData[i].kcdj;
                }

                let options3 = {
                    title:{
                        text:"库存量质价"
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            crossStyle: {
                                color: '#999'
                            }
                        }
                    },
                    toolbox: {
                        feature: {
                            dataView: {show: true, readOnly: false},
                            magicType: {show: true, type: ['line', 'bar']},
                            restore: {show: true},
                            saveAsImage: {show: true}
                        }
                    },
                    legend: {
                        data: ['库存量', '库存热值', '库存标单']
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: arrayForDate,
                            axisPointer: {
                                type: 'shadow'
                            }
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            name: '标单(元/吨)',
                            position: 'left',
                            axisLabel: {
                                formatter: '{value} '
                            }
                        },{
                            type: 'value',
                            name: '热值(千卡/kg)',
                            position: 'right',
                            offset: 70,
                            axisLabel: {
                                formatter: '{value} '
                            }
                        },{
                            type: 'value',
                            name: '库存(万吨)',
                            position: 'right',
                            axisLabel: {
                                formatter: '{value} '
                            }
                        }
                    ],
                    series: [
                        {
                            name: '库存量',
                            type: 'line',
                            yAxisIndex: 2,
                            areaStyle: {},
                            data: dataForKCL
                        },
                        {
                            name: '库存热值',
                            type: 'line',
                            yAxisIndex: 1,
                            data: dataForKCRZ
                        },
                        {
                            name: '库存标单',
                            type: 'line',
                            data: dataForKCBD,    
                        }
                    ]
                };

                thirdChart.setOption(options3);
                window.addEventListener("resize",function(){
                    thirdChart.resize();
                })
            })
        },

        // 库存量质价-表
        drawChartFourAndTableTwo(){
            let forthChart = this.$echarts.init(document.getElementById("forth"));
            this.$axios.get("/getLJKC?month="+this.selectMonth+"&area="+this.selectArea)
            .then(Response=>{
                var curData = [];
                curData = Response.data;
                //console.log(curData);
                this.tableTwoConfig.tableTwoData=[
                    {"type":"库存煤量(万吨)","BQ":curData[0],"HB":curData[2],"TB":curData[1]},
                    {"type":"库存热值(Kcal/Kg)","BQ":curData[3],"HB":curData[5],"TB":curData[4]},
                    {"type":"库存硫分(%)","BQ":"-","HB":"-","TB":"-"},
                    {"type":"库存单价(元/吨)","BQ":curData[6],"HB":curData[8],"TB":curData[7]}
                ]
                
                let options4 = {
                    title: {
                        text: '库存煤量',
                        subtext: '目前无数据',
                        left: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {c} ({d}%)'
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        data: ['青山电厂']
                    },
                    series: [
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius: '55%',
                            center: ['50%', '60%'],
                            data: [
                                {value: curData[0], name: '青山电厂'},
                            ],
                            emphasis: {
                                itemStyle: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                };   

                forthChart.setOption(options4);
                window.addEventListener("resize",function(){
                    forthChart.resize();
                })
            })
        },

        // 厂后费用以及厂后费用构成
        drawChartFiveAndTableThreeAndChartSix(){
            let fifthChart = this.$echarts.init(document.getElementById("fifth"));
            let sixthChart = this.$echarts.init(document.getElementById("sixth"));
            this.$axios.get("/getCNFYData?month="+this.selectMonth+"&area="+this.selectArea)
            .then(Response=>{
                var curData = [];
                // 获取到的是24条数据
                curData = Response.data;
                console.log(curData);
                var arrayForDate = [];
                var dataForThisYear = [];
                var dataForLastYear = [];
                for(var i =0;i<12;i++){
                    dataForLastYear[i] = curData[i].fy/10000;
                }
                for(var i =12;i<curData.length;i++){
                    arrayForDate[i-12] = curData[i].yf;
                    dataForThisYear[i-12] = curData[i].fy/10000;
                }

                let options5 = {
                    title:{
                        text:"厂后费用"
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            crossStyle: {
                                color: '#999'
                            }
                        }
                    },
                    toolbox: {
                        feature: {
                            dataView: {show: true, readOnly: false},
                            magicType: {show: true, type: ['line', 'bar']},
                            restore: {show: true},
                            saveAsImage: {show: true}
                        }
                    },
                    legend: {
                        data: ['当年厂后费用(万元)', '上年厂后费用(万元)']
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: arrayForDate,
                            axisPointer: {
                                type: 'shadow'
                            }
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            name: '万元',
                            axisLabel: {
                                formatter: '{value} '
                            }
                        }
                    ],
                    series: [
                        {
                            name: '当年厂后费用(万元)',
                            type: 'line',
                            data: dataForThisYear
                        },
                        {
                            name: '上年厂后费用(万元)',
                            type: 'line',
                            data: dataForLastYear
                        }
                    ]
                };
                fifthChart.setOption(options5);
                window.addEventListener("resize",function(){
                    fifthChart.resize();
                })

            })

            this.$axios.get("/getCNFYDataForTable?month="+this.selectMonth+"&area="+this.selectArea)
            .then(Response=>{
                var curData = [];
                curData = Response.data;
                //console.log(curData);
                var curMap = [];
                var legendData = [];
                var i =0;
                var tableData = [];
                for(var key in curData){
                    curData[key] = curData[key]/10000;  // 除以一万，单位为万吨
                    curMap.push({name:key,value:curData[key].toFixed(2)});
                    tableData.push({type:key,je:curData[key].toFixed(2)});
                    legendData[i] = key;
                    i++;
                }

                this.tableThreeConfig.tableThreeData=tableData;
                //console.log(curMap);
                let options6 = {
                    title: {
                        text: '金额构成',
                        subtext: '',
                        left: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {c} ({d}%)'
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'right',
                        data: legendData
                    },
                    series: [
                        {
                            name: '单位（万元）',
                            type: 'pie',
                            radius: '55%',
                            center: ['50%', '60%'],
                            data:curMap,
                            emphasis: {
                                itemStyle: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                }; 

                sixthChart.setOption(options6);
                window.addEventListener("resize",function(){
                    sixthChart.resize();
                })
            })
        },

        refresh:function (){
            console.log(this.selectMonth);
            window.location.href="analyze?selectMonth="+this.selectMonth+"&selectArea="+this.selectArea;
            //document.location.reload();
        }
    },


    mounted() {
        this.drawChartOne();
        this.drawChartTwoAndTableOne();
        this.drawChartThree();
        this.drawChartFourAndTableTwo();
        this.drawChartFiveAndTableThreeAndChartSix();
    }
};
</script>

<style scoped>
.up{
    display: flex;
    padding-bottom: 1%;
}
.down{
    display: flex;
}
.left{
    width: 50%;
    padding-right: 0.5%;
}
.right{
    width: 50%;
}
.first{
    width: 100%;
    height: 30%;
    display: flex;
    border-style:solid;
    border-color:rgb(126, 125, 125);
    border-top-left-radius:10px;
    border-top-right-radius:10px;
    border-bottom-left-radius:10px;
    border-bottom-right-radius:10px;
}
.second{
    display: flex;
    width: 100%;
    height: 30%;
    border-style:solid;
    border-color:rgb(126, 125, 125);
    border-top-left-radius:10px;
    border-top-right-radius:10px;
    border-bottom-left-radius:10px;
    border-bottom-right-radius:10px;
}
.third{
    display: flex;  
    width: 100%;
    height: 30%;
    border-style:solid;
    border-color:rgb(126, 125, 125);
    border-top-left-radius:10px;
    border-top-right-radius:10px;
    border-bottom-left-radius:10px;
    border-bottom-right-radius:10px;
}
.chartOne{
    padding-bottom: 10px;
    width: 100%;
    height: 30%;
    border-style:solid;
    border-color:rgb(126, 125, 125);
    border-top-left-radius:10px;
    border-top-right-radius:10px;
    border-bottom-left-radius:10px;
    border-bottom-right-radius:10px;
}
.chartThree{
    padding-top: 10px;
    width: 100%;
    height: 30%;
    border-style:solid;
    border-color:rgb(126, 125, 125);
    border-top-left-radius:10px;
    border-top-right-radius:10px;
    border-bottom-left-radius:10px;
    border-bottom-right-radius:10px;
}
.chartFive{
    padding-top: 10px;
    width: 100%;
    height: 30%;
    border-style:solid;
    border-color:rgb(126, 125, 125);
    border-top-left-radius:10px;
    border-top-right-radius:10px;
    border-bottom-left-radius:10px;
    border-bottom-right-radius:10px;
}
.tableOnePage{
    height: 100%;
}
.tableTwoPage{
    height: 100%;
}
</style>


