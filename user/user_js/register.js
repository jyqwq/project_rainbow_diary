// 昵称列表
var qz_names={
    "0":"Tom",
    "1":"Jake",
    "2":"Jane",
    "3":"Tina",
    "4":"Mary"
}



var qz_nam = document.querySelector('#qz_name');
var qz_tel = document.querySelector('#qz_telephone');
var qz_pas = document.querySelector('#qz_password');
var pas_con = document.querySelector('#pas_confirm');
var agree = document.querySelector('#agree');
var register = document.querySelector('#register');

// 点击注册按钮会发生的事件（主要事件）
var form =document.querySelector('form');
form.onclick=function (event) {
    var reg=document.querySelector('#register');
    var node=event && event.target;
    // 判断注册按钮没有disabled属性时才能注册
    flag=true;
    for(reg_cla of reg.classList){
        if(reg_cla=='disabled'){
            flag=false;
        }
    }
    // 检查form表单正确输入
    if(node.type=='button' && flag && checkTelphone() && checkPassword() && confirmpas() && checkName()){
        console.log(flag);
        var user={'name':qz_nam.value,'telephone':qz_tel.value,'password':qz_pas.value};
        postData=('http://192.168.2.66:8080/user/register',user,function (res) {
            localStorage.setItem('token',res.token)
            if(res && res.state_code=='10003'){
                if(sessionStorage.getItem('from')){
                    location.href=sessionStorage.getItem('from');
                }else{
                    location.href='index.html';
                }
            }else{
                alert(res.status_text);
            }

        })

    }
}

// 检查昵称
function checkName() {
    var name_err=document.querySelector('#name_err');
    var flag=true;
    for(i=0;i<=4;i++){
        if(qz_nam.value == qz_names[i]){
            name_err.innerText='*该昵称已被占用*';
            flag=false;
            return flag;
        } else{
            name_err.innerText='';
        }
    }
    return flag;
}
qz_nam.onchange=function () {
    checkName();
}

// 检查手机号
function checkTelphone() {
    var tel_err=document.querySelector('#tel_err');
    var regMobile=/^1\d{10}$/;
    if(qz_tel.value){
        if(regMobile.test(qz_tel.value)) {
            tel_err.innerText = '';
            return true;
        }else{
            tel_err.innerText = '*手机号码格式不正确*';
            return false;
        }
    }else{
        tel_err.innerText='*请输入手机号*';
        return false;
    }
}
qz_tel.onchange=function(){
    checkTelphone();
}

// 检查密码
function checkPassword(){
    var pas_err=document.querySelector('#pas_err');
    var regMobile=/^\w{6,}$/;
    if(qz_pas.value){
        if(regMobile.test(qz_pas.value)){
            pas_err.innerText='';
            return true;
        } else {
            pas_err.innerText='*密码不能小于6个字符*';
            return false;
        }}else{
        pas_err.innerText='*请输入密码*';
        return false;
    }}
qz_pas.onchange=function () {
    checkPassword();
    confirmpas();
}

// 确认密码
function confirmpas() {
    var con_err = document.querySelector('#con_err');
    if(pas_con.value==qz_pas.value){
        con_err.innerText='';
        return true;
        console.log('ok');
    }else{
        con_err.innerText='*两次密码不一致*';
        return false;
        console.log('no');
    }
}
pas_con.onblur=function () {
    confirmpas();
}

// 同意协议
function agreement() {
    if(agree.checked){
        register.classList.remove('disabled');
    } else{
        register.classList.add('disabled');
    }
}
agree.onchange=function () {
    agreement();
}

