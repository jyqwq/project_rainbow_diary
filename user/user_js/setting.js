(function () {

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
            qz_text1.innerHTML=res.user_nickname;
            qz_text2.innerHTML=res.user_autograpgh;
            qz_text3.value=res.user_phone;
            master_head.src='../'+res.user_icon;
        })
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

    // 检查手机号
    let qz_text3=document.querySelector('.qz_text3');
    function checkTelphone() {
        let qz_text3=document.querySelector('.qz_text3');
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
        console.log(checkTelphone());
    };

    //生日选择器
    data_select();
    function data_select() {
        window.onload=function(){
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
                if(option[i].innerText==1948){
                    option[i].selected='selected';
                }
            }
            for (i=101;i<113;i++){
                if (option[i].innerText==2) {
                    option[i].selected='selected';
                }
            }
            for (i=113;i<option.length;i++){
                if (option[i].innerText==10) {
                    option[i].selected='selected';
                }
            }
        };
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