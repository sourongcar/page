/**
 * Created by Administrator on 2017/07/30.
 */
$(function () {
    $('#logo-car').addClass('slideInLeft');
    var cameraWrap = $('#camera_wrap_1');
    var loader = $('<div class="camera_loader"/>').appendTo(cameraWrap);
    $.getJSON("json/loopProduct.json", null, function (data) {//product/rest/looping.action
        if(!data instanceof Array)
        return;
        for (var i = 0; i < data.length; i++) {
            var item = data[i];
            cameraWrap.append('<div  data-src="images/' + item.coverpic + '" data-link="xiangqing.html">'
                + '<div class="camera_caption fadeFromBottom" data-id="' + item.productid + '">' + item.picintroduction + '</div></div>');
        }
        var cur = 0;
        var temp = $('.animate-price');
        temp.eq(0).text('￥' + data[0].marketprice + '万');
        temp.eq(1).text('￥' + data[0].sourongprice + '万');
        loader.remove();
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
                        var curdata = data[++cur % data.length];
                        temp.eq(0).text('￥' + curdata.marketprice + '万');
                        temp.eq(1).text('￥' + curdata.sourongprice + '万');
                    }, 1000);
                } else if (temp.hasClass('bounceOut')) {
                    temp.removeClass('bounceOut').addClass('bounceIn');
                } else {
                    temp.removeClass('bounceOut').addClass('bounceIn');
                }

            }
        });

        $(".carlist").click(function () {
            window.location.href = '/page/searchcarlist.html'
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
            $("#carlistshow").css("display", "");
            $(this).css("display", "none");
        });
        $(".carlistoff").click(function () {
            $("#carlistshow").css("display", "none");
            $(".carlistshow").css("display", "");
        });

        $('#pic-collect').on('click', function () {
            var pc=$('#pic-collect');
            var $src = pc.attr('src');
            if ($src === 'images/before_collect.png') {
                pc.attr('src', 'images/after-collect.png');
            } else if ($src === 'images/after-collect.png') {
                pc.attr('src', 'images/before_collect.png');
            }
        });
    })



});