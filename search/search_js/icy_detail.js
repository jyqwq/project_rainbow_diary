
//发表评论




//动图
function f() {
    var myimgs=['2019.png','newyear.png'];
    var lunbo=document.querySelector('.top-right');
    var inter
    var index=0
    lunbo.innerHTML='<img src="../img/img/2019.png" class="top-right-img">';
    function createInteral() {
        inter = setInterval(function () {
            index++;
            index = index % 2;
            lunbo.innerHTML=`<img src="../img/img/${myimgs[index]}" class="top-right-img">`;
        }, 2000);
    }

    createInteral();
}
f();
//倒计时
// function keishi() {
//     var mydiv=document.querySelector('#content');
//     var end_time=new Date('2019-2-14');
//
//     var inter=setInterval(function () {
//         var now_time=new Date();
//         var time=end_time-now_time;
//         var v=number_to_time(time);
//         mydiv.innerHTML=v;
//     },1000);
// };
// keishi();

//时间转换
function time(num) {
    var num_second=num/1000;
    var days=Math.floor(num_second/(60*60*24));
    days=days>9?days:'0'+days;
    var hours=Math.floor((num_second%(60*60*24))/(60*60));
    hours=hours>9?hours:'0'+hours;
    var minutes=Math.floor((num_second%(60*60))/60);
    minutes=minutes>9?minutes:'0'+minutes;
    var seconds=Math.floor(num_second%60);
    seconds=seconds>9?seconds:'0'+seconds;
    var result=days+" 天"+hours+' 时'+minutes+" 分"+seconds+" 秒";
    return result;
}

function number_to_time(num) {
    let num_second=num/1000;
    let days=Math.floor(num_second/(60*60*24));
    let hours=Math.floor((num_second%(60*60*24))/(60*60));
    let mimutes=Math.floor((num_second%(60*60))/60);
    let seconds=Math.floor((num_second%60));
    // 显示距系统时间时间差
    if (days>0){
        var result=days+'天前';
    }else if (hours>0){
        var result=hours+'小时前';
    } else if (mimutes>0){
        var result=mimutes+'分钟前';
    } else if (seconds=>0) {
        var result=seconds+'秒前';
    } else {
        var result=null;
    }
    return result;
}

//改变数量
// function changevalue(){
//     var a=document.querySelector('.r-2-11');
//     a.onclick=function (event) {
//         var node=event.target;
//         if (node.getAttribute('type')=='button') {
//             changeNumber(event);
//         }
//     }
//     function changeNumber(event) {
//         var node = event && event.target;
//         var v = 0;
//         if (node.value && node.value == '+') {
//             // node.previousElementSibling.value=parseInt(node.previousElementSibling.value)+1;
//             node.previousElementSibling.value++;
//             v = node.previousElementSibling.value;
//             node.previousElementSibling.previousElementSibling.disabled = false;
//
//         } else {
//             // if(node.value && node.value=='+')
//             if (node.nextElementSibling.value > 1) {
//                 node.nextElementSibling.value--;
//                 v = node.nextElementSibling.value;
//                 if (v == 1) {
//                     node.disabled = true;
//                 }
//             }
//         }
//     }
//
// }
// changevalue();


// 产品及评论信息
function get_good() {
    let a = sessionStorage['com_id'];
    let b ={'id':a};
    getData(ajax_url+'/search/commodity',b,function (res) {
      let res2=JSON.stringify(res);
        sessionStorage.setItem('good',res2);
        good_detail();
        hot();
        message();
        get_comment(res);
        test();
        q();
    })
}
get_good();


function user_message() {
    if (localStorage.getItem('token')) {
        let t={'token':localStorage['token']};
        postData(ajax_url+'/user/login',t,function (res) {
            let a=JSON.stringify(res);
            window.sessionStorage.setItem('user_message',a)
        })
    }
}

// 刷新上半部分数据
function good_detail() {
    let a=sessionStorage['good'];
    let b=JSON.parse(a);
    let c=b.com_tags;
    c=c.split('&');
    let t = '';
    for (let i of c){
        (function (i) {
            var tags='<span>'+i+'</span>';
            t+=tags
        })(i)
    }
    let d=b.commodity_component;
    d=d.split('&');
    let u='';
    for (let j of d){
        (function (j) {
            var x='<p>'+ '<span>'+'本产品含有'+j+'</span>'+ '</p>';
            u+=x
        })(j)
    }
    // console.log(u);
    var content=document.querySelector('.r-2');
    content.innerHTML=` 
                    <div class="col-md-6">
                        <div class="row r-2-1">
                            <span class="r-2-1-span">好评</span>
                        </div>
                        <div class="row r-2-2">
                            <div class="col-md-6 col-md-offset-3">
                                <img src="../${b.com_img}" class="r-2-img" alt="">
                            </div>
                        </div>
                        <div class="row r-2-3">
                            <img src="../img/img/fire.png" alt=""><span>热搜中</span>
                            <img src="../img/img/gg.png" alt=""><span>好评中</span>
                        </div>
                        <div class="row r-2-4">
                            <div class="div-img">
                                <img src="../img/img/good-1.jpg" alt="">
                            </div>
                            <div class="div-img">
                                <img src="../img/img/good-2.jpg" alt="">
                            </div>
                            <div class="div-img">
                                <img src="../img/img/good-3.jpg" alt="">
                            </div>
                            <div class="div-img">
                                <img src="../img/img/good-4.jpg" alt="">
                            </div>

                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="row r-2-5">
                            <span class="glyphicon glyphicon-shopping-cart"></span>
                            <span>${b.etp_name} ${b.commodity_name}</span>
                        </div>
                        <div class="row r-2-6">
                                 ${t}
                        </div>
                        <div class="row r-2-7">
                            <span>市场价${b.commodity_price}</span>
                        </div>
                        <div class="row r-2-8">
                            <p>
                            <span>产品成分简述</span>
                            </p>
                            ${u}
                        </div>
                        <div class="row r-2-9">

                        </div>
                        <div class="row r-2-10 r-2-8">
                            <p>
                                <span>产品清洁解读</span>
                            </p>
                            <p>
                                <span>本产品含有主要功效成分2种</span>
                            </p>
                            <p>
                                <span>本产品含有清洁成分2种</span>
                            </p>
                        </div>
                        <div class="row r-2-9">

                        </div>
                        <div class="row r-2-13">
                            <span>安全指数</span>
                            <span class="glyphicon glyphicon-star"></span>
                            <span class="glyphicon glyphicon-star"></span>
                            <span class="glyphicon glyphicon-star"></span>
                            <span class="glyphicon glyphicon-star"></span>
                            <span class="glyphicon glyphicon-star-empty"></span>
                        </div>
                    </div>
                `;
    var cc2=document.querySelector('.r-2');
    cc2=cc2.children[1];
    cc2.innerHTML+=`<div class="row r-2-14">
        
        <img src="../img/img/收藏.png" alt="">
        <span>收藏</span>
        
        </div>`;
    var save=document.querySelector('.r-2-13');
    if (b.save){
        save.innerHTML=`<span>安全指数</span>
                            <span class="glyphicon glyphicon-star"></span>
                            <span class="glyphicon glyphicon-star"></span>
                            <span class="glyphicon glyphicon-star"></span>
                            <span class="glyphicon glyphicon-star"></span>
                            <span class="glyphicon glyphicon-star"></span>`
    }
    else if (b.save >4 && b.save<5) {
        save.innerHTML=`<span>安全指数</span>
                            <span class="glyphicon glyphicon-star"></span>
                            <span class="glyphicon glyphicon-star"></span>
                            <span class="glyphicon glyphicon-star"></span>
                            <span class="glyphicon glyphicon-star"></span>
                            <span class="glyphicon glyphicon-star-empty"></span>`
    }
    else if (b.save >3 && b.save<4){
        save.innerHTML=`<span>安全指数</span>
                            <span class="glyphicon glyphicon-star"></span>
                            <span class="glyphicon glyphicon-star"></span>
                            <span class="glyphicon glyphicon-star"></span>
                            <span class="glyphicon glyphicon-star-empty"></span>
                            <span class="glyphicon glyphicon-star-empty"></span>`
    }
    else if (b.save>2 && b.save<=3){
        save.innerHTML=`<span>安全指数</span>
                            <span class="glyphicon glyphicon-star"></span>
                            <span class="glyphicon glyphicon-star"></span>
                            <span class="glyphicon glyphicon-star-empty"></span>
                            <span class="glyphicon glyphicon-star-empty"></span>
                            <span class="glyphicon glyphicon-star-empty"></span>`
    }
    else if (b.save<3) {
        save.innerHTML=`<span style="color: red">安全指数不达标，不建议使用</span>
                            `
    }
    collection()
}

//刷新热门产品及跳转
function hot() {
    let hot = {'hot_cosmetics': 1, 'hot_dairy': false, 'hot_search': false};
    postData(ajax_url + '/search/rank', hot, function (res) {
        // console.log(res);
        var hot=document.querySelector('.r-3-left');
        hot.innerHTML=`<div class="row r-3-1" id="r-3-1">
                            <span>热门产品</span>
                        </div>
                        <div class="row r-3-2 h-1"  >
                            <div class="col-md-4 r-3-2-1">
                                <img src="../${res[0].com_img}" alt="">
                                <span>${res[0].id}</span>
                            </div>
                            <div class="col-md-8 r-3-2-2">
                                <span>${res[0].enterprise_name}</span> 
                                <span>${res[0].commodity_name}</span>
                                <p><img src="../img/img/fbs.png" alt="">${res[0].fbs}
                                <img src="../img/img/collection.png" alt="">${res[0].cols}
                                </p>
                            </div>
                        </div>
                        <div class="row r-3-2 h-2"  >
                            <div class="col-md-4 r-3-2-1">
                                <img src="../${res[1].com_img}" alt="">
                                <span>${res[1].id}</span>
                            </div>
                            <div class="col-md-8 r-3-2-2">
                                <span>${res[1].enterprise_name}</span>
                                <span>${res[1].commodity_name}</span>
                                <p><img src="../img/img/fbs.png" alt="">${res[1].fbs}
                                <img src="../img/img/collection.png" alt="">${res[1].cols}
                                </p>
                            </div>
                        </div>
                        <div class="row r-3-2 h-3"  >
                            <div class="col-md-4 r-3-2-1">
                                <img src="../${res[2].com_img}" alt="">
                                <span>${res[2].id}</span>
                            </div>
                            <div class="col-md-8 r-3-2-2">
                                <span>${res[2].enterprise_name}</span>
                                <span>${res[2].commodity_name}</span>
                                <p><img src="../img/img/fbs.png" alt="">${res[2].fbs}
                                <img src="../img/img/collection.png" alt="">${res[2].cols}
                                </p>
                            </div>
                        </div>
                        <div class="row r-3-2 h-4"  >
                            <div class="col-md-4 r-3-2-1">
                                <img src="../${res[3].com_img}" alt="">
                                <span>${res[3].id}</span>
                            </div>
                            <div class="col-md-8 r-3-2-2">
                                <span>${res[3].enterprise_name}</span>
                                <span>${res[3].commodity_name}</span>
                                <p><img src="../img/img/fbs.png" alt="">${res[3].fbs}
                                <img src="../img/img/collection.png" alt="">${res[3].cols}
                                </p>
                            </div>
                        </div>
                        <div class="row r-3-2 h-5"  >
                            <div class="col-md-4 r-3-2-1">
                                <img src="../${res[4].com_img}" alt="">
                                <span>${res[4].id}</span>
                            </div>
                            <div class="col-md-8 r-3-2-2">
                                <span>${res[4].enterprise_name}</span>
                                <span>${res[4].commodity_name}</span>
                                <p><img src="../img/img/fbs.png" alt="">${res[4].fbs}
                                <img src="../img/img/collection.png" alt="">${res[4].cols}
                                </p>
                            </div>
                        </div>
`
        //热门产品链接点击
        var hclick1=document.querySelector('.h-1');
        var hclick2=document.querySelector('.h-2');
        var hclick3=document.querySelector('.h-3');
        var hclick4=document.querySelector('.h-4');
        var hclick5=document.querySelector('.h-5');
        hclick1.onclick=function () {
            if (event.target.nodeName=='SPAN' || 'IMG' || 'DIV' || 'P'){
                var a=hclick1.children[0].children[1].innerText;
                let b={'id':a};
                sessionStorage.setItem('com_id',a);
                getData(ajax_url+'/search/commodity',b,function (res) {
                    let res2=JSON.stringify(res);
                    sessionStorage.setItem('good',res2);
                    location.href='icy_detail.html'
                })
            }
        };
        hclick2.onclick=function () {
            if (event.target.nodeName=='SPAN' || 'IMG' || 'DIV' || 'P'){
                var a=hclick2.children[0].children[1].innerText;
                let b={'id':a};
                sessionStorage.setItem('com_id',a);
                getData(ajax_url+'/search/commodity',b,function (res) {
                    let res2=JSON.stringify(res);
                    sessionStorage.setItem('good',res2);
                    location.href='icy_detail.html'
                })
            }
        }
        hclick3.onclick=function () {
            if (event.target.nodeName=='SPAN' || 'IMG' || 'DIV' || 'P'){
                var a=hclick3.children[0].children[1].innerText;
                let b={'id':a};
                sessionStorage.setItem('com_id',a);
                getData(ajax_url+'/search/commodity',b,function (res) {
                    let res2=JSON.stringify(res);
                    sessionStorage.setItem('good',res2);
                    location.href='icy_detail.html'
                })
            }
        };
        hclick4.onclick=function () {
            if (event.target.nodeName=='SPAN' || 'IMG' || 'DIV' || 'P'){
                var a=hclick4.children[0].children[1].innerText;
                let b={'id':a};
                sessionStorage.setItem('com_id',a);
                getData(ajax_url+'/search/commodity',b,function (res) {
                    let res2=JSON.stringify(res);
                    sessionStorage.setItem('good',res2);
                    location.href='icy_detail.html'
                })
            }
        };
        hclick5.onclick=function () {
            if (event.target.nodeName=='SPAN' || 'IMG' || 'DIV' || 'P'){
                var a=hclick5.children[0].children[1].innerText;
                let b={'id':a};
                sessionStorage.setItem('com_id',a);
                getData(ajax_url+'/search/commodity',b,function (res) {
                    let res2=JSON.stringify(res);
                    sessionStorage.setItem('good',res2);
                    location.href='icy_detail.html'
                })
            }
        }
    })
}


//刷新产品信息
function message() {
    let a=sessionStorage['good'];
    let b=JSON.parse(a);
    let d=b.commodity_component;
    d=d.split('&');
    let u='';
    for (let j of d){
        (function (j) {
            var x='<span>'+j+'</span>';
            u+=x
        })(j)
    }
    var table=document.querySelector('.tab-1');
    var div=document.querySelector('#r-3-5');
    table.innerHTML=`<tr>
                                        <td>商品编号 <strong>:</strong></td>
                                        <td>${b.id}</td>
                                    </tr>
                                    <tr>
                                        <td>商品品牌 <strong>:</strong></td>
                                        <td>${b.etp_name}</td>
                                    </tr>
                                    <tr>
                                        <td>商品名称 <strong>:</strong></td>
                                        <td>${b.commodity_name}</td>
                                    </tr>
                                    <tr>
                                        <td>商品功效 <strong>:</strong></td>
                                        <td>${b.effect}</td>
                                    </tr>
                                    <tr>
                                        <td>商品规格 <strong>:</strong></td>
                                        <td>${b.capacity}</td>
                                    </tr>
                                    <tr>
                                        <td>保质期限 <strong>:</strong></td>
                                        <td>${b.overdue}，具体日期以收到的实物为准，开封后跟产品包装指示为准</td>
                                    </tr>`;
    div.innerHTML=`<div class="col-md-12">
                                <span>商品详情</span>&nbsp;&nbsp;
                                <span class="s-2">Detail</span>
                                <p><strong>产品介绍</strong></p>
                                <p>${b.etp_name}${b.commodity_name}：</p>
                                <ul>
                                    <li>能形成浓密泡沫，吸附污垢、多余油脂、彩妆。</li>
                                    <li>质地滋润，能彻底洗净肌肤，用后不会感到崩紧。</li>
                                    <li>添加胶囊化的辅酶Q10 ，使肌肤充满水润，光泽有弹性。</li>
                                </ul>
                                <p><strong>使用方法</strong></p>
                                <img src="../img/img/usefunction.jpg" alt="">
                                <p><strong>成分</strong></p>
                                <p>${u}</p>
                            </div>`



}

//刷新评论
function  get_comment(res) {
    let b=res.comment;
    b.sort(s);
    var cot = document.querySelector('#r-3-6 .r-3-6-main .col-md-12');
    cot.innerHTML='';
    if (b && b.length>0){
        cot.innerHTML=`        
                                <span>用户评价</span>&nbsp;&nbsp;
                                <span class="s-2">Reviews</span>
                                <div class="row r-3-6-1">
                                <p>
                                <span class="s-3">${b.length}</span>
                                <span>条评价</span>
                                </p>
                              
                                `;
        let myDate = new Date();
        for (let i=0;i<b.length;i++) {
            let num=parseInt(myDate.getTime())-parseInt(b[i].date);
            let time=number_to_time(num);
            let w=b[i].content.slice(0,5);
            cot.innerHTML+=`<div class="row r-3-6-2">
                                    <div class="col-md-2">
                                        <img src="../img/img/usericon.png" alt=""><br>
                                        普通会员 <br>
                                        ${b[i].user_nickname}
                                    </div>
                                    <div class="col-md-6">
                                        <div class="reviews">
                                            <span>${w}</span>

                                            <div class="row r-3-6-2-content">
                                                <p>${b[i].content}</p>
                                                <p>
                                                    ${time}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>`
        }
    }
    else{
        cot.innerHTML=`
                                <span>用户评价</span>&nbsp;&nbsp;
                                <span class="s-2">Reviews</span>
                                <div class="row r-3-6-1">
                                <p>
                                <span class="s-3">0</span>
                                <span>条评价</span>
                                </p>
                                </div>`

    }

    function s(b,a) {
        return a.date-b.date
    }
}



function collection() {
        var myDate=new Date();
        var col=document.querySelector('.r-2-14');
        // console.log(col);
        if (sessionStorage['user_id']){
            let u={'user_id':sessionStorage['user_id'],'other_id':sessionStorage['com_id'],'type':'commodity','judge':'collections','method':'check','data': myDate.getTime()}
            getData(ajax_url+'/user/person',u,function (res) {
                // console.log(res);
                if (res.status_code == '10017') {
                    col.innerHTML=`<img src="../img/img/cot.png" alt="1">
                            <span>收藏</span>`
                } else if (res.status_code == '10016') {
                    col.innerHTML=`<img src="../img/img/collection.png" alt="0">
                            <span>已收藏</span>`
                }
            })
        }
        col.onclick=function () {
            var message={};
            if (sessionStorage['user_id']) {
                var img=col.children[0];
                // console.log(img);
                if (img.alt==1){
                     message={'user_id':sessionStorage['user_id'],'other_id':sessionStorage['com_id'],'type':'commodity','judge':'collections','method':'add','data': myDate.getTime()}
                } else {
                  message={'user_id':sessionStorage['user_id'],'other_id':sessionStorage['com_id'],'type':'commodity','judge':'collections','method':'delete','data': myDate.getTime()}
                }
                getData(ajax_url+'/user/person',message,function (res) {
                    console.log(res);
                    if (res.status_code==10015) {
                        col.innerHTML=`<img src="../img/img/collection.png" alt="0">
                            <span>已收藏</span>`
                    }else if (res.status_code==10010) {
                        col.innerHTML=`<img src="../img/img/cot.png" alt="1">
                            <span>收藏</span>`
                    }
                })
            } else {
                alert('请先登录');
                location.href='../user/login.html'
            }
        }

}

//添加收藏


// 点击图片
function q() {
    var img_lists=document.querySelector('.r-2-4');
    var big_img=document.querySelector('.r-2-img');
    img_lists.onclick=function (e) {

        if (e.target.nodeName=="IMG") {
            big_img.src=e.target.src;
            var a=e.target.parentElement.parentElement.children;
            for (var b of a){
                b.style.outline="";
            }
            e.target.parentElement.style.outline="3px solid rgba(128, 128, 128, 0.31)"
        }
        if (e.target.className=='div-img') {
            big_img.src=e.target.children[0].src;
            var a=e.target.parentElement.children;
            for (var b of a){
                b.style.outline="";
            }
            e.target.style.outline="3px solid rgba(128, 128, 128, 0.31)"
        }
    }
}


function test(){
    var comment_btn=document.querySelector('.comment_btn');
    comment_btn.onclick=function () {
        let dy_text=document.querySelector('.dy_text');
        let va=dy_text.value;
        vb=va.slice(0,5);
        let myDate = new Date();
        if (dy_text.value) {
            let u={};
            if (sessionStorage['user_id']) {
                u = {'user_id':sessionStorage['user_id'],'other_id':sessionStorage['com_id'],'type':'commodity','content':dy_text.value,'data':myDate.getTime(),'comment':1,'method':'add'}
            }else {
                u = {'user_id':'null','other_id':sessionStorage['com_id'],'type':'commodity','content':dy_text.value,'data':myDate.getTime(),'comment':1,'method':'add'}
            }
            getData(ajax_url+'/user/person',u,function (res) {
                if (res.status_code=='10021') {
                    dy_text.value=''
                }else {
                    alert(res.status_text)
                }
            })
        }
        var cot = document.querySelector('#r-3-6 .r-3-6-main .col-md-12');
        if (sessionStorage['user_id']){
            cot.innerHTML+=`<div class="row r-3-6-2">
                                    <div class="col-md-2">
                                        <img src="../img/img/usericon.png" alt=""><br>
                                        普通会员 <br>
                                        佚名
                                    </div>
                                    <div class="col-md-6">
                                        <div class="reviews">
                                            <span>${vb}</span>

                                            <div class="row r-3-6-2-content">
                                                <p>${va}</p>
                                                <p>
                                                    1秒前
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>`
        }
        else {
            cot.innerHTML+=`<div class="row r-3-6-2">
                                    <div class="col-md-2">
                                        <img src="../img/img/usericon.png" alt=""><br>
                                        游客 <br>
                                        
                                    </div>
                                    <div class="col-md-6">
                                        <div class="reviews">
                                            <span>${vb}</span>

                                            <div class="row r-3-6-2-content">
                                                <p>${va}</p>
                                                <p>
                                                    1秒前
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>`
        }

    }
}
