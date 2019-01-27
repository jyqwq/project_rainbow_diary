(function () {

    nav_down();
    diary_down();
    nav_btn();


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
        if (window.location.pathname=='/rainbow_diary_html/index.html') {
            unlogin_btn[0].onclick=function () {
                location.href='user/login.html';
            };
            unlogin_btn[1].onclick=function () {
                location.href='user/register.html';
            };
        }else {
            unlogin_btn[0].onclick=function () {
                location.href='../user/login.html';
            };
            unlogin_btn[1].onclick=function () {
                location.href='../user/register.html';
            };
        }
        sessionStorage.setItem('from',window.location.pathname);
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