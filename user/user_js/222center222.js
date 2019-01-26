(function f() {



var qz_data=document.querySelector('.qz_data');

























    // 计时器
    function count_down() {
        var count_time=document.querySelector('#count_time');
        var inner=setInterval(function () {
            var now_time=new Date();
            var pub_time=new Date('2019-1-22 14:48:24')
            qz_time=now_time-pub_time;
            count_time.innerText=number_to_time(qz_time);
        },1000)
    };
    count_down();
    // 时间戳转换为时间差距格式
    function number_to_time(num) {
        var num_second=num/1000;
        var days=Math.floor(num_second/(60*60*24));
        var hours=Math.floor((num_second%(60*60*24))/(60*60));
        var mimutes=Math.floor((num_second%(60*60))/60);
        var seconds=Math.floor((num_second%60));

        if(seconds>0){
            if (mimutes>0){
                if (hours>0){
                    if (days>0){
                        var result= days+'天前';
                    }else {
                        var result= hours+'小时前';
                    }
                }else {
                    var result= mimutes+'分钟前';
                }
            }else {
                var result=seconds+'秒';
            }
        }
        return result;
    }




})();