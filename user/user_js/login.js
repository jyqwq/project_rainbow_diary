var localTele = localStorage.getItem('telephone');
var localPass = localStorage.getItem('password');
var localReme = localStorage.getItem('remember');

var log_tel = document.querySelector('#log_tel');
var log_pas = document.querySelector('#log_pas');
var rem = document.querySelector('#remember');

var form = document.querySelector('form');
// 主要事件
form.onclick=function (event) {
    // 点击登录按钮发生的事件
    var node=event&&event.target;
    if(node.id=='login'){
        check_rem();
        if(check_ltel()&&check_lpas()){
            var user={'telephone':log_tel.value,'password':log_pas.value};
            postData('http://192.168.2.66:8080/user/login',user,function (res) {
                console.log(res);
                if(res && res.status_code=='10003'){
                    localStorage.setItem('token',res.token);
                    localStorage.setItem('usermessage',res.usermessage);
                    if(sessionStorage.getItem('from')){
                        location.href=sessionStorage.getItem('from');
                    } else {
                        location.href='index.html';
                    }
                }else{
                    alert(res.status_text);
                }
            })
        }else {
            console.log('no');
        }
    }
};

// 加载就要完成的事件
(function load() {
    if(localReme=='true'){
        log_tel.value=localTele;
        log_pas.value=localPass;
        rem.checked = true;
    }
})();

// 检查手机号
function check_ltel() {
    var lte_err=document.querySelector('#lte_err');
    if(log_tel.value){
        lte_err.innerText='';
        return true;
    }else{
        lte_err.innerText='请输入注册时用的手机号呀';
        return false;
    }
}
log_tel.onchange=function () {
    check_ltel();
}

// 检查密码
function check_lpas() {
    var lpa_err=document.querySelector('#lpa_err')
    if(log_pas.value){
        lpa_err.innerText='';
        return true;
    }else{
        lpa_err.innerText='喵，你没输入密码么？';
        return false;
    }
}
log_pas.onchange=function () {
    check_lpas()
}

// 记住密码
function check_rem() {
    if(log_tel.value!=''&&log_pas.value!=''&&rem.checked==true){
        localStorage.setItem('telephone',log_tel.value);
        localStorage.setItem('password',log_pas.value);
        localStorage.setItem('remember',true);
    }else {
        localStorage.setItem('remember',false);
    }
}