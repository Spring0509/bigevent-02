$(function () {
    // 1. 登录 注册页面切换
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    // 2.自定义验证规则
    var form = layui.form
    form.verify({
        // 密码验证
        pwd: [
            /^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格'
        ],
        // 确认密码验证
        repwd: function(value){
            var pwd = $('.reg-box input[name=password]').val()
            if(value !== pwd){
                return '两次密码输入不一致，请重新输入！'
            }
        }
    })

    // 3.注册功能
    var layer = layui.layer
    $('#form-reg').on('submit', function(e){
        e.preventDefault()
        $.ajax({
            type: 'post',
            url: '/api/reguser',
            data: {
                username: $('.reg-box [name=username]').val(),
                password: $('.reg-box [name=password]').val()
            },
            success: function(res){
                if(res.status !== 0){
                    return layer.msg(res.message)
                }
                // 提交成功后
                layer.msg(res.message)
                $('#link_login').click()
                $('#form-reg')[0].reset()
            }
        })
    })

    // 4.登录功能
    $('#form-login').on('submit', function(e){
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            type: 'POST',
            data: $(this).serialize(),
            success: function(res){
                if(res.status !== 0){
                    return layer.msg(res.message)
                }
                /* 提示信息 保存token 跳转页面 */
                layer.msg('恭喜， 页面登录成功！')
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }
        })
    })






})