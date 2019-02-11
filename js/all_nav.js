(function () {

    //页面检查token自动登录
    check_login();

    nav_down();
    diary_down();
    nav_btn();

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
                    if (window.location.pathname=='/rainbow_diary_html/index.html'){
                        usericon_img.src=u.user_icon;
                    }else {
                        usericon_img.src='../'+u.user_icon;
                    }

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

    // 下拉导航栏
    function nav_down() {
        var collapsed=document.querySelector('.collapsed');
        collapsed.onclick=function () {
            var down_nav=document.querySelector('.down_nav');
            if (down_nav.style.display=='none') {
                down_nav.style.display='block';
            }else {
                down_nav.style.display='none';
            }
        };
    }


    //登录注册按钮
    function nav_btn() {
        var unlogin_btn=document.querySelectorAll('.unlogin_btn');
        var unregister_btn=document.querySelectorAll('.unregister_btn');
        if (window.location.pathname=='/rainbow_diary_html/index.html') {
            unlogin_btn[0].onclick=function () {
                sessionStorage.setItem('from',window.location.pathname);
                location.href='user/login.html';
            };
            unlogin_btn[1].onclick=function () {
                sessionStorage.setItem('from',window.location.pathname);
                location.href='user/login.html';
            };
            unregister_btn[0].onclick=function () {
                sessionStorage.setItem('from',window.location.pathname);
                location.href='user/register.html';
            };
            unregister_btn[1].onclick=function () {
                sessionStorage.setItem('from',window.location.pathname);
                location.href='user/register.html';
            };
        }else {
            unlogin_btn[0].onclick=function () {
                sessionStorage.setItem('from',window.location.pathname);
                location.href='../user/login.html';
            };
            unlogin_btn[1].onclick=function () {
                sessionStorage.setItem('from',window.location.pathname);
                location.href='../user/login.html';
            };
            unregister_btn[0].onclick=function () {
                sessionStorage.setItem('from',window.location.pathname);
                location.href='../user/register.html';
            };
            unregister_btn[1].onclick=function () {
                sessionStorage.setItem('from',window.location.pathname);
                location.href='../user/register.html';
            };
        }
    }

    //日记划入下拉
    function diary_down() {
        var sharing_nav=document.querySelector('.sharing_nav');
        var sharing_btn=document.querySelector('.sharing_btn');
        sharing_btn.onmouseover=function () {
            sharing_nav.style.display = 'block';
        };
        sharing_btn.onmouseout=function () {
            sharing_nav.style.display = 'none';
        };
        sharing_nav.onmouseover=function () {
            sharing_nav.style.display = 'block';
        };
        sharing_nav.onmouseout=function () {
            sharing_nav.style.display = 'none';
        };
    }

})();