window.onscroll=()=>{ // 当滚动条滚动的时候
    fixed.style.position="fixed";
    badfix.style.display="block"; 
    badfixs.style.display="block"; 
}

// 第二步 添加事件

// 申明全局变量
var x, y, t, yz_id = null, yz_other = 1;

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
        links[i].setAttribute("href", "#");;
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
    // 松手后后 还原背景色
    if (yz_id != null){
        document.getElementById(yz_id).style.backgroundColor = "#fff";
    }
    if (yz_id != "n1" && yz_id != "n2" && yz_id != "n3" && yz_id != "n4" && yz_id != "n5" && yz_id != "n6"){
        if (new Date().getTime()-t<200){
            var links = document.getElementsByTagName("a");
            for (var i = 0; i < links.length-4; i++) {
                links[i].removeAttribute("href");
            }
            var del_yz_id = document.getElementById(yz_id);
            //  删除，要找到父节点进行删除，removeChild移除子元素
            if (yz_id != "p1"){
                del_yz_id.parentNode.removeChild(del_yz_id);
                yz_other += 1;
                if (yz_other == yz_math){
                    document.getElementById("yz_other").style.display = "none";
                    yz_other = 1;
                    yz_math = 1;
                }
            }
        }else if (new Date().getTime()-t>200){
            var links = document.getElementsByTagName("a");
            for (var i = 0; i < links.length-4; i++) {
                links[i].removeAttribute("href");
            }
            document.getElementById("box_small").style.top = y+"px";
            document.getElementById("box_small").style.left = x+"px";
            document.getElementById("box_small").style.display = "flex";
        }
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


var quickBarContainer = document.querySelector('.quick-bar');
var alphabet = '↑☆ABCDEFGHIJKLMNOPQRSTUVWXYZ#';

for (var i = 0; i < alphabet.length; i++) {
    var letter = alphabet[i];
    var element = document.createElement('div');
    element.className = 'quick-bar-item';
    element.innerText = letter;
    element.addEventListener('click', function() {
        var index = listContainer.querySelector('[data-index="' + this.innerText + '"]').offsetTop;
        listContainer.scrollTop = index;
    });
    quickBarContainer.appendChild(element);
}


// 做json的解析
var list=document.querySelector(".list");

// 增加内容
var yz_math=1;
function holdDown() {
    // 显示#号
    document.getElementById("yz_other").style.display = "flex";
    var yz_random = Math.floor((Math.random()*3)+1);
    var json = [{
        // 数据从li来的
        id:"new_"+yz_math,
        img:"../img/"+yz_random+".png",
        author:yz_math,
    }]
    for (var v of json){
        var nli=document.createElement("li");
        nli.innerHTML=  
            '<div class="yz_user" id="'+`${v.id}`+yz_math+'">'+
                '<div class="yz_img">'+
                    '<img src="'+`${v.img}`+'" class="yz_img">'+
                '</div>'+
                '<div class="text"> '+
                    '<span class="author">'+`${v.author}`+'</span>'+
                '</div>'+
            '</div>';
        // 将创建的nli元素加入到网页中
        list.appendChild(nli);
        yz_math += 1;
    }
}