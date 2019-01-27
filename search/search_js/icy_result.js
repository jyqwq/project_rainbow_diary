//分页
function fenye() {
    var ul = document.getElementById('ul-fenye');
    var li = ul.getElementsByTagName('li');
    li[2].className = 'background';
    var num01 = 1;
    var num02 = 100/*总数*/;
//1 //首页的点击事件
    li[li.length-li.length].onclick = function(){
        Background(2);
        num01 = 1;
        content(num01);
    }
//2 //尾页的点击事件
    li[li.length-1].onclick = function(){
        Background(li.length-3);
        num01 = num02-(li.length-5);
        content(num01)
    }
//3 //上一页的点击事件
    li[li.length-(li.length-1)].onclick = function(){

        for(var j = 0;j<li.length-4;j++){
            if(li[j+2].className == 'background' && li[j+2].innerHTML != 1){
                if(j+2 != li.length-(li.length-2)){
                    Background(j+1);
                }
                break;
            }
        }
        if(j+2 == li.length-(li.length-2)){
            num01 -- ;
            content(num01);
        }
    }
//4 下一页的点击事件
    li[li.length-2].onclick = function(){
        for(var j = 0;j<li.length;j++){
            if(li[j].className == 'background' && li[j].innerHTML < num02){  //* && 写最后一页的总数*/
                if(j+1 < li.length-2){
                    Background(j+1);
                }
                break;
            }
        }
        if(j+1 == li.length-2){
            num01++;
            content(num01);
        }
    }
//     分页的点击事件
    for(var i = 0;i<li.length-4;i++){
        li[i+2].index = i+2;
        li[i+2].onclick = function(){
            Background(this.index);
        }
    }
//把所有的分页背景去掉，给指定的分页添加背景颜色
    function Background(num){
        for(var i = 0;i<li.length;i++){
            li[i].className = li[i].className.replace('background','');
            li[num].className = 'background';
        }
    }
// 给li 写内容
    content(num01);
    function content(number){
        for(var i=0;i<li.length-4;i++){
            li[i+2].innerHTML = number;
            number++;
        }
    }
}
fenye()
//轮播图片
function f() {
    var myimgs=['2019.png','newyear.png'];
    var lunbo=document.querySelector('.top-right');
    var inter
    var index=0
    lunbo.innerHTML='<img src="../img/img/2019.png" class="top-right-img">';
    function createInteral() {
        inter = setInterval(function () {
            index++;
            index = index % 2;
            lunbo.innerHTML=`<img src="../img/img/${myimgs[index]}" class="top-right-img">`;
        }, 2000);
    }

    createInteral();
}
f()
//搜索历史
function s() {
    var search=document.querySelector('.search');
    var arry=new Array()
    search.onclick=function (e) {
        var txt=e.target.parentElement.previousElementSibling.previousElementSibling;
        if (localStorage.his && localStorage.his.length>=0) {
            window.localStorage.setItem('his',txt.value)
            arry.push(localStorage.getItem('his'))
            if (localStorage.history && localStorage.history.length>=0) {
                arry.push(localStorage.getItem('history'))
                window.localStorage.setItem('history',arry)
                arry=[]
            }else {
                window.localStorage.setItem('history',arry)
                arry=[]
            }
        }else{
            window.localStorage.setItem('his',txt.value)
            arry.push(localStorage.getItem('his'))
            window.localStorage.setItem('history',arry)

        }
    }
}
s();
// 搜索下拉框
function t() {
    var op=document.querySelector('#list_web')
    var history=window.localStorage.getItem('history')
    if (history && history.length>=0) {
        var list =history.split(',')
        for (var i=0;i<list.length;i++) {
            op.innerHTML+=`<option value="${list[i]}"></option>`
        }
    }
}
t()
//

