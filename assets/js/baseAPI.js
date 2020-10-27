var baseURL = 'http://ajax.frontend.itheima.net'

//拦截ajax请求，拼接url地址
$.ajaxPrefilter(function(params){
    params.url = baseURL + params.url
})