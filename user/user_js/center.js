(function f() {

    //传入数据—添加个人信息
    perinf_ajax();
    function perinf_ajax() {
        if (localStorage.getItem('user_id')) {
            var user_id = {'user_id': localStorage.getItem('user_id'),'methods':'get'};
        } else {
            location.href = '../user/login.html'
        }
        postData(ajax_url + '/user/person', user_id, function (res) {
            console.log('ok');
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

    // 传入数据—主页添加我的动态
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

    //传入数据— 主页添加妆品
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

    // 传入数据—日记本页
    diary_ajax();
    function diary_ajax() {
        // if (localStorage.getItem('user_id')){
        //     var user_id={'user_id':localStorage.getItem('user_id'),'methods':'get'};
        // } else{
        //     location.href='../user/login.html';
        // }
        // postData(ajax_url+'网址',user_id,function (res) {
        let res2=[
            {
                'head':'../img/center/dynamic_head.jpg',
                'author':'南浅',
                'time':'2019-2-5 15:32:01',
                'infomation':'昨天一直在看伍佰和阿信合唱《挪威的森林》的视频，我说这也太感人了吧，然后裂裂跟我讲：“知道阿信是伍佰的粉丝之后，这个故事就更感人了”。”念念不忘，必有回响”。他是这么总结的。我想起另一个故事。十三年前，贝克汉姆和两个英格兰球队的小粉丝合影，十三年后，男孩成为了英格兰球队的队长，而照片上的女孩则成为了那个男孩的妻子。像之前说的，月亮虽然遥远，但某一刻，它的光真的照亮过我。',
                'pic':'../img/center/dynamic.jpg'
            },
            {
                'head':'../img/center/dynamic_head.jpg',
                'author':'南浅',
                'time':'2019-2-14 15:32:01',
                'infomation':'昨天一直在看伍佰和阿信合唱《挪威的森林》的视频，我说这也太感人了吧，然后裂裂跟我讲：“知道阿信是伍佰的粉丝之后，这个故事就更感人了”。”念念不忘，必有回响”。他是这么总结的。我想起另一个故事。十三年前，贝克汉姆和两个英格兰球队的小粉丝合影，十三年后，男孩成为了英格兰球队的队长，而照片上的女孩则成为了那个男孩的妻子。像之前说的，月亮虽然遥远，但某一刻，它的光真的照亮过我。',
                'pic':'../img/center/dynamic.jpg'
            },
            {
                'head':'../img/center/dynamic_head.jpg',
                'author':'南浅',
                'time':'2019-2-14 20:04:01',
                'infomation':'昨天一直在看伍佰和阿信合唱《挪威的森林》的视频，我说这也太感人了吧，然后裂裂跟我讲：“知道阿信是伍佰的粉丝之后，这个故事就更感人了”。”念念不忘，必有回响”。他是这么总结的。我想起另一个故事。十三年前，贝克汉姆和两个英格兰球队的小粉丝合影，十三年后，男孩成为了英格兰球队的队长，而照片上的女孩则成为了那个男孩的妻子。像之前说的，月亮虽然遥远，但某一刻，它的光真的照亮过我。',
                'pic':'../img/center/dynamic.jpg'
            }
        ]//测试
        let dynamic=document.querySelector('.qz_dynamic');
        for (let dyn of res2){
            dynamic.innerHTML+=`<div class="qz_dynamic">
                    <!--作者头像日期-->
                    <div class="row qz_row">
                        <div class="col-xs-6 col-sm-3 col-md-2 col-lg-1">
                            <div class="dyn_head">
                                <img src="${dyn.head}" class="img-responsive" alt="Responsive image">
                            </div>
                        </div>
                        <div class="col-xs-6 col-sm-3 col-md-2 col-lg-2">
                            <div class="dyn_aut">
                                <span>${dyn.author}</span><br>
                                <div class="font_time">
                                    <span class="rel_time">${dyn.time}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--动态文字-->
                    <div class="row qz_row">
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <div class="qz_dinf">
                                <span class="font_dinf">${dyn.infomation}</span><br>
                            </div>
                            <span class="font_full">展开全文</span>
                        </div>
                    </div>
                    <!--动态图片-->
                    <div class="row qz_row">
                        <div class="col-xs-12 col-sm-5 col-md-4 col-lg-1">
                            <div class="dyn_pic">
                                <img src="${dyn.pic}" class="img-responsive" alt="Responsive image">
                            </div>
                        </div>
                    </div>
                    <!--转发点赞-->
                    <div class="row qz_row">
                        <div class="hidden-xs col-sm-1 col-md-1 col-lg-9"></div>
                        <div class="col-xs-2 col-sm-1 col-md-1 col-lg-1">
                            <a href="#"><img src="../img/qz_dynamic/forward.png" class="img-responsive dyn_for" alt="Responsive image"></a>
                            <span>&nbsp;0</span>
                        </div>
                        <div class="col-xs-2 col-sm-1 col-md-1 col-lg-1">
                            <a href="#"><img src="../img/qz_dynamic/comment.png" class="img-responsive dyn_for" alt="Responsive image"></a>
                            <span>&nbsp;0</span>
                        </div>
                        <div class="col-xs-2 col-sm-1 col-md-1 col-lg-1">
                            <a href="#"><img src="../img/qz_dynamic/fabulous.png" class="img-responsive dyn_for" alt="Responsive image"></a>
                            <span>&nbsp;0</span>
                        </div>
                        <div class="col-xs-6 col-sm-8 col-md-8 col-lg-8"></div>
                    </div>
                    <!--分割线-->
                    <div class="qz_line"></div>
                </div>`
        }
    }

    // 导航栏切换
    var nav=document.querySelector('.qz_nav');
    nav.onclick=function (event) {
        var hom=document.querySelector('.qz_home');
        var dyn=document.querySelector('.qz_dynamic');
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
                        dyn.style.display='none';
                        col.style.display='none';
                        set.style.display='none';
                    } else {
                        for(k=1;k<16;k+=2){li.parentNode.childNodes[k].childNodes[0].classList.remove('ico_lin_act');}
                        li.childNodes[0].classList.add('ico_lin_act');
                        dyn.classList.add('animal_sil');
                        hom.style.display='none';
                        dyn.style.display='block';
                        col.style.display='none';
                        set.style.display='none';
                    }}else {
                    for(k=1;k<16;k+=2){li.parentNode.childNodes[k].childNodes[0].classList.remove('ico_lin_act');}
                    li.childNodes[0].classList.add('ico_lin_act');
                    col.classList.add('animal_sil');
                    hom.style.display='none';
                    dyn.style.display='none';
                    col.style.display='block';
                    set.style.display='none';
                }}else {
                for(k=1;k<16;k+=2){li.parentNode.childNodes[k].childNodes[0].classList.remove('ico_lin_act');}
                li.childNodes[0].classList.add('ico_lin_act');
                set.classList.add('animal_sil');
                hom.style.display='none';
                dyn.style.display='none';
                col.style.display='none';
                set.style.display='block';}
        }
    }

    timer();
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

    unfold_text();
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



})();