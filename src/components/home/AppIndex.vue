<!--首页组件，这里暂时不做过多开发，先随便写个 Hello World-->
<template>
    <div class="poster">
        <div class="up">
            <div class="left">
                <div class="tablePage">
                    <v-table
                        is-horizontal-resize
                        style="width:100%;font-size:14px"
                        :columns="tableConfig.columns"
                        :table-data="tableConfig.tableData"
                        :paging-index="(pageIndex-1)*pageSize"
                    ></v-table>
                </div>
                <div id="MapChart" class="MapChart"></div>
            </div>
            
            <div class="right">
                <div id="firstChart" class="chartOne" ></div>
                <div id="secondChart" class="chartTwo"></div>
                <div id="thirdChart" class="chartThree" ></div>
            </div>

        </div>
    </div>


    
      
    
</template>


<script >
  //import tableDate from '../mock/tableData.js'
  import myMap from '@/components/home/Map.vue'
  export default {
    data () {
        var me = this;
        me.city = me.city || '武汉';
        return {
            pageIndex: 1,
            pageSize: 10,
            total: '',
            tableConfig: {
                tableData: [],
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
                    title: '发电量  （万千瓦）',
                    width: 90,
                    columnAlign: 'center',
                    isResize:true
                    },
                    {
                    field: 'GRL',
                    title: '供热量  （万吉焦）',
                    width: 90,
                    columnAlign: 'center',
                    isResize:true
                    },
                    {
                    field: 'JML',
                    title: '进煤量（万吨）',
                    width: 80,
                    columnAlign: 'center',
                    isResize:true
                    },
                    {
                    field: 'HML',
                    title: '耗煤量（万吨）',
                    width: 80,
                    columnAlign: 'left',
                    isResize:true
                    },
                    {
                    field: 'ZYL',
                    title: '在运量（万吨）',
                    width: 80,
                    columnAlign: 'center',
                    isResize:true
                    },
                    {
                    field: 'DXL',
                    title: '待卸量（万吨）',
                    width: 80,
                    columnAlign: 'center',
                    isResize:true
                    },
                    {
                    field: 'KCL',
                    title: '库存量（万吨）',
                    width: 80,
                    columnAlign: 'center',
                    isResize:true
                    }
                ]
            },
            
        }

    },
    created () {
        this.getTableData();
        var me = this;

    },
    methods: {
        getTableData(){
            this.$axios.get("/getHeadZHBTInfo?str=湖北区域")
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
            this.tableConfig.tableData=[
                {"area":"当日","FDL":curData[11],"GRL":curData[14],"JML":curData[8],"HML":curData[8],"ZYL":"","DXL":"","KCL":""},
                {"area":"累计","FDL":curData[12],"GRL":curData[15],"JML":curData[4],"HML":curData[8],"ZYL":"","DXL":"","KCL":""}
            ]
            })
        },
        drawChartOne(){
            // 第一张图用于展示首页的入厂标单情况，需要展示过去一个月的所有数据
            let firstChart = this.$echarts.init(document.getElementById("firstChart"));
            this.$axios.get("/getRBInfo")
                .then(Response => {
                var curForFisrtChart = [];
                var arrayForKCL =[];
                var arrayForRCML = [];
                var arrayForRCBD = [];
                var arrayForDate = [];
                curForFisrtChart = Response.data;
                var flag = 0;
                for(var i =curForFisrtChart.length-1; i>=0; i--){
                    arrayForKCL[flag] = curForFisrtChart[i].brkcml;
                    arrayForRCML[flag] = curForFisrtChart[i].brrcml;
                    arrayForRCBD[flag] = curForFisrtChart[i].bhsbmdj;
                    arrayForDate[flag] = curForFisrtChart[i].ywrq.substr(0,10)
                    flag++;
                }
                //console.log(curForFisrtChart);
                //console.log(arrayForDate);
                //console.log(arrayForKCL);
                //console.log(arrayForRCML);
                //console.log(arrayForRCBD);
                    
                    var colors = ['#5793f3', '#d14a61', '#675bba'];
                    
                    let option1 = {
                        color: colors,
                        title:{
                            text:"入厂标单"
                        },
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {
                                type: 'cross'
                            }
                        },
                        grid: {
                            right: '20%'
                        },
                        toolbox: {
                            feature: {
                                dataView: {show: true, readOnly: false},
                                magicType:{
                                    show:true,
                                    type:['line','bar']
                                },
                                restore: {show: true},
                                saveAsImage: {show: true}
                            }
                        },
                        legend: {
                            data: ['库存量（万吨）', '入厂煤量（吨）', '入厂标单（元/吨）']
                        },
                        xAxis: [
                            {
                                type: 'category',
                                axisTick: {
                                    alignWithLabel: true
                                },
                                data: arrayForDate                        
                            }
                        ],
                        yAxis: [
                            {
                                type: 'value',
                                name: '库存量',
                                position: 'right',
                                axisLine: {
                                    lineStyle: {
                                        color: colors[0]
                                    }
                                },
                                axisLabel: {
                                    formatter: '{value}'
                                },
                                
                            },
                            {
                                type: 'value',
                                name: '入厂煤量',
                                position: 'right',
                                offset: 65,
                                axisLine: {
                                    lineStyle: {
                                        color: colors[1]
                                    }
                                },
                                axisLabel: {
                                    formatter: '{value} '
                                }
                            },
                            {
                                type: 'value',
                                name: '入厂标单',
                                position: 'left',
                                axisLine: {
                                    lineStyle: {
                                        color: colors[2]
                                    }
                                },
                                axisLabel: {
                                    formatter: '{value}'
                                }
                            }
                        ],
                        series: [
                            {
                                name: '库存量（万吨）',
                                type: 'line',
                                data:arrayForKCL,
                                areaStyle: {}     
                            },
                            {
                                name: '入厂煤量（吨）',
                                type: 'bar',
                                yAxisIndex: 1,
                                data: arrayForRCML
                            },
                            {
                                name: '入厂标单（元/吨）',
                                type: 'line',
                                yAxisIndex: 2,
                                data: arrayForRCBD
                            }
                        ],
                        // dataZoom:[{
                        //     end:'30'
                        // },
                        // {
                        //     type:'inside'
                        // }]
                    };
                    firstChart.setOption(option1);
                    window.onresize = firstChart.resize;
                })

        },
        drawChartTwoAndThree(){
            // 第二张图用户表示月计划进度
            let secondChart = this.$echarts.init(document.getElementById("secondChart"));
            // 第三章图为饼状图，用户表示当日入厂发运在运煤量
            let thirdChart = this.$echarts.init(document.getElementById("thirdChart"));
            this.$axios.get("/getHeadZHBTInfo?str=湖北区域")
            .then(Response=>{
                var curForSecondChart = [];
                curForSecondChart = Response.data;
                //console.log(curForSecondChart);
                var arrayForJHL = []; // 用于存储计划数据
                var arrayForWCL = []; // 用于存储完成数据
                // 由0到3分别为 计划进煤量、计划耗用量、计划库存量、计划入厂标单
                arrayForJHL[0]=curForSecondChart[0];
                arrayForJHL[1]=curForSecondChart[1];
                arrayForJHL[2]=curForSecondChart[2];
                arrayForJHL[3]=curForSecondChart[3];
                // 由0到3分别为 实际进煤量、实际耗用量、实际库存量、实际入厂标单
                arrayForWCL[0]=curForSecondChart[4];
                arrayForWCL[1]=curForSecondChart[5];
                arrayForWCL[2]=curForSecondChart[6];
                arrayForWCL[3]=curForSecondChart[7];
                

                let option2 = {
                    title:{
                            text:"月计划进度"
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
                        data: ['计划量', '完成量']
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: ['进煤', '耗用', '库存', '入厂标单'],
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
                                formatter: '{value} 吨'
                            }
                        },
                    ],
                    series: [
                        {
                            name: '计划量',
                            type: 'bar',
                            data: arrayForJHL
                        },
                        {
                            name: '完成量',
                            type: 'bar',
                            data: arrayForWCL
                        },
                    ]
                };
                
                let option3 = {
                        title : {
                            text: '当日入厂发运在运煤量',
                            subtext: 'c_info为湖北区域',
                            x:'center'
                        },
                        tooltip : {
                            trigger: 'item',
                            formatter: "{a} <br/>{b} : {c} ({d}%)"
                        },
                        legend: {
                            orient: 'vertical',
                            left: 'left',
                            data: ['入厂量','在运量','待发量']
                        },
                        series : [
                            {
                                name: '单位：万吨',
                                type: 'pie',
                                radius : '50%',
                                center: ['50%', '60%'],
                                data:[
                                    {value:curForSecondChart[8], name:'入厂量'},
                                    {value:curForSecondChart[9], name:'在运量'},
                                    {value:curForSecondChart[10], name:'待发量'},
                                    
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
                secondChart.setOption(option2);
                thirdChart.setOption(option3);
                
                window.addEventListener("resize",function(){
                        secondChart.resize();
                        thirdChart.resize();
                })

            })
        },
        drawChartMap(){
            let MapChart = this.$echarts.init(document.getElementById("MapChart"));
            
            var chinaGeoCoordMap = {
                '黑龙江': [127.9688, 45.368],
                '内蒙古': [110.3467, 41.4899],
                "吉林": [125.8154, 44.2584],
                '北京市': [116.4551, 40.2539],
                "辽宁": [123.1238, 42.1216],
                "河北": [114.4995, 38.1006],
                "天津": [117.4219, 39.4189],
                "山西": [112.3352, 37.9413],
                "陕西": [109.1162, 34.2004],
                "甘肃": [103.5901, 36.3043],
                "宁夏": [106.3586, 38.1775],
                "青海": [101.4038, 36.8207],
                "新疆": [87.9236, 43.5883],
                "西藏": [91.11, 29.97],
                "四川": [103.9526, 30.7617],
                "重庆": [108.384366, 30.439702],
                "山东": [117.1582, 36.8701],
                "河南": [113.4668, 34.6234],
                "江苏": [118.8062, 31.9208],
                "安徽": [117.29, 32.0581],
                "湖北": [114.3896, 30.6628],
                "浙江": [119.5313, 29.8773],
                "福建": [119.4543, 25.9222],
                "江西": [116.0046, 28.6633],
                "湖南": [113.0823, 28.2568],
                "贵州": [106.6992, 26.7682],
                "云南": [102.9199, 25.4663],
                "广东": [113.12244, 23.009505],
                "广西": [108.479, 23.1152],
                "海南": [110.3893, 19.8516],
                '上海': [121.4648, 31.2891]
            };
            var chinaDatas = [
                [{
                    name: '黑龙江',
                    value: 0
                }],
                [{
                    name: '内蒙古',
                    value: 0
                }],
                // [{
                //     name: '吉林',
                //     value: 0
                // }],
                [{
                    name: '辽宁',
                    value: 0
                }],
                [{
                    name: '河北',
                    value: 0
                }],
                // [{
                //     name: '天津',
                //     value: 0
                // }],
                [{
                    name: '山西',
                    value: 0
                }],
                [{
                    name: '陕西',
                    value: 0
                }],
                [{
                    name: '甘肃',
                    value: 0
                }],
                [{
                    name: '宁夏',
                    value: 0
                }],
                [{
                    name: '青海',
                    value: 0
                }],
                [{
                    name: '新疆',
                    value: 0
                }],
                [{
                    name: '西藏',
                    value: 0.7
                }],
                // [{
                //     name: '四川',
                //     value: 0
                // }],
                // [{
                //     name: '重庆',
                //     value: 0
                // }],
                [{
                    name: '山东',
                    value: 0
                }],
                [{
                    name: '河南',
                    value: 0.1
                }],
                [{
                    name: '江苏',
                    value: 0
                }],
                // [{
                //     name: '安徽',
                //     value: 0
                // }],
                [{
                    name: '湖北',
                    value: 0.5
                }],
                [{
                    name: '浙江',
                    value: 0
                }],
                [{
                    name: '福建',
                    value: 0.3
                }],
                // [{
                //     name: '江西',
                //     value: 0
                // }],
                [{
                    name: '湖南',
                    value: 0
                }],
                [{
                    name: '贵州',
                    value: 0.5
                }],
                // [{
                //     name: '广西',
                //     value: 0
                // }],
                [{
                    name: '海南',
                    value: 0
                }],
                [{
                    name: '上海',
                    value: 1
                }]
            ];

            var convertData = function(data) {
                var res = [];
                for (var i = 0; i < data.length; i++) {
                    var dataItem = data[i];
                    var fromCoord = chinaGeoCoordMap[dataItem[0].name];
                    var toCoord = [116.4551, 40.2539];
                    if (fromCoord && toCoord) {
                        res.push([{
                            coord: fromCoord,
                            value: dataItem[0].value
                        }, {
                            coord: toCoord,
                        }]);
                    }
                }
                return res;
            };
            var series = [];
            [
                ['北京市', chinaDatas]
            ].forEach(function(item, i) {
                console.log(item)
                series.push({
                        type: 'lines',
                        zlevel: 2,
                        effect: {
                            show: true,
                            period: 4, //箭头指向速度，值越小速度越快
                            trailLength: 0.1, //特效尾迹长度[0,1]值越大，尾迹越长重
                            symbol: 'arrow', //箭头图标
                            symbolSize: 6, //图标大小
                        },
                        lineStyle: {
                            normal: {
                                width: 2, //尾迹线条宽度
                                opacity: 1, //尾迹线条透明度
                                curveness: .4 //尾迹线条曲直度
                            }
                        },
                        data: convertData(item[1])
                    }, {
                        type: 'effectScatter',
                        coordinateSystem: 'geo',
                        zlevel: 2,
                        rippleEffect: { //涟漪特效
                            period: 4, //动画时间，值越小速度越快
                            brushType: 'stroke', //波纹绘制方式 stroke, fill
                            scale: 4 //波纹圆环最大限制，值越大波纹越大
                        },
                        label: {
                            normal: {
                                show: true,
                                position: 'right', //显示位置
                                offset: [5, 0], //偏移设置
                                formatter: function(params) { //圆环显示文字
                                    return params.data.name;
                                },
                                fontSize: 13
                            },
                            emphasis: {
                                show: true
                            }
                        },
                        symbol: 'circle',
                        symbolSize: function(val) {
                            return 5 + val[2] * 5; //圆环大小
                        },
                        itemStyle: {
                            normal: {
                                show: false,
                                color: '#f00'
                            }
                        },
                        data: item[1].map(function(dataItem) {
                            return {
                                name: dataItem[0].name,
                                value: chinaGeoCoordMap[dataItem[0].name].concat([dataItem[0].value])
                            };
                        }),
                    },
                    //被攻击点
                    {
                        type: 'scatter',
                        coordinateSystem: 'geo',
                        zlevel: 2,
                        rippleEffect: {
                            period: 4,
                            brushType: 'stroke',
                            scale: 4
                        },
                        label: {
                            normal: {
                                show: true,
                                position: 'right',
                                //offset:[5, 0],
                                color: '#0f0',
                                formatter: '{b}',
                                textStyle: {
                                    color: "#0f0"
                                }
                            },
                            emphasis: {
                                show: true,
                                color: "#f60"
                            }
                        },
                        symbol: 'pin',
                        symbolSize: 50,
                        data: [{
                            name: item[0],
                            value: chinaGeoCoordMap[item[0]].concat([10]),
                        }],
                    }
                );
            });

            let optionMap = {
                tooltip: {
                    trigger: 'item',
                    //backgroundColor: 'rgba(166, 200, 76, 0.82)',
                    borderColor: '#FFFFCC',
                    showDelay: 0,
                    hideDelay: 0,
                    enterable: true,
                    transitionDuration: 0,
                    extraCssText: 'z-index:100',
                    formatter: function(params, ticket, callback) {
                        //根据业务自己拓展要显示的内容
                        var res = "";
                        var name = params.name;
                        var value = params.value[params.seriesIndex + 1];
                        res = "<span style='color:#fff;'>" + name + "</span><br/>数据：" + value;
                        return res;
                    }
                },
                backgroundColor: "white",
                visualMap: { //图例值控制
                    min: 0,
                    max: 1,
                    calculable: true,
                    show: true,
                    color: ['#F63232', '#fc9700', '#ffde00', '#ffde00', '#298971'],
                    textStyle: {
                        color: '#fff'
                    }
                },
                geo: {
                    map: 'china',
                    zoom: 2,
                    label: {
                        emphasis: {
                            show: false
                        }
                    },
                    roam: true, //是否允许缩放
                    itemStyle: {
                        normal: {
                            color: '#99CCCC', //地图背景色
                            borderColor: '#516a89', //省市边界线00fcff 516a89
                            borderWidth: 1.5
                        },
                        emphasis: {
                            color: '#80999D' //悬浮背景
                        }
                    }
                },
                series: series
            };

            MapChart.setOption(optionMap);
            window.addEventListener("resize",function(){
                MapChart.resize();
            })
        },
    },
    mounted(){
        this.drawChartOne();
        this.drawChartTwoAndThree();
        this.drawChartMap();
    },
    
  }
      
</script>

<style scoped>

.up{
    display: flex;
}
.left{
    width: 60%;
}
.right{
    float:right;
    width: 40%;
}
.chartOne{
    float:right;
    width: 100%;
    height:300px;
    padding-top: 15px;
}
.chartTwo{
    float:right;
    width: 100%;
    height:300px;
}
.chartThree{
    float:right;
    width: 80%;
    height:300px;
}
.tablePage{
    padding-top: 15px;
}
.MapChart{
    width: 100%;
    height: 100%;
}

</style>

