(function () {


    //测评数据获取
    date_get();
    function date_get() {
        let evaluation={'evaluation':1};
        let title_content=document.querySelector('.title_content');
        postData(ajax_url+'/sharing/evaluation',evaluation,function (res) {
            res.toJSON;
        })
    }

})();