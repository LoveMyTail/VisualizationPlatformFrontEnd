<!--首页组件，这里暂时不做过多开发，先随便写个 Hello World-->
<template>
    <div id="app" >
        <!-- 日期以及单位选择器 -->
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

        <div class="up">
            <div class="left">
                <!-- 月进耗存-入厂标单 -->
                <div id="first" class="chartOne"></div>
                <div class="newLine">
                    <el-button   id="JM" autofocus >进煤量</el-button>
                    <el-button   id="KC">库存量</el-button>
                    <el-button   id="HY">耗用量</el-button>
                    <el-button   id="RCBD">入厂标单</el-button>
                    <el-button   id="RLBD">入炉标单</el-button>
                    <!-- <div >
                        <button type="button" class="dataDemo" id="JM">进煤</button>
                        <button type="button" class="dataDemo" id="KC">库存</button>
                        <button type="button" class="dataDemo" id="HY">耗用</button>
                        <button type="button" class="dataDemo" id="RCBD">入厂标单</button>
                        <button type="button" class="dataDemo" id="RLBD">入炉标单</button>
                    </div> -->
                    <div id="second" class="chartTwo"></div>
                </div>
                <!-- 月度采购结构 -->
                <div class="pieLeft">
                    <!-- 采购类型 -->
                    <div id="third" class="pieChart"></div>
                    <!-- 煤种 -->
                    <div id="forth" class="pieChart"></div>
                    <!-- 运输方式 -->
                    <div id="fifth" class="pieChart"></div>
                    <!-- 全硫 -->
                    <div id="sixth" class="pieChart"></div>
                </div>
            </div>

            <div class="right">
                <!-- 月度指标完成情况 -->
                <div class="tableOnePage">
                    <p>月度指标完成情况</p>
                    <v-table
                        is-horizontal-resize
                        style="width:100%;"
                        :columns="tableOneConfig.columns"
                        :table-data="tableOneConfig.tableOneData"
                    ></v-table>
                </div>
                <!-- 年度指标完成情况 -->
                <div class="tableTwoPage">
                    <p>年度指标完成情况</p>
                    <v-table
                        is-horizontal-resize
                        style="width:100%;"
                        column-width-drag
                        :columns="tableTwoConfig.columns"
                        :table-data="tableTwoConfig.tableTwoData"
                    ></v-table>
                </div>
                <!-- 年度采购结构 -->
                <div class="pieRight">
                    <!-- 采购类型 -->
                    <div id="seventh" class="pieChart"></div>
                    <!-- 煤种 -->
                    <div id="eighth" class="pieChart"></div>
                    <!-- 运输方式 -->
                    <div id="nineth" class="pieChart"></div>
                    <!-- 全硫 -->
                    <div id="tenth" style="width:50%;height:100%;padding-top:1%;padding-bottom:1%"></div>
                </div>
            </div>
        </div>

        <div class="down">
            <!-- 价格明细数据 -->
            <div class="tableThreePage">
                <p>价格明细数据</p>
                <v-table
                    is-horizontal-resize
                    is-vertical-resize
                    style="width:100%;height:350px"
                    :columns="tableThreeConfig.columns"
                    :table-data="tableThreeConfig.tableThreeData"
                ></v-table>
            </div>
        </div>
        
        
    </div>
</template>

<script>
export default {
    data(){
        return{
            kk:[],
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                },
            },
            selectMonth: '',
            options:[{
                value:'湖北区域',
                label:'湖北区域'
            }],
            selectArea:'湖北区域',
            tableOneConfig: {
                tableOneData: [],
                allData:[],
                columns: [
                    {
                        field: 'type',
                        title: '',
                        width: 90,
                        columnAlign: 'center',
                        isResize:true
                    },{
                        field: 'DYWC',
                        title: '当月完成',
                        width: 90,
                        columnAlign: 'center',
                        isResize:true
                    },{
                        field: 'JHL',
                        title: '计划量',
                        width: 90,
                        columnAlign: 'center',
                        isResize:true
                    },{
                        field: 'ZJL',
                        title: '增减量',
                        width: 80,
                        columnAlign: 'center',
                        isResize:true
                    },{
                        field: 'WCL',
                        title: '完成率',
                        width: 80,
                        columnAlign: 'center',
                        isResize:true
                    },{
                        field: 'NLJ',
                        title: '年累计',
                        width: 80,
                        columnAlign: 'center',
                        isResize:true
                    },{
                        field: 'TB',
                        title: '同比',
                        width: 80,
                        columnAlign: 'center',
                        isResize:true
                    },{
                        field: 'HB',
                        title: '环比',
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
                        field: 'type',
                        title: '',
                        width: 80,
                        columnAlign: 'center',
                        isResize:true
                    },{
                        field: 'Jan',
                        title: '1月',
                        width: 80,
                        columnAlign: 'center',
                        isResize:true
                    },{
                        field: 'Feb',
                        title: '2月',
                        width: 80,
                        columnAlign: 'center',
                        isResize:true
                    },{
                        field: 'Mar',
                        title: '3月',
                        width: 80,
                        columnAlign: 'center',isResize:true
                    },{
                        field: 'Apr',
                        title: '4月',
                        width: 80,
                        columnAlign: 'center',isResize:true
                    },{
                        field: 'May',
                        title: '5月',
                        width: 80,
                        columnAlign: 'center',isResize:true
                    },{
                        field: 'Jun',
                        title: '6月',
                        width: 80,
                        columnAlign: 'center',isResize:true
                    },{
                        field: 'Jul',
                        title: '7月',
                        width: 80,
                        columnAlign: 'center',isResize:true
                    },{
                        field: 'Aug',
                        title: '8月',
                        width: 80,
                        columnAlign: 'center',isResize:true
                    },{
                        field: 'Sep',
                        title: '9月',
                        width: 80,
                        columnAlign: 'center',isResize:true
                    },{
                        field: 'Oct',
                        title: '10月',
                        width: 80,
                        columnAlign: 'center',isResize:true
                    },{
                        field: 'Nov',
                        title: '11月',
                        width: 80,
                        columnAlign: 'center',isResize:true
                    },{
                        field: 'Dec',
                        title: '12月',
                        width: 80,
                        columnAlign: 'center',isResize:true
                    },{
                        field: 'Total',
                        title: '累计',
                        width: 100,
                        columnAlign: 'center',isResize:true
                    }
                ]
            },
            tableThreeConfig: {
                tableThreeData: [],
                columns: [
                    {
                        field: 'ghdw',
                        title: '供煤单位',
                        width: 160,
                        columnAlign: 'center',
                        isResize:true
                    },{
                        field: 'zgsl',
                        title: '合同量',
                        width: 90,
                        columnAlign: 'center',
                        isResize:true
                    },{
                        field: 'sssl',
                        title: '到煤量',
                        width: 90,
                        columnAlign: 'center',
                        isResize:true
                    },{
                        field: 'DXL',
                        title: '兑现率',
                        width: 80,
                        columnAlign: 'center',
                        isResize:true
                    },{
                        field: 'HTRZ',
                        title: '合同热值',
                        width: 80,
                        columnAlign: 'center',
                        isResize:true
                    },{
                        field: 'rcrz',
                        title: '测算热值',
                        width: 80,
                        columnAlign: 'center',
                        isResize:true
                    },{
                        field: 'BML',
                        title: '标煤量',
                        width: 80,
                        columnAlign: 'center',
                        isResize:true
                    },{
                        field: 'cbjhs',
                        title: '车板价',
                        width: 80,
                        columnAlign: 'center',
                        isResize:true
                    },{
                        field: 'yfhs',
                        title: '运费',
                        width: 80,
                        columnAlign: 'center',
                        isResize:true
                    },{
                        field: 'rcjhs',
                        title: '到厂价',
                        width: 80,
                        columnAlign: 'center',
                        isResize:true
                    },{
                        field: 'rcrzka',
                        title: '折单卡价（元/卡 吨）',
                        width: 170,
                        columnAlign: 'center',
                        isResize:true
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
        // 月进耗存-入厂标单
        drawChartOneAndTwo() {
            let firstChart = this.$echarts.init(document.getElementById("first"));
            let secondChart = this.$echarts.init(document.getElementById("second"));
            
            this.$axios.get("/findYearByMonth?date="+this.selectMonth)
            .then(Response => {
                var curData = [];
                curData = Response.data;
                // console.log(curData)

                var arrayForDate = [];      // 日期
                var arrayForKC = [];        // 库存
                var arrayForRCML = [];      // 入厂煤量
                var arrayForHML = [];       // 耗煤量 - 数据取自入炉煤量
                var arrayForRCBD = [];      // 入厂标单
                var arrayForRLBD = [];      // 入炉标单
                
                var arrayForJHJML = [];     // 计划进煤量 
                var arrayForJHHML = [];     // 计划耗煤量 - 数据取自计划入炉煤量
                var arrayForJHKC = [];      // 计划库存
                var arrayForJHRCBD = [];    // 计划入厂标单
                var arrayForJHRLBD = [];    // 计划入炉标单
                for(var i =0 ; i<curData.length;i++){
                    arrayForDate[i] = curData[i].yf;
                    arrayForKC[i] = curData[i].kc;
                    arrayForRCML[i] = curData[i].rcml;
                    arrayForHML[i] = curData[i].rlml;
                    arrayForRCBD[i] = curData[i].rcbd;
                    arrayForRLBD[i] = curData[i].rlbd;
                    arrayForJHJML[i] = curData[i].jmzb;
                    arrayForJHHML[i] = curData[i].bmlzb;
                    arrayForJHKC[i] = curData[i].kczb;
                    arrayForJHRCBD[i] = curData[i].bdzb;
                    arrayForJHRLBD[i] = curData[i].rlbdzb;
                }

                // 该部分为获取表格二所需数据
                var dataForTableRCML = [];
                var dataForTableKC = [];
                var dataForTableHML = [];
                for(var i =0;i<curData.length;i++){
                    dataForTableRCML[i] = arrayForRCML[i]/10000;
                    dataForTableHML[i] = arrayForHML[i]/10000;    
                    dataForTableKC[i] = arrayForKC[i]/10000;
                }
                var Total = [];
                Total[0]=0,Total[1]=0,Total[2]=0;
                for(var i =0;i<curData.length;i++){
                    Total[0]=dataForTableRCML[i]+Total[0];
                    Total[1]=dataForTableHML[i]+Total[1];
                    Total[2]=dataForTableKC[i]+Total[2];
                    dataForTableRCML[i] = dataForTableRCML[i].toFixed(1);
                    dataForTableHML[i] = dataForTableHML[i].toFixed(1);
                    dataForTableKC[i] = dataForTableKC[i].toFixed(1);
                }
                console.log(dataForTableRCML[0]);
                this.tableTwoConfig.tableTwoData=[
                    {"type":"进煤量","Jan":dataForTableRCML[0],"Feb":dataForTableRCML[1],"Mar":dataForTableRCML[2],"Apr":dataForTableRCML[3],"May":dataForTableRCML[4],"Jun":dataForTableRCML[5],"Jul":dataForTableRCML[6],"Aug":dataForTableRCML[7],"Sep":dataForTableRCML[8],"Oct":dataForTableRCML[9],"Nov":dataForTableRCML[10],"Dec":dataForTableRCML[11],"Total":Total[0].toFixed(1)},
                    {"type":"耗用量","Jan":dataForTableHML[0],"Feb":dataForTableHML[1],"Mar":dataForTableHML[2],"Apr":dataForTableHML[3],"May":dataForTableHML[4],"Jun":dataForTableHML[5],"Jul":dataForTableHML[6],"Aug":dataForTableHML[7],"Sep":dataForTableHML[8],"Oct":dataForTableHML[9],"Nov":dataForTableHML[10],"Dec":dataForTableHML[11],"Total":Total[1].toFixed(1)},
                    {"type":"存煤量","Jan":dataForTableKC[0],"Feb":dataForTableKC[1],"Mar":dataForTableKC[2],"Apr":dataForTableKC[3],"May":dataForTableKC[4],"Jun":dataForTableKC[5],"Jul":dataForTableKC[6],"Aug":dataForTableKC[7],"Sep":dataForTableKC[8],"Oct":dataForTableKC[9],"Nov":dataForTableKC[10],"Dec":dataForTableKC[11],"Total":Total[2].toFixed(1)},
                    {"type":"发电量","Jan":0,"Feb":0,"Mar":0,"Apr":0,"May":0,"Jun":0,"Jul":0,"Aug":0,"Sep":0,"Oct":0,"Nov":0,"Dec":0,"Total":0}
                ]

                var colors = ['#5793f3', '#d14a61', '#675bba'];
                
                let options1 = {
                    title:{
                        text:"月进耗存-入厂标单"
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
                            name: '煤量（吨）',
                            axisLabel: {
                                formatter: '{value} '
                            }
                        },
                        {
                            type: 'value',
                            name: '标单（元/吨）',
                            axisLabel: {
                                formatter: '{value} '
                            }
                        }
                    ],
                    series: [
                        {
                            name: '库存量',
                            type: 'bar',
                            data: arrayForKC
                        },
                        {
                            name: '进煤量',
                            type: 'bar',
                            data: arrayForRCML
                        },
                        {
                            name: '耗煤量',
                            type: 'line',
                        
                            data: arrayForHML, 
                            areaStyle: {}
                        },
                        {
                            name: '入厂标单',
                            type: 'line',
                            yAxisIndex: 1,
                            data: arrayForRCBD
                        }
                    ]
                };

                // 未设定默认值以及默认标题
                function dataForSecondChart(){
                    var dataForSecondChart = {};
                    var arr = document.getElementsByTagName('button');
                    if(arr.onclick==null){
                        dataForSecondChart['JH'] = arrayForJHJML;
                        dataForSecondChart['SJ'] = arrayForRCML;
                        drawSecondChart(dataForSecondChart);
                    }
                    for(var i=0;i<arr.length;i++){
                        arr[i].onclick = function(){
                            //console.log(this.id);
                            if(this.id == 'JM'){
                                dataForSecondChart['JH'] = arrayForJHJML;
                                dataForSecondChart['SJ'] = arrayForRCML;
                            }else if(this.id == 'KC'){
                                dataForSecondChart['JH'] = arrayForJHKC;
                                dataForSecondChart['SJ'] = arrayForKC;
                            }else if(this.id == 'HY'){
                                dataForSecondChart['JH'] = arrayForJHHML;
                                dataForSecondChart['SJ'] = arrayForHML;
                            }else if(this.id == 'RCBD'){
                                dataForSecondChart['JH'] = arrayForJHRCBD;
                                dataForSecondChart['SJ'] = arrayForRCBD;
                            }else if(this.id == 'RLBD'){
                                dataForSecondChart['JH'] = arrayForJHRLBD;
                                dataForSecondChart['SJ'] = arrayForRLBD;
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
                    window.onresize = secondChart.resize;
                }

                firstChart.setOption(options1);
                //window.onresize = firstChart.resize;
                window.addEventListener("resize",function(){
                    firstChart.resize();
                    secondChart.resize();
                })
                
            })
        },

        // 获取月度指标完成情况数据
        getTableOneData(){
            this.$axios.get("/getMonthlyCompletion?str="+this.selectMonth+this.selectArea)
            .then(Response=>{
                var curData = [];
                curData = Response.data;
                //console.log(curData);
                this.tableOneConfig.tableOneData=[
                    {"type":"发电量","DYWC":curData[0],"JHL":curData[9],"ZJL":curData[0]-curData[9],"WCL":curData[9]==0?"-":(curData[0]-curData[9])/curData[9]*100,"NLJ":curData[22],"TB":curData[10],"HB":curData[16]},
                    {"type":"进煤量","DYWC":curData[1],"JHL":curData[6],"ZJL":curData[1]-curData[6],"WCL":curData[6]==0?"-":(curData[1]-curData[6])/curData[6]*100,"NLJ":curData[23],"TB":curData[11],"HB":curData[17]},
                    {"type":"耗用量","DYWC":curData[2],"JHL":curData[7],"ZJL":curData[2]-curData[7],"WCL":curData[7]==0?"-":(curData[2]-curData[7])/curData[7]*100,"NLJ":curData[24],"TB":curData[12],"HB":curData[18]},
                    {"type":"存煤量","DYWC":curData[3],"JHL":curData[8],"ZJL":curData[3]-curData[8],"WCL":curData[8]==0?"-":(curData[3]-curData[8])/curData[8]*100,"NLJ":curData[25],"TB":curData[13],"HB":curData[19]},
                    {"type":"入厂标单","DYWC":curData[4],"JHL":curData[28],"ZJL":curData[4]-curData[28],"WCL":curData[28]==0?"-":(curData[4]-curData[28])/curData[28]*100,"NLJ":curData[26],"TB":curData[14],"HB":curData[20]},
                    {"type":"入炉标单","DYWC":curData[5],"JHL":curData[29],"ZJL":curData[5]-curData[29],"WCL":curData[29]==0?"-":(curData[5]-curData[29])/curData[29]*100,"NLJ":curData[27],"TB":curData[15],"HB":curData[21]}
                ]
            })
        },

        // 月度采购计划中的采购类型、煤种、运输方式
        drawChartThreeToFive(){
            let thirdChart = this.$echarts.init(document.getElementById("third"));
            let forthChart = this.$echarts.init(document.getElementById("forth"));
            let fifthChart = this.$echarts.init(document.getElementById("fifth"));
            this.$axios.get("/getRMGHCYBTotalYear?date="+this.selectMonth)
            .then(Response=>{
                var curData = [];
                curData = Response.data;
                //console.log(curData);
                var legendData = {};    // 每个图的小类名称
                var i =0;
                var tableData = new Map();     // 用来存储每个图的具体数据，里面存储的是键值对
                for(var key in curData){
                    var j =0;
                    var cur = [];
                    var curMap = [];
                    for(var keyA in curData[key]){
                        cur[j] = keyA;
                        curMap.push({name:keyA,value:curData[key][keyA].toFixed(2)})
                        j++;
                    }
                    tableData.set(key,curMap);
                    legendData[key] = cur;
                }
                //console.log(legendData["采购类型"]);
                //console.log(tableData.get("采购类型"));

                // 月度采购结构-采购结构
                let options3 = {
                    title: {
                        text: '采购类型',
                        subtext: '',
                        left: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {c} ({d}%)',
                        confine:true
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        data: legendData['采购类型'],
                        top:'10%'
                    },
                    series: [
                        {
                            name: '采购类型',
                            type: 'pie',
                            radius: '65%',
                            center: ['50%', '60%'],
                            data:tableData.get("采购类型"),
                            label: {
                                show: false
                            },
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

                // 月度采购结构-煤种
                let options4 = {
                    title: {
                        text: '煤种',
                        subtext: '',
                        left: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {c} ({d}%)',
                        confine:true
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        data: legendData['煤种'],
                        top:'10%'
                    },
                    series: [
                        {
                            name: '煤种',
                            type: 'pie',
                            radius: '65%',
                            center: ['50%', '60%'],
                            data:tableData.get("煤种"),
                            label: {
                                show: false
                            },
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

                // 月度采购结构-运输方式
                let options5 = {
                    title: {
                        text: '运输方式',
                        subtext: '',
                        left: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {c} ({d}%)',
                        confine:true
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        data: legendData['运输方式'],
                        top:'10%'
                    },
                    series: [
                        {
                            name: '运输方式',
                            type: 'pie',
                            radius: '65%',
                            center: ['50%', '60%'],
                            data:tableData.get("运输方式"),
                            label: {
                                show: false
                            },
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

        // 年度采购计划中的采购类型、煤种、运输方式
        drawChartSevenToNine(){
            let seventhChart = this.$echarts.init(document.getElementById("seventh"));
            let eighthChart = this.$echarts.init(document.getElementById("eighth"));
            let ninethChart = this.$echarts.init(document.getElementById("nineth"));
            this.$axios.get("/getRMGHCYBTotalMonth?date="+this.selectMonth)
            .then(Response=>{
                var curData = [];
                curData = Response.data;
                //console.log(curData);
                var legendData = {};    // 每个图的小类名称
                var i =0;
                var tableData = new Map();     // 用来存储每个图的具体数据，里面存储的是键值对
                for(var key in curData){
                    var j =0;
                    var cur = [];
                    var curMap = [];
                    for(var keyA in curData[key]){
                        cur[j] = keyA;
                        curMap.push({name:keyA,value:curData[key][keyA].toFixed(2)})
                        j++;
                    }
                    tableData.set(key,curMap);
                    legendData[key] = cur;
                }
                //console.log(tableData);

                // 月度采购结构-采购结构
                let options7 = {
                    title: {
                        text: '采购类型',
                        subtext: '',
                        left: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {c} ({d}%)',
                        confine:true
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        data: legendData['采购类型'],
                        top:'10%'
                    },
                    series: [
                        {
                            name: '采购类型',
                            type: 'pie',
                            radius: '65%',
                            center: ['50%', '60%'],
                            data:tableData.get("采购类型"),
                            label: {
                                show: false
                            },
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

                // 月度采购结构-煤种
                let options8 = {
                    title: {
                        text: '煤种',
                        subtext: '',
                        left: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {c} ({d}%)',
                        confine:true
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        data: legendData['煤种'],
                        top:'10%'
                    },
                    series: [
                        {
                            name: '煤种',
                            type: 'pie',
                            radius: '65%',
                            center: ['50%', '60%'],
                            data:tableData.get("煤种"),
                            label: {
                                show: false
                            },
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

                // 月度采购结构-运输方式
                let options9 = {
                    title: {
                        text: '运输方式',
                        subtext: '',
                        left: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {c} ({d}%)',
                        confine:true
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        data: legendData['运输方式'],
                        top:'10%'
                    },
                    series: [
                        {
                            name: '运输方式',
                            type: 'pie',
                            radius: '65%',
                            center: ['50%', '60%'],
                            data:tableData.get("运输方式"),
                            label: {
                                show: false
                            },
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

                seventhChart.setOption(options7);
                eighthChart.setOption(options8);
                ninethChart.setOption(options9);
                window.addEventListener("resize",function(){
                    seventhChart.resize();
                    eighthChart.resize();
                    ninethChart.resize();
                })
            })
        },

        // 月度和年度采购计划中的全硫部分
        drawChartSixAndTen(){
            let sixthChart = this.$echarts.init(document.getElementById("sixth"));
            let tenthChart = this.$echarts.init(document.getElementById("tenth"));
            this.$axios.get("/getLFStructure?str="+this.selectMonth+this.selectArea)
            .then(Response=>{
                var curData = [];
                curData = Response.data;
                //console.log(curData);

                var dataOne = [];
                var dataTwo = [];
                for(var i =0;i<4;i++){
                    dataOne[i] = curData[i];
                    dataTwo[i] = curData[i+4];
                }

                let options6 = {
                    title: {
                        text: '全硫',
                        subtext: '',
                        left: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {c} ({d}%)',
                        confine:true
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        data: ['低硫','中低硫','中高硫','高硫'],
                        top:'10%'
                    },
                    series: [
                        {
                            name: '全硫',
                            type: 'pie',
                            radius: '65%',
                            center: ['50%', '60%'],
                            label: {
                                show: false
                            },
                            data:[
                                {name:'低硫',value:dataOne[0]},
                                {name:'中低硫',value:dataOne[1]},
                                {name:'中高硫',value:dataOne[2]},
                                {name:'高硫',value:dataOne[3]}
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

                let options10 = {
                    title: {
                        text: '全硫',
                        subtext: '',
                        left: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {c} ({d}%)',
                        confine:true
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        data: ['低硫','中低硫','中高硫','高硫'],
                        top:'10%'
                    },
                    series: [
                        {
                            name: '全硫',
                            type: 'pie',
                            radius: '65%',
                            center: ['50%', '60%'],
                            label: {
                                show: false
                            },
                            data:[
                                {name:'低硫',value:dataTwo[0]},
                                {name:'中低硫',value:dataTwo[1]},
                                {name:'中高硫',value:dataTwo[2]},
                                {name:'高硫',value:dataTwo[3]}
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

                sixthChart.setOption(options6);
                tenthChart.setOption(options10);

                window.addEventListener("resize",function(){
                    sixthChart.resize();
                    tenthChart.resize();
                })
                
            })

        },

        // 价格明细数据
        getTableThreeData(){
            this.$axios.get("/getDetailDataByMonth?date="+this.selectMonth)
            .then(Response=>{
                var curData = [];
                curData = Response.data;
                console.log(curData);
                this.tableThreeConfig.tableThreeData=curData;
            })
        },

        refresh:function (){
            console.log(this.selectMonth);
            window.location.href="monthly?selectMonth="+this.selectMonth+"&selectArea="+this.selectArea;
            //document.location.reload();
        }

    },
    mounted() {
        this.drawChartOneAndTwo();
        this.drawChartThreeToFive();
        this.drawChartSevenToNine();
        this.drawChartSixAndTen();
        this.getTableOneData();
        this.getTableThreeData();
    }
};
</script>

<style scoped>

.up{
    display: flex;
}
.down{
    padding-top: 2%;
    border-style:solid;
    border-color:rgb(126, 125, 125);
    border-top-left-radius:10px;
    border-top-right-radius:10px;
    border-bottom-left-radius:10px;
    border-bottom-right-radius:10px;
}
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
    height: 350px;
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
.pieLeft{
    width: 100%;
    height: 300px;
    display: flex;
    border-style:solid;
    border-color:rgb(126, 125, 125);
    border-top-left-radius:10px;
    border-top-right-radius:10px;
    border-bottom-left-radius:10px;
    border-bottom-right-radius:10px;
}
.pieRight{
    display: flex;
    width: 100%;
    height: 300px;
    border-style:solid;
    border-color:rgb(126, 125, 125);
    border-top-left-radius:10px;
    border-top-right-radius:10px;
    border-bottom-left-radius:10px;
    border-bottom-right-radius:10px;
}
.chartOne{
    width: 100%;
    height: 350px;
    border-style:solid;
    padding-top: 10px;
    border-color:rgb(126, 125, 125);
    border-top-left-radius:10px;
    border-top-right-radius:10px;
    border-bottom-left-radius:10px;
    border-bottom-right-radius:10px;
}
.chartTwo{
    width:100%;
    height: 100%;
    padding-top:10px;
    padding-bottom:10px;
}
.pieChart{
    height: 100%;
    width: 50%;
}
.tableOnePage{
    padding-top: 0px;
    height: 350px;
    border-style:solid;
    border-color:rgb(126, 125, 125);
    border-top-left-radius:10px;
    border-top-right-radius:10px;
    border-bottom-left-radius:10px;
    border-bottom-right-radius:10px;
}
.tableTwoPage{
    padding-top: 0px;
    border-style:solid;
    border-color:rgb(126, 125, 125);
    border-top-left-radius:10px;
    border-top-right-radius:10px;
    border-bottom-left-radius:10px;
    border-bottom-right-radius:10px;
}
</style>