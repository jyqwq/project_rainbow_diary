//动图
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
//倒计时
function keishi() {
    var mydiv=document.querySelector('#content');
    var end_time=new Date('2019-2-14');

    var inter=setInterval(function () {
        var now_time=new Date();
        var time=end_time-now_time;
        var v=number_to_time(time);
        mydiv.innerHTML=v;
    },1000);
};
keishi();

//时间转换
function number_to_time(num) {
    var num_second=num/1000;
    var days=Math.floor(num_second/(60*60*24));
    days=days>9?days:'0'+days;
    var hours=Math.floor((num_second%(60*60*24))/(60*60));
    hours=hours>9?hours:'0'+hours;
    var minutes=Math.floor((num_second%(60*60))/60);
    minutes=minutes>9?minutes:'0'+minutes;
    var seconds=Math.floor(num_second%60);
    seconds=seconds>9?seconds:'0'+seconds;
    var result=days+" 天"+hours+' 时'+minutes+" 分"+seconds+" 秒";
    return result;
}

//点击图片
function q() {
    var img_lists=document.querySelector('.r-2-4');
    var big_img=document.querySelector('.r-2-img');
    img_lists.onclick=function (e) {

        if (e.target.nodeName=="IMG") {
            big_img.src=e.target.src
            var a=e.target.parentElement.parentElement.children
            for (var b of a){
                b.style.outline="";
            }
            e.target.parentElement.style.outline="3px solid rgba(128, 128, 128, 0.31)"
        }
        if (e.target.className=='div-img') {
            big_img.src=e.target.children[0].src
            var a=e.target.parentElement.children
            for (var b of a){
                b.style.outline="";
            }
            e.target.style.outline="3px solid rgba(128, 128, 128, 0.31)"
        }
    }
}
q();

//改变数量
function changevalue(){
    var a=document.querySelector('.r-2-11');
    a.onclick=function (event) {
        var node=event.target;
        if (node.getAttribute('type')=='button') {
            changeNumber(event);
        }
    }
    function changeNumber(event) {
        var node = event && event.target;
        var v = 0;
        if (node.value && node.value == '+') {
            // node.previousElementSibling.value=parseInt(node.previousElementSibling.value)+1;
            node.previousElementSibling.value++;
            v = node.previousElementSibling.value;
            node.previousElementSibling.previousElementSibling.disabled = false;

        } else {
            // if(node.value && node.value=='+')
            if (node.nextElementSibling.value > 1) {
                node.nextElementSibling.value--;
                v = node.nextElementSibling.value;
                if (v == 1) {
                    node.disabled = true;
                }
            }
        }
    }

}
changevalue();
