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
                    let a={'methods':'mydy','user_id':u.user_id};
                    postData(ajax_url+'/user/person',a,function (res) {
                        let num_dy=document.querySelector('.num_dy');
                        num_dy.innerHTML=res.length;
                    })
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
        postData(ajax_url+'/user/person',user,function (res) {
            let myDate = new Date();
            for (let i=0;i<res.length;i++){
                let num=parseInt(myDate.getTime())-parseInt(res[i].data);
                let time=number_to_time(num);
                let tags=res[i].tags.split(',');
                let col={};
                let com={};
                if (res[i].collection.status_code=='10017') {
                    col={'img':'收藏.png','alt':1}
                }else if (res[i].collection.status_code=='10016') {
                    col={'img':'已收藏.png','alt':0}
                }else {
                    console.log(res[i].collection);
                    col={'img':'收藏.png','alt':1}
                }
                if (res[i].compliment.status_code=='10020') {
                    com={'img':'花.png','alt':1}
                }else if (res[i].compliment.status_code=='10019') {
                    com={'img':'点赞.png','alt':0}
                }else {
                    console.log(res[i].collection);
                    com={'img':'花.png','alt':1}
                }
                if (res[i].t_name=='dynamic') {
                    dy_ajax.innerHTML+=`<div class="row all_dy dy_margin">
                <div class="row">
                    <div class="col-lg-2 dy_c_content dy_c_icon"><img src="../${res[i].user_message.user_icon}" alt="" class="img-circle"></div>
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
                                <li class="dy_c_nav"><a><img src="img/dy/${col.img}" alt="${col.alt}" class="dy_c">&nbsp;<span>${res[i].cols}</span></a></li>
                                <li class="dy_c_nav"><a><img src="img/dy/评论.png" alt="1" class="dy_p">&nbsp;<span>${res[i].cots}</span></a></li>
                                <li class="dy_c_nav"><a><img src="img/dy/${com.img}" alt="${com.alt}" class="dy_f">&nbsp;<span>${res[i].fbs}</span></a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-lg-2 margin_top">
                        <div class="dy_type" style="display: none">dynamic</div>
                        <div class="dy_id" style="display: none">${res[i].id}</div>
                        <img src="img/心率.png" alt="">
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
                    <div class="col-lg-2 dy_c_content dy_c_icon"><img src="../${res[i].user_message.user_icon}" alt="" class="img-circle"></div>
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
                                <li class="dy_c_nav"><a><img src="img/dy/${col.img}" alt="${col.alt}" class="dy_c">&nbsp;<span>${res[i].cols}</span></a></li>
                                <li class="dy_c_nav"><a><img src="img/dy/评论.png" alt="1" class="dy_p">&nbsp;<span>${res[i].cots}</span></a></li>
                                <li class="dy_c_nav"><a><img src="img/dy/${com.img}" alt="${com.alt}" class="dy_f">&nbsp;<span>${res[i].fbs}</span></a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-lg-2 margin_top">
                        <div class="dy_type" style="display: none">journal</div>
                        <div class="dy_id" style="display: none">${res[i].id}</div>
                        <img src="img/日记.png" alt="">
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
                    <div class="col-lg-2 dy_c_content dy_c_icon"><img src="../${res[i].user_message.user_icon}" alt="" class="img-circle"></div>
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
                                <li class="dy_c_nav"><a><img src="img/dy/${col.img}" alt="${col.alt}" class="dy_c">&nbsp;<span>${res[i].cols}</span></a></li>
                                <li class="dy_c_nav"><a><img src="img/dy/评论.png" alt="1" class="dy_p">&nbsp;<span>${res[i].cots}</span></a></li>
                                <li class="dy_c_nav"><a><img src="img/dy/${com.img}" alt="${com.alt}" class="dy_f">&nbsp;<span>${res[i].fbs}</span></a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-lg-2 margin_top">
                        <div class="dy_type" style="display: none">test</div>
                        <div class="dy_id" style="display: none">${res[i].id}</div>
                        <img src="img/评价.png" alt="">
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
            //跳转单个页面
            let to_one=document.querySelectorAll('.to_one');
            for (let p=0;p<to_one.length;p++){
                to_one[p].onclick=function () {
                    let dy_message=this.parentElement.nextElementSibling.children;
                    sessionStorage.setItem('dy_type',dy_message[0].innerText);
                    sessionStorage.setItem('dy_id',dy_message[1].innerText);
                    sessionStorage.setItem('from','dynamic.html');
                    location.href='dynamic_one.html'
                };
            }

            //点赞收藏按键
            let dy_f=document.querySelectorAll('.dy_f');
            let dy_c=document.querySelectorAll('.dy_c');
            let dy_type=document.querySelectorAll('.dy_type');
            let dy_id=document.querySelectorAll('.dy_id');
            for (let i=0;i<dy_f.length;i++){
                dy_f[i].onclick=function () {
                    if (dy_f[i].alt!=='0') {
                        let u ={'user_id':localStorage.getItem('user_id'),'other_id':dy_id[i].innerText,'type':dy_type[i].innerText,'judge':'compliment','method':'add','data': myDate.getTime()};
                        getData(ajax_url+'/user/person',u,function (res) {
                            console.log(res);
                            if (res.status_code == '10018') {
                                dy_f[i].src='img/dy/点赞.png';
                                dy_f[i].alt='0';
                                dy_f[i].nextElementSibling.innerHTML=parseInt(dy_f[i].nextElementSibling.innerHTML)+1;
                            }else {
                                alert(res.status_text)
                            }
                        });
                    }else {
                        let u ={'user_id':localStorage.getItem('user_id'),'other_id':dy_id[i].innerText,'type':dy_type[i].innerText,'judge':'compliment','method':'delete'};
                        getData(ajax_url+'/user/person',u,function (res) {
                            console.log(res);
                            if (res.status_code == '10010') {
                                dy_f[i].src='img/dy/花.png';
                                dy_f[i].alt='1';
                                dy_f[i].nextElementSibling.innerHTML=parseInt(dy_f[i].nextElementSibling.innerHTML)-1;
                            }else {
                                alert(res.status_text)
                            }
                        });
                    }
                };
            }
            for (let m=0;m<dy_f.length;m++){
                dy_c[m].onclick=function () {
                    if (dy_c[m].alt!=='0') {
                        let u ={'user_id':localStorage.getItem('user_id'),'other_id':dy_id[m].innerText,'type':dy_type[m].innerText,'judge':'collections','method':'add','data': myDate.getTime()};
                        getData(ajax_url+'/user/person',u,function (res) {
                            console.log(res);
                            if (res.status_code == '10015') {
                                dy_c[m].src='img/dy/已收藏.png';
                                dy_c[m].alt='0';
                                dy_c[m].nextElementSibling.innerHTML=parseInt(dy_c[m].nextElementSibling.innerHTML)+1;
                            }else {
                                alert(res.status_text)
                            }
                        });
                    }else {
                        let u ={'user_id':localStorage.getItem('user_id'),'other_id':dy_id[m].innerText,'type':dy_type[m].innerText,'judge':'collections','method':'delete'};
                        getData(ajax_url+'/user/person',u,function (res) {
                            console.log(res);
                            if (res.status_code == '10010') {
                                dy_c[m].src='img/dy/收藏.png';
                                dy_c[m].alt='1';
                                dy_c[m].nextElementSibling.innerHTML=parseInt(dy_c[m].nextElementSibling.innerHTML)-1;
                            }else {
                                alert(res.status_text)
                            }
                        });
                    }
                };
            }
            
            //评论按钮
            let dy_p=document.querySelectorAll('.dy_p');
            for (let p=0;p<to_one.length;p++){
                dy_p[p].onclick=function () {
                    let this_p=this.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
                    if (this_p.children[this_p.children.length-1].classList.contains('comment-area')){
                        this_p.remove(this_p.children[this_p.children.length-1])
                    } else {
                        this_p.innerHTML+=`<div class="comment-area all_dy">
                <div class="row">
                    <div class="col-lg-2 dy_c_icon" style="margin-top: 15px"><img src="../${sessionStorage.getItem('user_icon')}" alt="" class="img-circle my_icon"></div>
                    <div class="col-lg-8 dy_c_content">
                        <div class="row dy_c_content my_com">
                            <textarea class="form-control dy_text" placeholder="请自觉遵守互联网相关的政策法规，严禁发布色情、暴力、反动的言论。" rows="3" maxlength="140"></textarea>
                            <div class="row row_margin" style="float: right;margin-right: 0;margin-top: 5px;">
                                <span class="content_margin remind_text">140</span>
                                <button type="button" class="btn btn-primary content_margin comment_btn">评论</button>
                            </div>
                        </div>
                        <div class="row dy_c_content line"></div>
                        <div class="row dy_c_content dy_comment">
                            <!--评论区-->
                        </div>
                        <div class="row" style="text-align: center;margin-top: 10px;margin-bottom: 10px">没有更多啦(〜￣△￣)〜</div>
                    </div>
                    <div class="col-lg-2 margin_top">

                    </div>
                </div>
            </div>`;

                        let this_aj=this_p.children[this_p.children.length - 1].children[0].children[1].children[2];
                        let this_text=this_p.children[this_p.children.length - 1].children[0].children[1].children[0].children[0];
                        let this_btn=this_p.children[this_p.children.length - 1].children[0].children[1].children[0].children[1].children[1];
                        let this_m=this.parentElement.parentElement.parentElement.parentElement.parentElement.nextElementSibling;
                        let remind_text=this_p.children[this_p.children.length - 1].children[0].children[1].children[0].children[1].children[0];
                        let m={'id':this_m.children[1].innerHTML,'type':this_m.children[0].innerHTML,'comment':1,'method':'check'};
                        text_num(remind_text,this_text);
                        comm(this_btn,this_text,this_aj,this_m);
                        dy_com(m,this_aj);
                    }
                }
            }
        })
    }

    //发布评论按钮
    function comm(btn,text,aj,tp){
        btn.onclick=function () {
            let myDate = new Date();
            let u={'user_id':sessionStorage.getItem('user_id'),'other_id':tp.children[1].innerHTML,'type':tp.children[0].innerHTML,'content':text.value,'data': myDate.getTime(),'comment':1,'method':'add'};
            let dy_text=document.querySelector('.dy_text');
            if (sessionStorage.getItem('user_id') && text.value) {
                getData(ajax_url+'/user/person',u,function (res) {
                    if (res.status_code=='10021') {
                        text.value='';
                        let m={'id':tp.children[1].innerHTML,'type':tp.children[0].innerHTML,'comment':1,'method':'check'};
                        dy_com(m,aj);
                    }else {
                        alert(res.status_text)
                    }
                })
            }
        }
    }

    //获取评论
    function dy_com(u,t){
        let dy_comment=document.querySelector('.dy_comment');
        getData(ajax_url+'/user/person',u,function (res) {
            if (res){
                let myDate = new Date();
                t.innerHTML='';
                for (let i=0;i<res.length;i++){
                    let num=parseInt(myDate.getTime())-parseInt(res[i].data);
                    let time=number_to_time(num);
                    t.innerHTML+=`<div class="com_one">
                            <div class="col-lg-1 dy_c_icon" style="margin-top: 5px"><img src="../${res[i].user_message.user_icon}" alt="" class="img-circle"></div>
                            <div class="col-lg-11 dy_c_content">
                                <div class="row" style="margin-left: 10px">
                                    <span><strong>${res[i].user_message.user_nickname}</strong></span>
                                    <br>
                                </div>
                                <div class="row" style="margin-left: 10px">
                                    <span>${res[i].comment_content}</span>
                                </div>
                                <br>
                                <div class="row" style="margin-left: 10px;color: darkgrey">
                                    <span>#${i+1}</span>
                                    <span style="color: darkgrey;font-size: 0.8em;margin-left: 15px">${time}</span>
                                </div>
                                <div class="row dy_c_content line"></div>
                        </div>
                        </div>`
                }
            }
        })
    }

    //字数限制
    function text_num(remind_text,dy_text){
        dy_text.onkeyup=function () {
            remind_text.innerText=140-(dy_text.value.length);
        }
    }

    //导航栏
    nav();
    function nav() {
        let dy_all=document.querySelector('.dy_all');
        let dy_x=document.querySelector('.dy_x');
        let dy_r=document.querySelector('.dy_r');
        let dy_c=document.querySelector('.dy_pingjia');
        dy_all.onclick=function () {
            dy_all.parentElement.classList.add('my_active');
            dy_x.parentElement.classList.remove('my_active');
            dy_r.parentElement.classList.remove('my_active');
            dy_c.parentElement.classList.remove('my_active');
            let dy_type=document.querySelectorAll('.dy_type');
            for (let i=0;i<dy_type.length;i++){
                dy_type[i].parentElement.parentElement.parentElement.style.display='block';
            }
        };
        dy_x.onclick=function () {
            dy_x.parentElement.classList.add('my_active');
            dy_all.parentElement.classList.remove('my_active');
            dy_r.parentElement.classList.remove('my_active');
            dy_c.parentElement.classList.remove('my_active');
            let dy_type=document.querySelectorAll('.dy_type');
            for (let i=0;i<dy_type.length;i++){
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
            for (let i=0;i<dy_type.length;i++){
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
            for (let i=0;i<dy_type.length;i++){
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
        } else if (seconds=>0) {
            var result=seconds+'秒前';
        } else {
            var result=null;
        }
        return result;
    }

})();