$(function () {
    getUserInfo()
    var layer = layui.layer

    // 点击按钮实现退出功能
    $('#btnLogout').on('click', function () {
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
            //do something
            // 1. 清空本地存储中的 token
            localStorage.removeItem('token')
            // 2. 重新跳转到登录页面
            location.href = '/login.html'

            // 关闭 confirm 询问框
            layer.close(index)
        })
    })
})
function getUserInfo() {
    $.ajax({
        method: 'GRT',
        url: '/my/userinfo',
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg('获取用户信息失败')
            }
            renderAvatar(res.data)
        }
    })
}

// 渲染用户头像
function renderAvatar(user) {
    var name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    if (user.user_pic !== null) {
        $('#layui-nav-img').attr('src', user.user_pic).show()
        $('#text-avatar').hide()
    } else {
        // 渲染文字头像
        $('#layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first), show()
    }
}   