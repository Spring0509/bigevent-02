//入口函数
$(function () {
    // 1.自定义规则
    var form = layui.form
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度为 1 ~ 6 位之间！'
            }
        }
    })

    // 2.获取用户信息并渲染
    initUserInfo() 
    var layer = layui.layer
    function initUserInfo() {
        $.ajax({
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }

                // 利用 form.val()为表单快速赋值
                form.val('formUserInfo', res.data)

            }
        })
    }

    // 3.表单重置
    $('#btnReset').on('click', function(e){
        e.preventDefault()
        // 重新渲染用户
        initUserInfo()
    })

    //4.修改用户信息
    $('.layui-form').on('submit', function(e){
        e.preventDefault()
        $.ajax({
            type: 'post',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res){
                if(res.status !== 0){
                    return layer.msg(res.message)
                }
                layer.msg('恭喜，更改信息成功！')

                // 调用父元素上的更新用户信息和头像
                window.parent.getUserInfo()
            }
        })
    })





})