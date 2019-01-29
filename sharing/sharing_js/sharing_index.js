(function () {

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

    //字数限制
    text_num();
    function text_num(){
        let remind_text=document.querySelector('.remind_text');
        let dy_text=document.querySelector('.dy_text');
        dy_text.onkeyup=function () {
            remind_text.innerText=140-(dy_text.value.length);
        }
    }

    //标签选择
    item_choose();
    function item_choose() {
        let my_label_list=document.querySelectorAll('.my_label_list');
        for (let i=0;i<3;i++){
            my_label_list[i].onclick=function (event) {
                let node=event &&event.target;
                if (node.nodeName.toLowerCase()=='li'){
                    node.classList.toggle('tag-item-active');
                }
            }
        }
    }

})();