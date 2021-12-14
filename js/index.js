const result = document.querySelector(".content");
const list = document.querySelector(".list");
const container = document.querySelector(".container");
const body = document.querySelector("body");

window.addEventListener("load", function () {
    const xhr = new XMLHttpRequest();

    xhr.open("GET", "https://api.oick.cn/lishi/api.php");

    xhr.send();

    xhr.onreadystatechange = function () {
        if (this.readyState === 4) {
            if (this.status >= 200 && this.status < 300) {
                // console.log(JSON.parse(this.response).result);
                dealData(JSON.parse(this.response).result);
            }
        }
    }
})

// 处理数据
function dealData(res) {
    res.forEach(elm => {
        const li = document.createElement("li");
        const year = document.createElement("div");
        const article = document.createElement("div");
        year.className = "year";
        article.className = "article";
        year.innerHTML = elm.date.slice(0, 5);
        article.innerHTML = elm.title;
        li.appendChild(year);
        li.appendChild(article);
        result.appendChild(li);
    });
}

list.addEventListener("touchstart", function () {


})

let is = true;
list.addEventListener("touchend", function () {
    if (is) {
        this.innerHTML = "X";
        container.style.top = "50px";
        body.style.backgroundColor = "#ccc";
    } else {
        container.style.top = "-115px";
        this.innerHTML = "<img src='imgs/list.png' alt=>";
        body.style.backgroundColor = "#fff";
    }
    is = !is;
})