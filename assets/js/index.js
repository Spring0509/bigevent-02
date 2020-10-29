// 入口函数
$(function () {

    // 1.获取用户信息
    getUserInfo()

    // 2.退出
    var layer = layui.layer
    $('.btnLogout').on('click', function () {
        layer.confirm('确定退出登录？', { icon: 3, title: '提示' }, function (index) {
            //1.清空 token
            localStorage.removeItem('token')
            //2.强制跳转登录页面
            location.href = '/login.html'
            

            // 关闭弹出层
            layer.close(index);
        });
    })
})



// 获取用户信息
function getUserInfo() {
    $.ajax({
        url: '/my/userinfo',
        // headers: {
        //     Authorization:localStorage.getItem('token') || '' 
        // },
        success: function (res) {
            if (res.status !== 0) return layui.layer.msg(res.message)

            // 请求成功，渲染用户头部信息
            renderAvatar(res.data)
        }
    })
}

// 用户头像渲染
function renderAvatar(user) {
    // 1.用户名
    var name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)

    //2.头像
    if (user.user_pic !== null) {
        // 有头像
        $('.layui-nav-img').attr('src', user.user_pic).show
        $('.user-avater').hide()
    } else {
        // 无头像
        $('.layui-nav-img').hide()
        var text = name[0].toUpperCase()
        $('.user-avater').html(text).show()
    }
}