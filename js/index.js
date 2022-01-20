const pic = document.querySelector(".wea_pic");
const btn = document.querySelector(".search_btn");
const back = document.querySelector(".return");
const search_page = document.querySelector(".search_page");
const input = document.querySelector(".input");


addEventListener(btn, 'click', DisplayPage);
addEventListener(back, 'click', DisplayPage);


// 事件监听函数
function addEventListener(elm, e, func) {
    if (elm.addEventListener) {
        elm.addEventListener(e, func, false);
    } else {
        elm.attachEvent(e, func);
    }
}

// 搜索页显示隐藏
function DisplayPage() {
    if (search_page.style.display === "block") {
        search_page.style.display = "none";
    } else {
        search_page.style.display = "block";
    }
}

// echarts绘图
function Paint(obj, data) {
    const myChart = echarts.init(obj);

    const option = {
        xAxis: {
            data: [],
            show: false
        },
        yAxis: {
            show: false
        },
        grid: {
            left: '0%',
            right: '0%',
            top: '0%',
            bottom: '0%'
        },
        series: [{
                data: data.day,
                type: 'line',
                stack: 'x',
                label: {
                    show: true,
                    position: 'bottom',
                    textStyle: {
                        fontSize: '11px',
                        color: "white"
                    }
                },
                lineStyle: {
                    color: 'white'
                }
            },
            {
                data: data.night,
                type: 'line',
                stack: 'x',
                label: {
                    show: true,
                    position: 'bottom',
                    textStyle: {
                        fontSize: '11px',
                        color: "white"
                    }
                },
                lineStyle: {
                    color: 'white'
                }
            }
        ]

    };

    myChart.setOption(option);
}

// 传入最基本的配置，会合并之后调用方法时传入的配置
function Ajax() {
    let ajax = new Object();
    ajax.get = function (url, data, fun) {
        let ajax = new XMLHttpRequest();
        ajax.open("GET", url);
        ajax.ontimeout = function () {
            alert("网络异常，请稍后再试......");
        }

        ajax.onerror = function () {
            alert("你的网络似乎出现了一些问题......🤡");
        }

        ajax.setRequestHeader = data.headers;

        ajax.send();
        ajax.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status >= 200 && this.status < 300) {
                    data.success(JSON.parse(this.response),fun);
                } else {
                    data.error();
                }
            }
        }
    }

    ajax.post = function (url, data, fun) {
        let ajax = new XMLHttpRequest();
        ajax.open("POST", url);
        ajax.ontimeout = function () {
            alert("网络异常，请稍后再试......");
        }

        ajax.onerror = function () {
            alert("你的网络似乎出现了一些问题......🤡");
        }

        ajax.setRequestHeader = data.headers;

        ajax.send(data.value);
        ajax.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status >= 200 && this.status < 300) {
                    data.success(JSON.parse(this.response), fun);
                } else {
                    data.error(this.status);
                }
            }
        }
    }
    return ajax;
}



const ajax = new Ajax();
//设置请求信息
let data = {
    value: JSON.stringify({
        // 传递参数
        name: "renyf",
        age: 18
    }),
    headers: {
        // 设置请求头
        name: "renyf",
        age: 18
    },
    success: (res, fun) => {
        /* some codes to handle data */
        fun(res);
    },
    error: (reason) => {
        /* some codes to handle error */
        console.log(reason);
    },
}

function fun1(res) {
    console.log(res);
}
ajax.get('https://devapi.qweather.com/v7/weather/7d?&key=75b241a3acb942a7bf10b9b42ef8e046&location=101040100', data, fun1);
ajax.get('https://devapi.qweather.com/v7/air/now?&key=75b241a3acb942a7bf10b9b42ef8e046&location=101040100', data, fun1);
ajax.get('https://devapi.qweather.com/v7/weather/now?&key=75b241a3acb942a7bf10b9b42ef8e046&location=101040100', data, fun1);
ajax.get('https://geoapi.qweather.com/v2/city/lookup?&key=75b241a3acb942a7bf10b9b42ef8e046&location=重庆', data, fun1);



