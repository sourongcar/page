/**
 * Created by Franky on 2017/8/7.
 */
var mySwiper = new Swiper('#swiper_1',{
    loop: true,
    autoplay: 3000,
    autoplayDisableOnInteraction : false
});
$(window).load(function(){
    window.animatelo.bounceInLeft('#logoAction');
});
$(function(){
    /**
     * 产品id
     * @type {number}
     */
    //从主页传过来的procductid参数
    var productid=+location.search.split('=')[1];
    $("#collection").on("click",function(){
        var src = $("#collection").attr('src');

        if(src=="images/collection.png"){
            this.src = "images/after-collect.png";

            <!--发送ajax 收藏请求-->
            $.ajax({
                url:"http://localhost:8080/sourong_car/collection/doAdd.action",
                data:{
                    userId : window.sessionStorage.getItem("userid"),
                    productId:productid,

                },
                dataType:"json",
                success:function(data){

                    console.log("收藏成功");
                    alert("收藏成功");

                },
                error:function(data){
                    console.log("收藏失败");
                    alert("收藏失败");
                    $("#collection").attr("src","images/collection.png");
                }
            })

        } else{
            this.src = "images/collection.png";

            <!--发送ajax 取消收藏请求-->
            $.ajax({
                url:"http://localhost:8080/sourong_car/collection/doCancel.action",
                data:{
                    userid : window.sessionStorage.getItem("userid"),
                    productid:productid,
                },
                dataType:"json",
                success:function(data){
                    console.log("取消收藏成功");
                    alert("取消收藏成功");
                },
                error:function(data){
                    console.log("取消收藏失败");
                    alert("取消收藏失败");
                    $("#collection").attr("src","images/after-collect.png");
                }
            })
        }
    });
    $("#mask").on('click',function(){
        $("#mask").css("display","");
        $("#model").css("display","");
        $("#model").css("opacity",0);
        $("body").css("overflow", "auto")
    });
    $(".bdsharebuttonbox a").mouseover(function () {
        ShareURL = $(this).attr("data-url");
    });
    $("#confirm-btn").on("click",function(){
        if(verify()){
            consult(productid);
        }else{
            type = "consult";
            layer.open({
                type: 0,
                content:$("#login"),
                scrollbar: false,
                skin:'hint',
                area:'80vw',
                btn:[],
                title:false,
                shadeClose:true,
                closeBtn:false,
                anim:2,
                time:2000,
                success:function(layero,index){
                    $("body").css("overflow","hidden")
                },
                end:function(){
                    $("body").css("overflow","auto")
                }
            });
        };
    });
    $("#shar_img").on('click',function(){
        layer.open({
            type: 1,
            content:$(".kePublic"),
            btn:[],
            title:false,
            area:"100%",
            scrollbar: false,
            shadeClose:true,
            closeBtn:false,
            anim:2,
            offset:'b',
            zIndex:999,
            success:function(layero,index){
                $("body").css("overflow","hidden")
            },
            end:function(){
                $("body").css("overflow","auto")
            }
        });
    });

})
var oldIE = true;

window.onload = function() {
    baguetteBox.run('.baguetteBoxOne');
    if (typeof oldIE === 'undefined' && Object.keys) {
        hljs.initHighlighting();
    }
};
/*展示实拍图模态框*/
function ShowMask(){
    $("#mask").css("display","block");
    $("#model").css("display","block");
    var model_content_height = $("#mode_content")[0].offsetHeight;
    var widow_width = $(window).width();
    var max_height = widow_width;
    var widow_height = $(window).height();
    if(model_content_height>max_height){
        $("#model").css("height",max_height+"px");
    }else{
        $("#model").css("height",model_content_height+"px");
    }
    var top = (widow_height-$("#model")[0].offsetHeight)/2;
    $("#model").css("top",top+"px");
    $("#model").css("opacity",1);
    $("body").css("overflow", "hidden")
};
//全局变量，动态的文章ID
var ShareURL = "";
//绑定所有分享按钮所在A标签的鼠标移入事件，从而获取动态ID
/*
 * 动态设置百度分享URL的函数,具体参数
 * cmd为分享目标id,此id指的是插件中分析按钮的ID
 *，我们自己的文章ID要通过全局变量获取
 * config为当前设置，返回值为更新后的设置。
 */
function SetShareUrl(cmd, config) {
    if (ShareURL) {
        config.bdUrl = ShareURL;
    }
    return config;
}

//插件的配置部分，注意要记得设置onBeforeClick事件，主要用于获取动态的文章ID
window._bd_share_config = {
    "common": {
        onBeforeClick: SetShareUrl, "bdSnsKey": {}, "bdText": ""
        , "bdMini": "2", "bdMiniList": false, "bdPic": "http://www.lanrenzhijia.com/demos/34/3426/1.jpg", "bdStyle": "0", "bdSize": "24"
    }, "share": {}
};
//插件的JS加载部分
with (document) 0[(getElementsByTagName('head')[0] || body)
    .appendChild(createElement('script'))
    .src = 'http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion='
    + ~(-new Date() / 36e5)];