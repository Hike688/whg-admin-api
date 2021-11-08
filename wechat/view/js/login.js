var code_time = 90;

function time_inter() {
    $('.code-btn').addClass('code-btn-gray');
    var timeflag = setInterval(function() {
        $('.code-btn-gray').html("" + code_time + "s后获取").css({
            "cursor": "no-",
            "color": "#999"
        });
        code_time--;
        if (code_time == 0) {
            clearInterval(timeflag);
            $('.code-btn-gray').html("获取验证码").css({
                "cursor": "pointer",
                "color": "#a07941"
            });
            $('.code-btn').removeClass('code-btn-gray');
        }
    }, 1000)

}
//获取验证码点击事件
$('.code-btn').on('click', function() {
    if ($(this).hasClass('code-btn-gray')) {
        return false;
    }
    var tel_num = $('#tel_num').val();
    if (tel_num && tel_num.length == 11) {
        time_inter(); //按钮倒计时
    } else {
        alert('请输入正确手机号码')
    }
})