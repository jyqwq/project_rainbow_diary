(function () {

    // 传入数据—左边个人信息框
    perinf_ajax();
    function perinf_ajax() {
        // if (localStorage.getItem('user_id')) {
        //     var user_id = {'user_id': localStorage.getItem('user_id'),'methods':'get'};
        // } else {
        //     location.href = '../user/login.html'
        // }
        // postData(ajax_url + '/user/person', user_id, function (res) {
            let res={'user_pic':'../img/setting/head.png','user_nickname':'JyQQ','user_autograpgh':'1111','user_watchs':'2','user_fans':'5'};//测试
            let qz_por = document.querySelectorAll('.qz_por');
            let font_nic = document.querySelector('.font_nic');
            let font_gra1 = document.querySelector('.font_gra1');
            let font_gra2 = document.querySelector('.font_gra2');
            let font_gra3 = document.querySelector('.font_gra3');
            for (i = 0; i < 2; i++) {
                qz_por[i].src = res.user_pic;
            }
            font_nic.innerHTML = res.user_nickname;
            font_gra1.innerHTML = '个性签名：' + res.user_autograpgh;
            font_gra2.innerHTML = '关注数：' + res.user_watchs;
            font_gra3.innerHTML = '粉丝数：' + res.user_fans;
        // })
    }

    // 传入数据—动态模态框(日记本)
    diary_ajax();
    function diary_ajax() {
        // if (localStorage.getItem('user_id')){
        //     var user_id={'user_id':localStorage.getItem('user_id'),'methods':'get'};
        // } else{
        //     location.href='../user/login.html';
        // }
        // postData(ajax_url+'网址',user_id,function (res) {
        let res2=[
            {
                'head':'../img/222center222/dynamic_head.jpg',
                'author':'南浅',
                'time':'2019-2-5 15:32:01',
                'infomation':'昨天一直在看伍佰和阿信合唱《挪威的森林》的视频，我说这也太感人了吧，然后裂裂跟我讲：“知道阿信是伍佰的粉丝之后，这个故事就更感人了”。”念念不忘，必有回响”。他是这么总结的。我想起另一个故事。十三年前，贝克汉姆和两个英格兰球队的小粉丝合影，十三年后，男孩成为了英格兰球队的队长，而照片上的女孩则成为了那个男孩的妻子。像之前说的，月亮虽然遥远，但某一刻，它的光真的照亮过我。',
                'pic':'../img/222center222/dynamic.jpg'
            },
            {
                'head':'../img/222center222/dynamic_head.jpg',
                'author':'南浅',
                'time':'2019-2-14 15:32:01',
                'infomation':'昨天一直在看伍佰和阿信合唱《挪威的森林》的视频，我说这也太感人了吧，然后裂裂跟我讲：“知道阿信是伍佰的粉丝之后，这个故事就更感人了”。”念念不忘，必有回响”。他是这么总结的。我想起另一个故事。十三年前，贝克汉姆和两个英格兰球队的小粉丝合影，十三年后，男孩成为了英格兰球队的队长，而照片上的女孩则成为了那个男孩的妻子。像之前说的，月亮虽然遥远，但某一刻，它的光真的照亮过我。',
                'pic':'../img/222center222/dynamic.jpg'
            },
            {
                'head':'../img/222center222/dynamic_head.jpg',
                'author':'南浅',
                'time':'2019-2-14 20:04:01',
                'infomation':'昨天一直在看伍佰和阿信合唱《挪威的森林》的视频，我说这也太感人了吧，然后裂裂跟我讲：“知道阿信是伍佰的粉丝之后，这个故事就更感人了”。”念念不忘，必有回响”。他是这么总结的。我想起另一个故事。十三年前，贝克汉姆和两个英格兰球队的小粉丝合影，十三年后，男孩成为了英格兰球队的队长，而照片上的女孩则成为了那个男孩的妻子。像之前说的，月亮虽然遥远，但某一刻，它的光真的照亮过我。',
                'pic':'../img/222center222/dynamic.jpg'
            }
        ]//测试

        let dynamic=document.querySelector('.dynamic');
        for (let dyn of res2){
            dynamic.innerHTML+=`<div class="qz_dynamic">
                        <!--作者头像日期-->
                        <div class="row qz_row">
                            <div class="hidden-xs hidden-sm col-md-1 col-lg-1"></div>
                            <div class="col-xs-6 col-sm-3 col-md-2 col-lg-2">
                                <div class="dyn_head">
                                    <img src="${dyn.head}" class="img-responsive" alt="Responsive image">
                                </div>
                            </div>
                            <div class="col-xs-6 col-sm-3 col-md-2 col-lg-2">
                                <div class="dyn_aut">
                                    <span>${dyn.author}</span><br>
                                    <div class="font_time">
                                        <span class="rel_time">${dyn.time}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!--动态文字-->
                        <div class="row qz_row">
                            <div class="hidden-xs hidden-sm col-md-1 col-lg-1"></div>
                            <div class="col-xs-12 col-sm-12 col-md-11 col-lg-11">
                                <div class="qz_dinf">
                                    <span class="font_dinf">${dyn.infomation}</span><br>
                                </div>
                                <span class="font_full">展开全文</span>
                            </div>
                        </div>
                        <!--动态图片-->
                        <div class="row qz_row">
                            <div class="hidden-xs hidden-sm col-md-1 col-lg-1"></div>
                            <div class="col-xs-12 col-sm-5 col-md-4 col-lg-2">
                                <div class="dyn_pic">
                                    <img src="${dyn.pic}" class="img-responsive" alt="Responsive image">
                                </div>
                            </div>
                        </div>
                        <!--分割线-->
                        <div class="qz_line"></div>
                    </div>`
        }
        // })
    }

    // 模态框
    modal_frame();
    function modal_frame() {
        let qz_cen=document.querySelectorAll('.qz_cen');
        let close = document.querySelector('.qz_close');
        let cancel = document.querySelector('.qz_cancel');
        let modal = document.querySelector('.qz_modal');
        for (let i=0;i<12;i++){
            qz_cen[i].onclick=function () {
                modal.style.display='block';
            };
        }
        close.onclick= function(){
            modal.style.display = 'none';
        };
        cancel.onclick= function(){
            modal.style.display = 'none';
        };


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
    function qz_img() {
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
        let qz_cover=document.querySelector('.qz_cover');
        let qz_per=document.querySelector('.qz_per');
        let qz_cir=document.querySelector('.qz_cir');
        let qz_cul=document.querySelector('.qz_cul');
        let qz_pernic=document.querySelector('.qz_pernic');
        let qz_nick=document.querySelector('.qz_nick');
        let qz_pla=document.querySelector('.qz_pla');
        // 定义第二页
        let qz_sep=document.querySelectorAll('.qz_sep');
        let qz_nimg=document.querySelectorAll('.qz_nimg');
        //计算模态框
        dyna_con.style.height=(screen_height-50)+'px';
        // 计算第一页
        // 第一页
        qz_cover.style.height=(screen_height-120)*0.6+'px';
        // 左边个人信息框
        qz_per.style.marginTop=(screen_height-120)*0.21+'px';
        // 主人的头像
        qz_cir.style.height=(screen_height-120)*0.21+'px';
        qz_cul.style.width=(screen_height-120)*0.18+'px';
        // 主人的小屋
        qz_pernic.style.height=(screen_height-120)*0.16+'px';
        qz_nick.style.height=(screen_height-120)*0.16+'px';
        // 个人信息
        qz_pla.style.height=(screen_height-120)*0.18+'px';
        // 右边个人肤质框
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

    timer();
    // 计时器
    function timer() {
        let font_time=document.querySelectorAll('.font_time');
        let rel_time=document.querySelectorAll('.rel_time');
        let inner=setInterval(function () {
            let now_time=new Date();
            for (i=0;i<3;i++){
                let rein_time=new Date(rel_time[i].innerText);
                let time_dif=now_time-rein_time;
                font_time[i].innerText=number_to_time(time_dif);
            }
        },1000)
        // 时间戳转换为时间差距格式
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
            } else if (seconds>0) {
                var result=seconds+'秒前';
            } else {
                var result=null;
            }
            return result;
        }
    }

    unfold_text();
    // 展开全文
    function unfold_text() {
        var font_full=document.querySelectorAll('.font_full');
        for(i=0;i<3;i++){
            font_full[i].onclick=function (event) {
                node=event && event.target;
                node.previousElementSibling.classList.toggle('qz_dinf');
                if(node.previousElementSibling.classList[0]=='qz_dinf'){
                    node.innerText='展开全文';
                }
                else {
                    node.innerText='收起';
                }
            }
        }
    }





















})();