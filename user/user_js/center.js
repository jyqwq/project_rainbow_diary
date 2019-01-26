(function f() {

    // 导航栏切换
    var nav=document.querySelector('.qz_nav');
    nav.onclick=function (event) {
        var hom=document.querySelector('.qz_home');
        var mic=document.querySelector('.mic_body');
        var col=document.querySelector('.qz_collect');
        var set=document.querySelector('.qz_set');
        if(event.target.nodeName.toLowerCase()=='a') {
            var li = event.target.parentNode;
            if(li.nextElementSibling.nextElementSibling){
                if(li.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling){
                    if(li.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling){
                        for(k=1;k<16;k+=2){li.parentNode.childNodes[k].childNodes[0].classList.remove('ico_lin_act');}
                        li.childNodes[0].classList.add('ico_lin_act');
                        hom.classList.add('animal_sil');
                        hom.style.display='block';
                        mic.style.display='none';
                        col.style.display='none';
                        set.style.display='none';
                    } else {
                        for(k=1;k<16;k+=2){li.parentNode.childNodes[k].childNodes[0].classList.remove('ico_lin_act');}
                        li.childNodes[0].classList.add('ico_lin_act');
                        mic.classList.add('animal_sil');
                        hom.style.display='none';
                        mic.style.display='block';
                        col.style.display='none';
                        set.style.display='none';
                    }}else {
                    for(k=1;k<16;k+=2){li.parentNode.childNodes[k].childNodes[0].classList.remove('ico_lin_act');}
                    li.childNodes[0].classList.add('ico_lin_act');
                    col.classList.add('animal_sil');
                    hom.style.display='none';
                    mic.style.display='none';
                    col.style.display='block';
                    set.style.display='none';
                }}else {
                for(k=1;k<16;k+=2){li.parentNode.childNodes[k].childNodes[0].classList.remove('ico_lin_act');}
                li.childNodes[0].classList.add('ico_lin_act');
                set.classList.add('animal_sil');
                hom.style.display='none';
                mic.style.display='none';
                col.style.display='none';
                set.style.display='block';}
        }
    }

    // 主页添加我的动态
    // 动态列表
    var dynamics=[
        {
            "img":"https://img0.bevol.cn/article/316/20170412212645681.jpg@80p",
            "title":"痘印、皮肤屏障的全能修复型选手——所以说EGF是用来长脸的？",
            "information":"很多对成分有些研究的修宝们应该都听过EGF，研究的越多，会发现宣传好像很虚，争议好像很多，产品也好像很乱，宝宝看不懂怎么办？相信看完本文，大家对EGF就懂得理性种草了EGF是什么？EGF，全称Epidermal Growth Factor（表皮生长因子），2位科学家因在小鼠中发现了它，获得了诺贝尔奖EGF也广泛存在于人体，是一组重要的活性蛋白多肽物质。"
        },
        {
            "img":"https://img1.bevol.cn/article/232/20170412204544804.jpg@80p",
            "title":"痘印、皮肤屏障的全能修复型选手——所以说EGF是用来长脸的？",
            "information":"很多对成分有些研究的修宝们应该都听过EGF，研究的越多，会发现宣传好像很虚，争议好像很多，产品也好像很乱，宝宝看不懂怎么办？相信看完本文，大家对EGF就懂得理性种草了EGF是什么？EGF，全称Epidermal Growth Factor（表皮生长因子），2位科学家因在小鼠中发现了它，获得了诺贝尔奖EGF也广泛存在于人体，是一组重要的活性蛋白多肽物质。"
        },
        {
            "img":"https://img0.bevol.cn/article/359/20170412214023572.jpg@80p",
            "title":"痘印、皮肤屏障的全能修复型选手——所以说EGF是用来长脸的？",
            "information":"很多对成分有些研究的修宝们应该都听过EGF，研究的越多，会发现宣传好像很虚，争议好像很多，产品也好像很乱，宝宝看不懂怎么办？相信看完本文，大家对EGF就懂得理性种草了EGF是什么？EGF，全称Epidermal Growth Factor（表皮生长因子），2位科学家因在小鼠中发现了它，获得了诺贝尔奖EGF也广泛存在于人体，是一组重要的活性蛋白多肽物质。"
        }
    ]
    // 动态添加
    function dload() {
        var dyn_body=document.querySelector('.dyn_body');
        for(i=0;i<2;i++){
            dyn_body.innerHTML+=`<div class="row qz_row">
                        <div class="hidden-xs col-sm-1 col-md-1 col-lg-1"></div>
                        <div class="col-xs-12 col-sm-10 col-md-10 col-lg-10">
                            <div class="row">
                                <div class="col-xs-4 col-sm-2 col-md-2 col-lg-2">
                                    <div class="dy_pic">
                                        <img src="${dynamics[i].img}" class="img-responsive anima_pul" alt="Responsive image">
                                    </div>
                                </div>
                                <div class="col-xs-8 col-sm-10 col-md-10 col-lg-10">
                                    <div class="dy_info">
                                        <span class="dy_tit">"${dynamics[i].title}"</span><br>
                                        <span class="dy_con">"${dynamics[i].information}"</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="hidden-xs col-sm-1 col-md-1 col-lg-1"></div>
                    </div>`
        }
    }
    dload();

    // 主页添加妆品
    // 妆品列表
    var cosmetics=[
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
            "img":"https://img0.bevol.cn/Goods/source/570718c5a24f2.jpg@90p",
            "title":"兰蔻新精华肌底液",
            "information":"英文名称：LANCOME ADVANCED GENIFIQUE"
        }
    ]
    // 妆品添加
    function oload(){
        var cos_body=document.querySelector('.cos_body');
        for(j=0;j<2;j++){
            cos_body.innerHTML+=`<div class="row qz_row">
                        <div class="hidden-xs col-sm-1 col-md-1 col-lg-1"></div>
                        <div class="col-xs-12 col-sm-10 col-md-10 col-lg-10">
                            <div class="row">
                                <div class="col-xs-4 col-sm-2 col-md-2 col-lg-2">
                                    <div class="dedli_pic">
                                        <img src="${cosmetics[j].img}" class="img-responsive anima_pul" alt="Responsive image">
                                    </div>
                                </div>
                                <div class="col-xs-6 col-sm-8 col-md-9 col-lg-9">
                                    <div class="dedli_inf">
                                        <a class="qz_a" href="#">
                                            <span class="qz_dis">"${cosmetics[j].title}"</span><br>
                                            <span class="qz_dip">"${cosmetics[j].information}"</span><br>
                                            <span class="qz_dia">剩余365天</span>
                                        </a>
                                    </div>
                                </div>
                                <div class="col-xs-2 col-sm-2 col-md-1 col-lg-1 animal_swi">
                                    <a href="#"><span class="qz_das">编辑</span></a>
                                </div>
                            </div>
                        </div>
                        <div class="hidden-xs col-sm-1 col-md-1 col-lg-1"></div>
                    </div>`
        }
    }
    oload();

    // 动态页添加
    // 动态列表
    var mic_dynamic=[
        {
            "img":"https://img0.bevol.cn/UploadFile/head/d25047ce-acac-4dca-8d7e-f13f7bdf5f13.jpg",
            "author":"一修姐",
            "title":"痘印、皮肤屏障的全能修复型选手——所以说EGF是用来长脸的？",
            "information":"很多对成分有些研究的修宝们应该都听过EGF，研究的越多，会发现宣传好像很虚，争议好像很多，产品也好像很乱，宝宝看不懂怎么办？相信看完本文，大家对EGF就懂得理性种草了EGF是什么？EGF，全称Epidermal Growth Factor（表皮生长因子），2位科学家因在小鼠中发现了它，获得了诺贝尔奖EGF也广泛存在于人体，是一组重要的活性蛋白多肽物质。"
        },
        {
            "img":"https://img0.bevol.cn/UploadFile/head/d25047ce-acac-4dca-8d7e-f13f7bdf5f13.jpg",
            "author":"一修姐",
            "title":"痘印、皮肤屏障的全能修复型选手——所以说EGF是用来长脸的？",
            "information":"很多对成分有些研究的修宝们应该都听过EGF，研究的越多，会发现宣传好像很虚，争议好像很多，产品也好像很乱，宝宝看不懂怎么办？相信看完本文，大家对EGF就懂得理性种草了EGF是什么？EGF，全称Epidermal Growth Factor（表皮生长因子），2位科学家因在小鼠中发现了它，获得了诺贝尔奖EGF也广泛存在于人体，是一组重要的活性蛋白多肽物质。"
        },
        {
            "img":"https://img0.bevol.cn/UploadFile/head/d25047ce-acac-4dca-8d7e-f13f7bdf5f13.jpg",
            "author":"一修姐",
            "title":"痘印、皮肤屏障的全能修复型选手——所以说EGF是用来长脸的？",
            "information":"很多对成分有些研究的修宝们应该都听过EGF，研究的越多，会发现宣传好像很虚，争议好像很多，产品也好像很乱，宝宝看不懂怎么办？相信看完本文，大家对EGF就懂得理性种草了EGF是什么？EGF，全称Epidermal Growth Factor（表皮生长因子），2位科学家因在小鼠中发现了它，获得了诺贝尔奖EGF也广泛存在于人体，是一组重要的活性蛋白多肽物质。"
        },
        {
            "img":"https://img0.bevol.cn/UploadFile/head/d25047ce-acac-4dca-8d7e-f13f7bdf5f13.jpg",
            "author":"一修姐",
            "title":"痘印、皮肤屏障的全能修复型选手——所以说EGF是用来长脸的？",
            "information":"很多对成分有些研究的修宝们应该都听过EGF，研究的越多，会发现宣传好像很虚，争议好像很多，产品也好像很乱，宝宝看不懂怎么办？相信看完本文，大家对EGF就懂得理性种草了EGF是什么？EGF，全称Epidermal Growth Factor（表皮生长因子），2位科学家因在小鼠中发现了它，获得了诺贝尔奖EGF也广泛存在于人体，是一组重要的活性蛋白多肽物质。"
        },
        {
            "img":"https://img0.bevol.cn/UploadFile/head/d25047ce-acac-4dca-8d7e-f13f7bdf5f13.jpg",
            "author":"一修姐",
            "title":"痘印、皮肤屏障的全能修复型选手——所以说EGF是用来长脸的？",
            "information":"很多对成分有些研究的修宝们应该都听过EGF，研究的越多，会发现宣传好像很虚，争议好像很多，产品也好像很乱，宝宝看不懂怎么办？相信看完本文，大家对EGF就懂得理性种草了EGF是什么？EGF，全称Epidermal Growth Factor（表皮生长因子），2位科学家因在小鼠中发现了它，获得了诺贝尔奖EGF也广泛存在于人体，是一组重要的活性蛋白多肽物质。"
        },{
            "img":"https://img0.bevol.cn/UploadFile/head/d25047ce-acac-4dca-8d7e-f13f7bdf5f13.jpg",
            "author":"一修姐",
            "title":"痘印、皮肤屏障的全能修复型选手——所以说EGF是用来长脸的？",
            "information":"很多对成分有些研究的修宝们应该都听过EGF，研究的越多，会发现宣传好像很虚，争议好像很多，产品也好像很乱，宝宝看不懂怎么办？相信看完本文，大家对EGF就懂得理性种草了EGF是什么？EGF，全称Epidermal Growth Factor（表皮生长因子），2位科学家因在小鼠中发现了它，获得了诺贝尔奖EGF也广泛存在于人体，是一组重要的活性蛋白多肽物质。"
        }
    ]
    // 动态添加
    function yload(){
        var mic_body=document.querySelector('.mic_body');
        for(let mic of mic_dynamic){
            mic_body.innerHTML+=`<div class="row qz_dynamic">
                <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <!--作者头像日期-->
                    <div class="row qz_row">
                        <div class="col-xs-3 col-sm-1 col-md-1 col-lg-1">
                            <div class="dyn_pic">
                                <img src="${mic.img}" class="img-responsive" alt="Responsive image">
                            </div>
                        </div>
                        <div class="col-xs-4 col-sm-2 col-md-2 col-lg-1">
                            <div class="dyn_aut">
                                <span>"${mic.author}"</span><br>
                                <span>15分钟前</span>
                            </div>
                        </div>
                        <div class="col-xs-5 col-sm-8 col-md-8 col-lg-9"></div>
                    </div>
                    <!--动态内容-->
                    <div class="row qz_row">
                        <div class="hidden-xs col-sm-1 col-md-1 col-lg-1"></div>
                        <div class="col-xs-12 col-sm-10 col-md-10 col-lg-10">
                            <div class="row">
                                <div class="col-xs-4 col-sm-2 col-md-2 col-lg-2">
                                    <div class="dy_pic">
                                        <img src="https://img0.bevol.cn/article/316/20170412212645681.jpg@80p" class="img-responsive" alt="Responsive image">
                                    </div>
                                </div>
                                <div class="col-xs-8 col-sm-10 col-md-10 col-lg-10">
                                    <div class="dy_info">
                                        <span class="dy_tit">"${mic.author}"</span><br>
                                        <span class="dy_con">"${mic.information}"</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="hidden-xs col-sm-1 col-md-1 col-lg-1"></div>
                    </div>
                    <!--转发点赞-->
                    <div class="row qz_row">
                        <div class="hidden-xs col-sm-1 col-md-1 col-lg-1"></div>
                        <div class="col-xs-2 col-sm-1 col-md-1 col-lg-1">
                            <a href="#"><img src="../img/center/forward.png" class="img-responsive dyn_for" alt="Responsive image"></a>
                            <span>&nbsp;0</span>
                        </div>
                        <div class="col-xs-2 col-sm-1 col-md-1 col-lg-1">
                            <a href="#"><img src="../img/center/comment.png" class="img-responsive dyn_for" alt="Responsive image"></a>
                            <span>&nbsp;0</span>
                        </div>
                        <div class="col-xs-2 col-sm-1 col-md-1 col-lg-1">
                            <a href="#"><img src="../img/center/fabulous.png" class="img-responsive dyn_for" alt="Responsive image"></a>
                            <span>&nbsp;0</span>
                        </div>
                        <div class="col-xs-6 col-sm-8 col-md-8 col-lg-8"></div>
                    </div>
                </div>
            </div>
            <!--分割线-->
            <div class="qz_line"></div>`
        }
    }
    yload();

    // 计时器
    function count_down() {
        var count_time=document.querySelector('#count_time');
        var inner=setInterval(function () {
            var now_time=new Date();
            var pub_time=new Date('2019-1-22 14:48:24')
            qz_time=now_time-pub_time;
            count_time.innerText=number_to_time(qz_time);
        },1000)
    };
    count_down();
    // 时间戳转换为时间差距格式
    function number_to_time(num) {
        var num_second=num/1000;
        var days=Math.floor(num_second/(60*60*24));
        var hours=Math.floor((num_second%(60*60*24))/(60*60));
        var mimutes=Math.floor((num_second%(60*60))/60);
        var seconds=Math.floor((num_second%60));

        if(seconds>0){
            if (mimutes>0){
                if (hours>0){
                    if (days>0){
                        var result= days+'天前';
                    }else {
                        var result= hours+'小时前';
                    }
                }else {
                    var result= mimutes+'分钟前';
                }
            }else {
                var result=seconds+'秒';
            }
        }
        return result;
    }




})();