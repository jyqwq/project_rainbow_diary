hotsearch=[{'sch':'hello'},
    {'sch':'world'},
    {'sch':'icy'},
    {'sch':'tail'},
    {'sch':'yeah'},
    {'sch':'wo'},
    {'sch':'tou'},
    {'sch':'li'},
    {'sch':'hei'},
    {'sch':'aaa'}
]

function f() {
    var tabs=document.querySelector('.tab-1');
    var sch=0
    for (var i = 0; i <5; i++) {
        for (var j = 1; j < 2; j++) {
            console.log(tabs.rows[i].cells[1]);
            tabs.rows[i].cells[1].innerHTML=hotsearch[sch].sch;
        }
        sch++
    }
};
f()
function g() {
    var tabs=document.querySelector('.tab-2');
    var sch=5;
    for (var i = 0; i <5; i++) {
        for (var j = 1; j < 2; j++) {
            console.log(tabs.rows[i].cells[1]);
            tabs.rows[i].cells[1].innerHTML=hotsearch[sch].sch;
        }
        sch++
    }
};
g()




