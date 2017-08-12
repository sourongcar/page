/**
 * Created by Administrator on 2017/07/30.
 */
var productIdArray;//首页轮播图车的id数组
var userCollectList;//用户首页轮播图收藏数值
$(function () {
    $('#logo-car').addClass('slideInLeft');
    var cameraWrap = $('#camera_wrap_1');
    var loader = $('<div class="camera_loader"/>').appendTo(cameraWrap);
    var userid = window.sessionStorage.getItem("userid");
    $.getJSON("json/loopProduct.json", null, function (data) {//product/rest/looping.action
        if(!data instanceof Array) return;
        productIdArray = new Array();
        for (var i = 0; i < data.length; i++) {
            var item = data[i];
            cameraWrap.append('<div  data-src="images/' + item.coverpic + '" data-link="xiangqing.html?productid='+item.productid+'">'
                + '<div class="camera_caption fadeFromBottom" data-id="'+ item.productid +'">' + item.picintroduction + '</div></div>');
            productIdArray.push(item.productid);
        }
        var cur = 0,curindex=0;
        var temp = $('.animate-price');
        temp.eq(0).text('￥' + data[0].marketprice + '万');
        temp.eq(1).text('￥' + data[0].sourongprice + '万');
        loader.remove();
        if(verify()){
            $.ajax({
                url:"http://localhost:8080/sourong_car/collection/ifBeCollected.action",
                type:"get",
                data:$.param({userid:userid,productIdList:productIdArray},true),
                dataType:"json",
                success:function (data) {
                    userCollectList = data;
                    var currentDisplayCar = $('.cameraContent div.camera_caption').eq(curindex).data('id');
                    for(var i = 0;i < userCollectList.length;i++){
                        if(currentDisplayCar == userCollectList[i].productid){
                            $('#pic-collect').attr('src','images/after-collect.png');
                            break;
                        }else{
                            $('#pic-collect').attr('src','images/before_collect.png');
                        }
                    }
                }
            });
        }
        cameraWrap.camera({
            loader: 'bar',
            mobileAutoAdvance: true,
            barPosition: 'bottom',
            pagination: false,
            playPause: false,
            overlayer: false,
            navigation: false,
            loader: false,
            loaderOpacity: 0,
            time: 1500,
            pauseOnClick: false,
            mobileNavHover: false,
            onStartLoading: function () {
                if (temp.hasClass('bounceIn')) {
                    temp.removeClass('bounceIn').addClass('bounceOut');
                    setTimeout(function () {
                        temp.removeClass('bounceOut').addClass('bounceIn');
                        curindex=++cur % data.length;
                        var curdata = data[curindex];
                        temp.eq(0).text('￥' + curdata.marketprice + '万');
                        temp.eq(1).text('￥' + curdata.sourongprice + '万');

                        if(userCollectList == undefined){
                            return;
                        }
                        var currentDisplayCar = $('.cameraContent div.camera_caption').eq(curindex).data('id');
                        for(var i = 0;i < userCollectList.length;i++){
                            if(currentDisplayCar == userCollectList[i].productid){
                                $('#pic-collect').attr('src','images/after-collect.png');
                                break;
                            }else{
                                $('#pic-collect').attr('src','images/before_collect.png');
                            }
                        }
                    }, 1000);
                } else if (temp.hasClass('bounceOut')) {
                    temp.removeClass('bounceOut').addClass('bounceIn');
                } else {
                    temp.removeClass('bounceOut').addClass('bounceIn');
                }

            }
        });


        var current_scroll_position = 0;
        $(window).scroll(function () {
            current_scroll_position = $(this).scrollTop();
            if (current_scroll_position < 50) {
                $('#logo-car').addClass('slideInLeft');
            } else if (current_scroll_position > 50) {
                $('#logo-car').removeClass('slideInLeft');
            }

        });


        $(".carlistshow").click(function () {
            $(".car").css("display", "");
            $(this).css("display", "none");
            $(".carlistoff").css("display","");
        });

        $(".carlistoff").click(function () {
            $(".car").css("display", "none");
            $(".carlistshow").css("display", "");
            $(this).css("display","none");
        });

        $('#pic-collect').on('click', function () {
            var pc=$('#pic-collect');
            var $src = pc.attr('src');
            if(!verify()){
                type = "collectOnIndex";
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
            }else{
                var userid = window.sessionStorage.getItem("userid");
                var productid = $('.cameracurrent.cameraContent div').data('id');
                $.ajax({
                    url:"http://localhost:8080/sourong_car/collection/operateUserCollection.action",
                    type:"post",
                    data:{userid:userid,productid:productid},
                    dataType:"json",
                    success:function (data) {
                        if(productid === data.productid){
                            $('#pic-collect').attr('src','images/after-collect.png');
                        }else{
                            for(var i = 0;i < userCollectList.length;i++){
                                if(userCollectList[i].productid === productid){
                                    userCollectList.splice(i,1);
                                    $('#pic-collect').attr('src','images/before_collect.png');
                                    break;
                                }
                            }
                        }
                    }
                })
            }

        });
    })
});