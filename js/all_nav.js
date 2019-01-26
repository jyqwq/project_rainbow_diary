(function () {

    // 下拉导航栏
    var collapsed=document.querySelector('.collapsed');
    collapsed.onclick=function () {
        var down_nav=document.querySelector('.down_nav');
        if (down_nav.style.display=='none') {
            down_nav.style.display='block';
        }else {
            down_nav.style.display='none';
        }
    }

    //日记划入下拉
    var sharing_nav=document.querySelector('.sharing_nav');
    var sharing_btn=document.querySelector('.sharing_btn');
    sharing_btn.onmouseover=function () {
        sharing_nav.style.display = 'block';
    };
    sharing_btn.onmouseout=function () {
        sharing_nav.style.display = 'none';
    }
    sharing_nav.onmouseover=function () {
        sharing_nav.style.display = 'block';
    };
    sharing_nav.onmouseout=function () {
        sharing_nav.style.display = 'none';
    }

})();