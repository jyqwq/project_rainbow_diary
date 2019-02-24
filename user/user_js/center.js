(function f() {

    //获取数据—添加个人信息
    perinf_ajax();
    function perinf_ajax() {
        if (localStorage.getItem('user_id')) {
            var user_id = {'user_id': localStorage.getItem('user_id'),'methods':'get'};
        } else {
            location.href = '../user/login.html'
        }
        postData(ajax_url + '/user/person', user_id, function (res) {
            let portrait=document.querySelector('.qz_portrait');
            let qz_an=document.querySelector('.qz_an');
            let qz_ag=document.querySelector('.qz_ag');
            let follow=document.querySelector('.follow');
            let fanc=document.querySelector('.fanc');
            portrait.src='../'+res.user_icon;
            qz_an.innerHTML = res.user_nickname;
            qz_ag.innerHTML = res.user_autograpgh;
            follow.innerHTML='关注数：'+res.user_watchs;
            fanc.innerHTML='粉丝数：'+res.user_fans;
        })
    }

    // 获取日记本页数据
    dynamic_ajax();
    function dynamic_ajax(){
        let user_id=localStorage.getItem('user_id');
        let user={'user_id':parseInt(user_id),'methods':'mydy'};
        let qz_dynamic=document.querySelector('.qz_dynamic');
        let myDate = new Date();
        postData(ajax_url+'/user/person',user,function (res) {
            console.log(res);
            for (let i=0;i<res.length;i++){
                let num=parseInt(myDate.getTime())-parseInt(res[i].data);
                let time=number_to_time(num);
                let tags=res[i].tags.split(',');
                if (res[i].t_name=='dynamic') {
                    qz_dynamic.innerHTML+=`<!--动态-->
        <div class="row all_dy dy_margin">
            <div class="row">
                <div class="col-lg-1"></div>
                <div class="col-lg-1 dy_c_content dy_c_icon"><img src="../img/222center222/dynamic_head.jpg" class="img-responsive" alt="Responsive image"></div>
                <div class="col-lg-8 dy_c_content" style="overflow: hidden">
                    <div class="row">
                        <span><strong style="font-size: 1.1em">南浅</strong></span>
                        <br>
                        <div class="font_time" style="color: darkgrey;font-size: 0.9em">
                            <span class="rel_time">${time}</span>
                        </div>
                        <div class="dy_tags"></div>
                    </div>
                    <div class="row dy_c_content to_one">
                        <div class="qz_dinf">${res[i].words}</div>                  
                    </div>
                    <span class="font_full">展开全文</span>
                    <div class="row">
                        <div class="col-lg-5">
                            <div class="row dy_c_content">
                                <img src="../${res[i].dynamic_images}" class="img-responsive" alt="Responsive image">
                            </div>
                        </div>
                    </div>
                    <div class="row margin_top">
                        <ul class="nav">
                            <li class="dy_c_nav"><a href="#"><img src="../img/dy/分享转发.png" alt="">&nbsp;<span>10</span></a></li>
                            <li class="dy_c_nav"><a href="#"><img src="../img/dy/评论.png" alt="">&nbsp;<span>4</span></a></li>
                            <li class="dy_c_nav"><a href="#"><img src="../img/dy/点赞.png" alt="">&nbsp;<span>5</span></a></li>
                        </ul>
                    </div>
                </div>
                <div class="col-lg-2 margin_top">
                    <div class="dy_type" style="display: none">dynamic</div>
                    <div class="dy_id" style="display: none">${res[i].id}</div>
                    <img src="../img/心率.png" alt="">
                </div>
            </div>
        </div>
        <!--分割线-->
        <div class="qz_line"></div>`;
                    let dy_tags=document.querySelectorAll('.dy_tags');
                    let this_tags=dy_tags[dy_tags.length-1];
                    for (let n in tags) {
                        this_tags.innerHTML+=`<div class="one_tag">${tags[n]}</div>`
                    }
                    // unfold_text();
                    // 展开全文
                    // function unfold_text() {
                    //     let qz_dinf=document.querySelectorAll('.qz_dinf');
                    //     let font_full=document.querySelectorAll('.font_full');
                    //     for (let i=0;i<qz_dinf.length;i++){
                    //         if(qz_dinf[i].offsetHeight>55){
                    //             console.log(qz_dinf[i].offsetHeight);
                    //             font_full[i].style.display='block';
                    //             console.log(font_full[i]);
                    //             font_full[i].onclick=function (event) {
                    //                 let node=event && event.target;
                    //                 console.log(node);
                    //                 // node.previousElementSibling.classList.toggle('qz_dinf');
                    //                 // if(node.previousElementSibling.classList[0]=='qz_dinf'){
                    //                 //     node.innerText='展开全文';
                    //                 // }
                    //                 // else {
                    //                 //     node.innerText='收起';
                    //                 // }
                    //             }
                    //         }
                    //     }
                    // }
                }else {``
                    if (res[i].t_name=='journal') {
                        if (res[i].new_col.length>30) {
                            res[i].new_col=res[i].new_col.slice(0,30)+'...'
                        }
                        qz_dynamic.innerHTML+=`<!--日记-->
        <div class="row all_dy dy_margin">
            <div class="row">
                <div class="col-lg-1"></div>
                <div class="col-lg-1 dy_c_content dy_c_icon"><img src="../img/222center222/dynamic_head.jpg" class="img-responsive" alt="Responsive image"></div>
                <div class="col-lg-8 dy_c_content" style="overflow: hidden">
                    <div class="row">
                        <span><strong style="font-size: 1.1em">南浅</strong></span>
                        <br>
                        <div class="font_time" style="color: darkgrey;font-size: 0.9em">
                            <span class="rel_time">${time}</span>
                        </div>
                        <div class="dy_tags"></div>
                    </div>
                    <div class="row dy_c_content to_one">
                        <span style="font-size: 1.1em"><strong>${res[i].words}</strong></span>
                        <br>
                        <span>${res[i].new_col}</span>
                    </div>
                    <div class="row">
                        <div class="col-lg-5">
                            <div class="row dy_c_content">
                                <img src="../${res[i].dynamic_images}" class="img-responsive" alt="Responsive image">
                            </div>
                        </div>
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
                    <div class=" dy_type" style="display: none">journal</div>
                    <div class="dy_id" style="display: none">${res[i].id}</div>
                    <img src="../img/日记.png" alt="">
                </div>
            </div>
        </div>
        <!--分割线-->
        <div class="qz_line"></div>`;
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
                            qz_dynamic.innerHTML+=`<!--测评-->
        <div class="row all_dy dy_margin">
            <div class="row">
                <div class="col-lg-1"></div>
                <div class="col-lg-1 dy_c_content dy_c_icon">
                    <img src="../img/222center222/dynamic_head.jpg" class="img-responsive" alt="Responsive image">
                </div>
                <div class="col-lg-8 dy_c_content"  style="overflow: hidden">
                    <div class="row">
                        <span><strong style="font-size: 1.1em">南浅</strong></span>
                        <br>
                        <div class="font_time" style="color: darkgrey;font-size: 0.9em">
                            <span class="rel_time">${time}</span>
                        </div>
                        <div class="dy_tags"></div>
                    </div>
                    <div class="row dy_c_content to_one">
                        <span style="font-size: 1.1em"><strong>${res[i].words}</strong></span>
                        <br>
                        <span>${c[0]}</span>
                        <br>
                        <span>${c[1]}</span>
                    </div>
                    <div class="row">
                        <div class="col-lg-5">
                            <div class="row dy_c_content">
                                <img src="../${res[i].dynamic_images}" class="img-responsive" alt="Responsive image">
                            </div>
                        </div>

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
        </div>
        <!--分割线-->
        <div class="qz_line"></div>`;
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
            // 改。。。
            for (let p in to_one){
                to_one[p].onclick=function () {
                    let dy_message=this.parentElement.nextElementSibling.children;
                    sessionStorage.setItem('dy_type',dy_message[0].innerText);
                    sessionStorage.setItem('dy_id',dy_message[1].innerText);
                    sessionStorage.setItem('from','/rainbow_diary_html/user/dynamic.html');
                    location.href='/rainbow_diary_html/user/dynamic_one.html'
                }
            }
            collect_ajax();
        })
    }

    //获取收藏夹页数据
    function collect_ajax(){
        let user_id=localStorage.getItem('user_id');
        let user={'user_id':parseInt(user_id),'methods':'mycol'};
        let qz_collect=document.querySelector('.qz_collect');
        let myDate = new Date();
        postData(ajax_url+'/user/person',user,function (res) {
            for (let i=0;i<res.length;i++){
                let num=parseInt(myDate.getTime())-parseInt(res[i].data);
                let time=number_to_time(num);
                let tags=res[i].tags.split(',');
                if (res[i].t_name=='dynamic') {
                    qz_collect.innerHTML+=`<!--动态-->
        <div class="row all_dy dy_margin">
            <div class="row">
                <div class="col-lg-1"></div>
                <div class="col-lg-1 dy_c_content dy_c_icon"><img src="../img/222center222/dynamic_head.jpg" class="img-responsive" alt="Responsive image"></div>
                <div class="col-lg-8 dy_c_content" style="overflow: hidden">
                    <div class="row">
                        <span><strong style="font-size: 1.1em">南浅</strong></span>
                        <br>
                        <div class="font_time" style="color: darkgrey;font-size: 0.9em">
                            <span class="rel_time">${time}</span>
                        </div>
                        <div class="dy_tags"></div>
                    </div>
                    <div class="row dy_c_content to_one">
                        <div class="qz_dinf">${res[i].words}</div>                  
                    </div>
                    <span class="font_full">展开全文</span>
                    <div class="row">
                        <div class="col-lg-5">
                            <div class="row dy_c_content">
                                <img src="../${res[i].dynamic_images}" class="img-responsive" alt="Responsive image">
                            </div>
                        </div>
                    </div>
                    <div class="row margin_top">
                        <ul class="nav">
                            <li class="dy_c_nav"><a href="#"><img src="../img/dy/分享转发.png" alt="">&nbsp;<span>10</span></a></li>
                            <li class="dy_c_nav"><a href="#"><img src="../img/dy/评论.png" alt="">&nbsp;<span>4</span></a></li>
                            <li class="dy_c_nav"><a href="#"><img src="../img/dy/点赞.png" alt="">&nbsp;<span>5</span></a></li>
                        </ul>
                    </div>
                </div>
                <div class="col-lg-2 margin_top">
                    <div class="dy_type" style="display: none">dynamic</div>
                    <div class="dy_id" style="display: none">${res[i].id}</div>
                    <img src="../img/心率.png" alt="">
                </div>
            </div>
        </div>
        <!--分割线-->
        <div class="qz_line"></div>`;
                    let dy_tags=document.querySelectorAll('.dy_tags');
                    let this_tags=dy_tags[dy_tags.length-1];
                    for (let n in tags) {
                        this_tags.innerHTML+=`<div class="one_tag">${tags[n]}</div>`
                    }
                    // unfold_text();
                    // 展开全文
                    // function unfold_text() {
                    //     let qz_dinf=document.querySelectorAll('.qz_dinf');
                    //     let font_full=document.querySelectorAll('.font_full');
                    //     for (let i=0;i<qz_dinf.length;i++){
                    //         if(qz_dinf[i].offsetHeight>55){
                    //             console.log(qz_dinf[i].offsetHeight);
                    //             font_full[i].style.display='block';
                    //             console.log(font_full[i]);
                    //             font_full[i].onclick=function (event) {
                    //                 let node=event && event.target;
                    //                 console.log(node);
                    //                 // node.previousElementSibling.classList.toggle('qz_dinf');
                    //                 // if(node.previousElementSibling.classList[0]=='qz_dinf'){
                    //                 //     node.innerText='展开全文';
                    //                 // }
                    //                 // else {
                    //                 //     node.innerText='收起';
                    //                 // }
                    //             }
                    //         }
                    //     }
                    // }
                }else {``
                    if (res[i].t_name=='journal') {
                        if (res[i].new_col.length>30) {
                            res[i].new_col=res[i].new_col.slice(0,30)+'...'
                        }
                        qz_collect.innerHTML+=`<!--日记-->
        <div class="row all_dy dy_margin">
            <div class="row">
                <div class="col-lg-1"></div>
                <div class="col-lg-1 dy_c_content dy_c_icon"><img src="../img/222center222/dynamic_head.jpg" class="img-responsive" alt="Responsive image"></div>
                <div class="col-lg-8 dy_c_content" style="overflow: hidden">
                    <div class="row">
                        <span><strong style="font-size: 1.1em">南浅</strong></span>
                        <br>
                        <div class="font_time" style="color: darkgrey;font-size: 0.9em">
                            <span class="rel_time">${time}</span>
                        </div>
                        <div class="dy_tags"></div>
                    </div>
                    <div class="row dy_c_content to_one">
                        <span style="font-size: 1.1em"><strong>${res[i].words}</strong></span>
                        <br>
                        <span>${res[i].new_col}</span>
                    </div>
                    <div class="row">
                        <div class="col-lg-5">
                            <div class="row dy_c_content">
                                <img src="../${res[i].dynamic_images}" class="img-responsive" alt="Responsive image">
                            </div>
                        </div>
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
                    <div class=" dy_type" style="display: none">journal</div>
                    <div class="dy_id" style="display: none">${res[i].id}</div>
                    <img src="../img/日记.png" alt="">
                </div>
            </div>
        </div>
        <!--分割线-->
        <div class="qz_line"></div>`;
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
                            qz_collect.innerHTML+=`<!--测评-->
        <div class="row all_dy dy_margin">
            <div class="row">
                <div class="col-lg-1"></div>
                <div class="col-lg-1 dy_c_content dy_c_icon">
                    <img src="../img/222center222/dynamic_head.jpg" class="img-responsive" alt="Responsive image">
                </div>
                <div class="col-lg-8 dy_c_content"  style="overflow: hidden">
                    <div class="row">
                        <span><strong style="font-size: 1.1em">南浅</strong></span>
                        <br>
                        <div class="font_time" style="color: darkgrey;font-size: 0.9em">
                            <span class="rel_time">${time}</span>
                        </div>
                        <div class="dy_tags"></div>
                    </div>
                    <div class="row dy_c_content to_one">
                        <span style="font-size: 1.1em"><strong>${res[i].words}</strong></span>
                        <br>
                        <span>${c[0]}</span>
                        <br>
                        <span>${c[1]}</span>
                    </div>
                    <div class="row">
                        <div class="col-lg-5">
                            <div class="row dy_c_content">
                                <img src="../${res[i].dynamic_images}" class="img-responsive" alt="Responsive image">
                            </div>
                        </div>

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
        </div>
        <!--分割线-->
        <div class="qz_line"></div>`;
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
            // 改。。。
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

    // 传入数据—收纳盒页
    let cosmetics=[
        {
            "img":"https://img1.bevol.cn/Goods/source/55ee791e8291b.jpg@90p",
            "title":"兰蔻新精华肌底液",
            "information":"英文名称：LANCOME ADVANCED GENIFIQUE"
        },
        {
            "img":"https://img0.bevol.cn/Goods/source/570718c5a24f2.jpg@90p",
            "title":"兰蔻新精华肌底液",
            "information":"英文名称：LANCOME ADVANCED GENIFIQUE"
        },
        {
            "img":"https://img0.bevol.cn/Goods/source/55dae7cf7cf08.jpg@50p",
            "title":"兰蔻新精华肌底液",
            "information":"英文名称：LANCOME ADVANCED GENIFIQUE"
        },
        {
            "img":"https://img1.bevol.cn/Goods/source/55ee791e8291b.jpg@90p",
            "title":"兰蔻新精华肌底液",
            "information":"英文名称：LANCOME ADVANCED GENIFIQUE"
        },
        {
            "img":"https://img0.bevol.cn/Goods/source/570718c5a24f2.jpg@90p",
            "title":"兰蔻新精华肌底液",
            "information":"英文名称：LANCOME ADVANCED GENIFIQUE"
        },
        {
            "img":"https://img0.bevol.cn/Goods/source/55dae7cf7cf08.jpg@50p",
            "title":"兰蔻新精华肌底液",
            "information":"英文名称：LANCOME ADVANCED GENIFIQUE"
        },
        {
            "img":"https://img1.bevol.cn/Goods/source/55ee791e8291b.jpg@90p",
            "title":"兰蔻新精华肌底液",
            "information":"英文名称：LANCOME ADVANCED GENIFIQUE"
        },
        {
            "img":"https://img0.bevol.cn/Goods/source/570718c5a24f2.jpg@90p",
            "title":"兰蔻新精华肌底液",
            "information":"英文名称：LANCOME ADVANCED GENIFIQUE"
        },
        {
            "img":"https://img0.bevol.cn/Goods/source/55dae7cf7cf08.jpg@50p",
            "title":"兰蔻新精华肌底液",
            "information":"英文名称：LANCOME ADVANCED GENIFIQUE"
        },
    ]//测试
    oload();
    function oload(){
        var cos_body=document.querySelector('.cos_body');
        for(let cosmetic of cosmetics){
            cos_body.innerHTML+=`<div class="row qz_row">
                                        <div class="hidden-xs col-sm-1 col-md-1 col-lg-1"></div>
                                        <div class="col-xs-12 col-sm-10 col-md-10 col-lg-10">
                                            <div class="row">
                                                <div class="col-xs-4 col-sm-2 col-md-2 col-lg-2">
                                                    <div class="dedli_pic">
                                                        <img src="${cosmetic.img}" class="img-responsive anima_pul" alt="Responsive image">
                                                    </div>
                                                </div>
                                                <div class="col-xs-6 col-sm-8 col-md-9 col-lg-8">
                                                    <div class="dedli_inf">
                                                        <a class="qz_a" href="#">
                                                            <span class="qz_dis">${cosmetic.title}</span><br>
                                                            <span class="qz_dip">${cosmetic.information}</span><br>
                                                            <span class="qz_dia">剩余365天</span>
                                                        </a>
                                                    </div>
                                                </div>
                                                <div class="col-xs-2 col-sm-2 col-md-1 col-lg-2 animal_swi">
                                                    <a href="#"><span class="qz_das">编辑</span></a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="hidden-xs col-sm-1 col-md-1 col-lg-1"></div>
                                    </div>
                                    <!--分割线-->
                                    <div class="qz_line"></div>`
        }
    }

    // 大导航栏切换
    let nav=document.querySelector('.qz_nav');
    nav.onclick=function (event) {
        var dyn=document.querySelector('.qz_dynamic');
        var col=document.querySelector('.qz_collect');
        var set=document.querySelector('.qz_set');
        let set_siu=document.querySelector('.set_siu');
        if(event.target.nodeName.toLowerCase()=='a') {
            var li = event.target.parentNode;
            if(li.nextElementSibling.nextElementSibling){
                if(li.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling){
                    for(k=1;k<6;k+=2){li.parentNode.children[k].children[0].classList.remove('ico_lin_act');}
                    li.childNodes[0].classList.add('ico_lin_act');
                    dyn.classList.add('animal_siu');
                    dyn.style.display='block';
                    col.style.display='none';
                    set.style.display='none';
                } else {
                    for(k=1;k<6;k+=2){li.parentNode.children[k].children[0].classList.remove('ico_lin_act');}
                    li.childNodes[0].classList.add('ico_lin_act');
                    col.classList.add('animal_siu');
                    dyn.style.display='none';
                    col.style.display='block';
                    set.style.display='none';
                    }}else {
                for(k=1;k<6;k+=2){li.parentNode.children[k].children[0].classList.remove('ico_lin_act');}
                li.childNodes[0].classList.add('ico_lin_act');
                set_siu.classList.add('animal_siu');
                dyn.style.display='none';
                col.style.display='none';
                set.style.display='block';
            }
        }
    }

    //收纳盒导航栏切换
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

    // 时间转换几天前
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
        } else if (seconds>=0) {
            var result=seconds+'秒前';
        } else {
            var result=null;
        }
        return result;
    }

})();