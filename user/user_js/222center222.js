(function f() {
    change_size();
    change_nav();
    qz_img();




    // 模态框
    var btn = document.getElementById('showModel');
    var close = document.getElementsByClassName('close')[0];
    var cancel = document.getElementById('cancel');
    var modal = document.getElementById('modal');
    btn.onclick= function(){
        modal.style.display = "block";
    };
    close.onclick= function(){
        modal.style.display = "none";
    };
    cancel.onclick= function(){
        modal.style.display = "none";
    };



    // 浏览器尺寸改变时div尺寸随动
    function change_size(){
        window.onload=function (event){
            var screen_height=document.documentElement.clientHeight;
            // 定义第一页
            var qz_cover=document.querySelector('.qz_cover');
            var qz_per=document.querySelector('.qz_per');
            var qz_cir=document.querySelector('.qz_cir');
            var qz_cul=document.querySelector('.qz_cul');
            var qz_pernic=document.querySelector('.qz_pernic');
            var qz_nick=document.querySelector('.qz_nick');
            var qz_perinf=document.querySelector('.qz_perinf');
            var qz_pla=document.querySelector('.qz_pla');
            var qz_percha=document.querySelector('.qz_percha');
            var qz_ski=document.querySelector('.qz_ski');
            var qz_skinfo=document.querySelector('.qz_skinfo');
            var qz_gui=document.querySelector('.qz_gui');
            var qz_lead=document.querySelector('.qz_lead');
            var lea_img=document.querySelector('.lea_img');
            // 定义第二页
            var qz_sep=document.querySelectorAll('.qz_sep');
            var qz_nimg=document.querySelectorAll('.qz_nimg');
            // 计算第一页
            qz_cover.style.height=screen_height+'px';
            qz_per.style.height=screen_height*0.6+'px';
            qz_cir.style.height=screen_height*0.21+'px';
            qz_cul.style.width=screen_height*0.18+'px';
            qz_pernic.style.height=screen_height*0.17+'px';
            qz_nick.style.height=screen_height*0.17+'px';
            qz_perinf.style.height=screen_height*0.47+'px';
            qz_pla.style.height=screen_height*0.25+'px';
            qz_percha.style.height=screen_height*0.4+'px';
            qz_ski.style.height=screen_height*0.28+'px';
            qz_skinfo.style.height=screen_height*0.17+'px';
            qz_gui.style.height=screen_height*0.35+'px';
            qz_lead.style.height=screen_height*0.21+'px';
            lea_img.style.height=screen_height*0.11+'px';
            // 计算第二页
            for(i=0;i<3;i++){
                qz_sep[i].style.height=screen_height*0.18+'px';
                qz_nimg[i].style.height=screen_height*0.1+'px';
            }
        }
    }

    // 导航栏切换
    function change_nav() {
        var qz_nav=document.querySelector('#qz_nav');
        var dia=document.querySelector('#qz_diary');
        var col=document.querySelector('#qz_collection');
        var adm=document.querySelector('#qz_admission');
        qz_nav.onclick=function (event) {
            var node=event.target;
            if(node.nodeName.toLowerCase()=='span'||'img'){
                if(node.parentNode.parentNode.nextElementSibling){
                    if(node.parentNode.parentNode.nextElementSibling.nextElementSibling){
                        // console.log('1');
                        col.style.display='none';
                        adm.style.display='none';
                        dia.style.display='block';
                    }else {
                        // console.log('2');
                        dia.style.display='none';
                        adm.style.display='none';
                        col.style.display='block';
                    }
                }else {
                    // console.log('3');
                    dia.style.display='none';
                    col.style.display='none';
                    adm.style.display='block';
                }

            }
        };
    }

    // 图片动画
    function qz_img() {
        var qz_data=document.querySelector('.qz_data');
        // 鼠标滑入图片放大
        qz_data.onmouseover=function (event) {
            var node=event.target;
            if(node.nodeName.toLowerCase()== 'img'){
                node.nextElementSibling.style.display='block';
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
        }
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
        }

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