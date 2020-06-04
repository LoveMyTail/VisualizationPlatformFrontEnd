
<template>
    <div id="app">
        <div class="test">
            <div class="block">
                <span class="demonstration">日期</span>
                <el-date-picker
                    v-model="selectMonth"
                    type="month"
                    placeholder="选择月"
                    value-format="yyyy-MM"
                    default-value='2019-01-01'>
                </el-date-picker>
            </div>
            <div>
                <span class="demonstration">类型</span>
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
                <div id="first" class="chartOne" ></div>
                <div id="second" class="chartTwo" ></div>
                <div id="third" class="chartThree" ></div>
            </div>
            <div class="right">
                <div class="tableOnePage">
                    <p>各大集团情况</p>
                    <v-table
                        is-horizontal-resize
                        is-vertical-resize
                        style="width:100%;height:470px"
                        :columns="tableOneConfig.columns"
                        :table-data="tableOneConfig.tableOneData"
                    ></v-table>
                </div>
                <div class="tableTwoPage">
                    <p>月度区域电厂情况</p>
                    <v-table
                        is-horizontal-resize
                        is-vertical-resize
                        style="width:100%;height:470px"
                        :vertical-resize-offset='100'
                        :columns="tableTwoConfig.columns"
                        :table-data="tableTwoConfig.tableTwoData"
                    ></v-table>
                </div>
            </div>
        </div>
        

    </div>
</template>

<script>
export default {
    data(){
        return{
            TaxBidByCompany:[],
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                },
            },
            selectMonth: '2018-11',
            options:[{
                value:'thisMonth',
                label:'当月'
            }],
            selectArea:'当月',
            tableOneConfig: {
                tableOneData: [],
                columns: [
                    {
                        field: 'yf',
                        title: '月份',
                        width: 90,
                        columnAlign: 'center',
                        isResize:true
                    },{
                        field: 'ss_JT',
                        title: '集团',
                        width: 90,
                        columnAlign: 'center',
                        isResize:true
                    },{
                        field: 'dy_LML',
                        title: '到煤量(万吨)',
                        width: 90,
                        columnAlign: 'center',
                        isResize:true
                    },{
                        field: 'dy_RCRZ',
                        title: '热值(MJ/Kg)',
                        width: 80,
                        columnAlign: 'center',
                        isResize:true
                    },{
                        field: 'dy_RCBMDJ_HS',
                        title: '入厂标单(元/吨)',
                        width: 80,
                        columnAlign: 'center',
                        isResize:true
                    }
                ]
            },
            tableTwoConfig: {
                tableTwoData: [],
                columns: [
                    {
                        field: 'dy_RCBMDJ_QYPM_HS',
                        title: '当月排名',
                        width: 90,
                        columnAlign: 'center',
                        isResize:true
                    },{
                        field: 'ss_DC',
                        title: '电厂名称',
                        width: 90,
                        columnAlign: 'center',
                        isResize:true
                    },{
                        field: 'dy_LML',
                        title: '到煤量(万吨)',
                        width: 90,
                        columnAlign: 'center',
                        isResize:true
                    },{
                        field: 'dy_RCRZ',
                        title: '热值(MJ/Kg)',
                        width: 80,
                        columnAlign: 'center',
                        isResize:true
                    },{
                        field: 'dy_RCBMDJ_HS',
                        title: '入厂标单',
                        width: 80,
                        columnAlign: 'center',
                        isResize:true
                    }
                ]
            },
        }
    },
    name: "app",
    created(){
        this.getMonthAndArea()
    },
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
                this.selectArea='当月';
            }
        },
        //绘制各大集团入厂标单（含税）排名情况
                // 绘制各大集团量价走势图
        drawChartOneAndTwo() {
            let firstChart = this.$echarts.init(document.getElementById("first"));
            let secondChart = this.$echarts.init(document.getElementById("second"));
            this.$axios.get("/dataByQY?date="+this.selectMonth)
            .then(Response => {
                this.TaxBidByCompany = Response.data;
                var data1 = Response.data;
                var length = data1.length;
                console.log(data1);
                // console.log(data1[0]);   
                // console.log(data1[0][0]);
                // console.log(data1[0][0].ss_JT+data1[0][0].yf);
                // console.log(data1[1][0].ss_JT+data1[1][0].yf);
                
                var arrayForDate = []; // 存储日期数据
                var dataArrayForLML = [];
                var dataArrayForRCRZ = [];
                var dataArrayForBMDJ = [];

                for(var i =0;i<data1.length;i++){
                    dataArrayForLML[i]=new Array(data1[0].length);
                    dataArrayForRCRZ[i]=new Array(data1[0].length);
                    dataArrayForBMDJ[i]=new Array(data1[0].length);
                }

                for(var i=0;i<data1.length;i++){
                    for(var j=0;j<data1[i].length;j++){
                        dataArrayForLML[i][j]=data1[i][j].dy_LML;
                        dataArrayForRCRZ[i][j] = data1[i][j].dy_RCRZ;
                        dataArrayForBMDJ[i][j] = data1[i][j].dy_RCBMDJ_HS;
                        
                    }
                }

                for(var i=0;i<data1[0].length;i++){
                    arrayForDate[i]=data1[0][i].yf.substr(0,7);
                }

                function monthSort(a,b){
                    return a.yf - b.yf;
                }
                //this.tableOneConfig.tableOneData.sort(monthSort);
                for(var i=0;i<data1.length;i++){
                    for(var j=0;j<data1[i].length;j++){
                        data1[i][j].yf = data1[i][j].yf.substr(0,7);
                        this.tableOneConfig.tableOneData.push(data1[i][j]);
                    }
                }
                this.tableOneConfig.tableOneData.sort(function(a,b){return b['yf'] < a['yf'] ? 1 : -1 })
                console.log(this.tableOneConfig.tableOneData);



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
                    // dataZoom:[{
                    //     end:'100'
                    // },
                    // {
                    //     type:'inside'
                    // }],
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
                            //normal:{color:'#01949B'},
                        },

                        data: dataArrayForBMDJ[0]
                    }, {
                        name: '华能',
                        type: 'bar',
                        itemStyle:{
                            //normal:{color:'#EBA954'},
                        },

                        data: dataArrayForBMDJ[1]
                    }, {
                        name: '国家能源',
                        type: 'bar',
                        itemStyle:{
                            //normal:{color:'#C23531'},
                        },

                        data: dataArrayForBMDJ[2]
                    }, {
                        name: '国电投',
                        type: 'bar',
                        itemStyle:{
                            //normal:{color:'#33CC33'},
                        },
                        // markPoint : {
                        //     data : [
                        //         {type : 'max', name : '最大值'},
                        //         {type : 'min', name : '最小值'}
                        //     ]
                        // },
                        // markLine : {
                        //     data : [
                        //         {type : 'average', name : '平均值'}
                        //     ]
                        // },
                        data: dataArrayForBMDJ[3]
                    }]
                };

                let options2 = {
                    backgroundColor:'#FFFFFF',
                    title: {
                        text: '各大集团量价走势图',
                        x:'left',
                        y:'top',
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
                            magicType: {show: true, type: ['stack', 'tiled']},
                            restore: {show: true},
                            saveAsImage: {show: true}
                        }
                    },
                    legend: [
                        {
                            left:'center',
                            data: ['华电(标单)', '华能(标单)', '国家能源(标单)','国电投(标单)']
                        },{
                            top:30,
                            left:'center',
                            data: ['华电(煤量)','华能(煤量)','国家能源(煤量)','国电投(煤量)']
                        }
                    ],
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    // dataZoom:[{
                    //     end:'100'
                    // },{
                    //     type:'inside'
                    // }],
                    xAxis: [{
                        type: 'category',
                        data: arrayForDate
                    }],
                    yAxis: [{
                        type: 'value',
                        name:'标单（元/吨）',
                        position: 'left',
                        
                        axisLabel: {
                            formatter: '{value}'
                        }
                    },
                    {
                        type: 'value',
                        name:'煤量（万吨）',
                        position: 'right',
                        axisLabel: {
                            formatter: '{value}'
                        }
                    }],
                    series: [{
                        name: '华电(标单)',
                        type: 'line',
                        itemStyle:{
                            //normal:{color:'#01949B'},
                        },
                        yAxisIndex:0,
                        data: dataArrayForBMDJ[0]
                    }, {
                        name: '华能(标单)',
                        type: 'line',
                        itemStyle:{
                            //normal:{color:'#EBA954'},
                        },
                        yAxisIndex:0,
                        data: dataArrayForBMDJ[1]
                    }, {
                        name: '国家能源(标单)',
                        type: 'line',
                        itemStyle:{
                            //normal:{color:'#C23531'},
                        },
                        yAxisIndex:0,
                        data: dataArrayForBMDJ[2]
                    }, {
                        name: '国电投(标单)',
                        type: 'line',
                        itemStyle:{
                            //normal:{color:'#33CC33'},
                        },
                        yAxisIndex:0,
                        data: dataArrayForBMDJ[3]
                    },
                    {
                        name: '华电(煤量)',
                        type: 'bar',
                        itemStyle:{
                            //normal:{color:'#01949B'},
                        },
                        yAxisIndex:1,
                        data: dataArrayForLML[0]
                    }, {
                        name: '华能(煤量)',
                        type: 'bar',
                        itemStyle:{
                            //normal:{color:'#EBA954'},
                        },
                        yAxisIndex:1,
                        data: dataArrayForLML[1]
                    }, {
                        name: '国家能源(煤量)',
                        type: 'bar',
                        itemStyle:{
                            //normal:{color:'#C23531'},
                        },
                        yAxisIndex:1,
                        data: dataArrayForLML[2]
                    }, {
                        name: '国电投(煤量)',
                        type: 'bar',
                        itemStyle:{
                            //normal:{color:'#33CC33'},
                        },
                        yAxisIndex:1,
                        data: dataArrayForLML[3]
                    }]
                };

                firstChart.setOption(options1);
                secondChart.setOption(options2);

                window.addEventListener("resize",function(){
                    firstChart.resize();
                    secondChart.resize();
                })
            })
        },

        // 绘制月度区域电厂入厂标单（含税）排名情况图
        drawChartThree(){
            let thirdChart = this.$echarts.init(document.getElementById("third"));
            this.$axios.get("/dataByDC?date="+this.selectMonth)
            .then(Response => {    
                var data = Response.data;
                //console.log(data);      

                var x = [];
                var dataForRCBD = [];
                for(var i =0;i<data.length;i++){
                    x[i]=data[i].ss_DC;
                    dataForRCBD[i] = data[i].dy_RCBMDJ_HS;

                }
                //console.log(x);
                //console.log(dataForRCBD);

                this.tableTwoConfig.tableTwoData=data;

                let options3 = {
                    title:{
                        text:"月度区域电厂入厂标单（含税）排名"
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
                        data: ['库存量', '进煤量', '耗煤量','入厂标单']
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: x,
                            axisPointer: {
                                type: 'shadow'
                            },
                            //fontSize:30
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            name: '入厂标单',
                            axisLabel: {
                                formatter: '{value} '
                            }
                        },
                    ],
                    series: [
                        {
                            name: '入厂标单',
                            type: 'bar',
                            data: dataForRCBD,
                        }
                    ]
                };

                
                thirdChart.setOption(options3);
                window.addEventListener("resize",function(){
                    thirdChart.resize();
                })
            })
        },

        refresh:function (){
            console.log(this.selectMonth);
            window.location.href="regional?selectMonth="+this.selectMonth+"&selectArea="+this.selectArea;
        }
    },


    mounted() {
        this.drawChartOneAndTwo();
        this.drawChartThree();
    }
};
</script>

<style scoped>
.test{
    display: flex;
    padding-bottom: 1%;
}
.down{
    display: flex;
}
.left{
    width: 65%;
    padding-right: 0.5%;
}
.right{
    width: 35%;
}
.chartOne{
    width: 100%;
    height:350px;
    border-style:solid;
    border-color:rgb(126, 125, 125);
    border-top-left-radius:10px;
    border-top-right-radius:10px;
    border-bottom-left-radius:10px;
    border-bottom-right-radius:10px;
}
.chartTwo{
    width: 100%;
    height:350px;
    padding-top:50px;
    border-style:solid;
    border-color:rgb(126, 125, 125);
    border-top-left-radius:10px;
    border-top-right-radius:10px;
    border-bottom-left-radius:10px;
    border-bottom-right-radius:10px;
}
.chartThree{
    width: 100%;
    height:350px;
    padding-top:50px;
    border-style:solid;
    border-color:rgb(126, 125, 125);
    border-top-left-radius:10px;
    border-top-right-radius:10px;
    border-bottom-left-radius:10px;
    border-bottom-right-radius:10px;
}
.tableOnePage{
    border-style:solid;
    border-color:rgb(126, 125, 125);
    border-top-left-radius:10px;
    border-top-right-radius:10px;
    border-bottom-left-radius:10px;
    border-bottom-right-radius:10px;
}
.tableTwoPage{
    border-style:solid;
    border-color:rgb(126, 125, 125);
    border-top-left-radius:10px;
    border-top-right-radius:10px;
    border-bottom-left-radius:10px;
    border-bottom-right-radius:10px;
}
</style>