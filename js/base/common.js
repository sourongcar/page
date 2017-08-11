/**
 * 公共的js
 * Created by Administrator on 2017/8/7.
 */

var ip = "http://localhost"
var port = "8080"
var projectName = "sourong_car"

var tempPort = "8033"


var register_layer_index = "" ;
var type="";
function getIndexUrl(){
    return ip + ":" + tempPort + "/page/index.html"
}

/*
 * 获取请求的地址
 *
 * */
function getUrl(){
    return ip + ":" + port + "/" +  projectName
}

/*
 * 获取uuid
 *
 * */
function getUUID(){
    return getUrl() + "/souronguser/getUUID.action"
}

/**
 * 拿到盐值
 *
 */
function getSalt(){
    return getUrl() + "/souronguser/getSalt.action"
}

/*
 * 获取登录地址
 * */
function getLoginUrl(){
    return getUrl() + "/souronguser/doLogin.action"
}

/**
 * 获取注册地址
 */
function getRegisterUrl(){
    return getUrl()+"/souronguser/register.action"
}


/*------------------------ 判断是否有登录----------------------------*/


//验证
function  verify(){

    var userid = window.sessionStorage.getItem("userid");
    if(userid == null){
        // 未登录  ,弹出模态框
        return false;
    }else{
        return true ;
    }

}

//退出登录
$("#logoff").click(function(){

    window.sessionStorage.clear()
    console.info("已退出。。。。")
    //提交请求到服务器......
    window.location = getIndexUrl()
})


/**
 * 点击侧边栏登录效果，打开侧边栏
 */
$("#btn_login").click(function(){
    login(function () {
        if(type=="slide"){
            slideout_right.toggle();
        }
        var userid = window.sessionStorage.getItem("userid");
        $.ajax({
            url:"http://localhost:8080/sourong_car/collection/ifBeCollected.action",
            type:"get",
            data:$.param({userid:userid,productIdList:productIdArray},true),
            dataType:"json",
            success:function (data) {
                userCollectList = data;
                var currentDisplayCarId = $('.cameracurrent.cameraContent div').data('id');
                console.log("currentDisplayCarId:" + currentDisplayCarId);
                for(var i = 0;i < userCollectList.length;i++){
                    if(currentDisplayCarId == userCollectList[i].productid){
                        $('#pic-collect').attr('src','images/after-collect.png');
                        break;
                    }else{
                        $('#pic-collect').attr('src','images/before_collect.png');
                    }
                }
            }
        });
    });
})
/*
 * 点击侧边栏注册效果，打开侧边栏
 * */
$("#btn_register").on("click",function(){
    doRegister(function(){
        if(type=="slide") {
            slideout_right.toggle();
        }
    });
})

$("#register").on("click",function(){
    layer.close(login_layer_index) ;
    register_layer_index = layer.open({
        type: 1,
        content: $("#register_layer"),
        scrollbar: false,
        skin: 'hint',
        btn: [],
        title: false,
        shadeClose: true,
        closeBtn: false,
        anim: 2,
        area:'90%',
    });
});



/*---------登陆框正则检验------------*/
$("#phone").change(function(){
    var phone = $("#phone").val()
    var that = this
    if(!checkPhone(phone)){
        layer.tips('请输入正确的手机格式',that,{
            tips:1,
            time:2000
        });
        $("#phone").focus();

    }
});
$("#passwd").change(function(){
    var passwd = $("#passwd").val();
    var that = this;
    if(passwd == null || passwd == ""){
        layer.tips('密码不能为空哦',that,{
            tips:1,
            time:2000
        });
        $("#passwd").focus();
    }
});
/*-----------end---------------*/


/*------------注册框正则检验---------------*/
$("#register_phone").change(function(){
    var phone = $("#register_phone").val();
    var that = this;
    if(!checkPhone(phone)){
        layer.tips('请输入正确的手机格式',that,{
            tips:1,
            time:2000
        });
        $("#register_phone").focus();
    }
});
$("#register_username").change(function(){
    var username = $("#register_username").val();
    var that = this;
    if(!checkUserName(username)){
        layer.tips('亲！只支持中文名和英文名哦',that,{
            tips:1,
            time:2000
        });
        $("#register_username").focus();

    }
});
$("#register_passwd").change(function(){
    var password = $("#register_passwd").val();
    var that = this ;
    if(password == null || password == ""){
        layer.tips('密码不能为空哦',that,{
            tips:1,
            time:2000
        });
        $("#register_passwd").focus();

    }
});
/*-----------------end------------------------------*/

/*
 * 登录函数
 * */
function  login(success){
    var phone = $("#phone").val();
    var passwd = $("#passwd").val();
    if(!checkPhone(phone)){
        layer.tips('请输入正确的手机格式',$("#phone"),{
            tips:1,
            time:2000
        });
        $("#phone").focus();
        return;
    }
    if(passwd == null || passwd == ""){
        layer.tips('密码不能为空哦',$("#passwd"),{
            tips:1,
            time:2000
        });
        $("#passwd").focus();
        return;
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
                            console.info(obj.msg);
                            window.sessionStorage.setItem("userid",userid);
                            layer.closeAll();
                        //    window.location.href = "index.html";
                            if(success&&typeof success==='function' ){
                                success();
                            }
                        }else {
                            alert("用户名或密码错误！");
                        }
                    }
                })
            }else {
                alert("用户名或密码错误！")
                return;
            }
        }
    });
}


/*
 * 注册函数
 * */
function doRegister(success){
    var username = $("#register_username").val();
    var userphone = $("#register_phone").val();
    var password = $("#register_passwd").val();
    if(!checkPhone(userphone)){
        layer.tips('请输入正确的手机格式',$("#register_phone"),{
            tips:1,
            time:2000
        });
        $("#register_phone").focus();
        return ;
    }
    if(!checkUserName(username)){
        layer.tips('亲！只支持中文名和英文名哦',$("#register_username"),{
            tips:1,
            time:2000
        });
        $("#register_username").focus();
        return ;
    }
    if(password == null || password == ""){
        layer.tips('密码不能为空哦',$("#register_passwd"),{
            tips:1,
            time:2000
        });
        return
    }
    var salt = ""
    $.ajax({
        url:getUUID(),
        type:'POST',
        success:function(data){
            var jdata = JSON.parse(data);
            salt = jdata.msg;
            console.info(salt);
            $.ajax({
                url:getRegisterUrl(),
                type:'POST',
                data:{
                    username:username,
                    userphone:userphone,
                    salt:salt,
                    password: $.md5(password+salt)
                },
                success:function(data){
                    var obj = JSON.parse(data);
                    if(obj.status > 0 && obj.msg != ""){

                        console.info(obj.status+'---------------------注册成功');
                        window.sessionStorage.setItem("userid",obj.status);
                        layer.closeAll();
                        if(success&&typeof success==='function' ){
                            success();
                        }
                    }else{
                        alert('此手机已被注册过了')
                    }
                }
            })
        }
    })
}
function checkPhone(phone){
    if((/^1(3|4|5|7|8)\d{9}$/.test(phone))){
        return true;
    }else{
        return false ;
    }
}
function checkUserName(username){
    if((/^([\u4e00-\u9fa5 ]{2,20}|[a-zA-Z\/ ]{2,20})$/.test(username))){
        return true;
    }else{
        return false ;
    }
}