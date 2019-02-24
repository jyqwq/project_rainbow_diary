(function () {


    //登录
    check_login();
    function check_login() {
        let token = localStorage.getItem('token');
        if (token){
            let Token = {'token':token};
            postData(ajax_url+'/user/login',Token,function (res) {
                if (res.status_code !== '10003') {
                    location.href='/rainbow_diary_html/user/login.html'
                }
            })
        }
    }



    window.onload=function (){
        // * 1.浏览器加载时div尺寸随动——开始
        let screen_height=document.documentElement.clientHeight;
        // 定义第二页
        let qz_sep=document.querySelectorAll('.qz_sep');
        let qz_nimg=document.querySelectorAll('.qz_nimg');
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
        let hei_cimg=qz_cimg.height;
        for(let cen of qz_cen){
            cen.style.height=hei_cimg+'px';
        }
        for(let coimg of qz_coimg){
            coimg.style.height=hei_cimg+'px';
            coimg.style.top='-'+(hei_cimg)+'px';
        }
        // * * * 2.图片动画——浏览器加载时蒙板尺寸随动——结束
    };

    window.onresize=function (){
        // 图片动画——浏览器尺寸改变时蒙板尺寸随动——开始
        let qz_cimg=document.querySelector('.qz_cimg');
        let qz_cen=document.querySelectorAll('.qz_cen');
        let qz_coimg=document.querySelectorAll('.qz_coimg');
        let hei_cimg=qz_cimg.height;
        for (i=0;i<18;i++){
            qz_cen[i].style.height=hei_cimg+'px';
            qz_coimg[i].style.height=hei_cimg+'px';
            qz_coimg[i].style.top='-'+(hei_cimg)+'px';
        }
        // 图片动画——浏览器尺寸改变时蒙板尺寸随动——结束
    };

    // 传入数据—左边个人信息框
    perinf_ajax();
    function perinf_ajax() {
        if (localStorage.getItem('user_id')) {
            var user_id = {'user_id': localStorage.getItem('user_id'),'methods':'get'};
        } else {
            location.href = '../user/login.html'
        }
        postData(ajax_url + '/user/person', user_id, function (res) {
            let qz_por = document.querySelectorAll('.qz_por');
            let font_nic = document.querySelector('.font_nic');
            let font_gra1 = document.querySelector('.font_gra1');
            let nav_infor1 = document.querySelector('.nav_infor1');
            let nav_infor2 = document.querySelector('.nav_infor2');
            for (i = 0; i < 2; i++) {
                qz_por[i].src = '../'+res.user_icon;
            }
            font_nic.innerHTML = res.user_nickname;
            font_gra1.innerHTML = res.user_autograpgh;
            nav_infor1.innerHTML = '&nbsp;&nbsp;' + res.user_fans;
            nav_infor2.innerHTML = '&nbsp;&nbsp;' + res.user_watchs;
        })
    }

    // 传入数据—主页日记本
    dynamic_ajax();
    function dynamic_ajax(){
        let user_id=localStorage.getItem('user_id');
        let user={'user_id':user_id,'methods':'mydy'};
        let qz_cimg=document.querySelectorAll('.qz_cimg');
        let qz_coimg=document.querySelectorAll('.qz_coimg');
        postData(ajax_url+'/user/person',user,function (res) {
            let myDate = new Date();
            let max=res.length;
            if (max>6){
                max=6;
            }
            for (i=0;i<max;i++){
                let num=parseInt(myDate.getTime())-parseInt(res[i].data);
                let time=number_to_time(num);
                qz_coimg[i].innerHTML=`<span class="font_main"><br>${res[i].words}</span>
                                <span class="font_fabu"><br><br>发布时间：${time}</span>
                                <span class="font_fabu"><br>点击量:${res[i].click}</span>
                                <div class="dy_type" style="display: none">${res[i].t_name}</div>
                                <div class="dy_id" style="display: none">${res[i].id}</div>`
                if (res[i].dynamic_images!=''){
                    qz_cimg[i].src='../'+res[i].dynamic_images;
                }else {
                    qz_cimg[i].src='../img/222center222/S90120-18242387.jpg';
                }
            }

            // 传入数据—主页收藏夹
            collect_ajax();

            //跳转单个页面
            let to_one=document.querySelectorAll('.to_one');
            for (let p=0;p<to_one.length;p++){
                to_one[p].onclick=function () {
                    let dy_message=this.children;
                    sessionStorage.setItem('dy_type',dy_message[3].innerText);
                    sessionStorage.setItem('dy_id',dy_message[4].innerText);
                    sessionStorage.setItem('from','/rainbow_diary_html/user/222center222.html');
                    location.href='/rainbow_diary_html/user/dynamic_one.html'
                };
            }
        })
    }

    // 传入数据—主页收藏夹
    function collect_ajax(){
        let user_id=localStorage.getItem('user_id');
        let user={'user_id':user_id,'methods':'mycol'};
        let qz_cimg=document.querySelectorAll('.qz_cimg');
        let qz_coimg=document.querySelectorAll('.qz_coimg');
        postData(ajax_url+'/user/person',user,function (res) {
            let myDate = new Date();
            let max=res.length;
            if (max>6){
                max=6;
            }
            for (i=0;i<max;i++){
                let num=parseInt(myDate.getTime())-parseInt(res[i].data);
                let time=number_to_time(num);
                qz_coimg[i+6].innerHTML=`<span class="font_main"><br>${res[i].words}</span>
                                <span class="font_fabu"><br><br>发布时间：${time}</span>
                                <span class="font_fabu"><br>点击量:${res[i].click}</span>
                                <div class="dy_type" style="display: none">${res[i].t_name}</div>
                                <div class="dy_id" style="display: none">${res[i].id}</div>`
                if (res[i].dynamic_images!=''){
                    qz_cimg[i+6].src='../'+res[i].dynamic_images;
                }else {
                    qz_cimg[i+6].src='../img/222center222/S90120-18241142.jpg';
                }
            }
        })
    }

    //传入数据—主页收纳盒
    var res=[
        {
            "img":"https://img1.bevol.cn/Goods/source/55ee791e8291b.jpg@90p",
            "title":"兰蔻新精华肌底液",
            "data":"52天"
        },
        {
            "img":"https://img0.bevol.cn/Goods/source/570718c5a24f2.jpg@90p",
            "title":"兰蔻新精华肌底液",
            "data":"152天"
        },
        {
            "img":"https://img0.bevol.cn/Goods/source/55dae7cf7cf08.jpg@50p",
            "title":"兰蔻新精华肌底液",
            "data":"226天"
        },
        {
            "img":"https://img1.bevol.cn/Goods/source/55ee791e8291b.jpg@90p",
            "title":"兰蔻新精华肌底液",
            "data":"22天"
        },
        {
            "img":"https://img0.bevol.cn/Goods/source/570718c5a24f2.jpg@90p",
            "title":"兰蔻新精华肌底液",
            "data":"52天"
        },
        {
            "img":"https://img0.bevol.cn/Goods/source/55dae7cf7cf08.jpg@50p",
            "title":"兰蔻新精华肌底液",
            "data":"165天"
        },
        {
            "img":"https://img1.bevol.cn/Goods/source/55ee791e8291b.jpg@90p",
            "title":"兰蔻新精华肌底液",
            "data":"52天"
        },
        {
            "img":"https://img0.bevol.cn/Goods/source/570718c5a24f2.jpg@90p",
            "title":"兰蔻新精华肌底液",
            "data":"36天"
        },
        {
            "img":"https://img0.bevol.cn/Goods/source/55dae7cf7cf08.jpg@50p",
            "title":"兰蔻新精华肌底液",
            "data":"100天"
        }
    ]//测试
    storage_ajax();
    function storage_ajax(){
        let qz_cimg=document.querySelectorAll('.qz_cimg');
        let qz_coimg=document.querySelectorAll('.qz_coimg');
        let max=res.length;
        if (max>6){
            max=6;
        }
        for (i=0;i<max;i++){
            qz_coimg[i+12].innerHTML=`<span class="font_main"><br><br>${res[i].title}</span>
                                <span class="font_fabu"><br>剩余${res[i].data}</span>`
            if (res[i].img!=''){
                qz_cimg[i+12].src=res[i].img;
            }else {
                qz_cimg[i+12].src='../img/222center222/S90131-16385218.jpg';
            }
        }
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

        let qz_coimg=document.querySelectorAll('.qz_coimg');
        for(let coimg of qz_coimg){
            // 鼠标滑入蒙板
            coimg.onmouseover=function(event){
                let node=event&&event.target;
                if (node.nodeName!=='SPAN'){
                    node.previousElementSibling.classList.toggle('qz_cimg');
                    node.previousElementSibling.classList.toggle('cimg_active');
                }
            };
            // 鼠标滑出蒙板
            coimg.onmouseout=function (event) {
                let node=event&&event.target;
                coimg.style.display='none';
                if (node.nodeName!=='SPAN') {
                    node.previousElementSibling.classList.toggle('qz_cimg');
                    node.previousElementSibling.classList.toggle('cimg_active');
                }
            }
        }
    }

    function number_to_time(num) {
        let num_second=num/1000;
        let days=Math.floor(num_second/(60*60*24));
        let hours=Math.floor((num_second%(60*60*24))/(60*60));
        let mimutes=Math.floor((num_second%(60*60))/60);
        let seconds=Math.floor((num_second%60));
        // 显示距系统时间时间差
        if (days>0){
            var result=days+'天前';
        }else if (hours>0){
            var result=hours+'小时前';
        } else if (mimutes>0){
            var result=mimutes+'分钟前';
        } else if (seconds=>0) {
            var result=seconds+'秒前';
        } else {
            var result=null;
        }
        return result;
    }


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
    }
    var timer = null;
    function startMover(itarget) {//目标值
        clearInterval(timer);//执行当前动画同时清除之前的动画
        timer = setInterval(function () {
            let scroll_distance = document.documentElement.scrollTop||document.body.scrollTop;
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


    // 返回顶部

})();