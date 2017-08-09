/**
 * Created by Franky on 2017/8/7.
 */
/**
 * Created by Administrator on 2017/8/7.
 */

/**
 * Created by Administrator on 2017/07/30.
 */



$(function () {

    /*  ---------------------  侧边栏-------------------------- */

    var slideout_left = new Slideout({
        'panel': document.getElementById('content-wrap'),
        'menu': document.getElementById('menu'),
        'padding':$(window).width()/(3/2),
        'tolerance': 1,
        'touch':false
    });

    var slideout_right = new Slideout({
        'panel': document.getElementById('content-wrap'),
        'menu': document.getElementById('userinfo'),
        'padding': $(window).width()/(3/2),
        'tolerance': 1,
        'side': 'right',
        'touch':false
    });

    slideout_left.on('beforeopen',function () {
        $('#userinfo').css({'display':'none'});
    }).on('open',function () {
        $('#content-wrap').on('click',function (evt) {
            evt.preventDefault();
            slideout_left.close();
        });
    }).on('beforeclose',function () {
        $('#userinfo').css({'display':''});
        $('#content-wrap').off('click');
    });

    slideout_right.on('beforeopen',function () {
        $('#menu').css({'display':'none'});
    }).on('open',function () {
        $('#content-wrap').on('click',function (evt) {
            evt.preventDefault();
            slideout_right.close();
        });
    }).on('close',function () {
        $('#menu').css({'display':''});
        $('#content-wrap').off('click');
    });


    $('.toggle-button-menu').on('click', function() {
        //slideout_left.toggle();
        verify();
    });


    $('.toggle-button-userinfo').on('click', function() {
        // window.sessionStorage.setItem("isLogin","uuid");
        verify();
        //slideout_right.toggle();
    });

    /*-----------------结束----------------------------------------------*/



    /*------------------------ 判断是否有登录----------------------------*/


    //验证
    function  verify(){

        var userid = window.sessionStorage.getItem("userid");
        console.info(userid)
        if(userid == null){
            // 未登录  ,弹出模态框
            $('#Modal').modal('show')
        }else{
            slideout_right.toggle();
        }

    }

    //退出登录
    $("#logoff").click(function(){

        window.sessionStorage.clear()
        console.info("已退出。。。。")
        //提交请求到服务器......
        window.location="http://localhost:8088/page/index.html"
    })


    /**
     * 登录
     */
    $("#btn_login").click(function(){
        var phone = $("#phone").val();
        var passwd = $("#passwd").val();

        if(phone == null || phone == ""){
            alert("请输入正确的手机号！")
            return
        }
        if(passwd == null || passwd == ""){
            alert("请输入密码！")
            return
        }



        $.ajax({
            url:getSalt(),
            type:'POST',
            data:{
                phone:phone ,
            },
            success:function(data){
                console.info("------------------>" + data)
                var obj = JSON.parse(data);
                if (obj.status > -1 && obj.msg != ""){
                    var salt = obj.msg;
                    var userid = obj.status;
                    $.ajax({
                        url:getLoginUrl(),
                        type:'POST',
                        data:{
                            userid:userid,
                            password:$.md5(passwd+salt)
                        },
                        success:function(data){
                            var obj = JSON.parse(data);
                            if (obj.status == 1){
                                console.info(obj.msg)
                                window.sessionStorage.setItem("userid",userid)
                            }else {
                                alert("用户名或密码错误！")
                                return;
                            }
                        }
                    })
                }else {
                    alert("用户名或密码错误！")
                    return;
                }
            }
        })



        $('#Modal').modal('hide')


    })



    /*
     * 注册
     *
     * */
    function doRegister(){


        var uuid = ""
        $.ajax({
            url:getUUID(),
            type:'POST',
            success:function(data){
                uuid = data.msg
                console.info(uuid)
            }
        })

        if (uuid != null && uuid != ""){

        }


    }



});
