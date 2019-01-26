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
            lunbo.innerHTML='<img src="../img/img/'+myimgs[index]+'" class="top-right-img">';
        }, 2000);
    }

    createInteral();
}
f()

function keishi() {
    var mydiv=document.querySelector('#content');
    var end_time=new Date('2019-2-1');

    var inter=setInterval(function () {
        var now_time=new Date();
        var time=end_time-now_time;
        var v=number_to_time(time);
        mydiv.innerHTML=v;
    },1000);
};
keishi();


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