(function () {

    // 传入数据—左边个人信息框
    perinf_ajax();
    function perinf_ajax() {
        if (localStorage.getItem('user_id')) {
            var user_id = {'user_id': localStorage.getItem('user_id'),'methods':'get'};
        } else {
            location.href = '../user/login.html'
        }
        console.log(user_id);
        postData(ajax_url + '/user/person', user_id, function (res) {
            console.log(res);
            let qz_por = document.querySelectorAll('.qz_por');
            let font_nic = document.querySelector('.font_nic');
            let font_gra1 = document.querySelector('.font_gra1');
            let font_gra2 = document.querySelector('.font_gra2');
            let font_gra3 = document.querySelector('.font_gra3');
            for (i = 0; i < 2; i++) {
                qz_por[i].src = '../'+res.user_icon;
            }
            font_nic.innerHTML = res.user_nickname;
            font_gra1.innerHTML = res.user_autograpgh;
            font_gra2.innerHTML = '关注数：' + res.user_watchs;
            font_gra3.innerHTML = '粉丝数：' + res.user_fans;
        })
    }

    // 模态框
    modal_frame();
    function modal_frame() {
        let add=document.querySelector('.qz_add');
        let close = document.querySelectorAll('.qz_close');
        let cancel = document.querySelectorAll('.qz_cancel');
        let modal = document.querySelectorAll('.qz_modal');
        add.onclick=function(){
            modal[0].style.display='block';
        };
        close.onclick= function(){
            modal[i].style.display = 'none';
        };
        cancel.onclick= function(){
            console.log(i);
            modal[i].style.display = 'none';
        };
    }

    // 导航栏切换
    change_nav();
    function change_nav() {
        let qz_nav=document.querySelector('#qz_nav');
        let dia=document.querySelector('#qz_diary');
        let col=document.querySelector('#qz_collection');
        let adm=document.querySelector('#qz_admission');
        qz_nav.onclick=function (event) {
            let node=event && event.target;
            if(node.nodeName.toLowerCase()=='span'||'img'){
                if(node.parentNode.parentNode.nextElementSibling){
                    if(node.parentNode.parentNode.nextElementSibling.nextElementSibling){
                        col.style.display='none';
                        adm.style.display='none';
                        dia.style.display='block';
                    }else {
                        dia.style.display='none';
                        adm.style.display='none';
                        col.style.display='block';
                    }
                }else {
                    dia.style.display='none';
                    col.style.display='none';
                    adm.style.display='block';
                }
            }
        };
    }

    // 图片动画
    qz_img();
    function qz_img(event) {
        let node=event && event.target;
        let qz_data=document.querySelector('.qz_data');
        // 鼠标滑入图片放大
        qz_data.onmouseover=function (event) {
            let node=event.target;
            if(node.nodeName.toLowerCase()== 'img'){
                node.nextElementSibling.style.display='block';
                node.classList.toggle('qz_cimg');
                node.classList.toggle('cimg_active');
            }
        };
        // 鼠标滑出图片缩小
        qz_data.onmouseout=function (event) {
            let node=event.target;
            if(node.nodeName.toLowerCase()== 'img'){
                node.classList.toggle('qz_cimg');
                node.classList.toggle('cimg_active');
            }
        };

        // 浏览器尺寸改变时蒙板尺寸随动
        window.onresize=function (){
            let qz_cimg=document.querySelector('.qz_cimg');
            let qz_cen=document.querySelectorAll('.qz_cen');
            let qz_coimg=document.querySelectorAll('.qz_coimg');
            let hei_cimg=qz_cimg.height;
            for(let cen of qz_cen){
                cen.style.height=hei_cimg+'px';
            }
            for(let coimg of qz_coimg){
                coimg.style.height=hei_cimg+'px';
                coimg.style.top='-'+(hei_cimg)+'px';
            }
        };

        let qz_coimg=document.querySelectorAll('.qz_coimg');
        for(let coimg of qz_coimg){
            // 鼠标滑入蒙板
            coimg.onmouseover=function(event){
                let node=event&&event.target;
                node.previousElementSibling.classList.toggle('qz_cimg');
                node.previousElementSibling.classList.toggle('cimg_active');
            };
            // 鼠标滑出蒙板
            coimg.onmouseout=function (event) {
                let node=event&&event.target;
                coimg.style.display='none';
                node.previousElementSibling.classList.toggle('qz_cimg');
                node.previousElementSibling.classList.toggle('cimg_active');
            }
        }
    }

    window.onload=function (){
        // * 1.浏览器加载时div尺寸随动——开始
        let screen_height=document.documentElement.clientHeight;
        //定义模态框
        let dyna_con=document.querySelector('.dyna_con');
        // 定义第一页
        let qz_per=document.querySelector('.qz_per');
        let qz_pernic=document.querySelector('.qz_pernic');
        let qz_nick=document.querySelector('.qz_nick');
        // 定义第二页
        let qz_sep=document.querySelectorAll('.qz_sep');
        let qz_nimg=document.querySelectorAll('.qz_nimg');
        //计算模态框
        dyna_con.style.height=(screen_height-50)+'px';
        // 计算第一页
        // 左边个人信息框
        qz_per.style.marginTop=(screen_height-120)*0.21+'px';
        // 主人的小屋
        qz_pernic.style.height=(screen_height-120)*0.1+'px';
        qz_nick.style.height=(screen_height-120)*0.1+'px';
        // 计算第二页
        for(i=0;i<3;i++){
            qz_sep[i].style.height=(screen_height-50)*0.18+'px';
            qz_nimg[i].style.height=(screen_height-50)*0.1+'px';
        }
        // * 1.浏览器加载时div尺寸随动——结束



        // * * * 2.图片动画——浏览器加载时蒙板尺寸随动——开始
        let qz_cimg=document.querySelector('.qz_cimg');
        let qz_cen=document.querySelectorAll('.qz_cen');
        let qz_coimg=document.querySelectorAll('.qz_coimg');
        let font_coimg=document.querySelectorAll('.font_coimg');
        let hei_cimg=qz_cimg.height;
        for(let cen of qz_cen){
            cen.style.height=hei_cimg+'px';
        }
        for(let coimg of qz_coimg){
            coimg.style.height=hei_cimg+'px';
            coimg.style.top='-'+(hei_cimg)+'px';
        }
        for (let foncoi of font_coimg) {
            foncoi.style.height=hei_cimg+'px';
        }
        // * * * 2.图片动画——浏览器加载时蒙板尺寸随动——结束
    };








    // let anc_eve=document.querySelector('.anchor_event');
    //获取滚动条到顶部的高度
    // window.onscroll=function(){
    //     let scroll_distance = document.documentElement.scrollTop||document.body.scrollTop;
    //     console.log(scroll_distance);
    // }


    //滚动条匀速滑动
    anchor_slip();
    function anchor_slip() {
        let anc_lin=document.querySelector('.anchor_link');
        anc_lin.onclick = function () {
            startMover(666);
        }
        var timer = null;
        function startMover(itarget) {//目标值
            clearInterval(timer);//执行当前动画同时清除之前的动画
            timer = setInterval(function () {
                let scroll_distance = document.documentElement.scrollTop||document.body.scrollTop;
                console.log(scroll_distance);
                console.log(itarget);
                var speed = 0;
                if (scroll_distance > itarget) {
                    speed = -5;
                }
                else {
                    speed = 5;
                }
                if (scroll_distance == itarget) {
                    clearInterval(timer);
                }
                else {
                    var a= parseInt(scroll_distance + speed);
                    if ((itarget-scroll_distance)<5) {
                        a= parseInt(itarget);
                    }
                    window.scrollTo(0,a);
                }
            }, 1);
        }
    }
    // 返回顶部













})();