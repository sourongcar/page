/**
 * Created by Franky on 2017/8/7.
 */

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
    $.getJSON(getUrl()+'/carpicture/rest/getFull.action',{productid:productid},function(data){
        if(!data)
            return;
        var swiper=$('#swiper_1'),wapper=$('<div class="swiper-wrapper"/>');
        var content=$("#mode_content");
        var loopingend=false;
        if(data&&data instanceof Array){
            for(var i=0;i<data.length;i++){
                if(data[i].picture){
                    if(data[i].islooping==0){
                        $('<div class="swiper-slide"><img src="'+getImgUrl()+data[i].picture+'" style="width: 100%;height: 100%"></div>').appendTo(wapper);
                    }
                    else if(data[i].islooping==1){
                        if(!loopingend){
                            loopingend=true;
                        }
                        content.find('div').text('');
                        var link=getImgUrl()+data[i].picture;
                        $('<a href="'+link+'"><img src="'+link+'" style="width: 49vw;height: 19vh;margin: 0.5vh 0.5vw;float: left"></a>').prependTo(content);
                    }
                }
            }
            if(wapper.children().length>0) {
                wapper.appendTo(swiper);
                new Swiper('#swiper_1', {
                    loop: true,
                    autoplay: 3000,
                    autoplayDisableOnInteraction: false
                });
            }
            else{
                swiper.css({textAlign:'center',lineHeight:'50vw',fontSize:'10vw'}).text('暂无图片');
            }
        }
    });
    $.getJSON(getUrl()+'/product/rest/getFull.action',{id:productid},function(data){//json/config.json
        if(data){
            $('.Details_Price_Title p').text(data.title);
            var dpb= $(".Details_Price_Body");
            dpb.find('#marketprice').text("￥"+data.marketprice+"万");
            dpb.find('#sourongprice').text("￥"+data.sourongprice+"万");
            data=data.configuration;
            if(!data) {
                return;
            }
            var dib= $(".Details_Introduce_Body");
            dib.find('#size').text(data.size);
            dib.find('#structure').text(data.structure);
            dib.find('#engine').text(data.engine);
            dib.find('#driverway').text(data.driverway);
            dib.find('#mainoilconsumption').text(data.mainoilconsumption);
            dib.find('#comprehensiveoilconsumption').text(data.comprehensiveoilconsumption);
            dib.find('#color').text(data.color);
            dib.find('#warranty').text(data.warranty);
            dib.find('#transmissioncase').text(data.transmissioncase);
        }
    });
    if(verify()){
        var productIdArray = [];
        var userid = window.sessionStorage.getItem("userid");
        productIdArray.push(productid);
        $.ajax({
            url:getUrl()+"/collection/ifBeCollected.action",
            type:"get",
            data:$.param({userid:userid,productIdList:productIdArray},true),
            dataType:"json",
            success:function (data) {
                if(data[0]&&data[0].productid == productid){
                    $('#collection').attr('src','images/after-collect.png');
                }else{
                    $('#collection').attr('src','images/before_collect.png');
                }
            }
        });
    }
    $("#collection").on("click",function(){
        if(verify()){
            operateUserCollection();
        }else{
            type = "collectOnProductDetail";
            login_layer_index = layer.open({
                type: 1,
                content: $("#login"),
                scrollbar: false,
                skin: 'hint',
                btn: [],
                title: false,
                shadeClose: true,
                closeBtn: false,
                anim: 2,
                area:'90%'
            });
        }
        /* var src = $("#collection").attr('src');
         if(src=="images/collection.png"){
         this.src = "images/after-collect.png";
         } else{
         this.src = "images/collection.png";
         }*/
    });
    $("#mask").on('click',function(){
        $("#mask").css("display","");
        $("#model").css("display","").css("opacity",0);
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
            login_layer_index = layer.open({
                type: 1,
                content: $("#login"),
                scrollbar: false,
                skin: 'hint',
                btn: [],
                title: false,
                shadeClose: true,
                closeBtn: false,
                anim: 2,
                area:'90%',
            });
        }
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

});
function operateUserCollection() {
    var productid=+location.search.split('=')[1];
    var userid = window.sessionStorage.getItem("userid");
    $.ajax({
        url:getUrl()+"/collection/operateUserCollection.action",
        type:"post",
        data:{userid:userid,productid:productid},
        dataType:"json",
        success:function (data) {
            if(productid === data.productid){
                $('#collection').attr('src','images/after-collect.png');
            }else{
                $('#collection').attr('src','images/before_collect.png');
            }
        }
    });
}
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
    $("#model").css("top",top+"px").css("opacity",1);
    $("body").css("overflow", "hidden")
}
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

$(function(){
    /**
     * 实现公司信息调用
     */
    $.ajax({
        url:getUrl()+'/company/getCompanyinformation.action',
        type:'POST',
        dataType: "json",
        success:function(data){
            $("#CompanyAddressArea").text(data.companyadress);
console.log(data);
            $("#CompanyPhoneArea").text(data.companyphone);
            $("#ServiceTimeArea").text(data.servicetime);
            $("#CompanyQRArea").attr("src",getImgUrl()+data.companyqr);
        },
        error: function () {

        }
    })
});