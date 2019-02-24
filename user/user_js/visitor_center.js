(function () {

    if (sessionStorage.getItem('other_message')){
        let user_message=sessionStorage.getItem('other_message');
        var re = JSON.parse(user_message);
    } else {
        location.href = '../index.html'
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

    // 传入数据—左边个人信息框
    perinf_ajax();
    function perinf_ajax() {
        if (sessionStorage.getItem('other_message')) {
            let user_message=sessionStorage.getItem('other_message');
            let res = JSON.parse(user_message);
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
        } else {
            location.href = '../index.html'
        }
    }

    // 导航栏切换
    change_nav();
    function change_nav() {
        let qz_nav=document.querySelector('#qz_nav');
        let dia=document.querySelector('.dd');
        let col=document.querySelector('.cc');
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

    // 获取日记本页数据
    dynamic_ajax();
    function dynamic_ajax(){
        let user={'user_id':re.user_id,'methods':'mydy'};
        let qz_dynamic=document.querySelector('.qz_dynamic');
        let myDate = new Date();
        postData(ajax_url+'/user/person',user,function (res) {
            console.log(res);
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
                    qz_dynamic.innerHTML+=`<div class="row all_dy dy_margin">
                <div class="row">
                    <div class="col-lg-2 dy_c_content dy_c_icon"><img src="../${re.user_icon}" alt="" class="img-circle"></div>
                    <div class="col-lg-8 dy_c_content" style="overflow: hidden">
                        <div class="row">
                            <span><strong style="font-size: 1.1em">${re.user_nickname}</strong></span>
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
                                <li class="dy_c_nav"><a><img src="../img/dy/${col.img}" alt="${col.alt}" class="dy_c">&nbsp;<span>${res[i].cols}</span></a></li>
                                <li class="dy_c_nav"><a><img src="../img/dy/评论.png" alt="1" class="dy_p">&nbsp;<span>${res[i].cots}</span></a></li>
                                <li class="dy_c_nav"><a><img src="../img/dy/${com.img}" alt="${com.alt}" class="dy_f">&nbsp;<span>${res[i].fbs}</span></a></li>
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
                        qz_dynamic.innerHTML+=`<div class="row all_dy dy_margin">
                <div class="row">
                    <div class="col-lg-2 dy_c_content dy_c_icon"><img src="../${re.user_icon}" alt="" class="img-circle"></div>
                    <div class="col-lg-8 dy_c_content" style="overflow: hidden">
                        <div class="row">
                            <span><strong style="font-size: 1.1em">${re.user_nickname}</strong></span>
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
                                <li class="dy_c_nav"><a><img src="../img/dy/${col.img}" alt="${col.alt}" class="dy_c">&nbsp;<span>${res[i].cols}</span></a></li>
                                <li class="dy_c_nav"><a><img src="../img/dy/评论.png" alt="1" class="dy_p">&nbsp;<span>${res[i].cots}</span></a></li>
                                <li class="dy_c_nav"><a><img src="../img/dy/${com.img}" alt="${com.alt}" class="dy_f">&nbsp;<span>${res[i].fbs}</span></a></li>
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
                            qz_dynamic.innerHTML+=`<div class="row all_dy dy_margin">
                <div class="row">
                    <div class="col-lg-2 dy_c_content dy_c_icon"><img src="../${re.user_icon}" alt="" class="img-circle"></div>
                    <div class="col-lg-8 dy_c_content"  style="overflow: hidden">
                        <div class="row">
                            <span><strong style="font-size: 1.1em">${re.user_nickname}</strong></span>
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
                                <li class="dy_c_nav"><a><img src="../img/dy/${col.img}" alt="${col.alt}" class="dy_c">&nbsp;<span>${res[i].cols}</span></a></li>
                                <li class="dy_c_nav"><a><img src="../img/dy/评论.png" alt="1" class="dy_p">&nbsp;<span>${res[i].cots}</span></a></li>
                                <li class="dy_c_nav"><a><img src="../img/dy/${com.img}" alt="${com.alt}" class="dy_f">&nbsp;<span>${res[i].fbs}</span></a></li>
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
            //跳转单个页面
            let to_one=document.querySelectorAll('.to_one');
            for (let p=0;p<to_one.length;p++){
                to_one[p].onclick=function () {
                    let dy_message=this.parentElement.nextElementSibling.children;
                    sessionStorage.setItem('dy_type',dy_message[0].innerText);
                    sessionStorage.setItem('dy_id',dy_message[1].innerText);
                    sessionStorage.setItem('from','/rainbow_diary_html/user/dynamic.html');
                    location.href='/rainbow_diary_html/user/dynamic_one.html'
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
                                dy_f[i].src='../img/dy/点赞.png';
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
                                dy_f[i].src='../img/dy/花.png';
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
                                dy_c[m].src='../img/dy/已收藏.png';
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
                                dy_c[m].src='../img/dy/收藏.png';
                                dy_c[m].alt='1';
                                dy_c[m].nextElementSibling.innerHTML=parseInt(dy_c[m].nextElementSibling.innerHTML)-1;
                            }else {
                                alert(res.status_text)
                            }
                        });
                    }
                };
            }

            collect_ajax(re.user_id);
        })
    }


    //获取收藏夹页数据
    function collect_ajax(id){
        let user={};
        if (sessionStorage.getItem('user_id')) {
            user={'user_id':id,'methods':'mycol','myid':sessionStorage.getItem('user_id')};
        }else {
            user={'user_id':id,'methods':'mycol'};
        }
        let qz_collect=document.querySelector('.qz_collect');
        let myDate = new Date();
        postData(ajax_url+'/user/person',user,function (res) {
            console.log(res);
            let myDate = new Date();
            for (let i = 0; i < res.length; i++) {
                let num = parseInt(myDate.getTime()) - parseInt(res[i].data);
                let time = number_to_time(num);
                let tags = res[i].tags.split(',');
                let col = {};
                let com = {};
                if (res[i].collection.status_code == '10017') {
                    col = {'img': '收藏.png', 'alt': 1}
                } else if (res[i].collection.status_code == '10016') {
                    col = {'img': '已收藏.png', 'alt': 0}
                } else {
                    console.log(res[i].collection);
                    col = {'img': '收藏.png', 'alt': 1}
                }
                if (res[i].compliment.status_code == '10020') {
                    com = {'img': '花.png', 'alt': 1}
                } else if (res[i].compliment.status_code == '10019') {
                    com = {'img': '点赞.png', 'alt': 0}
                } else {
                    console.log(res[i].collection);
                    com = {'img': '花.png', 'alt': 1}
                }
                if (res[i].t_name == 'dynamic') {
                    qz_collect.innerHTML += `<div class="row all_dy dy_margin">
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
                                <li class="dy_c_nav"><a><img src="../img/dy/${col.img}" alt="${col.alt}" class="dy_c">&nbsp;<span>${res[i].cols}</span></a></li>
                                <li class="dy_c_nav"><a><img src="../img/dy/评论.png" alt="1" class="dy_p">&nbsp;<span>${res[i].cots}</span></a></li>
                                <li class="dy_c_nav"><a><img src="../img/dy/${com.img}" alt="${com.alt}" class="dy_f">&nbsp;<span>${res[i].fbs}</span></a></li>
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
                    let dy_tags = document.querySelectorAll('.dy_tags');
                    let this_tags = dy_tags[dy_tags.length - 1];
                    for (let n in tags) {
                        this_tags.innerHTML += `<div class="one_tag">${tags[n]}</div>`
                    }
                } else {
                    if (res[i].t_name == 'journal') {
                        if (res[i].new_col.length > 30) {
                            res[i].new_col = res[i].new_col.slice(0, 30) + '...'
                        }
                        qz_collect.innerHTML += `<div class="row all_dy dy_margin">
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
                                <li class="dy_c_nav"><a><img src="../img/dy/${col.img}" alt="${col.alt}" class="dy_c">&nbsp;<span>${res[i].cols}</span></a></li>
                                <li class="dy_c_nav"><a><img src="../img/dy/评论.png" alt="1" class="dy_p">&nbsp;<span>${res[i].cots}</span></a></li>
                                <li class="dy_c_nav"><a><img src="../img/dy/${com.img}" alt="${com.alt}" class="dy_f">&nbsp;<span>${res[i].fbs}</span></a></li>
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
                        let dy_tags = document.querySelectorAll('.dy_tags');
                        let this_tags = dy_tags[dy_tags.length - 1];
                        for (let n in tags) {
                            this_tags.innerHTML += `<div class="one_tag">${tags[n]}</div>`
                        }
                    } else {
                        if (res[i].t_name == 'test') {
                            if (res[i].new_col) {
                                var c = res[i].new_col.split('&');
                            } else {
                                var c = ['', '']
                            }
                            qz_collect.innerHTML += `<div class="row all_dy dy_margin">
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
                                <li class="dy_c_nav"><a><img src="../img/dy/${col.img}" alt="${col.alt}" class="dy_c">&nbsp;<span>${res[i].cols}</span></a></li>
                                <li class="dy_c_nav"><a><img src="../img/dy/评论.png" alt="1" class="dy_p">&nbsp;<span>${res[i].cots}</span></a></li>
                                <li class="dy_c_nav"><a><img src="../img/dy/${com.img}" alt="${com.alt}" class="dy_f">&nbsp;<span>${res[i].fbs}</span></a></li>
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
                            let dy_tags = document.querySelectorAll('.dy_tags');
                            let this_tags = dy_tags[dy_tags.length - 1];
                            for (let n in tags) {
                                this_tags.innerHTML += `<div class="one_tag">${tags[n]}</div>`
                            }
                        }
                    }
                }
            }
            //跳转单个页面
            let to_one = document.querySelectorAll('.to_one');
            for (let p = 0; p < to_one.length; p++) {
                to_one[p].onclick = function () {
                    let dy_message = this.parentElement.nextElementSibling.children;
                    sessionStorage.setItem('dy_type', dy_message[0].innerText);
                    sessionStorage.setItem('dy_id', dy_message[1].innerText);
                    sessionStorage.setItem('from', '/rainbow_diary_html/user/dynamic.html');
                    location.href = '/rainbow_diary_html/user/dynamic_one.html'
                };
            }

            //点赞收藏按键
            let dy_f = document.querySelectorAll('.dy_f');
            let dy_c = document.querySelectorAll('.dy_c');
            let dy_type = document.querySelectorAll('.dy_type');
            let dy_id = document.querySelectorAll('.dy_id');
            for (let i = 0; i < dy_f.length; i++) {
                dy_f[i].onclick = function () {
                    let this_m = this.parentElement.parentElement.parentElement.parentElement.parentElement.nextElementSibling.children;
                    sessionStorage.setItem('dy_type', this_m[0].innerText);
                    sessionStorage.setItem('dy_id', this_m[1].innerText);
                    sessionStorage.setItem('from', '/rainbow_diary_html/user/dynamic.html');
                    location.href = '/rainbow_diary_html/user/dynamic_one.html'
                };
            }
            for (let m = 0; m < dy_f.length; m++) {
                dy_c[m].onclick = function () {
                    let this_m = this.parentElement.parentElement.parentElement.parentElement.parentElement.nextElementSibling.children;
                    sessionStorage.setItem('dy_type', this_m[0].innerText);
                    sessionStorage.setItem('dy_id', this_m[1].innerText);
                    sessionStorage.setItem('from', '/rainbow_diary_html/user/dynamic.html');
                    location.href = '/rainbow_diary_html/user/dynamic_one.html'
                };
            }

            //评论按钮
            let dy_p = document.querySelectorAll('.dy_p');
            for (let p = 0; p < to_one.length; p++) {
                dy_p[p].onclick = function () {
                    let this_m = this.parentElement.parentElement.parentElement.parentElement.parentElement.nextElementSibling.children;
                    sessionStorage.setItem('dy_type', this_m[0].innerText);
                    sessionStorage.setItem('dy_id', this_m[1].innerText);
                    sessionStorage.setItem('from', '/rainbow_diary_html/user/dynamic.html');
                    location.href = '/rainbow_diary_html/user/dynamic_one.html'
                }
            }
        })
    }



})();