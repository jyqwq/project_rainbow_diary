(function () {


    // 模态框
    function modal_frame() {
        let btn = document.querySelector('.qz_mobtn');
        let add=document.querySelector('.qz_add');
        let qz_cen=document.querySelectorAll('.qz_cen');
        let close = document.querySelectorAll('.qz_close');
        let cancel = document.querySelectorAll('.qz_cancel');
        let modal = document.querySelectorAll('.qz_modal');
        btn.onclick= function(){
            modal[0].style.display = 'block';
        };
        add.onclick=function(){
            modal[1].style.display='block';
        };
        for (let i=0;i<18;i++){
            qz_cen[i].onclick=function () {
                modal[2].style.display='block';
            };
        }
        for (let i=0;i<3;i++){
            close[i].onclick= function(){
                modal[i].style.display = 'none';
            };
            cancel[i].onclick= function(){
                console.log(i);
                modal[i].style.display = 'none';
            };
        }
    }
    modal_frame();

    // 导航栏切换
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
    change_nav();

    // 图片动画
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
    qz_img();

    window.onload=function (){
        // * 1.浏览器加载时div尺寸随动——开始
        let screen_height=document.documentElement.clientHeight;
        // 定义第一页
        let qz_cover=document.querySelector('.qz_cover');
        let qz_cir=document.querySelector('.qz_cir');
        let qz_cul=document.querySelector('.qz_cul');
        let qz_pernic=document.querySelector('.qz_pernic');
        let qz_nick=document.querySelector('.qz_nick');
        let qz_pla=document.querySelector('.qz_pla');
        let qz_percha=document.querySelector('.qz_percha');
        let qz_rota=document.querySelector('.qz_rota');
        let qz_pic=document.querySelector('.qz_pic');
        let qz_gui=document.querySelector('.qz_gui');
        let qz_skinfo=document.querySelector('.qz_skinfo');
        let qz_lead=document.querySelector('.qz_lead');
        let lea_img=document.querySelector('.lea_img');
        // 定义第二页
        let qz_sep=document.querySelectorAll('.qz_sep');
        let qz_nimg=document.querySelectorAll('.qz_nimg');
        // 计算第一页
        // 第一页
        qz_cover.style.height=screen_height+'px';
        // 左边个人信息框
        // 主人的头像
        qz_cir.style.height=screen_height*0.21+'px';
        qz_cul.style.width=screen_height*0.18+'px';
        // 主人的小屋
        qz_pernic.style.height=screen_height*0.16+'px';
        qz_nick.style.height=screen_height*0.16+'px';
        // 个人信息
        qz_pla.style.height=screen_height*0.18+'px';
        qz_percha.style.height=screen_height*0.18+'px';
        // 右边个人肤质框
        // 轮播图
        qz_rota.style.height=screen_height*0.45+'px';
        qz_pic.style.height=screen_height*0.45+'px';
        // 护肤指南
        qz_gui.style.height=screen_height*0.23+'px';
        qz_skinfo.style.height=screen_height*0.15+'px';
        // 箭头指向第二页
        qz_lead.style.height=screen_height*0.1+'px';
        lea_img.style.height=screen_height*0.1+'px';
        // 计算第二页
        for(i=0;i<3;i++){
            qz_sep[i].style.height=screen_height*0.18+'px';
            qz_nimg[i].style.height=screen_height*0.1+'px';
        }
        // * 1.浏览器加载时div尺寸随动——结束

        // * * 2.轮播图——开始
        let rota = document.querySelector('.qz_rota');
        let ropic = document.querySelectorAll('.qz_pic');
        let count = 0;
        let timer = null;
        timer=setInterval(change ,2000);
        function change() {
            for (let j = 0; j < ropic.length; j++) {
                ropic[j].style.display = 'none';
            }
            ropic[count].style.display = 'block';
            count++;
            if (count == ropic.length) {
                count = 0;
            }
        }
        rota.onmouseover = function () {
            clearInterval(timer);
        };
        rota.onmouseout = function () {
            timer = setInterval(change, 2000);
        };
        // * * 2.轮播图——结束


        // * * * 3.图片动画——浏览器加载时蒙板尺寸随动——开始
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
        // * * * 3.图片动画——浏览器加载时蒙板尺寸随动——结束

        // * * * * 4.生日选择器——开始
        // 浏览器加载时生成select选项
        let selects = document.getElementsByTagName("select");//通过标签名获取select对象
        let date = new Date();//获取系统当前时间
        let nowYear = date.getFullYear();//获取当前的年
        //生成年份选择框
        for(let i=nowYear-100;i<=nowYear;i++){
            let optionYear = document.createElement("option");
            optionYear.innerHTML=i;
            optionYear.value=i;
            selects[1].appendChild(optionYear);
        }
        //生成月份选择框
        for(let i=1;i<=12;i++){
            let optionMonth = document.createElement("option");
            optionMonth.innerHTML=i;
            optionMonth.value=i;
            selects[2].appendChild(optionMonth);
        }
        // 生成日选择框
        getDays(selects[2].value,selects[1].value,selects);
        selects[1].onchange=function () {
            setDays()
        };
        selects[2].onchange=function () {
            setDays()
        }
    };
    // **** 4.生日选择器——内部方法
    function setDays(){
        let selects = document.getElementsByTagName("select");
        let year = selects[1].options[selects[1].selectedIndex].value;
        let month = selects[2].options[selects[2].selectedIndex].value;
        getDays(month,year,selects);
    }
    function getDays(month,year,selects){
        let days = getDaysInMonth(month,year);//当月获得天数
        selects[3].options.length = 0;
        for(let i=1;i<=days;i++){
            let optionDay = document.createElement("option");
            optionDay.innerHTML=i;
            optionDay.value=i;
            selects[3].appendChild(optionDay);
        }
    }
    // 获取某年某月存在多少天
    function getDaysInMonth(month,year){
        let days;
        if (month==1 || month==3 || month==5 || month==7 || month==8 || month==10 || month==12) {
            days=31;
        }else if (month==4 || month==6 || month==9 || month==11){
            days=30;
        }else{
            if ((year%4 == 0 && year%100 != 0) || (year%400 == 0)) {     // 判断是否为润二月
                days=29;
            }else {
                days=28;
            }
        }
        return days;
    }
    // * * * * 4.生日选择器——结束

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
    timer();
    
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
    unfold_text();




})();