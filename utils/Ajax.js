function getData(url, args = null, cb) {
    var oAjax = null;
    oAjax = new XMLHttpRequest() || new ActiveXObject('Microsoft.XMLHTTP');
    if (args) {
        for (var key in args) {
            url = addURLParam(url, key, args[key]);
        }
    }
    oAjax.open('get', url, true);
    oAjax.send(null);
    oAjax.onreadystatechange = function () {
        if (oAjax.readyState == 4) {
            if (oAjax.status >= 200 && oAjax.status < 300 || oAjax.status == 304) {
                var con = JSON.parse(oAjax.responseText);
                cb(con);
            } else {
                window.sessionStorage.setItem('status', oAjax.status);
                window.sessionStorage.setItem('statusText', oAjax.statusText);
                location.href = 'pages/404.html';
            }
        }
    };

    function addURLParam(url, name, value) {
        url += (url.indexOf("?") == -1) ? "?" : "&";
        url += encodeURIComponent(name) + "=" + encodeURIComponent(value);
        return url;
    }

}

function postData(url, args = null, cb) {
    var oAjax = null;
    oAjax = new XMLHttpRequest() || new ActiveXObject('Microsoft.XMLHTTP');
    oAjax.open('post', url, true);
    oAjax.setRequestHeader("Content-Type", "application/json");
    oAjax.send(JSON.stringify(args));
    oAjax.onreadystatechange = function () {
        if (oAjax.readyState == 4) {
            if (oAjax.status >= 200 && oAjax.status < 300 || oAjax.status == 304) {
                var con = JSON.parse(oAjax.responseText);
                cb(con);
            } else {
                window.sessionStorage.setItem('status', oAjax.status);
                window.sessionStorage.setItem('statusText', oAjax.statusText);
                location.href = 'pages/404.html';
            }
        }
    };

    //转化格式
    function addData(con) {
        var str = '';
        for (var key in con) {
            str += key + '=' + con[key] + '&';
        }
        return str.slice(0, -1);
    }

}
