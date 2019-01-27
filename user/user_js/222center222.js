(function f() {
    qz_img();

    function qz_img() {
        var qz_data=document.querySelector('.qz_data');
        // 鼠标滑入图片放大
        qz_data.onmouseover=function (event) {
            var node=event.target;
            if(node.nodeName.toLowerCase()== 'img'){
                qz_coimg.style.display='block';
                node.classList.toggle('qz_cimg');
                node.classList.toggle('cimg_active');
            }
        };
        // 鼠标滑出图片缩小
        qz_data.onmouseout=function (event) {
            var node=event.target;
            if(node.nodeName.toLowerCase()== 'img'){
                node.classList.toggle('qz_cimg');
                node.classList.toggle('cimg_active');
            }
        }

        // 浏览器尺寸改变时蒙板尺寸随动
        window.onresize=function (event){
            var node=event.target;
            var qz_cimg=document.querySelector('.qz_cimg');
            var qz_cen=document.querySelector('.qz_cen');
            var qz_coimg=document.querySelector('.qz_coimg');
            var hei_cimg=qz_cimg.height;
            qz_cen.style.height=hei_cimg+'px';
            qz_coimg.style.height=hei_cimg+'px';
            qz_coimg.style.top='-'+(hei_cimg)+'px';
        };
        // 浏览器加载时蒙板尺寸随动
        window.onload=function (event){
            var node=event.target;
            var qz_cimg=document.querySelector('.qz_cimg');
            var qz_cen=document.querySelector('.qz_cen');
            var qz_coimg=document.querySelector('.qz_coimg');
            var hei_cimg=qz_cimg.height;
            qz_cen.style.height=hei_cimg+'px';
            qz_coimg.style.height=hei_cimg+'px';
            qz_coimg.style.top='-'+(hei_cimg)+'px';
        };

        var qz_coimg=document.querySelector('.qz_coimg');
        // 鼠标滑入蒙板
        qz_coimg.onmouseover=function(event){
            var node=event&&event.target;
            node.previousElementSibling.classList.toggle('qz_cimg');
            node.previousElementSibling.classList.toggle('cimg_active');

        }
        // 鼠标滑出蒙板
        qz_coimg.onmouseout=function (event) {
            var node=event&&event.target;
            qz_coimg.style.display='none';
            node.previousElementSibling.classList.toggle('qz_cimg');
            node.previousElementSibling.classList.toggle('cimg_active');
        }
    }

































    // 计时器
    // function count_down() {
    //     var count_time=document.querySelector('#count_time');
    //     var inner=setInterval(function () {
    //         var now_time=new Date();
    //         var pub_time=new Date('2019-1-22 14:48:24')
    //         qz_time=now_time-pub_time;
    //         count_time.innerText=number_to_time(qz_time);
    //     },1000)
    // };
    // count_down();
    // 时间戳转换为时间差距格式
    // function number_to_time(num) {
    //     var num_second=num/1000;
    //     var days=Math.floor(num_second/(60*60*24));
    //     var hours=Math.floor((num_second%(60*60*24))/(60*60));
    //     var mimutes=Math.floor((num_second%(60*60))/60);
    //     var seconds=Math.floor((num_second%60));
    //
    //     if(seconds>0){
    //         if (mimutes>0){
    //             if (hours>0){
    //                 if (days>0){
    //                     var result= days+'天前';
    //                 }else {
    //                     var result= hours+'小时前';
    //                 }
    //             }else {
    //                 var result= mimutes+'分钟前';
    //             }
    //         }else {
    //             var result=seconds+'秒';
    //         }
    //     }
    //     return result;
    // }




})();