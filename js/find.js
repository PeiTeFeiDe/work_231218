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
    document.getElementById("box_wx_sj").style.display = "none";
    document.getElementById("box_wx").style.display = "none";
    // 递归 直到获取当前光标所在的父类名为yz_user的id
    yz_id = findParentId(e.target, "yz_find");
    // 当触摸屏幕之后 背景色改变
    if (yz_id != null){
        document.getElementById(yz_id).style.backgroundColor = "#ededed";
    }
    var links = document.getElementsByTagName("a");
    for (var i = 0; i < links.length-4; i++) {
        links[i].setAttribute("href", "#");;
    }
    // 追加右上角加号事件
    if(e.target.id=="gd"){
        document.getElementById("box_wx_sj").style.display = "flex";
        document.getElementById("box_wx").style.display = "flex";
    }
}
main.ontouchmove = function(e){
    if (yz_id != null){
        document.getElementById(yz_id).style.backgroundColor = "#ededed";
    }
}
main.ontouchend = function(e){
    // 松手后后 还原背景色
    if (yz_id != null){
        document.getElementById(yz_id).style.backgroundColor = "#fff";
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