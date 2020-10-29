var baseURL = 'http://ajax.frontend.itheima.net'


$.ajaxPrefilter(function(options){
    // 1.拦截ajax请求，拼接url地址
    options.url = baseURL + options.url

    // 2.对需要权限的接口配置头信息
    if(options.url.indexOf('/my/') !== -1){
        options.headers = {
            Authorization: localStorage.getItem('token') || '' 
        }
    }

    // 3.控制用户访问权限
     /* 若没有登录，禁止直接访问后台。利用请求后服务器返回的状态来进行权限的校验 */
     /* 不管成功还是失败,都会调用complete回调函数 */
     /* 在回调中， res.responseJSON拿到服务器返回的数据 */
     options.complete = function(res){
        // console.log(res)
        var obj = res.responseJSON
         if(obj.status == 1 && obj.message == '身份认证失败！'){
            localStorage.removeItem('token')
            location.href = '/login.html'
         }
     }
})