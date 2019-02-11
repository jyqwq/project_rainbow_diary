(function () {

    //页面检查token自动登录
    let token = localStorage.getItem('token');
    // check_login(token);
    //自动登录
    function check_login(token) {
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
                    usericon_img.src='../'+`${u.user_icon}`;
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

    // real_time();
    //实时热搜ajax
    function real_time() {
        let hot={'hot_search':1};
        let real_time=document.querySelector('.real_time');
        postData(ajax_url+'/search/rank',hot,function (res) {
            console.log(res);
        })
    }

    //热门日记ajax
    hot_dairy();
    function hot_dairy() {
        let hot={'hot_dairy':1,'hot_search':false};
        let hot_dairy=document.querySelector('.hot_dairy');
        postData(ajax_url+'/search/rank',hot,function (res) {
            for (i=0;i<res.length;i++){
                let num_rank=document.querySelectorAll('.num_rank');
                let img_rank=document.querySelectorAll('.img_rank');
                let title_rank=document.querySelectorAll('.title_rank');
                let s_rank=document.querySelectorAll('.s_rank');
                let t_rank=document.querySelectorAll('.t_rank');
                let f_rank=document.querySelectorAll('.f_rank');
                let u_rank=document.querySelectorAll('.u_rank');
                let fraction=document.querySelectorAll('.fraction');
                num_rank[i].innerHTML=i+1;
                img_rank[i].src='../'+res[i].images;
                title_rank[i].innerHTML=res[i].title;
                s_rank[i].innerHTML=`&nbsp;${res[i].click}`;
                t_rank[i].innerHTML=`&nbsp;${res[i].cots}`;
                f_rank[i].innerHTML=`&nbsp;${res[i].fbs}`;
                u_rank[i].innerHTML=res[i].user_name;
                fraction[i].innerHTML=res[i].click+res[i].cots*2+res[i].fbs*4;

            }
        })
    }

    //热门妆品ajax
    hot_cosmetics();
    function hot_cosmetics() {
        let hot={'hot_cosmetics':1,'hot_dairy':false,'hot_search':false};
        let hot_cosmetics=document.querySelector('.hot_cosmetics');
        postData(ajax_url+'/search/rank',hot,function (res) {
            for (i=0;i<res.length;i++){
                let cosmetics_num_rank=document.querySelectorAll('.cosmetics_num_rank');
                let cosmetics_img_rank=document.querySelectorAll('.cosmetics_img_rank');
                let cosmetics_title=document.querySelectorAll('.cosmetics_title');
                let s_s_rank=document.querySelectorAll('.s_s_rank');
                let s_t_rank=document.querySelectorAll('.s_t_rank');
                let s_f_rank=document.querySelectorAll('.s_f_rank');
                let cosmetics_fraction=document.querySelectorAll('.cosmetics_fraction');
                cosmetics_num_rank[i].innerHTML=i+1;
                cosmetics_img_rank[i].src='../'+res[i].com_img;
                cosmetics_title[i].innerHTML=res[i].commodity_name;
                s_s_rank[i].innerHTML=`&nbsp;${res[i].click}`;
                s_t_rank[i].innerHTML=`&nbsp;${res[i].cots}`;
                s_f_rank[i].innerHTML=`&nbsp;${res[i].fbs}`;
                cosmetics_fraction[i].innerHTML=res[i].click+res[i].cots*2+res[i].fbs*4;

            }
        })
    }



    // 热搜导航栏选择
    let ul=document.querySelector('.unaction');
    ul.onclick=function (event) {
        if (event.target.nodeName=='A') {
            event.target.parentElement.classList.add('my_active');
            var real_time=document.querySelector('.real_time');
            var hot_dairy=document.querySelector('.hot_dairy');
            var hot_cosmetics=document.querySelector('.hot_cosmetics');
            var li=event.target.parentElement.parentElement;
            if(li.nextElementSibling){
                li.nextElementSibling.childNodes[1].classList.remove('my_active');
                if (li.nextElementSibling.nextElementSibling) {
                    li.nextElementSibling.nextElementSibling.childNodes[1].classList.remove('my_active');
                    //执行到这里说明选择的是实时热搜
                    real_time.style.display='block';
                    hot_dairy.style.display='none';
                    hot_cosmetics.style.display='none';
                }else if (li.previousElementSibling) {
                    li.previousElementSibling.childNodes[1].classList.remove('my_active');
                    //执行到这里说明选择的是热门日记
                    real_time.style.display='none';
                    hot_dairy.style.display='block';
                    hot_cosmetics.style.display='none';
                }
            }else if (li.previousElementSibling) {
                li.previousElementSibling.childNodes[1].classList.remove('my_active');
                if (li.previousElementSibling.previousElementSibling){
                    li.previousElementSibling.previousElementSibling.childNodes[1].classList.remove('my_active');
                    //执行到这里说明选择的是热门妆品
                    real_time.style.display='none';
                    hot_dairy.style.display='none';
                    hot_cosmetics.style.display='block';
                }
            }
        }
    }
})();