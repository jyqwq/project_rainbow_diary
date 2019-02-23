(function () {

    window.onload=function (){
        // * 1.浏览器加载时div尺寸随动——开始
        let screen_height=document.documentElement.clientHeight;
        // 定义第二页
        let qz_sep=document.querySelectorAll('.qz_sep');
        let qz_nimg=document.querySelectorAll('.qz_nimg');
        // 计算第二页
        for(i=0;i<2;i++){
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

    window.onresize=function (){
        // 图片动画——浏览器尺寸改变时蒙板尺寸随动——开始
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
        console.log(user_id);
        postData(ajax_url + '/user/person', user_id, function (res) {
            console.log(res);
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

    // 导航栏切换
    change_nav();
    function change_nav() {
        let qz_nav=document.querySelector('#qz_nav');
        let dia=document.querySelector('#qz_diary');
        let col=document.querySelector('#qz_collection');
        qz_nav.onclick=function (event) {
            let node=event && event.target;
            if(node.nodeName.toLowerCase()=='span'||'img'){
                if(node.parentNode.parentNode.nextElementSibling){
                    col.style.display='none';
                    dia.style.display='block';
                }else {
                    dia.style.display='none';
                    col.style.display='block';
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

})();