window.onscroll=()=>{ // 当滚动条滚动的时候
    fixed.style.position="fixed";
    badfix.style.display="block"; 
    badfixs.style.display="block"; 
}

const form = document.querySelector("form");
form.addEventListener("submit", function(event) {
    // 防止表单的默认提交行为
    event.preventDefault();
    // 获取输入框内容
    let text = document.querySelector('#textarea').value;
    if(!text){
        alert('请输入内容');
        return ;
    }
    let item = document.createElement('div');
    item.className = 'user_right';
    item.innerHTML =    '<div class="user_right_text">'
                            +text+
                        '</div>'+
                        '<div class="user_right_sj"></div>'+
                        '<div class="user_right_img">'+
                            '<img src="../img/user/Di.png">'+
                        '</div>'    ;
    document.querySelector('#m-message').appendChild(item);
    document.querySelector('#textarea').value = '';
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) { // 创建ajax对象
            // 获得服务器数据
            var jarr = JSON.parse(this.responseText);
            if (jarr[0][text] != null){
                text = jarr[0][text];
            }
            console.log(text);
            insert(text); // 自定义的函数 
        }
    };
    xhttp.open("GET", "http://rap2api.taobao.org/app/mock/316443/yz231216", true);
    xhttp.send();
    function insert(text) {
        console.log(text);
        let item = document.createElement('div');
        item.className = 'user_left';
        item.innerHTML =    '<div class="user_left_img">'+
                                '<img src="../img/user/bird.png">'+
                            '</div>'+
                            '<div class="user_left_sj"></div>'+
                            '<div class="user_left_text">'
                                +text+
                            '</div>';
        document.querySelector('#m-message').appendChild(item);
    };
});
