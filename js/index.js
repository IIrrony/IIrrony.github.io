const pic = Getelm(".wea_pic");
const city = Getelm(".city");
const btn = Getelm(".search_btn");
const back = Getelm(".return");
const search_page = Getelm(".search_page");
const input = Getelm(".input");
const now_wea = Getelm(".now_wea");
const info_wea = Getelm(".info_wea");
const info_wind = Getelm(".info_wind");
const air_now = Getelm(".air_now");
const warn_2 = Getelm(".warn_2");
const air_bgc = Getelm(".air_bgc");
const today = Getelm(".today");
const today_du = Getelm(".today_du");
const tom_du = Getelm(".tom_du");
const tom = Getelm(".tom");
const day_wea = Getelm(".day_wea");
const left_img = Getelm(".left_img");
const right_img = Getelm(".right_img");
const riluo = Getelm(".riluo");
const hot_city = Getelm(".hot_city");
const success_search = Getelm(".success_search");
const his = Getelm(".his");
const lis = hot_city.querySelectorAll("li");
const dle = Getelm(".his_dle");
let flag = false;


function Dealhotcity(lis) {
    lis.forEach(elm => {
        addEventListener(elm, "click", function () {
            city.innerHTML = elm.innerHTML;
            search_page.style.display = "none";
            ajax.get('https://geoapi.qweather.com/v2/city/lookup?&key=75b241a3acb942a7bf10b9b42ef8e046&location=' + elm.innerHTML, data, CityWea);
        })
    });
}



function CityWea(res) {
    if (res.code === "200") {
        city.innerHTML = res.location[0].name + "市";
        const location = res.location[0].id;
        ajax.get('https://devapi.qweather.com/v7/weather/7d?&key=75b241a3acb942a7bf10b9b42ef8e046&location=' + location, data, DealDays);
        ajax.get('https://devapi.qweather.com/v7/air/now?&key=75b241a3acb942a7bf10b9b42ef8e046&location=' + location, data, DealNowAir);
        ajax.get('https://devapi.qweather.com/v7/weather/now?&key=75b241a3acb942a7bf10b9b42ef8e046&location=' + location, data, DealNowWea);
        flag = true;
    } else {
        alert("请输入正确的地名哦！！😎");
        input.value = "";
        flag = false;
    }
}


Dealhotcity(lis);
addEventListener(btn, 'click', DisplayPage);
addEventListener(back, 'click', DisplayPage);

function Getelm(elm) {
    return document.querySelector(elm);
}


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
function Paint(obj, dataday, datanight) {
    const myChart = echarts.init(obj);

    const option = {
        xAxis: {
            data: [],
            show: false,
        },
        yAxis: {
            show: false,
            min: 'dateMin',
            max: 'dateMax',
        },
        grid: {
            left: '0%',
            right: '0%',
            top: '10%',
            bottom: '20%'
        },
        series: [{
                data: dataday,
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
                smooth: true,
                lineStyle: {
                    color: 'white'
                }
            },
            {
                data: datanight,
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
                smooth: true,
                lineStyle: {
                    color: 'white'
                }
            }
        ]

    };

    myChart.setOption(option);
}

// Ajax对象 传入最基本的配置，会合并之后调用方法时传入的配置
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
                    data.success(JSON.parse(this.response), fun);
                } else {
                    data.error(JSON.parse(this.response));
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

// 打印函数
function fun1(res) {
    console.log(res);
}

// 实时天气处理
function DealNowWea(res) {
    const data = res.now;
    now_wea.innerHTML = data.temp;
    info_wea.innerHTML = data.text;
    info_wind.innerHTML = data.windDir + data.windScale + "级 湿度" + data.humidity + "%";
}

// 实时空气质量处理
function DealNowAir(res) {
    const data = res.now;
    air_now.innerHTML = data.aqi + "  " + data.category;
    warn_2.innerHTML = data.category;
    if (data.category === "良") {
        warn_2.style.backgroundColor = "rgb(215, 175, 14)";
        air_bgc.style.backgroundColor = "rgb(215, 175, 14)";
    } else if (data.category === "优") {
        warn_2.style.backgroundColor = "rgb(143,195,31)";
        air_bgc.style.backgroundColor = "rgb(143,195,31)";
    } else if (data.category === "轻度") {
        warn_2.style.backgroundColor = "rgb(243,152,0)";
        air_bgc.style.backgroundColor = "rgb(243,152,0)";
    } else {
        warn_2.style.backgroundColor = "rgb(200,0,82)";
        air_bgc.style.backgroundColor = "rgb(200,0,82)";
    }
}

// 六天天气预报信息处理
function DealDays(res) {
    day_wea.innerHTML = " ";
    const data = res.daily;
    let now = new Date();
    let dataday = new Array();
    let datanight = new Array();
    riluo.innerHTML = "日落 " + data[0].sunset;
    today.innerHTML = data[0].textDay;
    today_du.innerHTML = data[0].tempMin + " / " + data[0].tempMax + "°";
    tom.innerHTML = data[1].textDay;
    tom_du.innerHTML = data[1].tempMin + " / " + data[1].tempMax + "°";
    left_img.setAttribute("src", "icons/" + data[0].iconDay + ".svg")
    right_img.setAttribute("src", "icons/" + data[1].iconDay + ".svg")
    for (let i = 0; i < data.length - 1; i++) {
        dataday.push(data[i].tempMax);
        datanight.push(data[i].tempMin);
        Paint(pic, dataday, datanight);

        let li = create("li");
        let em = create("em");
        let dl1 = create("dl");
        let dl2 = create("dl");
        let dl3 = create("dl");
        let dd1 = create("dd");
        let dd2 = create("dd");
        let dd3 = create("dd");
        let dd4 = create("dd");
        let dt1 = create("dt");
        let dt2 = create("dt");
        let img1 = create("img");
        let img2 = create("img");
        let strong1 = create("strong");
        let strong2 = create("strong");
        let div = create("div");
        let p = create("p");
        // 设置周几
        em.innerHTML = "周" + "一二三四五六日" [(now.getDay() + i - 1) % 7];
        dl1.className = "wea";
        dl2.className = "wea";
        dl3.className = "wind";
        p.className = "warn_2";
        p.innerHTML = "良";
        strong1.innerHTML = data[i].textDay;
        dd1.appendChild(strong1);
        img1.setAttribute("src", "icons/" + data[i].iconDay + ".svg");
        dt1.appendChild(img1);
        dl1.appendChild(dd1);
        dl1.appendChild(dt1);

        strong2.innerHTML = data[i].textNight;
        dd2.appendChild(strong2);
        img2.setAttribute("src", "icons/" + data[i].iconNight + ".svg");
        dt2.appendChild(img2);
        dl2.appendChild(dt2);
        dl2.appendChild(dd2);

        dd3.innerHTML = data[i].windDirDay;
        dd4.innerHTML = data[i].windScaleDay + "级";
        dl3.appendChild(dd3);
        dl3.appendChild(dd4);

        li.appendChild(em);
        li.appendChild(dl1);
        li.appendChild(div);
        li.appendChild(dl2);
        li.appendChild(p);
        li.appendChild(dl3);
        day_wea.appendChild(li);
    }

}

// 创造节点函数
function create(atr) {
    return document.createElement(atr);
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

ajax.get('https://geoapi.qweather.com/v2/city/lookup?&key=75b241a3acb942a7bf10b9b42ef8e046&location=重庆', data, fun1);

ajax.get('https://devapi.qweather.com/v7/weather/7d?&key=75b241a3acb942a7bf10b9b42ef8e046&location=101040100', data, DealDays);
ajax.get('https://devapi.qweather.com/v7/air/now?&key=75b241a3acb942a7bf10b9b42ef8e046&location=101040100', data, DealNowAir);
ajax.get('https://devapi.qweather.com/v7/weather/now?&key=75b241a3acb942a7bf10b9b42ef8e046&location=101040100', data, DealNowWea);



addEventListener(success_search, "click", function () {
    if (input.value.trim() === '') {
        alert("请输入内容哦!!!!!😛");
    } else {
        const search_city = input.value;
        ajax.get('https://geoapi.qweather.com/v2/city/lookup?&key=75b241a3acb942a7bf10b9b42ef8e046&location=' + search_city, data, CityWea);
        if (flag) {
            let li = create("li");
            li.innerHTML = search_city + "市";
            addEventListener(li, "click", function () {
                city.innerHTML = li.innerHTML;
                search_page.style.display = "none";
                ajax.get('https://geoapi.qweather.com/v2/city/lookup?&key=75b241a3acb942a7bf10b9b42ef8e046&location=' + li.innerHTML, data, CityWea);
            });
            his.appendChild(li);
            search_page.style.display = "none";
        }
    }
    input.value = "";
})


$(".input").keypress(function (e) {
    if (e.keyCode === 13) {
        $(".success_search").click();
    }
});

// 历史记录删除
addEventListener(dle, "click", function () {
    his.innerHTML = "";
})