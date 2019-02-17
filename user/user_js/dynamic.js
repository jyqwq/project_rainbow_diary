(function () {

    //判断登录
    check_login();
    function check_login() {
        let token = localStorage.getItem('token');
        if (token){
            let Token = {'token':token};
            postData(ajax_url+'/user/login',Token,function (res) {
                if (res.status_code == '10003'){
                    let u = res.usermessage;
                    let usericon=document.querySelector('.usericon');
                    let user_nickname=document.querySelector('.user_nickname');
                    let fans=document.querySelector('.fans');
                    let fcs=document.querySelector('.fcs');
                    usericon.src='../'+u.user_icon;
                    user_nickname.innerHTML=u.user_nickname;
                    fans.innerHTML=u.user_fans;
                    fcs.innerHTML=u.user_watchs;
                }else {
                    sessionStorage.setItem('from',window.location.pathname);
                    location.href='login.html'
                }
            })
        }else {
            sessionStorage.setItem('from',window.location.pathname);
            location.href='login.html'
        }
    }
    //退出登录
    exit();
    function exit(){
        let exit_col=document.querySelector('.exit_col');
        exit_col.onclick=function () {
            localStorage.removeItem('token');
            sessionStorage.clear();
            localStorage.setItem('user_skin',1);
            location.href='/rainbow_diary_html/index.html';
        }
    }


    //获取所有动态
    all_dy();
    function all_dy(){
        let user_id=localStorage.getItem('user_id');
        let user={'user_id':parseInt(user_id),'methods':'dy'};
        let dy_ajax=document.querySelector('.dy_ajax');
        let myDate = new Date();
        postData(ajax_url+'/user/person',user,function (res) {
            for (let i in res){
                let num=parseInt(myDate.getTime())-parseInt(res[i].data);
                let time=number_to_time(num);
                let tags=res[i].tags.split(',');
                if (res[i].t_name=='dynamic') {
                    dy_ajax.innerHTML+=`<div class="row all_dy dy_margin">
                <div class="row">
                    <div class="col-lg-2 dy_c_content dy_c_icon"><img src="../${res[i].user_message.user_icon}" alt=""></div>
                    <div class="col-lg-8 dy_c_content" style="overflow: hidden">
                        <div class="row">
                            <span><strong style="font-size: 1.1em">${res[i].user_message.user_nickname}</strong></span>
                            <br>
                            <span style="color: darkgrey;font-size: 0.9em">${time}</span>
                            <div class="dy_tags"></div>
                        </div>
                        <div class="row dy_c_content to_one">
                            <span>${res[i].words}</span>
                        </div>
                        <div class="row dy_c_content">
                            <img src="../${res[i].dynamic_images}" alt="">
                        </div>
                        <div class="row margin_top">
                            <ul class="nav">
                                <li class="dy_c_nav"><a href="#"><img src="../img/dy/分享转发.png" alt="">&nbsp;<span>10</span></a></li>
                                <li class="dy_c_nav"><a href="#"><img src="../img/dy/评论.png" alt="">&nbsp;<span>${res[i].cots}</span></a></li>
                                <li class="dy_c_nav"><a href="#"><img src="../img/dy/点赞.png" alt="">&nbsp;<span>${res[i].fbs}</span></a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-lg-2 margin_top">
                        <div class="dy_type" style="display: none">dynamic</div>
                        <div class="dy_id" style="display: none">${res[i].id}</div>
                        <img src="../img/心率.png" alt="">
                    </div>
                </div>
            </div>`;
                    let dy_tags=document.querySelectorAll('.dy_tags');
                    let this_tags=dy_tags[dy_tags.length-1];
                    for (let n in tags) {
                        this_tags.innerHTML+=`<div class="one_tag">${tags[n]}</div>`
                    }
                }else {
                    if (res[i].t_name=='journal') {
                        if (res[i].new_col.length>30) {
                            res[i].new_col=res[i].new_col.slice(0,30)+'...'
                        }
                        dy_ajax.innerHTML+=`<div class="row all_dy dy_margin">
                <div class="row">
                    <div class="col-lg-2 dy_c_content dy_c_icon"><img src="../${res[i].user_message.user_icon}" alt=""></div>
                    <div class="col-lg-8 dy_c_content" style="overflow: hidden">
                        <div class="row">
                            <span><strong style="font-size: 1.1em">${res[i].user_message.user_nickname}</strong></span>
                            <br>
                            <span style="color: darkgrey;font-size: 0.9em">${time}</span>
                            <div class="dy_tags"></div>
                        </div>
                        <div class="row dy_c_content to_one">
                            <span style="font-size: 1.1em"><strong>${res[i].words}</strong></span>
                            <br>
                            <span>${res[i].new_col}</span>
                        </div>
                        <div class="row dy_c_content">
                            <img src="../${res[i].dynamic_images}" alt="">
                        </div>
                        <div class="row margin_top">
                            <ul class="nav">
                                <li class="dy_c_nav"><a href="#"><img src="../img/dy/分享转发.png" alt="">&nbsp;<span>10</span></a></li>
                                <li class="dy_c_nav"><a href="#"><img src="../img/dy/评论.png" alt="">&nbsp;<span>${res[i].cots}</span></a></li>
                                <li class="dy_c_nav"><a href="#"><img src="../img/dy/点赞.png" alt="">&nbsp;<span>${res[i].fbs}</span></a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-lg-2 margin_top">
                        <div class="dy_type" style="display: none">journal</div>
                        <div class="dy_id" style="display: none">${res[i].id}</div>
                        <img src="../img/日记.png" alt="">
                    </div>
                </div>
            </div>`;
                        let dy_tags=document.querySelectorAll('.dy_tags');
                        let this_tags=dy_tags[dy_tags.length-1];
                        for (let n in tags) {
                            this_tags.innerHTML+=`<div class="one_tag">${tags[n]}</div>`
                        }
                    }else {
                        if (res[i].t_name=='test') {
                            if (res[i].new_col) {
                                var c=res[i].new_col.split('&');
                            }else {
                                var c=['','']
                            }
                            dy_ajax.innerHTML+=`<div class="row all_dy dy_margin">
                <div class="row">
                    <div class="col-lg-2 dy_c_content dy_c_icon"><img src="../${res[i].user_message.user_icon}" alt=""></div>
                    <div class="col-lg-8 dy_c_content"  style="overflow: hidden">
                        <div class="row">
                            <span><strong style="font-size: 1.1em">${res[i].user_message.user_nickname}</strong></span>
                            <br>
                            <span style="color: darkgrey;font-size: 0.9em">${time}</span>
                            <div class="dy_tags"></div>
                        </div>
                        <div class="row dy_c_content to_one">
                            <span style="font-size: 1.1em"><strong>${res[i].words}</strong></span>
                            <br>
                            <span>${c[0]}</span>
                            <br>
                            <span>${c[1]}</span>
                        </div>
                        <div class="row dy_c_content">
                            <img src="../${res[i].dynamic_images}" alt="">
                        </div>
                        <div class="row margin_top">
                            <ul class="nav">
                                <li class="dy_c_nav"><a href="#"><img src="../img/dy/分享转发.png" alt="">&nbsp;<span>10</span></a></li>
                                <li class="dy_c_nav"><a href="#"><img src="../img/dy/评论.png" alt="">&nbsp;<span>${res[i].cots}</span></a></li>
                                <li class="dy_c_nav"><a href="#"><img src="../img/dy/点赞.png" alt="">&nbsp;<span>${res[i].fbs}</span></a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-lg-2 margin_top">
                        <div class="dy_type" style="display: none">test</div>
                        <div class="dy_id" style="display: none">${res[i].id}</div>
                        <img src="../img/评价.png" alt="">
                    </div>
                </div>
            </div>`;
                            let dy_tags=document.querySelectorAll('.dy_tags');
                            let this_tags=dy_tags[dy_tags.length-1];
                            for (let n in tags) {
                                this_tags.innerHTML+=`<div class="one_tag">${tags[n]}</div>`
                            }
                        }
                    }
                }
            }
            let to_one=document.querySelectorAll('.to_one');
            for (let p in to_one){
                to_one[p].onclick=function () {
                    let dy_message=this.parentElement.nextElementSibling.children;
                    sessionStorage.setItem('dy_type',dy_message[0].innerText);
                    sessionStorage.setItem('dy_id',dy_message[1].innerText);
                    sessionStorage.setItem('from','/rainbow_diary_html/user/dynamic.html');
                    location.href='/rainbow_diary_html/user/dynamic_one.html'
                }
            } 
        })
    }



    //导航栏
    nav();
    function nav() {
        let dy_all=document.querySelector('.dy_all');
        let dy_x=document.querySelector('.dy_x');
        let dy_r=document.querySelector('.dy_r');
        let dy_c=document.querySelector('.dy_c');
        dy_all.onclick=function () {
            dy_all.parentElement.classList.add('my_active');
            dy_x.parentElement.classList.remove('my_active');
            dy_r.parentElement.classList.remove('my_active');
            dy_c.parentElement.classList.remove('my_active');
            let dy_type=document.querySelectorAll('.dy_type');
            for (i in dy_type){
                dy_type[i].parentElement.parentElement.parentElement.style.display='block';
            }
        };
        dy_x.onclick=function () {
            dy_x.parentElement.classList.add('my_active');
            dy_all.parentElement.classList.remove('my_active');
            dy_r.parentElement.classList.remove('my_active');
            dy_c.parentElement.classList.remove('my_active');
            let dy_type=document.querySelectorAll('.dy_type');
            for (i in dy_type){
                if (dy_type[i].innerText!=='dynamic') {
                    dy_type[i].parentElement.parentElement.parentElement.style.display='none';
                }else {
                    dy_type[i].parentElement.parentElement.parentElement.style.display='block';
                }
            }
        };
        dy_r.onclick=function () {
            dy_r.parentElement.classList.add('my_active');
            dy_x.parentElement.classList.remove('my_active');
            dy_all.parentElement.classList.remove('my_active');
            dy_c.parentElement.classList.remove('my_active');
            let dy_type=document.querySelectorAll('.dy_type');
            for (i in dy_type){
                if (dy_type[i].innerText!=='journal') {
                    dy_type[i].parentElement.parentElement.parentElement.style.display='none';
                }else {
                    dy_type[i].parentElement.parentElement.parentElement.style.display='block';
                }
            }
        };
        dy_c.onclick=function () {
            dy_c.parentElement.classList.add('my_active');
            dy_x.parentElement.classList.remove('my_active');
            dy_r.parentElement.classList.remove('my_active');
            dy_all.parentElement.classList.remove('my_active');
            let dy_type=document.querySelectorAll('.dy_type');
            for (i in dy_type){
                if (dy_type[i].innerText!=='test') {
                    dy_type[i].parentElement.parentElement.parentElement.style.display='none';
                }else {
                    dy_type[i].parentElement.parentElement.parentElement.style.display='block';
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
        } else if (seconds>0) {
            var result=seconds+'秒前';
        } else {
            var result=null;
        }
        return result;
    }

})();