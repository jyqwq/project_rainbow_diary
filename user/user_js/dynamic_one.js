(function () {

    //判断登录
    check_login();
    function check_login() {
        let token = localStorage.getItem('token');
        if (token){
            let Token = {'token':token};
            postData(ajax_url+'/user/login',Token,function (res) {
                if (res.status_code !== '10003'){
                    sessionStorage.setItem('from','/rainbow_diary_html/user/dynamic.html');
                    location.href='/rainbow_diary_html/user/login.html'
                }
            })
        }else {
            sessionStorage.setItem('from','/rainbow_diary_html/user/dynamic.html');
            location.href='/rainbow_diary_html/user/login.html'
        }
    }

    //获取缓存
    dy();
    function dy(){
        if (sessionStorage.getItem('dy_id') && sessionStorage.getItem('dy_type')){
            let u={'id':sessionStorage.getItem('dy_id'),'type':sessionStorage.getItem('dy_type')};
            dy_onload(u);
        }else {
            location.href='/rainbow_diary_html/index.html'
        }
    }
    //获取动态
    function dy_onload(u) {
        let dy_ajax=document.querySelector('.dy_ajax');
        let myDate = new Date();
        getData(ajax_url+'/user/person',u,function (res) {
            let num=parseInt(myDate.getTime())-parseInt(res.data);
            let time=number_to_time(num);
            let tags=res.tags.split(',');
            if (u['type']=='dynamic') {
                dy_ajax.innerHTML+=`<div class="row all_dy dy_margin">
                <div class="row">
                    <div class="col-lg-2 dy_c_content dy_c_icon"><img src="../${res.user_message.user_icon}" alt=""></div>
                    <div class="col-lg-8 dy_c_content" style="overflow: hidden">
                        <div class="row">
                            <span><strong style="font-size: 1.1em">${res.user_message.user_nickname}</strong></span>
                            <br>
                            <span style="color: darkgrey;font-size: 0.9em">${time}</span>
                            <div class="dy_tags"></div>
                        </div>
                        <div class="row dy_c_content to_one">
                            <span>${res.words}</span>
                        </div>
                        <div class="row dy_c_content">
                            <img src="../${res.dynamic_images}" alt="">
                        </div>
                        <div class="row margin_top">
                            <ul class="nav">
                                <li class="dy_c_nav"><a href="#"><img src="../img/dy/分享转发.png" alt="">&nbsp;<span>10</span></a></li>
                                <li class="dy_c_nav"><a href="#"><img src="../img/dy/评论.png" alt="">&nbsp;<span>${res.cots}</span></a></li>
                                <li class="dy_c_nav"><a href="#"><img src="../img/dy/点赞.png" alt="">&nbsp;<span>${res.fbs}</span></a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-lg-2 margin_top">
                        <div class="dy_type" style="display: none">心情</div>
                        <img src="../img/心率.png" alt="">
                    </div>
                </div>
            </div>`;
                let dy_tags=document.querySelector('.dy_tags');
                for (let n in tags) {
                    dy_tags.innerHTML+=`<div class="one_tag">${tags[n]}</div>`
                }
            }else {
                if (u['type']=='journal') {
                    dy_ajax.innerHTML+=`<div class="row all_dy dy_margin">
                <div class="row">
                    <div class="col-lg-2 dy_c_content dy_c_icon"><img src="../${res.user_message.user_icon}" alt=""></div>
                    <div class="col-lg-8 dy_c_content" style="overflow: hidden">
                        <div class="row">
                            <span><strong style="font-size: 1.1em">${res.user_message.user_nickname}</strong></span>
                            <br>
                            <span style="color: darkgrey;font-size: 0.9em">${time}</span>
                            <div class="dy_tags"></div>
                        </div>
                        <div class="row dy_c_content">
                            <div style="text-align: center"><span style="font-size: 1.2em;"><strong>${res.title}</strong></span></div>
                            <br>
                            <span>${res.words}</span>
                        </div>
                        <div class="row dy_c_content">
                            <img src="../${res.images}" alt="">
                        </div>
                        <div class="row margin_top">
                            <ul class="nav">
                                <li class="dy_c_nav"><a href="#"><img src="../img/dy/分享转发.png" alt="">&nbsp;<span>10</span></a></li>
                                <li class="dy_c_nav"><a href="#"><img src="../img/dy/评论.png" alt="">&nbsp;<span>${res.cots}</span></a></li>
                                <li class="dy_c_nav"><a href="#"><img src="../img/dy/点赞.png" alt="">&nbsp;<span>${res.fbs}</span></a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-lg-2 margin_top">
                        <div class="dy_type" style="display: none">日记</div>
                        <img src="../img/日记.png" alt="">
                    </div>
                </div>
            </div>`;
                    let dy_tags=document.querySelector('.dy_tags');
                    for (let n in tags) {
                        dy_tags.innerHTML+=`<div class="one_tag">${tags[n]}</div>`
                    }
                }else {
                    if (u['type']=='test') {
                        if (res.a_title) {
                            var t=res.a_title.split('&');
                        }else {
                            var t=['','']
                        }
                        if (res.a_content) {
                            var c=res.a_content.split('&');
                        }else {
                            var c=['','']
                        }
                        dy_ajax.innerHTML+=`<div class="row all_dy dy_margin">
                <div class="row">
                    <div class="col-lg-2 dy_c_content dy_c_icon"><img src="../${res.user_message.user_icon}" alt=""></div>
                    <div class="col-lg-8 dy_c_content"  style="overflow: hidden">
                        <div class="row">
                            <span><strong style="font-size: 1.1em">${res.user_message.user_nickname}</strong></span>
                            <br>
                            <span style="color: darkgrey;font-size: 0.9em">${time}</span>
                            <div class="dy_tags"></div>
                        </div>
                        <div class="row dy_c_content">
                            <div style="text-align: center"><span style="font-size: 1.2em;"><strong>${res.title}</strong></span></div>
                            <br>
                            <div><span>${res.content}</span></div>
                            <br>
                            <div style="text-align: center"><span style="font-size: 1.1em;"><strong>${t[0]}</strong></span></div>
                            <br>
                            <div><span>${c[0]}</span></div>
                            <br>
                            <div style="text-align: center"><span style="font-size: 1.1em;"><strong>${t[1]}</strong></span></div>
                            <br>
                            <div><span>${c[1]}</span></div>
                        </div>
                        <div class="row dy_c_content">
                            <img src="../${res.img}" alt="">
                        </div>
                        <div class="row margin_top">
                            <ul class="nav">
                                <li class="dy_c_nav"><a href="#"><img src="../img/dy/分享转发.png" alt="">&nbsp;<span>10</span></a></li>
                                <li class="dy_c_nav"><a href="#"><img src="../img/dy/评论.png" alt="">&nbsp;<span>${res.cots}</span></a></li>
                                <li class="dy_c_nav"><a href="#"><img src="../img/dy/点赞.png" alt="">&nbsp;<span>${res.cots}</span></a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-lg-2 margin_top">
                        <div class="dy_type" style="display: none">测评</div>
                        <img src="../img/评价.png" alt="">
                    </div>
                </div>
            </div>`;
                        let dy_tags=document.querySelector('.dy_tags');
                        for (let n in tags) {
                            dy_tags.innerHTML+=`<div class="one_tag">${tags[n]}</div>`
                        }
                    }
                }
            }
            sessionStorage.setItem('other_id',res.user_message.user_id);
            let v={'user_id':sessionStorage.getItem('user_id'),'other_id':res.user_message.user_id,'method':'check'};
            getData(ajax_url+'/user/person',v,function (res) {
                let follow=document.querySelector('.follow');
                let isfollow=document.querySelector('.isfollow');
                let unfollow=document.querySelector('.unfollow');
                if (res.status_code == '10011') {
                    follow.parentElement.parentElement.style.display='none';
                    isfollow.parentElement.parentElement.style.display='block';
                }else if (res.status_code == '10012'){
                    isfollow.parentElement.parentElement.style.display='none';
                    follow.parentElement.parentElement.style.display='block';
                }else {
                    isfollow.parentElement.parentElement.style.display='none';
                    follow.parentElement.parentElement.style.display='none';
                    unfollow.parentElement.parentElement.style.display='block';
                    unfollow.innerHTML=`无法获取关注状态,错误码:${res.status_code},请刷新重试!`
                }
            })
        })
    }

    //关注按钮
    follow();
    function follow() {
        let follow=document.querySelector('.follow');
        let isfollow=document.querySelector('.isfollow');
        follow.onclick=function () {
            follow.parentElement.parentElement.style.display='none';
            isfollow.parentElement.parentElement.style.display='block';
            let v={'user_id':sessionStorage.getItem('user_id'),'other_id':sessionStorage.getItem('other_id'),'method':'add'};
            getData(ajax_url+'/user/person',v,function (res) {
                console.log(res);
            })
        };
        isfollow.onclick=function () {
            isfollow.parentElement.parentElement.style.display='none';
            follow.parentElement.parentElement.style.display='block';
            let v={'user_id':sessionStorage.getItem('user_id'),'other_id':sessionStorage.getItem('other_id'),'method':'delete'};
            getData(ajax_url+'/user/person',v,function (res) {
                console.log(res);
            })
        }
    }

    //返回
    back();
    function back() {
        let back=document.querySelector('.back');
        back.onclick=function () {
            if (sessionStorage.getItem('from')){
                location.href=sessionStorage.getItem('from');
            } else {
                location.href='/rainbow_diary_html/index.html'
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