//导航栏切换
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