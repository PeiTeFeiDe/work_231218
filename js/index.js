window.onscroll=()=>{ // 当滚动条滚动的时候
    fixed.style.position="fixed";
    badfix.style.display="block"; 
    badfixs.style.display="block"; 
}

// 第二步 添加事件

// 申明全局变量
var x, y, t, yz_id = null;

main.ontouchstart = function(e){
    // 使出现的窗口消失
    document.getElementById("box_small").style.display = "none";
    document.getElementById("box_wx_sj").style.display = "none";
    document.getElementById("box_wx").style.display = "none";
    // 递归 直到获取当前光标所在的父类名为yz_user的id
    yz_id = findParentId(e.target, "yz_user");
    // 当触摸屏幕之后 背景色改变
    if (yz_id != null){
        document.getElementById(yz_id).style.backgroundColor = "#ededed";
    }
    // 记录手指坐标
    var touch = e.targetTouches[0];
    x = touch.pageX;
    y = touch.pageY;
    // 记录开始触摸时间
    t = new Date().getTime();
    var links = document.getElementsByTagName("a");
    for (var i = 0; i < links.length-4; i++) {
        links[i].setAttribute("href", "user.html");;
    }
    // 追加右上角加号事件
    if(e.target.id=="gd"){
        document.getElementById("box_wx_sj").style.display = "flex";
        document.getElementById("box_wx").style.display = "flex";
    }
}
main.ontouchmove = function(e){
    // 记录手指滑动后的坐标
    var touch = e.targetTouches[0];
    x = touch.pageX;
    y = touch.pageY;
    if (yz_id != null){
        document.getElementById(yz_id).style.backgroundColor = "#ededed";
    }
}
main.ontouchend = function(e){
    // 松手后 还原背景色
    if (yz_id != null){
        document.getElementById(yz_id).style.backgroundColor = "#fff";
    }
    if (new Date().getTime()-t>200){
        var links = document.getElementsByTagName("a");
            for (var i = 0; i < links.length-4; i++) {
                links[i].removeAttribute("href");
            }
    }if (new Date().getTime()-t>800){
        // 通过松手时手指坐标使小窗口显示在此位置
        document.getElementById("box_small").style.top = y+"px";
        document.getElementById("box_small").style.left = x+"px";
        document.getElementById("box_small").style.display = "flex";
    }
}


// 递归函数
function findParentId(element, className) {
    if (element.className == className) {
      return element.id;
    } else if (element.parentElement) {
      return findParentId(element.parentElement, className);
    } else {
      return null;
    }
}