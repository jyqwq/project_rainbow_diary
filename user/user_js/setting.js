(function () {

    window.onload=function () {
        // * 浏览器加载时div尺寸随动——开始
        let screen_height = document.documentElement.clientHeight;
        let qz_con = document.querySelector('.qz_con');
        qz_con.style.height = (screen_height - 140) + 'px';
        // * 浏览器加载时div尺寸随动——结束
    };

    //传入数据—我的信息
    perinf_ajax();
    function perinf_ajax() {
        if (localStorage.getItem('user_id')) {
            var user_id = {'user_id': localStorage.getItem('user_id'),'methods':'get'};
        } else {
            location.href = '../user/login.html'
        }
        postData(ajax_url + '/user/person', user_id, function (res) {
            console.log(res);
            let qz_text1=document.querySelector('.qz_text1');
            let qz_text2=document.querySelector('.qz_text2');
            let qz_text3=document.querySelector('.qz_text3');

            let master_head=document.querySelector('.master_head');
            qz_text1.value=res.user_nickname;
            qz_text2.innerHTML=res.user_autograpgh;
            qz_text3.value=res.user_phone;
            master_head.src='../'+res.user_icon;

            // 性别选择按钮
            sex_select(res);
            
            //生日选择器
            data_select(res);

        })
    }

    // 传到后台—我的信息
    efferent_ajax();
    function efferent_ajax(){
        let submit_button=document.querySelector('.submit_button');
        submit_button.onclick=function () {
            let qz_text1=document.querySelector('.qz_text1');
            let qz_text2=document.querySelector('.qz_text2');
            let qz_text3=document.querySelector('.qz_text3');
            let button_active=document.querySelector('.button_active');
            if (button_active.innerText=='男'){
                 var sex=1;
            }else if (button_active.innerText=='女') {
                sex=2;
            }else if (button_active.innerText=='保密') {
                sex=0;
            }
            if (checkTelphone() && checkName()) {
                let user={'user_id':localStorage.getItem('user_id'),'user_nickname':qz_text1.value,'user_autograpgh':qz_text2.value,'user_phone':qz_text3.value,'user_sex':sex,'user_age':'2','user_icon':'master_head','methods':'update'}
                postData(ajax_url+'/user/person',user,function (res) {
                    if (res.status_code==10014) {
                        alert('更改成功！')
                    }else if(res.status_code==10000){
                        nic_err.innerText='*该昵称已被占用*';
                    }else if (res.status_code==10002) {
                        tel_err.innerText = '*该用户已存在*';
                    }
                })
            }
        }
    }

    //导航栏切换
    nav_choose();
    function nav_choose() {
        let shu_nav=document.querySelector('.shu_nav');
        shu_nav.onclick=function (event) {
            let node=event && event.target;
            if (node.nodeName.toLowerCase()=='a'){
                let li=node.parentElement;
                let dy_row=document.querySelector('.dy_row');
                let dairy_row=document.querySelector('.dairy_row');
                let test_row=document.querySelector('.test_row');
                if (li.nextElementSibling){
                    li.nextElementSibling.classList.remove('shu_active');
                    if (li.nextElementSibling.nextElementSibling){
                        //心情
                        li.nextElementSibling.nextElementSibling.classList.remove('shu_active');
                        dy_row.style.display='block';
                        dairy_row.style.display='none';
                        test_row.style.display='none';
                        dy_row.classList.add('text_active');
                        dairy_row.classList.remove('text_active');
                        test_row.classList.remove('text_active');
                    } else {
                        //日记
                        li.previousElementSibling.classList.remove('shu_active');
                        dy_row.style.display='none';
                        dairy_row.style.display='block';
                        test_row.style.display='none';
                        dy_row.classList.remove('text_active');
                        dairy_row.classList.add('text_active');
                        test_row.classList.remove('text_active');
                    }
                } else {
                    //测评
                    li.previousElementSibling.classList.remove('shu_active');
                    li.previousElementSibling.previousElementSibling.classList.remove('shu_active');
                    dy_row.style.display='none';
                    dairy_row.style.display='none';
                    test_row.style.display='block';
                    dy_row.classList.remove('text_active');
                    dairy_row.classList.remove('text_active');
                    test_row.classList.add('text_active');
                }
                li.classList.add('shu_active');
            }
        }
    }

    // 检查昵称
    let qz_text1=document.querySelector('.qz_text1');
    function checkName(res) {
        var nic_err=document.querySelector('#nic_err');
        var flag=true;
        if (qz_text1.value=='') {
            nic_err.innerText='*请输入昵称*';
            flag=false;
            return flag;
        }
        return flag;
    }
    qz_text1.onchange=function () {
        checkName();
    };

    // 检查手机号
    let qz_text3=document.querySelector('.qz_text3');
    function checkTelphone() {
        var tel_err=document.querySelector('#tel_err');
        var regMobile=/^1\d{10}$/;
        if(qz_text3.value){
            if(regMobile.test(qz_text3.value)) {
                tel_err.innerText = '';
                return true;
            }else{
                tel_err.innerText = '*手机号码格式不正确*';
                return false;
            }
        }else{
            tel_err.innerText='*请输入手机号*';
            return false;
        }
    }
    qz_text3.onchange=function(){
        checkTelphone();
    };

    // 性别选择按钮
    function sex_select(res) {
        let button1=document.querySelector('.button1');
        let button2=document.querySelector('.button2');
        let button0=document.querySelector('.button0');
        let select_button=document.querySelectorAll('.select_button');
        if (res.user_sex=='1') {
            button1.classList.add('button_active');
        }else if (res.user_sex=='2'){
            button2.classList.add('button_active');
        } else {
            button0.classList.add('button_active');
        }
        for (let i=0;i<3;i++) {
            select_button[i].onclick=function () {
                for (let i=0;i<3;i++) {
                    select_button[i].classList.remove('button_active');
                }
                this.classList.add('button_active');
            }
        }
    }

    //生日选择器
    function data_select(res) {
        var selects = document.getElementsByTagName("select");//通过标签名获取select对象
        var date = new Date();//获取系统当前时间
        var nowYear = date.getFullYear();//获取当前的年
        //生成年份选择框
        for(var i=nowYear-100;i<=nowYear;i++){
            var optionYear = document.createElement("option");
            optionYear.innerHTML=i;
            optionYear.value=i;
            selects[0].appendChild(optionYear);
        }
        //生成月份选择框
        for(var i=1;i<=12;i++){
            var optionMonth = document.createElement("option");
            optionMonth.innerHTML=i;
            optionMonth.value=i;
            selects[1].appendChild(optionMonth);
        }
        // 生成日选择框
        getDays(selects[1].value,selects[0].value,selects);
        selects[0].onchange=function () {
            setDays()
        }
        selects[1].onchange=function () {
            setDays()
        }
        // 显示用户缓存性别，生日(模拟数据)
        let option=document.querySelectorAll('option');
        for(i=0;i<101;i++){
            if(option[i].innerText==1948){//测试数据
                option[i].selected='selected';
            }
        }
        for (i=101;i<113;i++){
            if (option[i].innerText==2) {//测试数据
                option[i].selected='selected';
            }
        }
        for (i=113;i<option.length;i++){
            if (option[i].innerText==10) {//测试数据
                option[i].selected='selected';
            }
        }
    }
    function setDays(){
        var selects = document.getElementsByTagName("select");
        var year = selects[0].options[selects[0].selectedIndex].value;
        var month = selects[1].options[selects[1].selectedIndex].value;
        getDays(month,year,selects);
    }
    function getDays(month,year,selects){
        var days = getDaysInMonth(month,year);//当月获得天数
        selects[2].options.length = 0;
        for(var i=1;i<=days;i++){
            var optionDay = document.createElement("option");
            optionDay.innerHTML=i;
            optionDay.value=i;
            selects[2].appendChild(optionDay);
        }
    }
    // 获取某年某月存在多少天
    function getDaysInMonth(month,year){
        var days;
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

    //更换头像
    change_head();
    function change_head() {
        let change_em=document.querySelector('.change_em');
        change_em.onchange=function (event) {
            file = document.getElementById("icon");
            let files = this.children[0].files;
            img = new Image();
            if (window.URL) {
                //File API
                img.src = window.URL.createObjectURL(files[0]); //创建一个object URL，并不是你的本地路径
                img.onload = function (e) {
                    window.URL.revokeObjectURL(this.src); //图片加载后，释放object URL
                }
            }
            file.src = img.src;
            //上传文件
            var fd = new FormData(),//实例化一个表单
                xhr = new XMLHttpRequest();
            fd.append('headimg', files[0]);//追加图片元素
            xhr.open('post', 'user.php?act=act_edit_img');//请求方式，请求地址
            xhr.send(fd);
        }
    }

})();



