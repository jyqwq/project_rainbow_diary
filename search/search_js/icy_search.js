
function ee() {
    let u = {'keyword':1,'methods':'search'};
    postData(ajax_url+'/search/search_index',u,function (res) {
        let hotsearch=res;
        var tabs=document.querySelector('.tab-1');
        var sch1=0;
        for (var i = 0; i <10; i++) {
            for (var j = 1; j < 2; j++) {
                // console.log(tabs.rows[i].cells[1]);
                tabs.rows[i].cells[1].innerHTML=hotsearch[sch1].search_content.substring(0,7);
            }
            sch1++
        }
        var tabs=document.querySelector('.tab-2');
        var sch2=10;
        for (var i = 0; i <10; i++) {
            for (var j = 1; j < 2; j++) {
                // console.log(tabs.rows[i].cells[1]);
                tabs.rows[i].cells[1].innerHTML=hotsearch[sch2].search_content.substring(0,7);
            }
            sch2++
        }
    });
}
ee();



//按钮
function y() {
    let u = {'keyword':1,'methods':'add'};
    var btns = document.querySelector('.fbtn');
    var condition='no';
    btns.onclick=function (e) {
        // alert(e.target.nodeName);
        if (e.target.nodeName=="BUTTON") {
            var a=e.target.parentElement.parentElement.children;
            for (var b of a) {
                (function (b) {
                    b.children[0].style.background='white';
                })(b)
            }
            e.target.style.background="pink";
            var d=e.target.innerText
            if (d=='面膜') {
                condition=1
            }else if (d=='口红'){
                condition=2
            } else if (d=='彩妆'){
                condition=3
            } else if (d=='护手霜'){
                condition=4
            }
            
        }
    }
    var search=document.querySelector('#search');
    var arry=new Array()
    //搜索及历史记录
    search.onclick=function (e) {
        var txt=e.target.parentElement.parentElement.previousElementSibling;
        let key=search.parentElement.parentElement.parentElement.children[0].value;
        var d={'keyword':key,'condition':condition};
        if (d.condition=='no'){
            d={'keyword':key,'condition':condition,'method':1}
        } else {
           d={'keyword':key,'condition':condition,'method':2}
        }
        let n=JSON.stringify(d)
        window.sessionStorage.setItem('message',n)
        location.href='icy_result.html';

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
};
y();
//历史记录
function s() {
    var search=document.querySelector('#search');
    var arry=new Array()
    search.onclick=function (e) {
        // y()
        var txt=e.target.parentElement.parentElement.previousElementSibling;
        var b=condition
        console.log(b);
        // let p=search.parentElement.parentElement.parentElement.children[0].value
        // let o={'search':p}
        // postData(ajax_url+'',o,function (res) {
        //
        // })
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

function f1() {
    var history=window.localStorage.getItem('history')
    var tabs=document.querySelector('.tab-3');
    var index=0;
    if (history && history.length>=0) {
        var list=history.split(',')
        for (var i = 0; i <10; i++) {
            for (var j = 1; j < 2; j++) {
                if (index>=list.length){
                    break
                }else {
                    tabs.rows[i].cells[1].innerHTML=list[index]
                }
            }
            index++
        }
    }
}
f1();
//删除记录
function u() {
    var del=document.querySelector('.glyphicon-trash');
    var tabs=document.querySelector('.tab-3');
    var cancel = document.querySelector('.modal #cancel');
    var modal = document.querySelector('.modal');
    var sure=document.querySelector('.modal #sure');
    del.onclick=function () {
        modal.style.display = "block";
        sure.onclick=function () {
            for (var i = 0; i <10; i++) {
                for (var j = 1; j < 2; j++) {
                        tabs.rows[i].cells[1].innerHTML=''
                }
            }
            window.localStorage.removeItem('history')
            modal.style.display = "none";
        }
    }
    // close.onclick= function(){
    //     modal.style.display = "none";
    // };
    cancel.onclick= function(){
        modal.style.display = "none";
    };
}
u();

sessionStorage.setItem('user_id','3')