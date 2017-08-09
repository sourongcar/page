/**
 * Created by Administrator on 2017/07/30.
 */
$(function () {
    $('#logo-car').addClass('slideInLeft');
    $('#camera_wrap_1').camera({
        loader:'bar',
        mobileAutoAdvance: true,
        barPosition: 'bottom',
        pagination: false,
        playPause: false,
        overlayer: false,
        navigation:false,
        loader:false,
        loaderOpacity: 0,
        time: 1500,
        pauseOnClick: false,
        mobileNavHover: false,
        onStartLoading: function() {
            var temp = $('.animate-price');
            if(temp.hasClass('bounceIn')){
                temp.removeClass('bounceIn').addClass('bounceOut');
                setTimeout(function () {
                    temp.removeClass('bounceOut').addClass('bounceIn');
                },1000);
            }else if(temp.hasClass('bounceOut')){
                temp.removeClass('bounceOut').addClass('bounceIn');
            }else{
                temp.removeClass('bounceOut').addClass('bounceIn');
            }

        }
    });

    $(".carlist").click(function(){
        window.location.href='/page/searchcarlist.html'
    });

    var current_scroll_position = 0;
    $(window).scroll(function () {
        current_scroll_position = $(this).scrollTop();
        if(current_scroll_position < 50){
            $('#logo-car').addClass('slideInLeft');
        }else if(current_scroll_position > 50){
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

    $('#pic-collect').on('click', function() {
        var $src = $('#pic-collect').attr('src');
        if($src === 'images/before_collect.png'){
            $('#pic-collect').attr('src','images/after-collect.png');
        }else if($src === 'images/after-collect.png'){
            $('#pic-collect').attr('src','images/before_collect.png');
        }
    });




});