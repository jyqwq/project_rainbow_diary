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
                    <a href="#"><img src="${res[i].img}" class="img-responsive img-rounded" alt="Responsive image"></a>
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
                        <a href="#" class="a_style"><span class="style_title1">${res[i].title}</span></a>
                    </div>
                    <br><br>
                    <div class="row">
                        <a href="#" class="a_style"><span class="style_title2">${tt[0]}&nbsp;<span class="glyphicon glyphicon-play" aria-hidden="true"></span></span></a>
                    </div>

                    <div class="row">
                        <a href="#" class="a_style"><span class="style_title2">${tt[1]}&nbsp;<span class="glyphicon glyphicon-play" aria-hidden="true"></span></span></a>
                    </div>
                </div>
            </div>`
            }
        })
    }

})();