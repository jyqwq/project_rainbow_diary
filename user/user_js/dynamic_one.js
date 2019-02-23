(function () {

    //获取缓存
    dy();
    function dy(){
        let user_id=NaN;
        if (sessionStorage.getItem('user_id')) {
            user_id=sessionStorage.getItem('user_id');
            let my_icon=document.querySelector('.my_icon');
            my_icon.src=`../${sessionStorage.getItem('user_icon')}`
        }else {
            user_id=0
        }
        if (sessionStorage.getItem('dy_id') && sessionStorage.getItem('dy_type')){
            let u={'id':sessionStorage.getItem('dy_id'),'type':sessionStorage.getItem('dy_type'),'user_id':user_id};
            let m={'id':sessionStorage.getItem('dy_id'),'type':sessionStorage.getItem('dy_type'),'comment':1,'method':'check'};
            dy_onload(u);
            dy_com(m);
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
            let col={};
            let com={};
            if (res.collection.status_code=='10017') {
                col={'img':'收藏.png','alt':1}
            }else if (res.collection.status_code=='10016') {
                col={'img':'已收藏.png','alt':0}
            }else {
                console.log(res.collection);
                col={'img':'收藏.png','alt':1}
            }
            if (res.compliment.status_code=='10020') {
                com={'img':'花.png','alt':1}
            }else if (res.compliment.status_code=='10019') {
                com={'img':'点赞.png','alt':0}
            }else {
                console.log(res.collection);
                com={'img':'花.png','alt':1}
            }
            if (u['type']=='dynamic') {
                dy_ajax.innerHTML+=`<div class="row all_dy dy_margin">
                <div class="row">
                    <div class="col-lg-2 dy_c_content dy_c_icon"><img src="../${res.user_message.user_icon}" alt="" class="img-circle"></div>
                    <div class="col-lg-8 dy_c_content" style="overflow: hidden">
                        <div class="row">
                            <span><strong style="font-size: 1.1em">${res.user_message.user_nickname}</strong></span>
                            <br>
                            <span style="color: darkgrey;font-size: 0.9em">${time}</span>
                            <div class="dy_tags"></div>
                        </div>
                        <div class="row dy_c_content">
                            <span>${res.words}</span>
                        </div>
                        <div class="row dy_c_content">
                            <img src="../${res.dynamic_images}" alt="">
                        </div>
                        <div class="row margin_top">
                            <ul class="nav">
                                <li class="dy_c_nav"><a><img src="../img/dy/${col.img}" alt="${col.alt}" class="dy_c">&nbsp;<span>${res.cols}</span></a></li>
                                <li class="dy_c_nav"><a><img src="../img/dy/评论.png" alt="1">&nbsp;<span>${res.cots}</span></a></li>
                                <li class="dy_c_nav"><a><img src="../img/dy/${com.img}" alt="${com.alt}" class="dy_f">&nbsp;<span>${res.fbs}</span></a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-lg-2 margin_top">
                        <div class="dy_type" style="display: none">dynamic</div>
                        <div class="dy_id" style="display: none">${res.id}</div>
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
                    <div class="col-lg-2 dy_c_content dy_c_icon"><img src="../${res.user_message.user_icon}" alt="" class="img-circle"></div>
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
                                <li class="dy_c_nav"><a><img src="../img/dy/${col.img}" alt="${col.alt}" class="dy_c">&nbsp;<span>${res.cols}</span></a></li>
                                <li class="dy_c_nav"><a><img src="../img/dy/评论.png" alt="1">&nbsp;<span>${res.cots}</span></a></li>
                                <li class="dy_c_nav"><a><img src="../img/dy/${com.img}" alt="${com.alt}" class="dy_f">&nbsp;<span>${res.fbs}</span></a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-lg-2 margin_top">
                        <div class="dy_type" style="display: none">journal</div>
                        <div class="dy_id" style="display: none">${res.id}</div>
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
                    <div class="col-lg-2 dy_c_content dy_c_icon"><img src="../${res.user_message.user_icon}" alt="" class="img-circle"></div>
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
                                <li class="dy_c_nav"><a><img src="../img/dy/${col.img}" alt="${col.alt}" class="dy_c">&nbsp;<span>${res.cols}</span></a></li>
                                <li class="dy_c_nav"><a><img src="../img/dy/评论.png" alt="1">&nbsp;<span>${res.cots}</span></a></li>
                                <li class="dy_c_nav"><a><img src="../img/dy/${com.img}" alt="${com.alt}" class="dy_f">&nbsp;<span>${res.fbs}</span></a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-lg-2 margin_top">
                        <div class="dy_type" style="display: none">test</div>
                        <div class="dy_id" style="display: none">${res.id}</div>
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
            //点赞收藏按键
            let dy_f=document.querySelector('.dy_f');
            let dy_c=document.querySelector('.dy_c');
            let dy_type=document.querySelector('.dy_type');
            let dy_id=document.querySelector('.dy_id');
            dy_f.onclick=function () {
                if (dy_f.alt!=='0') {
                    let u ={'user_id':localStorage.getItem('user_id'),'other_id':dy_id.innerText,'type':dy_type.innerText,'judge':'compliment','method':'add','data': myDate.getTime()};
                    getData(ajax_url+'/user/person',u,function (res) {
                        console.log(res);
                        if (res.status_code == '10018') {
                            dy_f.src='../img/dy/点赞.png';
                            dy_f.alt='0';
                            dy_f.nextElementSibling.innerHTML=parseInt(dy_f.nextElementSibling.innerHTML)+1;
                        }else {
                            alert(res.status_text)
                        }
                    });
                }else {
                    let u ={'user_id':localStorage.getItem('user_id'),'other_id':dy_id.innerText,'type':dy_type.innerText,'judge':'compliment','method':'delete'};
                    getData(ajax_url+'/user/person',u,function (res) {
                        console.log(res);
                        if (res.status_code == '10010') {
                            dy_f.src='../img/dy/花.png';
                            dy_f.alt='1';
                            dy_f.nextElementSibling.innerHTML=parseInt(dy_f.nextElementSibling.innerHTML)-1;
                        }else {
                            alert(res.status_text)
                        }
                    });
                }
            };
            dy_c.onclick=function () {
                if (dy_c.alt!=='0') {
                    let u ={'user_id':localStorage.getItem('user_id'),'other_id':dy_id.innerText,'type':dy_type.innerText,'judge':'collections','method':'add','data': myDate.getTime()};
                    getData(ajax_url+'/user/person',u,function (res) {
                        console.log(res);
                        if (res.status_code == '10015') {
                            dy_c.src='../img/dy/已收藏.png';
                            dy_c.alt='0';
                            dy_c.nextElementSibling.innerHTML=parseInt(dy_c.nextElementSibling.innerHTML)+1;
                        }else {
                            alert(res.status_text)
                        }
                    });
                }else {
                    let u ={'user_id':localStorage.getItem('user_id'),'other_id':dy_id.innerText,'type':dy_type.innerText,'judge':'collections','method':'delete'};
                    getData(ajax_url+'/user/person',u,function (res) {
                        console.log(res);
                        if (res.status_code == '10010') {
                            dy_c.src='../img/dy/收藏.png';
                            dy_c.alt='1';
                            dy_c.nextElementSibling.innerHTML=parseInt(dy_c.nextElementSibling.innerHTML)-1;
                        }else {
                            alert(res.status_text)
                        }
                    });
                }
            };


            //关注状态
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
    //获取评论
    function dy_com(u){
        let dy_comment=document.querySelector('.dy_comment');
        getData(ajax_url+'/user/person',u,function (res) {
            if (res){
                let myDate = new Date();
                dy_comment.innerHTML='';
                for (let i=0;i<res.length;i++){
                    let num=parseInt(myDate.getTime())-parseInt(res[i].data);
                    let time=number_to_time(num);
                    dy_comment.innerHTML+=`<div class="com_one">
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

    //评论
    comm();
    function comm(){
        let comment_btn=document.querySelector('.comment_btn');
        comment_btn.onclick=function () {
            let dy_text=document.querySelector('.dy_text');
            let myDate = new Date();
            if (sessionStorage.getItem('user_id') && dy_text.value) {
                let u={'user_id':sessionStorage.getItem('user_id'),'other_id':sessionStorage.getItem('dy_id'),'type':sessionStorage.getItem('dy_type'),'content':dy_text.value,'data': myDate.getTime(),'comment':1,'method':'add'};
                getData(ajax_url+'/user/person',u,function (res) {
                    if (res.status_code=='10021') {
                        dy_text.value='';
                        let myDate = new Date();
                        let m={'id':sessionStorage.getItem('dy_id'),'type':sessionStorage.getItem('dy_type'),'comment':1,'method':'check'};
                        dy_com(m);
                    }else {
                        alert(res.status_text)
                    }
                })
            }
        }
    }

    //关注按钮
    follow();
    function follow() {
        let follow=document.querySelector('.follow');
        let isfollow=document.querySelector('.isfollow');
        follow.onclick=function () {
            let myDate = new Date();
            follow.parentElement.parentElement.style.display='none';
            isfollow.parentElement.parentElement.style.display='block';
            let v={'user_id':sessionStorage.getItem('user_id'),'other_id':sessionStorage.getItem('other_id'),'method':'add','data': myDate.getTime()};
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

    //字数限制
    text_num();
    function text_num(){
        let remind_text=document.querySelector('.remind_text');
        let dy_text=document.querySelector('.dy_text');
        dy_text.onkeyup=function () {
            remind_text.innerText=140-(dy_text.value.length);
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