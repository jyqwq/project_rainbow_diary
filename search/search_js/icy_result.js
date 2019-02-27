function qq() {
    if (sessionStorage['message'] && sessionStorage['message'].length>0) {
        var ipt=document.querySelector('#input-sch')
            let a=JSON.parse(sessionStorage['message'])
            ipt.value=a.keyword;
        var date=new Date()
        let x={}
        if (sessionStorage['user_id']) {
            x={'keyword':a.keyword,'user_id':sessionStorage['user_id'],'methods':'add','data':date.getTime()}
            }else {
                x={'keyword':a.keyword,'user_id':'null','methods':'add','data':date.getTime()}
            }
        console.log(x);
        postData(ajax_url+'/search/search_index',x,function (res) {
            })
            getData(ajax_url+'/search/',a,function (res) {
                re=JSON.stringify(res)
                localStorage.setItem('result',re)
                if (res && res.length>0){
                    var page=document.querySelector('#ul-fenye')
                    let s=res.length;
                    fenye(s);
                    xr(0,res)
                    page.onclick=function () {
                        var commodity=document.querySelector('.r-4 .col-md-12 .r-4-1');
                        for (var p of page.children){
                            if (p.className=='background'){
                                let res = localStorage['result']
                                res=JSON.parse(res)
                                commodity.innerHTML=''
                                xr(p.innerHTML-1,res)
                            }
                        }
                    }
                } else {
                    var d4=document.querySelector('.r-4')
                    var d7=document.querySelector('.r-7')
                    var d5=document.querySelector('.r-5')
                    d4.style.display='none'
                    d5.style.display='none'
                    d7.style.display='block'
                    d7.innerHTML='<img src="../img/img/no-data.png" alt="" id="no_data">'
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
        for (var i=0;i<5 && i<list.length;i++) {
            op.innerHTML+=`<option value="${list[i]}"></option>`
        }
    }
}
t()
//

function y() {
    var spans = document.querySelector('.r-6-1');
    spans.onclick=function (e) {
        if (e.target.nodeName=="SPAN") {
            var a=e.target.parentElement.children
            for (var b of a) {
                b.style.background='#f2f2f2';
                b.style.color='black';
            }
            e.target.style.background="#71d2c3"
            e.target.style.color='white'
        }
    }
};
// y();


//获取搜索数据
function search() {
    var d1=document.querySelector('.r-2')
    var d2=document.querySelector('.r-3')
    var d3=document.querySelector('.r-4')
    var d4=document.querySelector('.r-5')
    var d5=document.querySelector('.r-6')
    var d6=document.querySelector('.r-7')
    var btn=document.querySelector('#sch_btn')
    var page=document.querySelector('#ul-fenye')
    btn.onclick=function () {
        var key= btn.parentElement.parentElement.children[0].value
        var d={'keyword':key,'condition':'no','method':1}
        var dd=JSON.stringify(d)
        sessionStorage.setItem('message',dd)
        location.href='icy_result.html'
        d1.style.display='block'
        d2.style.display='block'
        d3.style.display='block'
        d4.style.display='block'
        d5.style.display='none'
        d6.style.display='none'

        // var a={'keyword':ipt,'method':1}
        var commodity=document.querySelector('.r-4 .col-md-12 .r-4-1');
        commodity.innerHTML=''
        getData(ajax_url+'/search/',d,function (res) {
            console.log(res);
            if (res && res.length>0) {
                var ll=JSON.stringify(res)
                window.localStorage.setItem('result',ll)
                let s=res.length;
                fenye(s);
                xr(0,res)
                page.onclick=function () {
                            var commodity=document.querySelector('.r-4 .col-md-12 .r-4-1');
                            for (var p of page.children){
                                if (p.className=='background'){
                                    let res = localStorage['result']
                                    res=JSON.parse(res)
                                    commodity.innerHTML=''
                                    xr(p.innerHTML-1,res)
                                }
                    }
                }
            }else {
                d3.style.display='none'
                d4.style.display='none'
                d6.style.display='block'
                d6.innerHTML='<img src="../img/img/no-data.png" alt="" id="no_data">'

            }

        })
    }

    sortgood()
}
search()

//分类筛选
function category() {
    var d2=document.querySelector('.r-2')
    var d3=document.querySelector('.r-3')
    var d4=document.querySelector('.r-4')
    var d5=document.querySelector('.r-5')
    var d6=document.querySelector('.r-6')
    var d7=document.querySelector('.r-7')
    var a=document.querySelector('.r-2-td-1')
    var b=document.querySelector('#input-sch')
    var e=document.querySelector('.mid-2-ul')
    var h=document.querySelector('.r-2-td-3')
    var tj=document.querySelector('#r-2-1-ul')
    var arry1=new Array()
    var arry2=new Array()
    var ss=''
    //根据品牌搜索
    a.onclick=function () {
        var commodity=document.querySelector('.r-4 .col-md-12 .r-4-1');

        let ipt=b.value
        if (event.target.nodeName=='SPAN') {
            commodity.innerHTML=''
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
             <li role="presentation" class="active  " ><a href="#" class="r-2-1">${c}</a></li>
`
            tr.style.display='none'
            var str2=arry2.join('%')
            ss=str2
            var d={'keyword':ipt,'condition':str2, 'etp':c,'method':3}
            // console.log(d);
            getData(ajax_url+'/search/',d,function (res) {
                d2.style.display='block'
                d3.style.display='block'
                d4.style.display='block'
                d5.style.display='block'
                d6.style.display='none'
                d7.style.display='none'
                if (res && res.length>0){
                    var page=document.querySelector('#ul-fenye')
                    let s=res.length;
                    fenye(s);
                    xr(0,res)
                    page.onclick=function () {
                        var commodity=document.querySelector('.r-4 .col-md-12 .r-4-1');
                        for (var p of page.children){
                            if (p.className=='background'){
                                let res = localStorage['result']
                                res=JSON.parse(res)
                                commodity.innerHTML=''
                                xr(p.innerHTML-1,res)
                            }
                        }
                    }
                } else {
                    d4.style.display='none'
                    d5.style.display='none'
                    d7.style.display='block'
                    d7.innerHTML='<img src="../img/img/no-data.png" alt="" id="no_data">'
                }

            })
        }
    }
    //根据种类搜索
    e.onclick=function () {
        var commodity=document.querySelector('.r-4 .col-md-12 .r-4-1');

        let ipt=b.value
        if (event.target.nodeName=='LI'){
            commodity.innerHTML=''
            var f =event.target.innerText
            console.log(ipt);
            var g={'keyword':ipt,'condition':f,'method':4}
            console.log(g);
            getData(ajax_url+'/search/',g,function (res) {

                d2.style.display='block'
                d3.style.display='block'
                d4.style.display='block'
                d5.style.display='block'
                d6.style.display='none'
                d7.style.display='none'
                if (res && res.length>0){
                    var page=document.querySelector('#ul-fenye')
                    let s=res.length;
                    fenye(s);
                    xr(0,res)
                    page.onclick=function () {
                        var commodity=document.querySelector('.r-4 .col-md-12 .r-4-1');
                        for (var p of page.children){
                            if (p.className=='background'){
                                let res = localStorage['result']
                                res=JSON.parse(res)
                                commodity.innerHTML=''
                                xr(p.innerHTML-1,res)
                            }
                        }
                    }
                } else {
                    d4.style.display='none'
                    d5.style.display='none'
                    d7.style.display='block'
                    d7.innerHTML='<img src="../img/img/no-data.png" alt="" id="no_data">'
                }
            })
        }
    }
    //根据功能搜索
    h.onclick=function () {
        var commodity=document.querySelector('.r-4 .col-md-12 .r-4-1');
        var etp=document.querySelector('#r-2-1-ul')
        var ipt=b.value
        var j ={'keyword':'','condition':'','etp':''}
        if (event.target.nodeName=='SPAN'){
            commodity.innerHTML=''
            if (etp.children.length>1) {
                var aa=etp.children[1].innerText
            }
            // var bb=aa.slice(4)
            // console.log(aa);
            if (event.target.style.color!='red'){
                event.target.style.color='red'
            } else {
                event.target.style.color='black'
            }
            gongneng(arry1,event.target.innerText)
            var str=arry1.join('%')
            if (aa) {
                j ={'keyword':ipt,'condition':str,'etp':aa,'method':5}
            }else {
                j ={'keyword':ipt,'condition':str,'etp':'','method':5}
            }
            if (j.condition=='' && j.etp=='' ){
                j ={'keyword':ipt,'method':1}
            }else if (j.condition=='' && j.etp!=''){
                j={'keyword':ipt,'condition':'', 'etp':aa,'method':3}
            }
            getData(ajax_url+'/search/',j,function (res) {
                console.log(res);
                d2.style.display='block'
                d3.style.display='block'
                d4.style.display='block'
                d5.style.display='block'
                d6.style.display='none'
                d7.style.display='none'
                if (res && res.length>0){
                    var page=document.querySelector('#ul-fenye')
                    let s=res.length;
                    fenye(s);
                    xr(0,res)
                    page.onclick=function () {
                        var commodity=document.querySelector('.r-4 .col-md-12 .r-4-1');
                        for (var p of page.children){
                            if (p.className=='background'){
                                let res = localStorage['result']
                                res=JSON.parse(res)
                                commodity.innerHTML=''
                                xr(p.innerHTML-1,res)
                            }
                        }
                    }
                } else {
                    d4.style.display='none'
                    d5.style.display='none'
                    d7.style.display='block'
                    d7.innerHTML='<img src="../img/img/no-data.png" alt="" id="no_data">'
                }

            })
        }
    }

    tj.onclick=function (e) {
        var commodity=document.querySelector('.r-4 .col-md-12 .r-4-1');
        let ipt=b.value
        // console.log(e.target.innerText);
        commodity.innerHTML=''
        if (e.target.innerText!='所有分类:'){
            var tr=document.querySelector('.tr-1')
            tj.innerHTML=`<li role="presentation" class="active  " ><a href="#" class="r-2-1">所有分类:</a></li>`
            tr.style.display='table-row'
            let fi={'keyword':ipt,'condition':ss, 'etp':'','method':3}

            if (fi.condition==''){
                fi={'keyword':ipt,'method':1}
            } else {
                fi={'keyword':ipt,'condition':ss, 'etp':'','method':5}
            }
            console.log(fi);
            getData(ajax_url+'/search/',fi,function (res) {
                console.log(res);
                d2.style.display='block'
                d3.style.display='block'
                d4.style.display='block'
                d5.style.display='block'
                d6.style.display='none'
                d7.style.display='none'
                if (res && res.length>0){
                    var page=document.querySelector('#ul-fenye')
                    let s=res.length;
                    fenye(s);
                    xr(0,res)
                    page.onclick=function () {
                        var commodity=document.querySelector('.r-4 .col-md-12 .r-4-1');
                        for (var p of page.children){
                            if (p.className=='background'){
                                let res = localStorage['result']
                                res=JSON.parse(res)
                                commodity.innerHTML=''
                                xr(p.innerHTML-1,res)
                            }
                        }
                    }
                } else {
                    d4.style.display='none'
                    d5.style.display='none'
                    d7.style.display='block'
                    d7.innerHTML='<img src="../img/img/no-data.png" alt="" id="no_data">'
                }

            })

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
function sortgood() {
    var sot=document.querySelector('#sot-ul')
    var res
    sot.onclick=function () {
        var commodity=document.querySelector('.r-4 .col-md-12 .r-4-1');
        res=JSON.parse(window.localStorage['result'])
        var a ='综合排序'
        if (event.target.nodeName=='A') {
            commodity.innerHTML=''
            a=event.target.innerText
            // console.log(a);
            if (a=='综合排序'){
                res.sort(s1)
                xr(0,res)
                page.onclick=function () {
                    var commodity=document.querySelector('.r-4 .col-md-12 .r-4-1');
                    for (var p of page.children){
                        if (p.className=='background'){
                            let res = localStorage['result']
                            res=JSON.parse(res)
                            commodity.innerHTML=''
                            xr(p.innerHTML-1,res)
                        }
                    }
                }
            }else if (a=='最多点赞') {
                res.sort(s2)
                xr(0,res)
                page.onclick=function () {
                    var commodity=document.querySelector('.r-4 .col-md-12 .r-4-1');
                    for (var p of page.children){
                        if (p.className=='background'){
                            let res = localStorage['result']
                            res=JSON.parse(res)
                            commodity.innerHTML=''
                            xr(p.innerHTML-1,res)
                        }
                    }
                }
            }else if (a=='最多收藏') {
                res.sort(s3)
                xr(0,res)
                page.onclick=function () {
                    var commodity=document.querySelector('.r-4 .col-md-12 .r-4-1');
                    for (var p of page.children){
                        if (p.className=='background'){
                            let res = localStorage['result']
                            res=JSON.parse(res)
                            commodity.innerHTML=''
                            xr(p.innerHTML-1,res)
                        }
                    }
                }
            }else if (a=='最新发布'){
                res.sort(s4)
                xr(0,res)
                page.onclick=function () {
                    var commodity=document.querySelector('.r-4 .col-md-12 .r-4-1');
                    for (var p of page.children){
                        if (p.className=='background'){
                            let res = localStorage['result']
                            res=JSON.parse(res)
                            commodity.innerHTML=''
                            xr(p.innerHTML-1,res)
                        }
                    }
                }
            }
        }
    }
    function s1(b,a) {
        return (a.fbs+a.cots+a.click)-(b.fbs+b.cots+b.click)
    }
    function s2(b,a) {
        return a.commodity_price-b.commodity_price
    }
    function s3(b,a) {
        return a.cots-b.cots
    }
    function s4(b,a) {
        return a.commodity_date-b.commodity_date
    }
}

//心情
function article() {
    var a={}
    var d1=document.querySelector('.r-2')
    var d2=document.querySelector('.r-3')
    var d3=document.querySelector('.r-4')
    var d4=document.querySelector('.r-5')
    var d5=document.querySelector('.r-6')
    var d6=document.querySelector('.r-7')
    var btn=document.querySelector('#dao_ul')
    var ipt=document.querySelector('#input-sch')
    var sch=document.querySelector('#sch_btn')
    var page=document.querySelector('#ul-fenye')
    var sorts=document.querySelector('.r-6-1')
    btn.onclick=function () {
        sorts.children[0].style.background="#71d2c3"
        sorts.children[0].style.color='white'
        sorts.children[1].style.background='#f2f2f2';
        sorts.children[1].style.color='black'
        sorts.children[2].style.background='#f2f2f2';
        sorts.children[2].style.color='black'
        var b=document.querySelector('.r-7')
        b.innerHTML=''
        if (event.target.innerText=='心情') {
            let pp=event.target.parentElement.parentElement.children
            for (var bb of pp) {
                (function (bb) {
                    bb.children[0].style.color='gray'
                })(bb)
            }
            event.target.style.color='rebeccapurple'
            dy()
        }else if (event.target.innerText=='日记') {

            let pp=event.target.parentElement.parentElement.children
            for (var bb of pp) {
                (function (bb) {
                    bb.children[0].style.color='gray'
                })(bb)
            }
            event.target.style.color='rebeccapurple'
            jo()
        }else if(event.target.innerText=='测评'){

            let pp=event.target.parentElement.parentElement.children
            for (var bb of pp) {
                (function (bb) {
                    bb.children[0].style.color='gray'
                })(bb)
            }
            event.target.style.color='rebeccapurple'
            te()
        }else if (event.target.innerText=='产品') {
            let pp=event.target.parentElement.parentElement.children
            for (var bb of pp) {
                (function (bb) {
                    bb.children[0].style.color='gray'
                })(bb)
            }
            event.target.style.color='rebeccapurple'
            var commodity=document.querySelector('.r-4 .col-md-12 .r-4-1');
            commodity.innerHTML=''
            a={'keyword':ipt.value,'method':1}
            d5.style.display='none'
            getData(ajax_url+'/search/',a,function (res) {
                if (res && res.length>0) {
                    d1.style.display='block'
                    d2.style.display='block'
                    d3.style.display='block'
                    d4.style.display='block'
                    d6.style.display='none'
                    var ll=JSON.stringify(res)
                    window.localStorage.setItem('result',ll)
                    let s=res.length;
                    fenye(s);
                    xr(0,res)
                    page.onclick=function () {
                        var commodity=document.querySelector('.r-4 .col-md-12 .r-4-1');
                        for (var p of page.children){
                            if (p.className=='background'){
                                let res = localStorage['result']
                                res=JSON.parse(res)
                                commodity.innerHTML=''
                                xr(p.innerHTML-1,res)
                            }
                        }
                    }
                }else {
                    d1.style.display='block'
                    d2.style.display='block'
                    d3.style.display='none'
                    d4.style.display='none'
                    d6.style.display='block'
                    d6.innerHTML='<img src="../img/img/no-data.png" alt="" id="no_data">'
                }

            })
        }
    }
}
article()

function xr(p=0,res) {
    var commodity=document.querySelector('.r-4 .col-md-12 .r-4-1');
    if (res && res.length>0){
        var b=res
        if (b && b.length>0){
            for (var goods=16*p;goods<(p+1)*16;goods++) {
                var k=b[goods].commodity_component.split('&')
                var c=b[goods].commodity_name+k+b[goods].capacity+b[goods].effect
                var d=c.slice(0,25)+'...';
                if (goods %4 ==0){
                    commodity.innerHTML+=`<div class="goods goods-1 col-md-3" >
                <div class="goods-content">
                <a href="#"><img src="../${b[goods].com_img}" class="img-responsive"></a>
                <div class="goods-d-1">
                <p class="goods-p-1"> <strong>${b[goods].commodity_price}</strong> <span class="rect">市场价</span></p>
            <p class="goods-p-2"><a href="#">${d}</a></p><p class="goods-p-3"><a href="#"><span class="glyphicon glyphicon-menu-hamburger"></span><span>${b[goods].enterprise_name}</span><span>产品编号:</span><span>${b[goods].id}</span></a></p>
            </div>
            </div>
            </div>`
                } else if (goods%4 ==1){
                    commodity.innerHTML+=`<div class="goods goods-2 col-md-3" >
                <div class="goods-content">
                <a href="#"><img src="../${b[goods].com_img}" class="img-responsive"></a>
                <div class="goods-d-1">
                <p class="goods-p-1"> <strong>${b[goods].commodity_price}</strong> <span class="rect">市场价</span></p>
            <p class="goods-p-2"><a href="#">${d}</a></p><p class="goods-p-3"><a href="#"><span class="glyphicon glyphicon-menu-hamburger"></span><span>${b[goods].enterprise_name}</span><span>产品编号:</span><span>${b[goods].id}</span></a></p>
            </div>
            </div>
            </div>`
                } else if (goods%4==2){
                    commodity.innerHTML+=`<div class="goods goods-3 col-md-3" >
                <div class="goods-content">
                <a href="#"><img src="../${b[goods].com_img}" class="img-responsive"></a>
                <div class="goods-d-1">
                <p class="goods-p-1"> <strong>${b[goods].commodity_price}</strong> <span class="rect">市场价</span></p>
            <p class="goods-p-2"><a href="#">${d}</a></p><p class="goods-p-3"><a href="#"><span class="glyphicon glyphicon-menu-hamburger"></span><span>${b[goods].enterprise_name}</span><span>产品编号:</span><span>${b[goods].id}</span></a></p>
            </div>
            </div>
            </div>`
                } else if (goods%4==3){
                    commodity.innerHTML+=`<div class="goods goods-4 col-md-3" >
                <div class="goods-content">
                <a href="#"><img src="../${b[goods].com_img}" class="img-responsive"></a>
                <div class="goods-d-1">
                <p class="goods-p-1"> <strong>${b[goods].commodity_price}</strong> <span class="rect">市场价</span></p>
            <p class="goods-p-2"><a href="#">${d}</a></p><p class="goods-p-3"><a href="#"><span class="glyphicon glyphicon-menu-hamburger"></span><span>${b[goods].enterprise_name}</span><span>产品编号:</span><span>${b[goods].id}</span></a></p>
            </div>
            </div>
            </div>`
                }
            }
        }
        commodity.onclick=function () {
            if (event.target.nodeName=='A'){
                var com_id=event.target.parentElement.nextElementSibling.children[0].children[3].innerText
                window.sessionStorage.setItem('com_id',com_id)
                location.href='icy_detail.html'
            }
        }
    }

}

function art_sort() {
    var d6=document.querySelector('.r-7')
    var sorts=document.querySelector('.r-6-1')
    var res
    var tt=document.querySelector('#dao_ul')
    var panduan
    // console.log(tt);
    sorts.onclick=function (e) {
        var tt2=tt.children
        for (var i of tt2){
            if (i.children[0].style.color=='rebeccapurple') {
               panduan= i.children[0].innerText
            }
        }
        console.log(panduan);
        if (e.target.nodeName=="SPAN") {
            var a=e.target.parentElement.children
            for (var b of a) {
                b.style.background='#f2f2f2';
                b.style.color='black';
            }
            e.target.style.background="#71d2c3"
            e.target.style.color='white'
        }
        d6.innerHTML=''
        if (panduan=='心情') {
            res= sessionStorage['dy']
            res=JSON.parse(res)
            if (res.status_code=='40005') {
                d6.innerHTML='<img src="../img/img/no-data.png" alt="" id="no_data">'
            }else {
                if (e.target.innerText=='最多点击'){
                    res.sort(y1)
                }else if (e.target.innerText=='最新发布') {
                    res.sort(y2)
                }else if (e.target.innerText=='最多收藏') {
                    res.sort(y3)
                }
                if (res && res.length>0) {
                    for (var i=0;i<res.length;i++){
                        d6.innerHTML+=`<div class="row row_margin rank_one">
            <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 rank_num"><strong>${i+1}</strong></div>
            <div class="col-xs-10 col-sm-8 col-md-8 col-lg-8">
                <div class="col-xs-5 col-sm-3 col-md-3 col-lg-3 rank_img">
                    <img src="../${res[i].dynamic_images}" class="img-responsive img-rounded" alt="Responsive image">
                </div>
                <div class="col-xs-7 col-sm-9 col-md-9 col-lg-9 rank_content">
                    <div class="row first_row">
                        <a href="#" class="content_name"><h5><strong>${res[i].words}</strong></h5></a>
                    </div>
                    <div class="row second_row">
                        <span class="glyphicon glyphicon-eye-open" aria-hidden="true">&nbsp;${res[i].click}</span>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <span class="glyphicon glyphicon-edit" aria-hidden="true">&nbsp;${res[i].cots}</span>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <span class="glyphicon glyphicon-thumbs-up" aria-hidden="true">&nbsp;${res[i].fbs}</span>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <span class="glyphicon glyphicon-user" aria-hidden="true">&nbsp;<a href="#">${res[i].user_name}</a></span>
                    </div>
                </div>
            </div>
            <div class="hidden-xs col-sm-2 col-md-2 col-lg-2 rank_detail">
                <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                    <span style="color: darkgrey"><strong>热度</strong></span> <br>
                    <span style="color: #ffadbc; font-size: 1.2em"><strong>${res[i].click+res[i].cots+res[i].fbs}</strong></span>
                </div>
                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                    <span style="color: darkgrey"><strong>分类</strong></span> <br>
                    <span style="color: #ffadbc; font-size: 1.2em"><strong>心情</strong></span>
                </div>
            </div>
        </div>`
                    }
                }else {
                    d6.innerHTML='<img src="../img/img/no-data.png" alt="" id="no_data">'
                }
            }

        }else if (panduan=='日记') {
            res=sessionStorage['jo']
            res=JSON.parse(res)
            if (res.status_code=='40005') {
                d6.innerHTML='<img src="../img/img/no-data.png" alt="" id="no_data">'
            }else {
                if (e.target.innerText=='最多点击'){
                    res.sort(y1)
                }else if (e.target.innerText=='最新发布') {
                    res.sort(y2)
                }else if (e.target.innerText=='最多收藏') {
                    res.sort(y3)
                }
                if (res && res.length>0){
                    for (var i=0;i<res.length;i++){
                        d6.innerHTML+=`<div class="row row_margin rank_one">
            <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 rank_num"><strong>${i+1}</strong></div>
            <div class="col-xs-10 col-sm-8 col-md-8 col-lg-8">
                <div class="col-xs-5 col-sm-3 col-md-3 col-lg-3 rank_img">
                    <img src="../${res[i].images}" class="img-responsive img-rounded" alt="Responsive image">
                </div>
                <div class="col-xs-7 col-sm-9 col-md-9 col-lg-9 rank_content">
                    <div class="row first_row">
                        <a href="#" class="content_name"><h5><strong>${res[i].title}</strong></h5></a>
                    </div>
                    <div class="row second_row">
                        <span class="glyphicon glyphicon-eye-open" aria-hidden="true">&nbsp;${res[i].click}</span>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <span class="glyphicon glyphicon-edit" aria-hidden="true">&nbsp;${res[i].cots}</span>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <span class="glyphicon glyphicon-thumbs-up" aria-hidden="true">&nbsp;${res[i].fbs}</span>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <span class="glyphicon glyphicon-user" aria-hidden="true">&nbsp;<a href="#">${res[i].user_name}</a></span>
                    </div>
                </div>
            </div>
            <div class="hidden-xs col-sm-2 col-md-2 col-lg-2 rank_detail">
                <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                    <span style="color: darkgrey"><strong>热度</strong></span> <br>
                    <span style="color: #ffadbc; font-size: 1.2em"><strong>${res[i].click+res[i].cots+res[i].fbs}</strong></span>
                </div>
                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                    <span style="color: darkgrey"><strong>分类</strong></span> <br>
                    <span style="color: #ffadbc; font-size: 1.2em"><strong>日记</strong></span>
                </div>
            </div>
        </div>`
                    }
                } else {
                    d6.innerHTML='<img src="../img/img/no-data.png" alt="" id="no_data">'
                }
            }
        }else if (panduan=='测评') {
            var res=sessionStorage['test']
            res=JSON.parse(res)
            if (res.status_code=='40005') {
                d6.innerHTML='<img src="../img/img/no-data.png" alt="" id="no_data">'
            }else {
                if (e.target.innerText=='最多点击'){
                    res.sort(y1)
                }else if (e.target.innerText=='最新发布') {
                    res.sort(y2)
                }else if (e.target.innerText=='最多收藏') {
                    res.sort(y3)
                }
                if (res && res.length>0){
                    for (var i=0;i<res.length;i++){
                        d6.innerHTML+=`<div class="row row_margin rank_one">
            <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 rank_num"><strong>${i+1}</strong></div>
            <div class="col-xs-10 col-sm-8 col-md-8 col-lg-8">
                <div class="col-xs-5 col-sm-3 col-md-3 col-lg-3 rank_img">
                    <img src="../${res[i].img}" class="img-responsive img-rounded" alt="Responsive image">
                </div>
                <div class="col-xs-7 col-sm-9 col-md-9 col-lg-9 rank_content">
                    <div class="row first_row">
                        <a href="#" class="content_name"><h5><strong>${res[i].title}</strong></h5></a>
                    </div>
                    <div class="row second_row">
                        <span class="glyphicon glyphicon-eye-open" aria-hidden="true">&nbsp;${res[i].click}</span>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <span class="glyphicon glyphicon-edit" aria-hidden="true">&nbsp;${res[i].cots}</span>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <span class="glyphicon glyphicon-thumbs-up" aria-hidden="true">&nbsp;${res[i].fbs}</span>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <span class="glyphicon glyphicon-user" aria-hidden="true">&nbsp;<a href="#">${res[i].user_name}</a></span>
                    </div>
                </div>
            </div>
            <div class="hidden-xs col-sm-2 col-md-2 col-lg-2 rank_detail">
                <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                    <span style="color: darkgrey"><strong>热度</strong></span> <br>
                    <span style="color: #ffadbc; font-size: 1.2em"><strong>${res[i].click+res[i].cots+res[i].fbs}</strong></span>
                </div>
                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                    <span style="color: darkgrey"><strong>分类</strong></span> <br>
                    <span style="color: #ffadbc; font-size: 1.2em"><strong>测评</strong></span>
                </div>
            </div>
        </div>`
                    }
                } else {
                    d6.innerHTML='<img src="../img/img/no-data.png" alt="" id="no_data">'
                }
            }

        }
    }

    function y1(b,a) {
        return    a.click-b.click
    }
    function y2(b,a) {
        return   a.data-b.data
    }
    function y3(b,a) {
        return    a.fbs-b.fbs
    }

}
art_sort()

function dy() {
    var d1=document.querySelector('.r-2')
    var d2=document.querySelector('.r-3')
    var d3=document.querySelector('.r-4')
    var d4=document.querySelector('.r-5')
    var d5=document.querySelector('.r-6')
    var d6=document.querySelector('.r-7')
    var btn=document.querySelector('#dao_ul')
    var ipt=document.querySelector('#input-sch')
    var sch=document.querySelector('#sch_btn')
    var page=document.querySelector('#ul-fenye')
    var a={'keyword':ipt.value,'method':6}
    d1.style.display='none'
    d2.style.display='none'
    d3.style.display='none'
    d4.style.display='none'
    d5.style.display='block'
    d6.style.display='block'
    getData(ajax_url+'/search/',a,function (res) {
        let hhh=JSON.stringify(res)
        sessionStorage.setItem('dy',hhh)
        if (res && res.length>0) {
            for (var i=0;i<res.length;i++){
                d6.innerHTML+=`<div class="row row_margin rank_one">
            <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 rank_num"><strong>${i+1}</strong><span>${res[i].id}</span></div>
            <div class="col-xs-10 col-sm-8 col-md-8 col-lg-8">
                <div class="col-xs-5 col-sm-3 col-md-3 col-lg-3 rank_img">
                    <img src="../${res[i].dynamic_images}" class="img-responsive img-rounded" alt="Responsive image">
                </div>
                <div class="col-xs-7 col-sm-9 col-md-9 col-lg-9 rank_content">
                    <div class="row first_row">
                        <a  class="content_name"><h5><strong>${res[i].words}</strong></h5></a>
                    </div>
                    <div class="row second_row">
                        <span class="glyphicon glyphicon-eye-open" aria-hidden="true">&nbsp;${res[i].click}</span>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <span class="glyphicon glyphicon-edit" aria-hidden="true">&nbsp;${res[i].cots}</span>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <span class="glyphicon glyphicon-thumbs-up" aria-hidden="true">&nbsp;${res[i].fbs}</span>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <span class="glyphicon glyphicon-user" aria-hidden="true">&nbsp;<a href="#">${res[i].user_name}</a></span>
                    </div>
                </div>
            </div>
            <div class="hidden-xs col-sm-2 col-md-2 col-lg-2 rank_detail">
                <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                    <span style="color: darkgrey"><strong>热度</strong></span> <br>
                    <span style="color: #ffadbc; font-size: 1.2em"><strong>${res[i].click+res[i].cots+res[i].fbs}</strong></span>
                </div>
                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                    <span style="color: darkgrey"><strong>分类</strong></span> <br>
                    <span style="color: #ffadbc; font-size: 1.2em"><strong>心情</strong></span>
                </div>
            </div>
        </div>`
            }
        }else {
            d6.innerHTML='<img src="../img/img/no-data.png" alt="" id="no_data">'
        }

    })
    function tiao1() {
        var d6=document.querySelector('.r-7')
        d6.onclick=function () {
            if (event.target.nodeName=='STRONG') {
                var lll=event.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.children[0].children[1]
                lll=lll.innerText
                sessionStorage.setItem('dy_type','dynamic')
                sessionStorage.setItem('dy_id',lll)
                sessionStorage.setItem('from','/rainbow_diary_html/search/icy_result')
                location.href='/rainbow_diary_html/user/dynamic_one.html'
            }
        }
    }
    tiao1()
}

function jo() {
    var a={}
    var d1=document.querySelector('.r-2')
    var d2=document.querySelector('.r-3')
    var d3=document.querySelector('.r-4')
    var d4=document.querySelector('.r-5')
    var d5=document.querySelector('.r-6')
    var d6=document.querySelector('.r-7')
    var btn=document.querySelector('#dao_ul')
    var ipt=document.querySelector('#input-sch')
    var sch=document.querySelector('#sch_btn')
    var page=document.querySelector('#ul-fenye')

    a={'keyword':ipt.value,'method':7}
    d1.style.display='none'
    d2.style.display='none'
    d3.style.display='none'
    d4.style.display='none'
    d5.style.display='block'
    d6.style.display='block'
    getData(ajax_url+'/search/',a,function (res) {
        let hhh=JSON.stringify(res)
        sessionStorage.setItem('jo',hhh)
        if (res && res.length>0){
            for (var i=0;i<res.length;i++){
                d6.innerHTML+=`<div class="row row_margin rank_one">
            <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 rank_num"><strong>${i+1}</strong><span>${res[i].id}</span></div>
            <div class="col-xs-10 col-sm-8 col-md-8 col-lg-8">
                <div class="col-xs-5 col-sm-3 col-md-3 col-lg-3 rank_img">
                    <img src="../${res[i].images}" class="img-responsive img-rounded" alt="Responsive image">
                </div>
                <div class="col-xs-7 col-sm-9 col-md-9 col-lg-9 rank_content">
                    <div class="row first_row">
                        <a  class="content_name"><h5><strong>${res[i].title}</strong></h5></a>
                    </div>
                    <div class="row second_row">
                        <span class="glyphicon glyphicon-eye-open" aria-hidden="true">&nbsp;${res[i].click}</span>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <span class="glyphicon glyphicon-edit" aria-hidden="true">&nbsp;${res[i].cots}</span>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <span class="glyphicon glyphicon-thumbs-up" aria-hidden="true">&nbsp;${res[i].fbs}</span>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <span class="glyphicon glyphicon-user" aria-hidden="true">&nbsp;<a href="#">${res[i].user_name}</a></span>
                    </div>
                </div>
            </div>
            <div class="hidden-xs col-sm-2 col-md-2 col-lg-2 rank_detail">
                <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                    <span style="color: darkgrey"><strong>热度</strong></span><br>
                    <span style="color: #ffadbc; font-size: 1.2em"><strong>${res[i].click+res[i].cots+res[i].fbs}</strong></span>
                </div>
                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                    <span style="color: darkgrey"><strong>分类</strong></span> <br>
                    <span style="color: #ffadbc; font-size: 1.2em"><strong>日记</strong></span>
                </div>
            </div>
        </div>`
            }
        } else {
            d6.innerHTML='<img src="../img/img/no-data.png" alt="" id="no_data">'
        }

    })
    function tiao2() {
        var d6=document.querySelector('.r-7')
        d6.onclick=function () {
            console.log(event.target);
            if (event.target.nodeName=='STRONG') {
                var lll=event.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.children[0].children[1]
                lll=lll.innerText
                sessionStorage.setItem('dy_type','journal')
                sessionStorage.setItem('dy_id',lll)
                sessionStorage.setItem('from','/rainbow_diary_html/search/icy_result')
                location.href='/rainbow_diary_html/user/dynamic_one.html'
            }
        }
    }
    tiao2()
}

function te() {
    var a={}
    var d1=document.querySelector('.r-2')
    var d2=document.querySelector('.r-3')
    var d3=document.querySelector('.r-4')
    var d4=document.querySelector('.r-5')
    var d5=document.querySelector('.r-6')
    var d6=document.querySelector('.r-7')
    var btn=document.querySelector('#dao_ul')
    var ipt=document.querySelector('#input-sch')
    var sch=document.querySelector('#sch_btn')
    var page=document.querySelector('#ul-fenye')

    a={'keyword':ipt.value,'method':8}
    d1.style.display='none'
    d2.style.display='none'
    d3.style.display='none'
    d4.style.display='none'
    d5.style.display='block'
    d6.style.display='block'
    getData(ajax_url+'/search/',a,function (res) {
        let hhh=JSON.stringify(res)
        sessionStorage.setItem('test',hhh)
        if (res && res.length>0){
            for (var i=0;i<res.length;i++){
                d6.innerHTML+=`<div class="row row_margin rank_one">
            <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 rank_num"><strong>${i+1}</strong><span>${res[i].id}</span></div>
            <div class="col-xs-10 col-sm-8 col-md-8 col-lg-8">
                <div class="col-xs-5 col-sm-3 col-md-3 col-lg-3 rank_img">
                    <img src="../${res[i].img}" class="img-responsive img-rounded" alt="Responsive image">
                </div>
                <div class="col-xs-7 col-sm-9 col-md-9 col-lg-9 rank_content">
                    <div class="row first_row">
                        <a class="content_name"><h5><strong>${res[i].title}</strong></h5></a>
                    </div>
                    <div class="row second_row">
                        <span class="glyphicon glyphicon-eye-open" aria-hidden="true">&nbsp;${res[i].click}</span>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <span class="glyphicon glyphicon-edit" aria-hidden="true">&nbsp;${res[i].cots}</span>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <span class="glyphicon glyphicon-thumbs-up" aria-hidden="true">&nbsp;${res[i].fbs}</span>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <span class="glyphicon glyphicon-user" aria-hidden="true">&nbsp;<a href="#">${res[i].user_name}</a></span>
                    </div>
                </div>
            </div>
            <div class="hidden-xs col-sm-2 col-md-2 col-lg-2 rank_detail">
                <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                    <span style="color: darkgrey"><strong>热度</strong></span> <br>
                    <span style="color: #ffadbc; font-size: 1.2em"><strong>${res[i].click+res[i].cots+res[i].fbs}</strong></span>
                </div>
                <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                    <span style="color: darkgrey"><strong>分类</strong></span> <br>
                    <span style="color: #ffadbc; font-size: 1.2em"><strong>测评</strong></span>
                </div>
            </div>
        </div>`
            }
        } else {
            d6.innerHTML='<img src="../img/img/no-data.png" alt="" id="no_data">'
        }

    })
    function tiao3() {
        var d6=document.querySelector('.r-7')
        d6.onclick=function () {
            if (event.target.nodeName=='STRONG') {
                var lll=event.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.children[0].children[1]
                lll=lll.innerText
                sessionStorage.setItem('dy_type','test')
                sessionStorage.setItem('dy_id',lll)
                sessionStorage.setItem('from','/rainbow_diary_html/search/icy_result')
                location.href='/rainbow_diary_html/user/dynamic_one.html'
            }
        }
    }
    tiao3()
}



