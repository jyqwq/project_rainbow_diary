function qq() {
    if (sessionStorage['message'] && sessionStorage['message'].length>0) {
        var ipt=document.querySelector('#input-sch')
        let a=JSON.parse(sessionStorage['message'])
        ipt.value=a.search
        postData(ajax_url+'/search/',a,function (res) {
            var page=document.querySelector('#ul-fenye')
            let s=res.length;
            fenye(s);
            function sortgood(b,a) {
                var sot=document.querySelector('#sot-ul')
                sot.onclick=function (term='综合排序') {
                    if (event.target.nodeName=='A') {
                        term = event.target.innerText
                        if (a=='综合排序'){
                            return (a.fbs+a.cots+a.click)-(b.fbs+b.cots+b.click)
                        }else if (a=='最多点赞') {
                            return a.fbs-b.fbs
                        }else if (a=='最多收藏') {
                            return a.cots-b.cots
                        }else if (a=='最新发布'){
                            return a.commodity_date-b.commodity_date
                        }
                    }
                }
            }
            function xr(p=0) {
                var commodity=document.querySelector('.r-4 .col-md-12 .r-4-1');
                var b=res.sort(sortgood);
                if (b && b.length>0){
                    for (var goods=16*p;goods<(p+1)*16;goods++) {
                        var k=b[goods].commodity_component.split('&')
                        var c=b[goods].commodity_name+k+b[goods].capacity+b[goods].effect
                        var d=c.slice(0,30)+'...';
                        if (goods %4 ==0){
                            commodity.innerHTML+=`<div class="goods goods-1 col-md-3" >
                <div class="goods-content">
                <a href="#"><img src="../${b[goods].com_img}" class="img-responsive"></a>
                <div class="goods-d-1">
                <p class="goods-p-1"> <strong>${b[goods].commodity_price}</strong> <span class="rect">市场价</span></p>
            <p class="goods-p-2"><a href="#">${d}</a></p><p class="goods-p-3"><a href="#"><span class="glyphicon glyphicon-menu-hamburger"></span><span>自然堂旗舰店</span></a></p>
            </div>
            </div>
            </div>`
                        } else if (goods%4 ==1){
                            commodity.innerHTML+=`<div class="goods goods-2 col-md-3" >
                <div class="goods-content">
                <a href="#"><img src="../${b[goods].com_img}" class="img-responsive"></a>
                <div class="goods-d-1">
                <p class="goods-p-1"> <strong>${b[goods].commodity_price}</strong> <span class="rect">市场价</span></p>
            <p class="goods-p-2"><a href="#">${d}</a></p><p class="goods-p-3"><a href="#"><span class="glyphicon glyphicon-menu-hamburger"></span><span>自然堂旗舰店</span></a></p>
            </div>
            </div>
            </div>`
                        } else if (goods%4==2){
                            commodity.innerHTML+=`<div class="goods goods-3 col-md-3" >
                <div class="goods-content">
                <a href="#"><img src="../${b[goods].com_img}" class="img-responsive"></a>
                <div class="goods-d-1">
                <p class="goods-p-1"> <strong>${b[goods].commodity_price}</strong> <span class="rect">市场价</span></p>
            <p class="goods-p-2"><a href="#">${d}</a></p><p class="goods-p-3"><a href="#"><span class="glyphicon glyphicon-menu-hamburger"></span><span>自然堂旗舰店</span></a></p>
            </div>
            </div>
            </div>`
                        } else if (goods%4==3){
                            commodity.innerHTML+=`<div class="goods goods-4 col-md-3" >
                <div class="goods-content">
                <a href="#"><img src="../${b[goods].com_img}" class="img-responsive"></a>
                <div class="goods-d-1">
                <p class="goods-p-1"> <strong>${b[goods].commodity_price}</strong> <span class="rect">市场价</span></p>
            <p class="goods-p-2"><a href="#">${d}</a></p><p class="goods-p-3"><a href="#"><span class="glyphicon glyphicon-menu-hamburger"></span><span>自然堂旗舰店</span></a></p>
            </div>
            </div>
            </div>`
                        }
                    }
                }
            }
            xr(0)
            page.onclick=function (res) {
                var commodity=document.querySelector('.r-4 .col-md-12 .r-4-1');
                for (var p of page.children){
                    if (p.className=='background'){
                        commodity.innerHTML=''
                        xr(p.innerHTML-1)
                    }
                }
            }
        })
    }else {
        location.href='icy_search.html'
    }
}
qq();
//分页
function fenye(b) {
    var ul = document.getElementById('ul-fenye');
    if (Math.ceil(b/16)==1){
        ul.innerHTML=`<li>首页</li>
                                        <li>上一页</li>
                                        <li></li>
                                        <li>下一页</li>
                                        <li>尾页</li>`
    }else if (Math.ceil(b/16)==2) {
        ul.innerHTML=`<li>首页</li>
                                        <li>上一页</li>
                                        <li></li>
                                        <li></li>
                                        <li>下一页</li>
                                        <li>尾页</li>`
    }else if (Math.ceil(b/16)>=3){
        ul.innerHTML=`<li>首页</li>
                                        <li>上一页</li>
                                        <li></li>
                                        <li></li>
                                        <li></li>
                                        <li>下一页</li>
                                        <li>尾页</li>`
    }
    var li = ul.getElementsByTagName('li');
    li[2].className = 'background';
    var num01 = 1;
    var num02 = Math.ceil(b/16)/*总数*/;
//1 //首页的点击事件
    li[li.length-li.length].onclick = function(){
        Background(2);
        num01 = 1;
        content(num01);
    }
//2 //尾页的点击事件
    li[li.length-1].onclick = function(){
        Background(li.length-3);
        num01 = num02-(li.length-5);
        content(num01)
    }
//3 //上一页的点击事件
    li[li.length-(li.length-1)].onclick = function(){

        for(var j = 0;j<li.length-4;j++){
            if(li[j+2].className == 'background' && li[j+2].innerHTML != 1){
                if(j+2 != li.length-(li.length-2)){
                    Background(j+1);
                }
                break;
            }
        }
        if(j+2 == li.length-(li.length-2)){
            num01 -- ;
            content(num01);
        }
    }
//4 下一页的点击事件
    li[li.length-2].onclick = function(){
        for(var j = 0;j<li.length;j++){
            if(li[j].className == 'background' && li[j].innerHTML < num02){  //* && 写最后一页的总数*/
                if(j+1 < li.length-2){
                    Background(j+1);
                }
                break;
            }
        }
        if(j+1 == li.length-2){
            num01++;
            content(num01);
        }
    }
//     分页的点击事件
    for(var i = 0;i<li.length-4;i++){
        li[i+2].index = i+2;
        li[i+2].onclick = function(){
            Background(this.index);
        }
    }
//把所有的分页背景去掉，给指定的分页添加背景颜色
    function Background(num){
        for(var i = 0;i<li.length;i++){
            li[i].className = li[i].className.replace('background','');
            li[num].className = 'background';
        }
    }
// 给li 写内容
    content(num01);
    function content(number){
        for(var i=0;i<li.length-4;i++){
            li[i+2].innerHTML = number;
            number++;
        }
    }
}

//轮播图片
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

//搜索历史
function s() {
    var search=document.querySelector('.search');
    var arry=new Array()
    search.onclick=function (e) {
        var txt=e.target.parentElement.previousElementSibling.previousElementSibling;
        if (localStorage.his && localStorage.his.length>=0) {
            window.localStorage.setItem('his',txt.value)
            arry.push(localStorage.getItem('his'))
            if (localStorage.history && localStorage.history.length>=0) {
                arry.push(localStorage.getItem('history'))
                window.localStorage.setItem('history',arry)
                arry=[]
            }else {
                window.localStorage.setItem('history',arry)
                arry=[]
            }
        }else{
            window.localStorage.setItem('his',txt.value)
            arry.push(localStorage.getItem('his'))
            window.localStorage.setItem('history',arry)

        }
    }
}
s();
// 搜索下拉框
function t() {
    var op=document.querySelector('#list_web')
    var history=window.localStorage.getItem('history')
    if (history && history.length>=0) {
        var list =history.split(',')
        for (var i=0;i<5;i++) {
            op.innerHTML+=`<option value="${list[i]}"></option>`
        }
    }
}
t()
//

function y() {
    var spans = document.querySelector('.r-6-1');
    spans.onclick=function (e) {
        // alert(e.target.nodeName);
        if (e.target.nodeName=="SPAN") {
            var a=e.target.parentElement.children
            for (var b of a) {
                b.style.background='#f2f2f2';
                b.style.color='black';
                // (function (b) {
                //     b.children[0].style.background='white';
                // })(b)
            }
            e.target.style.background="#71d2c3"
            e.target.style.color='white'
        }
    }
};
y();




//刷新出热门商品
function hot() {
    getData()
}

//获取搜索数据
function search() {
    var btn=document.querySelector('#sch_btn')
    btn.onclick=function () {
        var key= btn.parentElement.parentElement.children[0].value
        var a={'keyword':key,'user_id':''}
        if (window.localStorage['user_id']) {
            a={'keyword':key,'user_id':localStorage['user_id']}
        }

        getData()


    }
}
// search()

//分类筛选
function category() {
    var a=document.querySelector('.r-2-td-1')
    var b=document.querySelector('#input-sch')
    var e=document.querySelector('.mid-2-ul')
    var h=document.querySelector('.r-2-td-3')
    var arry1=new Array()
    var arry2=new Array()
    //根据品牌搜索
    a.onclick=function () {
    let ipt=b.value
        if (event.target.nodeName=='SPAN') {
            var c=event.target.innerText
            var tr=event.target.parentElement.parentElement
            var ul=tr.parentElement.parentElement.parentElement.children[0]
            var h_c=tr.nextElementSibling.children[1].children
            // console.log(h_c.children);
            for (var x of h_c){
                if (x.style.color=='red'){
                    gongneng(arry2,x.innerText)
                }
            }

            ul.innerHTML=`<li role="presentation" class="active  " ><a href="#" class="r-2-1">所有分类:</a></li>
<li role="presentation" class="active  " ><a href="#" class="r-2-1">品牌:${c}</a></li>
`
            tr.style.display='none'
            if (window.localStorage['user_id']){
                var d={'keyword':ipt,'condition':arry2, 'etp':c,'user_id':window.localStorage['user_id']}
            }else {
                d={'keyword':'','condition':arry2, 'etp':c,'user_id':''}
            }
            console.log(d);
            // getData()
        }
    }
    //根据种类搜索
    e.onclick=function () {
        let ipt=b.value
        if (event.target.nodeName=='LI'){
            var f =event.target.innerText
            console.log(ipt);
            if (window.localStorage['user_id']){
                var g={'keyword':ipt,'conditon':f,'user_id':window.localStorage['user_id']}
            } else {
                g={'keyword':'','condition':f,'user_id':''}
            }
            console.log(g);
            // getData()
        }
    }

    //根据功能搜索
    h.onclick=function () {
        var etp=document.querySelector('#r-2-1-ul')
        var ipt=b.value
        var j ={'keyword':'','condition':'','etp':''}
        if (event.target.nodeName=='SPAN'){
            for (var aa of etp.children){
                j={'keyword':'','condition':'','etp':aa.innerText}
            }
            if (event.target.style.color!='red'){
                event.target.style.color='red'
            } else {
                event.target.style.color='black'
            }

            gongneng(arry1,event.target.innerText)
            if (window.localStorage['user_id']){
                var j ={'keyword':ipt,'condition':arry1,'etp':aa.innerText,'user_id':window.localStorage['user_id']}
            } else {
                j ={'keyword':'','condition':arry1,'etp':aa.innerText,'user_id':''}
            }
            console.log(j);
            // getData()
        }
    }

    function gongneng(arry,i) {
        if (arry.indexOf(i)==-1){
            arry.push(i)
        }else {
            arry.splice(arry.indexOf(i),1)
        }

    }
}
category()



//排序

// sortgood()