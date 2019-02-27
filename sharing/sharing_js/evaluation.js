(function () {


    //测评数据获取
    date_get();
    function date_get() {
        let evaluation={'evaluation':1};
        let title_content=document.querySelector('.title_content');
        postData(ajax_url+'/sharing/evaluation',evaluation,function (res) {
            res.toJSON;
            console.log(res);
            let main_title=document.querySelector('.main_title');
            for (let i in res){
                if (res[i].f_title){
                    var a=res[i].f_title;
                    var tt=a.split('&');
                } else {
                    var tt=['','']
                }
                main_title.innerHTML+=`<div class="row content_margin">
                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                    <a class="to_one_img"><img src="../${res[i].img}" class="img-responsive img-rounded" alt="Responsive image"></a>
                    <div class="dy_type" style="display: none">test</div>
                    <div class="dy_id" style="display: none">${res[i].id}</div>
                </div>
                <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8 content_detail">
                    <br>
                    <div class="row style_title">
                        &nbsp;&nbsp;
                        <span class="glyphicon glyphicon-eye-open" aria-hidden="true">&nbsp;${res[i].click}</span>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <span class="glyphicon glyphicon-edit" aria-hidden="true">&nbsp;${res[i].cots}</span>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <span class="glyphicon glyphicon-thumbs-up" aria-hidden="true">&nbsp;${res[i].fbs}</span>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <span class="glyphicon glyphicon-user" aria-hidden="true">&nbsp;<a href="#">${res[i].user_name}</a></span> <br>
                    </div>
                    <br>
                    <div class="row">
                        <a class="a_style to_one_t1"><span class="style_title1">${res[i].title}</span></a>
                        <div class="dy_type" style="display: none">test</div>
                        <div class="dy_id" style="display: none">${res[i].id}</div>
                    </div>
                    <br><br>
                    <div class="row">
                        <a class="a_style  to_one_t2"><span class="style_title2">${tt[0]}&nbsp;<span class="glyphicon glyphicon-play" aria-hidden="true"></span></span></a>
                        <div class="dy_type" style="display: none">test</div>
                        <div class="dy_id" style="display: none">${res[i].id}</div>
                    </div>

                    <div class="row">
                        <a class="a_style  to_one_t3"><span class="style_title2">${tt[1]}&nbsp;<span class="glyphicon glyphicon-play" aria-hidden="true"></span></span></a>
                        <div class="dy_type" style="display: none">test</div>
                        <div class="dy_id" style="display: none">${res[i].id}</div>
                    </div>
                </div>
            </div>`
            }
            let to_one_img=document.querySelectorAll('.to_one_img');
            let to_one_t1=document.querySelectorAll('.to_one_t1');
            let to_one_t2=document.querySelectorAll('.to_one_t2');
            let to_one_t3=document.querySelectorAll('.to_one_t3');
            for (let p in to_one_img){
                to_one_img[p].onclick=function () {
                    sessionStorage.setItem('dy_type',to_one_img[p].nextElementSibling.innerText);
                    sessionStorage.setItem('dy_id',to_one_img[p].nextElementSibling.nextElementSibling.innerText);
                    sessionStorage.setItem('from','/rainbow_diary_html/sharing/evaluation.html');
                    location.href='../user/dynamic_one.html'
                };
                to_one_t1[p].onclick=function () {
                    sessionStorage.setItem('dy_type',to_one_t1[p].nextElementSibling.innerText);
                    sessionStorage.setItem('dy_id',to_one_t1[p].nextElementSibling.nextElementSibling.innerText);
                    sessionStorage.setItem('from','/rainbow_diary_html/sharing/evaluation.html');
                    location.href='../user/dynamic_one.html'
                };
                to_one_t2[p].onclick=function () {
                    sessionStorage.setItem('dy_type',to_one_t2[p].nextElementSibling.innerText);
                    sessionStorage.setItem('dy_id',to_one_t2[p].nextElementSibling.nextElementSibling.innerText);
                    sessionStorage.setItem('from','/rainbow_diary_html/sharing/evaluation.html');
                    location.href='../user/dynamic_one.html'
                };
                to_one_t3[p].onclick=function () {
                    sessionStorage.setItem('dy_type',to_one_t3[p].nextElementSibling.innerText);
                    sessionStorage.setItem('dy_id',to_one_t3[p].nextElementSibling.nextElementSibling.innerText);
                    sessionStorage.setItem('from','/rainbow_diary_html/sharing/evaluation.html');
                    location.href='../user/dynamic_one.html'
                }
            }
        })
    }

    //search
    let btn_search=document.querySelector('.btn_search');
    let btn_search01=document.querySelector('.btn_search01');
    btn_search.onclick=function () {
        location.href='/rainbow_diary_html/search/icy_search.html'
    };
    btn_search01.onclick=function () {
        location.href='/rainbow_diary_html/search/icy_search.html'
    }

})();