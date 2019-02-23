(function () {
    let myDate = new Date();
    //ajax提交
    ajax_post();
    function ajax_post() {
        let release_btn=document.querySelectorAll('.release_btn');
        let content_succss=document.querySelector('.content_succss');
        let content_sharing=document.querySelector('.content_sharing');
        let defeat_message=document.querySelector('.defeat_message');
        let content_defeat=document.querySelector('.content_defeat');
        //心情
        release_btn[0].onclick=function () {
            //获取当前用户id
            let user_id = get_user_id();
            let con=this.parentElement.parentElement.children;
            //标签数组
            let con_tag=con[3].children[2].children[0].children;
            let tag=tag_get(con_tag);
            //整合数据
            let dy={'user_id':user_id,'content':con[0].value,'img':'img/myimg.jpg','tag':tag,'type':'dy','data':myDate.getTime()};
            postData(ajax_url+'/sharing/release',dy,function (res) {
                //{status_code: "10008", status_text: "发布成功"}
                if (res.status_code=="10008") {
                    content_succss.style.display='block';
                    content_sharing.style.display='none';
                }else {
                    defeat_message.innerText='错误信息:'+ res.status_code+','+res.status_text;
                    content_defeat.style.display='block';
                    content_sharing.style.display='none';
                }
            })
        };
        //日记
        release_btn[1].onclick=function () {
            //获取当前用户id
            let user_id = get_user_id();
            console.log(user_id);
            let con=this.parentElement.parentElement.children;
            //标签数组
            let con_tag=con[6].children[2].children[0].children;
            let tag=tag_get(con_tag);
            //整合数据
            let dairy={'user_id':user_id,'title':con[1].value,'content':con[3].value,'img':'img/myimg.jpg','tag':tag,'type':'dairy','data':myDate.getTime()};
            console.log(dairy);
            postData(ajax_url+'/sharing/release',dairy,function (res) {
                //{status_code: "10008", status_text: "发布成功"}
                if (res.status_code=="10008") {
                    content_succss.style.display='block';
                    content_sharing.style.display='none';
                }else {
                    defeat_message.innerText='错误信息:'+ res.status_code+','+res.status_text;
                    content_defeat.style.display='block';
                    content_sharing.style.display='none';
                }
            })
        };
        //测评
        release_btn[2].onclick=function () {
            //获取当前用户id
            let user_id = get_user_id();
            let con=this.parentElement.parentElement.children;
            //标签数组
            let con_tag=con[14].children[2].children[0].children;
            let tag=tag_get(con_tag);
            //整合数据
            let test={'user_id':user_id,'title':con[1].value,'content':con[3].value,'title1':con[5].value,'content1':con[7].value,'title2':con[9].value,'content2':con[11].value,'img':'../img/evaluation/ad.jpg','tag':tag,'type':'test','data':myDate.getTime()};
            postData(ajax_url+'/sharing/release',test,function (res) {
                //{status_code: "10008", status_text: "发布成功"}
                if (res.status_code=="10008") {
                    content_succss.style.display='block';
                    content_sharing.style.display='none';
                }else {
                    defeat_message.innerText='错误信息:'+ res.status_code+','+res.status_text;
                    content_defeat.style.display='block';
                    content_sharing.style.display='none';
                }
            })
        }
    }

    //获取当前用户id
    function get_user_id() {
        let user_id=sessionStorage.getItem('user_id');
        if (user_id) {
            return user_id
        }else {
            sessionStorage.setItem('from',window.location.pathname);
            location.href='../user/login.html'
        }
    }

    //获取选定标签放入数组
    function tag_get(tag){
        tag_json=[];
        for (let i=0;i<tag.length;i++){
            if (tag[i].classList.contains('tag-item-active')){
                tag_json.push(tag[i].innerText);
            }
        }
        return tag_json
    }


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

    //自定义标签
    dis_place();
    function dis_place() {
        let div_tags=document.querySelectorAll('.div_tags');
        for (let i=0;i<3;i++){
            div_tags[i].onclick=function () {
                this.placeholder='';
            };
            div_tags[i].onblur=function () {
                if (!this.value){
                    this.placeholder='自定义标签';
                }
            };
            div_tags[i].onkeypress=function (event) {
                let e = event || window.event || arguments.callee.caller.arguments[0];
                let ul=event.target.parentElement.previousElementSibling.children[0];
                if(e && e.keyCode==13) {
                    if (this.value){
                        ul.innerHTML+=`<li class="tag-item tag-item-active">${this.value}</li>`;
                        this.value='';
                    }
                }
            }
        }
    }

    //再发布按钮
    again();
    function again() {
        let again_re=document.querySelectorAll('.again_re');
        let content_sharing=document.querySelector('.content_sharing');
        let content_succss=document.querySelector('.content_succss');
        let content_defeat=document.querySelector('.content_defeat');
        again_re[0].onclick=function () {
            content_succss.style.display='none';
            content_sharing.style.display='block';
        };
        again_re[1].onclick=function () {
            content_defeat.style.display='none';
            content_sharing.style.display='block';
        }
    }

    //返回按钮
    back();
    function back() {
        let back_from=document.querySelectorAll('.back_from');
        back_from[0].onclick=function () {
            location.href='/rainbow_diary_html/user/dynamic.html';
        };
        back_from[1].onclick=function () {
            location.href='/rainbow_diary_html/user/dynamic.html';
        }
    }

})();