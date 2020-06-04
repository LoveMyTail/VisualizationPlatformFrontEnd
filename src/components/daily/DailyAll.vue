
<template>
    <div id="app">
        <div class="up">
            <div class="up-up">
                <div class="test">
                    <!-- 日期以及单位选择器 -->
                    <div class="block">
                        <span class="demonstration">日期</span>
                        <el-date-picker
                        v-model="selectDate"
                        type="date"
                        placeholder="选择日期"
                        value-format="yyyy-MM-dd">
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
            </div>
            <div class="up-down">
                <div class="left">
                    <!-- 日进耗存-日均入厂标单 -->
                    <div class="chartOne" id="first" style="width: 100%;height:300px;"></div>
                    <div class="newLine">
                        <el-button   id="JM" autofocus >进煤量</el-button>
                        <el-button   id="KC">库存量</el-button>
                        <el-button   id="HY">耗用量</el-button>
                        <el-button   id="RCBD">入厂标单</el-button>
                        <!-- <div >
                            <button type="button" class="dataDemo" id="JM">进煤量</button>
                            <button type="button" class="dataDemo" id="KC">库存量</button>
                            <button type="button" class="dataDemo" id="HY">耗用量</button>
                            <button type="button" class="dataDemo" id="RCBD">入厂标单</button>
                        </div> -->
                        <div id="second" style="width: 100%;height:300px;padding-top:10px"></div>
                    </div>
                    <!-- 库存煤结构 -->
                    <div class="pieChartOne">
                        <div id="third" style="width: 50%;height:300px;padding-top:20px"></div>
                        <div id="forth" style="width: 50%;height:300px;padding-top:20px"></div>
                    </div>
                </div>
                <div class="right">
                    <!-- 日统计信息 -->
                    <div class="tableOnePage">
                        <p>日统计信息</p>
                        <v-table
                            is-horizontal-resize
                            is-vertical-resize
                            style="width:100%;height:300px"
                            :columns="tableOneConfig.columns"
                            :table-data="tableOneConfig.tableOneData"
                        ></v-table>
                    </div>
                    
                    <!-- 采购信息 -->
                    <div id="fifth" class="chartFive" ></div>
                </div>
            </div>

            
        </div>

        <div class="down">
            <!-- 日累计价格明细数据 -->
            <div class="tableTwoPage">
                <p>日累计价格明细数据</p>
            <v-table
                is-horizontal-resize
                style="width:100%"
                :columns="tableTwoConfig.columns"
                :table-data="tableTwoConfig.tableTwoData"
            ></v-table>
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
                    return time.getTime() > Date.now();
                },
            },
            selectDate:'',
            options:[{
                value:'选项1',
                label:'湖北区域'
            }],
            id:"JM",
            selectArea:'湖北区域',
            tableOneConfig: {
                tableOneData: [],
                allData:[],
                columns: [
                    {
                    field: 'area',
                    title: '湖北区域',
                    width: 80,
                    columnAlign: 'center',
                    isResize:true
                    },
                    {
                    field: 'FDL',
                    title: '发电量',
                    width: 90,
                    columnAlign: 'center',
                    isResize:true
                    },
                    {
                    field: 'GRL',
                    title: '供热量',
                    width: 90,
                    columnAlign: 'center',
                    isResize:true
                    },
                    {
                    field: 'JML',
                    title: '进煤量',
                    width: 80,
                    columnAlign: 'center',
                    isResize:true
                    },
                    {
                    field: 'HML',
                    title: '耗煤量',
                    width: 80,
                    columnAlign: 'left',
                    isResize:true
                    },
                    {
                    field: 'KCL',
                    title: '库存量',
                    width: 80,
                    columnAlign: 'center',
                    isResize:true
                    },
                    {
                    field: 'ZYLXJ',
                    title: '在运量小计',
                    width: 80,
                    columnAlign: 'center',
                    isResize:true
                    },
                    {
                    field: 'HCZTL',
                    title: '火车在途量',
                    width: 80,
                    columnAlign: 'center',
                    isResize:true
                    },
                    {
                    field: 'SYZTL',
                    title: '水运在途量',
                    width: 80,
                    columnAlign: 'center',
                    isResize:true
                    },
                    {
                    field: 'DZL',
                    title: '待装量',
                    width: 80,
                    columnAlign: 'center',
                    isResize:true
                    },
                    {
                    field: 'SYHTL',
                    title: '剩余合同量',
                    width: 80,
                    columnAlign: 'center',
                    isResize:true
                    }
                ]
            },
            tableTwoConfig:{
                tableTwoData:[],
                columns:[
                    {
                    field: 'gmdw',
                    title: '供煤单位',
                    width: 200,
                    columnAlign: 'center',
                    isResize:true
                    },{
                    field: 'html',
                    title: '合同量',
                    width: 100,
                    columnAlign: 'center',
                    isResize:true
                    },{
                    field: 'dml',
                    title: '到煤量',
                    width: 120,
                    columnAlign: 'center',
                    isResize:true
                    },{
                    field: 'DXL',
                    title: '兑现率',
                    width: 80,
                    columnAlign: 'center',
                    },{
                    field: 'htrz',
                    title: '合同热值',
                    width: 100,
                    columnAlign: 'center',
                    isResize:true
                    },{
                    field: 'sjrz',
                    title: '测算热值',
                    width: 100,
                    columnAlign: 'center',
                    isResize:true
                    },{
                    field: 'bml',
                    title: '标煤量',
                    width: 100,
                    columnAlign: 'center',
                    isResize:true
                    },{
                    field: 'sjcbj',
                    title: '车板价',
                    width: 100,
                    columnAlign: 'center',
                    isResize:true
                    },{
                    field: 'yzf',
                    title: '运费',
                    width: 80,
                    columnAlign: 'center',
                    isResize:true
                    },{
                    field: 'sjdchj',
                    title: '到厂价（元/吨）',
                    width: 100,
                    columnAlign: 'center',
                    isResize:true
                    },{
                    field: 'dkdj',
                    title: '折单卡价（元/卡 吨）',
                    width: 100,
                    columnAlign: 'center',
                    isResize:true
                    }
                ]
            }
        }
    },
    created () {
        this.getDateAndArea()
       
    },
    name: "app",
    methods: {
        getDateAndArea(){
            var url = location.search; //获取url中"?"符后的字串
            if (url.indexOf("?") != -1) {
                var str = url.substr(1);
                var strs;
                strs = str.split("&");
                this.selectDate = decodeURIComponent(strs[0].replace("selectDate=",""));//获取url中的id
                this.selectArea= decodeURIComponent(strs[1].replace("selectArea=",""));//获取url中的name
            }
            console.log(this.selectDate+this.selectArea);
            if(this.selectDate==''){
                this.selectDate='2018-11-25';
            }
            if(this.selectArea==''){
                this.selectArea='湖北区域';
            }
        },

        // 日进耗存-日均入厂标单
        drawChartOneAndTwo() {
            let firstChart = this.$echarts.init(document.getElementById("first"));
            let secondChart = this.$echarts.init(document.getElementById("second"));

            this.$axios.get("/getByMonth?date="+this.selectDate)
            .then(Response => {
                var curData = [];
                curData = Response.data;
                //console.log(curData)
                var arrayForDate = [];
                var arrayForBRKCL = [];
                var arrayForJHKCL = [];
                var arrayForBRRCML = [];
                var arrayForJHRCML = [];
                var arrayForBRHML = [];
                var arrayForJHHML = [];
                var arrayForBRRCBD = [];
                var arrayForJHRCBD = [];
                for(var i =0 ; i<curData.length;i++){
                    arrayForDate[i] = curData[i].ywrq;
                    arrayForBRKCL[i] = curData[i].brkcml;
                    arrayForJHKCL[i] = curData[i].kczb;
                    arrayForBRRCML[i] = curData[i].brrcml;
                    arrayForJHRCML[i] = curData[i].jmzb;
                    arrayForBRHML[i] = curData[i].rxhml;
                    arrayForJHHML[i] = curData[i].hyzb;
                    arrayForBRRCBD[i] = curData[i].rcbd;
                    arrayForJHRCBD[i] = curData[i].bdzb;
                }

                let options1 = {
                    title:{
                        text:"日均耗存-日均入厂标单"
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
                            data: arrayForDate,
                            axisPointer: {
                                type: 'shadow'
                            }
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            name: '煤量',
                            axisLabel: {
                                formatter: '{value} '
                            }
                        },
                        {
                            type: 'value',
                            name: '标单',
                            axisLabel: {
                                formatter: '{value} '
                            }
                        }
                    ],
                    series: [
                        {
                            name: '库存量',
                            type: 'bar',
                            data: arrayForBRKCL
                        },
                        {
                            name: '进煤量',
                            type: 'bar',
                            data: arrayForBRRCML
                        },
                        {
                            name: '耗煤量',
                            type: 'line',
                            yAxisIndex: 1,
                            data: arrayForBRHML,
                            areaStyle: {}
                        },
                        {
                            name: '入厂标单',
                            type: 'line',
                            yAxisIndex: 1,
                            data: arrayForBRRCBD
                        }
                    ]
                };

                // 未设定默认值以及默认标题
                function dataForSecondChart(){
                    var dataForSecondChart = {};
                    var arr = document.getElementsByTagName('button');
                    if(arr.onclick==null){
                        dataForSecondChart['JH'] = arrayForJHRCML;
                        dataForSecondChart['SJ'] = arrayForBRRCML;
                        drawSecondChart(dataForSecondChart);
                    }
                    for(var i=0;i<arr.length;i++){
                        arr[i].onclick = function(){
                            //console.log(this.id);
                            if(this.id == 'JM'){
                                dataForSecondChart['JH'] = arrayForJHRCML;
                                dataForSecondChart['SJ'] = arrayForBRRCML;
                            }else if(this.id == 'KC'){
                                dataForSecondChart['JH'] = arrayForJHKCL;
                                dataForSecondChart['SJ'] = arrayForBRKCL;
                            }else if(this.id == 'HY'){
                                dataForSecondChart['JH'] = arrayForJHHML;
                                dataForSecondChart['SJ'] = arrayForBRHML;
                            }else if(this.id == 'RCBD'){
                                dataForSecondChart['JH'] = arrayForJHRCBD;
                                dataForSecondChart['SJ'] = arrayForBRRCBD;
                            }else{
                                dataForSecondChart['JH'] = arrayForJHRCML;
                                dataForSecondChart['SJ'] = arrayForBRRCML;
                            }
                            //console.log(dataForSecondChart);
                            drawSecondChart(dataForSecondChart);
                        }
                    }
                    //console.log(dataForSecondChart)
                    return dataForSecondChart;
                }
                
                dataForSecondChart = dataForSecondChart();
                //console.log(dataForSecondChart);

                function drawSecondChart(dataForSecondChart){
                    secondChart.clear();
                    let options2 = {
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
                            data: ['计划值', '实际值']
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
                                name: '',
                                axisLabel: {
                                    formatter: '{value} '
                                }
                            }
                        ],
                        series: [
                            {
                                name: '计划值',
                                type: 'bar',
                                data: dataForSecondChart.JH
                            },
                            {
                                name: '实际值',
                                type: 'bar',
                                data: dataForSecondChart.SJ
                            }
                        ]
                    };
                    secondChart.setOption(options2,true);
                }

                firstChart.setOption(options1);

                window.addEventListener("resize",function(){
                    firstChart.resize();
                    secondChart.resize();
                })
            })
        },

        getTableOneData(){
            this.$axios.get("/getDailyInfo?str="+this.selectDate+this.selectArea)
            .then(Response=>{
                this.allData = Response.data;
                //console.log(this.allData);
                var curData=[];
                curData = this.allData;
                for(var i=0;i<curData.length;i++){
                    if(curData[i]==0){
                    curData[i]="-";
                    }
                }
                this.tableOneConfig.tableOneData=[
                    {"area":"当日","FDL":curData[3],"GRL":curData[4],"JML":curData[0],"HML":curData[1],"KCL":curData[2],"DXL":curData[5],"ZYLXJ":"","HCZTL":curData[7],"SYZTL":curData[8],"DZL":curData[9],"SYHTL":curData[10]},
                    {"area":"累计","FDL":curData[14],"GRL":curData[15],"JML":curData[11],"HML":curData[12],"KCL":curData[13],"DXL":"","ZYLXJ":"","HCZTL":"","SYZTL":"","DZL":"","SYHTL":""}
                ]
            })
        },

        drawChartThreeToFive(){
            let thirdChart = this.$echarts.init(document.getElementById("third"));
            let forthChart = this.$echarts.init(document.getElementById("forth"));
            let fifthChart = this.$echarts.init(document.getElementById("fifth"));
            this.$axios.get("/getCoalAndPurchaseInfo?str="+this.selectDate+this.selectArea)
            .then(Response => {
                var curData=[];
                curData = Response.data;
                //console.log(curData);
                var arrayForFL = [];
                for(var i =0;i<4;i++){
                    arrayForFL[i] = curData[i];
                }

                let options3 = {
                    title: {
                        text: '分厂',
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
                        data: ['青山电厂'],
                        top:'10%'
                    },
                    series: [
                        {
                            name: '分厂',
                            type: 'pie',
                            radius: '55%',
                            center: ['50%', '60%'],
                            label: {
                                show: false
                            },
                            data: [
                                {value: 100, name: '青山电厂'},
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
                
                let options4 = {
                    title: {
                        text: '分硫',
                        subtext: '',
                        left: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {c} ({d}%)'
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        data: ['低硫', '中低硫', '中高硫', '高硫'],
                        top:'10%'
                    },
                    series: [
                        {
                            name: '分硫',
                            type: 'pie',
                            radius: '55%',
                            center: ['50%', '60%'],
                            label: {
                                show: false
                            },
                            data: [
                                {value: arrayForFL[0], name: '低硫'},
                                {value: arrayForFL[1], name: '中低硫'},
                                {value: arrayForFL[2], name: '中高硫'},
                                {value: arrayForFL[3], name: '高硫'},
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

                let options5 = {
                    title : [{
                            text: '陕煤彬长',
                            x: '12.5%',
                            y: '10%',
                            subtext:'',
                            textAlign: 'center'
                        }, {
                            text: '陕煤韩城',
                            x: '37.5%',
                            y: '10%',
                            subtext:'',
                            textAlign: 'center'
                        }, {
                            text: '山西潞安',
                            x: '62.5%',
                            y: '10%',
                            subtext:'',
                            textAlign: 'center'
                        }, {
                            text: '大有能源',
                            x: '87.5%',
                            y: '10%',
                            subtext:'',
                            textAlign: 'center'
                        }, {
                            text: '神华华中',
                            x: '12.5%',
                            y: '55%',
                            subtext:'',
                            textAlign: 'center'
                        }, {
                            text: '神华西安',
                            x: '37.5%',
                            y: '55%',
                            subtext:'',
                            textAlign: 'center'
                        }, {
                            text: '中华煤中',
                            x: '62.5%',
                            y: '55%',
                            subtext:'',
                            textAlign: 'center'
                        }
                    ],
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        top:0,
                        width:400,
                        itemGap:20,
                        data:['待发煤量','已发煤量','在途煤量']
                    },
                    series : [{
                            name:'陕煤彬长',
                            type:'pie',
                            radius : [0, 60],
                            center : ['12.5%', '30%'],
                            label: {
                                show: false
                            },
                            data:[
                                {value:curData[6], name:'待发煤量'},
                                {value:curData[7], name:'已发煤量'},
                                {value:curData[8], name:'在途煤量'}
                            ]
                        },{
                            name:'陕煤韩城',
                            type:'pie',
                            radius : [0, 60],
                            center : ['37.5%', '30%'],
                            label: {
                                show: false
                            },
                            data:[
                                {value:curData[9], name:'待发煤量'},
                                {value:curData[10], name:'已发煤量'},
                                {value:curData[11], name:'在途煤量'}
                            ]
                        },{
                            name:'山西潞安',
                            type:'pie',
                            radius : [0, 60],
                            center : ['62.%', '30%'],
                            label: {
                                show: false
                            },
                            data:[
                                {value:curData[12], name:'待发煤量'},
                                {value:curData[13], name:'已发煤量'},
                                {value:curData[14], name:'在途煤量'}
                            ]
                        },{
                            name:'大有能源',
                            type:'pie',
                            radius : [0, 60],
                            center : ['87.5%', '30%'],
                            label: {
                                show: false
                            },
                            data:[
                                {value:curData[15], name:'待发煤量'},
                                {value:curData[16], name:'已发煤量'},
                                {value:curData[17], name:'在途煤量'}
                            ]
                        },{
                            name:'神华华中',
                            type:'pie',
                            radius : [0, 60],
                            center : ['12.5%', '75%'],
                            label: {
                                show: false
                            },
                            data:[
                                {value:curData[18], name:'待发煤量'},
                                {value:curData[19], name:'已发煤量'},
                                {value:curData[20], name:'在途煤量'}
                            ]
                        },{
                            name:'神华西安',
                            type:'pie',
                            radius : [0, 60],
                            center : ['37.5%', '75%'],
                            label: {
                                show: false
                            },
                            data:[
                                {value:curData[21], name:'待发煤量'},
                                {value:curData[22], name:'已发煤量'},
                                {value:curData[23], name:'在途煤量'}
                            ]
                        },{
                            name:'中煤华中',
                            type:'pie',
                            radius : [0, 60],
                            center : ['62.5%', '75%'],
                            label: {
                                show: false
                            },
                            data:[
                                {value:curData[24], name:'待发煤量'},
                                {value:curData[25], name:'已发煤量'},
                                {value:curData[26], name:'在途煤量'}
                            ]
                        }
                    ]
                };
                
                thirdChart.setOption(options3);
                forthChart.setOption(options4);
                fifthChart.setOption(options5);
                window.addEventListener("resize",function(){
                    thirdChart.resize();
                    forthChart.resize();
                    fifthChart.resize();
                })
            })
        },

        getTableTwoData(){
            this.$axios.get("/getRMJGRB_CSB?str="+this.selectDate)
            .then(Response=>{
                var curData=[];
                //console.log(this.)
                curData = Response.data;
                for(var i=0;i<curData.length;i++){
                    if(curData[i]==0){
                    curData[i]="-";
                    }
                }
                //console.log(curData)
                this.tableTwoConfig.tableTwoData=curData
            })
        },

        refresh:function (){
            console.log(this.selectDate);
            window.location.href="daily?selectDate="+this.selectDate+"&selectArea="+this.selectArea;
            //document.location.reload();
        }
    },

    
    mounted() {
        this.drawChartOneAndTwo();
        this.drawChartThreeToFive();
        this.getTableOneData(),
        this.getTableTwoData()
        //this.drawChart3();
    }
};
</script>

<style scoped>

.left{
    width: 50%;
    padding-right: 0.5%;
}
.right{
    width:50%;
}
.test{
    display: flex;
    padding-bottom: 1%;
}
.newLine{
    padding-top: 1%;
    width: 100%;
    border-style:solid;
    border-width:2px;
    border-color:rgb(126, 125, 125);
    border-top-left-radius:10px;
    border-top-right-radius:10px;
    border-bottom-left-radius:10px;
    border-bottom-right-radius:10px;
}
.chartOne{
    width: 100%;
    height: 300px;
    border-style:solid;
    padding-top: 10px;
    border-color:rgb(126, 125, 125);
    border-top-left-radius:10px;
    border-top-right-radius:10px;
    border-bottom-left-radius:10px;
    border-bottom-right-radius:10px;
}
.pieChartOne{
    display: flex;
    border-style:solid;
    border-color:rgb(126, 125, 125);
    border-top-left-radius:10px;
    border-top-right-radius:10px;
    border-bottom-left-radius:10px;
    border-bottom-right-radius:10px;
}
.chartFive{
    width: 100%;
    height:600px;
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
.up-down{
    display: flex;
}
</style>