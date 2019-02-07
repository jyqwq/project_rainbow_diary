(function () {

    //----------------------Ajax请求方法--------------------------

    //页面检查token自动登录
    check_login();

    recommended_ajax();
    hot_ajax();
    //测评ajax暂定
    // evaluation_ajax();

    //自动登录
    function check_login() {
        let token = localStorage.getItem('token');
        if (token){
            let Token = {'token':token};
            postData(ajax_url+'/user/login',Token,function (res) {
                if (res.status_code == '10003') {
                    let islogin = document.querySelectorAll('.islogin');
                    let unlogin = document.querySelectorAll('.unlogin');
                    let usericon_img = document.querySelector('.usericon_img');
                    let u = res.usermessage;
                    for (i in u){
                        sessionStorage.setItem(`${i}`,u[i]);
                    }
                    usericon_img.src=`${u.user_icon}`;
                    unlogin[0].style.display = 'none';
                    islogin[0].style.display = 'block';
                    unlogin[1].style.display = 'none';
                    islogin[1].style.display = 'block';
                }
                else {
                    console.log(res.status_text);
                }
            })
        }
    }

    //量身推荐
    function recommended_ajax() {
        var skin={'skinid':1};
        var infirst=document.querySelector('.infirst');
        postData(ajax_url+'/index',skin,function (res) {
            res.toJSON;
            for(i=0;i<4;i++){
                infirst.innerHTML+=`<div class="col-xs-6 col-sm-6 col-md-3 col-lg-3">
                <div class="row recommend_one">
                    <a href="#">
                        <img src="${res[i].com_img}" class="img-responsive img-rounded" alt="Responsive image">
                        <div class="row pro_detail">
                            <span style="font-size: 1.2em;"><strong>${res[i].commodity_name}</strong></span> <br>
                            <span>${res[i].capacity}</span>
                        </div>
                        <div class="row">
                            <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2"></div>
                            <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 div_line"></div>
                            <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2"></div>
                        </div>
                        <div class="row pro_detail">
                            <span>安全指数:${res[i].save}</span><br><br class="hidden-sm">
                            <span>功效:${res[i].tags_content}</span><br><br class="hidden-sm">
                            <span>参考价:${res[i].commodity_price} RMB</span>
                        </div>
                    </a>
                </div>
            </div>`
            }
        })
    }

    //热门动态
    function hot_ajax() {
        var hot={'hot_thing':1,'skinid':false};
        var insecond=document.querySelector('.insecond');
        var most_hot=document.querySelector('.most_hot');
        postData(ajax_url+'/index',hot,function (res) {
            res.toJSON;
            most_hot.innerHTML=`<div class="row most_content">
                <span class="most_">&nbsp;&nbsp;最热动态&nbsp;&nbsp;</span><span class="most_ glyphicon glyphicon-fire" aria-hidden="true"></span>
                <br>
                <span class="most_title"><strong>&nbsp;&nbsp;${res[0].tit}</strong></span>
                <br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="#"><span class="most_author">${res[0].user_nickname}</span></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span class="glyphicon glyphicon-eye-open" aria-hidden="true">&nbsp;${res[0].clicked}</span>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <span class="glyphicon glyphicon-edit" aria-hidden="true">&nbsp;${res[0].cots}</span>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <span class="glyphicon glyphicon-thumbs-up" aria-hidden="true">&nbsp;${res[0].fbs}</span>
            </div>
            <div class="row hot_thing row_most_margin">
                <a href="#">
                    <img src="${res[0].images}" class="img-responsive img-rounded" alt="Responsive image">
                </a>
            </div>`;
            for (i=0;i<6;i++){
                insecond.innerHTML+=`<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 hot_thing">
                    <a href="#">
                        <img src="img/rank_img.jpg" class="img-responsive img-rounded hot_img" alt="Responsive image">
                    </a>
                    <div class="row hot_thing_title"><span><strong>未闻花名</strong></span></div>
                </div>`;
            }
            let hot_img=document.querySelectorAll('.hot_img');
            let hot_thing_title=document.querySelectorAll('.hot_thing_title');
            for (i=1;i<7;i++){
                hot_img[i-1].src=`${res[i].images}`;
                hot_thing_title[i-1].innerHTML=`<span><strong>${res[i].tit}</strong></span>`;
            }
            // 热门动态动画
            //滚动条划入
            window.onscroll=function () {
                try {
                    let t = document.documentElement.scrollTop||document.body.scrollTop;
                    // console.log(t);
                    if(t>1){
                        var infirst=document.querySelector('.infirst');
                        infirst.children[0].classList.add('animate_welcome');
                        infirst.children[1].classList.add('animate_welcome');
                        infirst.children[2].classList.add('animate_welcome1');
                        infirst.children[3].classList.add('animate_welcome1');
                        // console.log(t)
                    }
                    if (t>600){
                        var insecond=document.querySelector('.insecond');
                        insecond.classList.add('animate_welcome');
                    }
                    if (t>1300){
                        var all_eva=document.querySelectorAll('.all_eva');
                        all_eva[0].children[0].classList.add('animate_welcome2');
                        all_eva[0].children[1].classList.add('animate_welcome2');
                        all_eva[1].children[0].classList.add('animate_welcome2');
                        all_eva[1].children[1].classList.add('animate_welcome2');
                        all_eva[1].children[2].classList.add('animate_welcome2');
                    }
                }catch(err){
                    console.log('刷新页面前请移至网页顶部,确保网页动画正常显示!');
                }
            };
            hot_dy();
            function hot_dy() {
                let infirst=document.querySelector('.infirst');
                let hot_thing = document.querySelectorAll('.hot_thing');
                for (i = 0; i < 6; i++) {
                    hot_thing[i].onmouseover = function () {
                        this.children[1].style.marginTop = '-40px';
                        this.children[1].classList.add('hot_thing_title_act');
                    };
                    hot_thing[i].onmouseout = function () {
                        this.children[1].style.marginTop = '0';
                        this.children[1].classList.remove('hot_thing_title_act');
                    }
                }
            }
        })
    }

    //测评资讯
    function evaluation_ajax() {
        var evaluation={'evaluation_information':1,'hot_thing':false,'skinid':false};
        var insecond=document.querySelector('.insecond');
        postData(ajax_url+'/index',evaluation,function (res) {
            res.toJSON;
        })
    }

    //-------------------------动画方法--------------------------------

    evaluation();
    welcome();

    //巨幕
    function welcome() {
        let content = {
            '0': ' 开启你的专属美妆网站 '
        };
        let content1 = {
            '0': ' 量身推荐只为最好的你 '
        };
        let change_text = document.querySelectorAll('.change_text');
        let inter;
        let inter01;
        let inter02;

        function timeout(s,c,i,content){
            inter = setTimeout(function () {
                change_text[i].innerText += content[s][c];
                clearTimeout(inter);
            }, 200*c);
        }
        function createInteral(content,cb,m) {
            change_text[m].innerText = '';
            for (let t in content) {
                for (let index = 0; index < content[t].length; index++) {
                    cb(t,index,m,content);
                }
            }
        }
        createInteral(content,timeout,0);
        createInteral(content1,timeout,1);
        inter01 = setInterval(function () {
            createInteral(content,timeout,0)
        }, 2200);
        inter02 = setInterval(function () {
            createInteral(content1,timeout,1)
        }, 2200);
    }


    //评测资讯
    function evaluation() {
        let all_eva = document.querySelectorAll('.all_eva');
        for (let j = 0; j < 2; j++) {
            if (j == 0) {
                for (m = 0; m < 2; m++) {
                    all_eva[j].children[m].onmouseover = function () {
                        this.children[1].classList.add('upper_div');
                    };
                    all_eva[j].children[m].onmouseout = function () {
                        this.children[1].classList.remove('upper_div');
                    }
                }
            } else {
                for (n = 0; n < 3; n++) {
                    all_eva[j].children[n].onmouseover = function () {
                        this.children[1].classList.add('upper_div');
                    };
                    all_eva[j].children[n].onmouseout = function () {
                        this.children[1].classList.remove('upper_div');
                    }
                }
            }
        }
    }


})();