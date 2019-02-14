hotsearch=[{'sch':'hello'},
    {'sch':'world'},
    {'sch':'icy'},
    {'sch':'tail'},
    {'sch':'yeah'},
    {'sch':'wo'},
    {'sch':'tou'},
    {'sch':'li'},
    {'sch':'hei'},
    {'sch':'aaa'},
    {'sch':'hello'},
    {'sch':'world'},
    {'sch':'icy'},
    {'sch':'tail'},
    {'sch':'yeah'},
    {'sch':'wo'},
    {'sch':'tou'},
    {'sch':'li'},
    {'sch':'hei'},
    {'sch':'aaa'}
];

//热搜
function f() {
    var tabs=document.querySelector('.tab-1');
    var sch=0
    for (var i = 0; i <10; i++) {
        for (var j = 1; j < 2; j++) {
            // console.log(tabs.rows[i].cells[1]);
            tabs.rows[i].cells[1].innerHTML=hotsearch[sch].sch;
        }
        sch++
    }
};
f();
function g() {
    var tabs=document.querySelector('.tab-2');
    var sch=10;
    for (var i = 0; i <10; i++) {
        for (var j = 1; j < 2; j++) {
            // console.log(tabs.rows[i].cells[1]);
            tabs.rows[i].cells[1].innerHTML=hotsearch[sch].sch;
        }
        sch++
    }
};
g();


// 搜索历史


//按钮
function y() {
    var btns = document.querySelector('.fbtn');
    btns.onclick=function (e) {
        // alert(e.target.nodeName);
        if (e.target.nodeName=="BUTTON") {
            var a=e.target.parentElement.parentElement.children
            for (var b of a) {
                (function (b) {
                    b.children[0].style.background='white';
                })(b)
            }
            e.target.style.background="pink"
        }
    }
};
y();
//历史记录
function s() {
    var search=document.querySelector('#search');
    var arry=new Array()
    search.onclick=function (e) {
        var txt=e.target.parentElement.parentElement.previousElementSibling;
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



