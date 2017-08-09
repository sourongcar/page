/**
 * Created by Administrator on 2017/07/30.
 */
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
var login_layer_index = "";

$(function () {

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
        if(verify()){
            slideout_left.toggle();
        }else{
            type = "slide" ;
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
        };
    });


    $('.toggle-button-userinfo').on('click', function() {
        // window.sessionStorage.setItem("isLogin","uuid");
        if(verify()){
            slideout_right.toggle();
        }else{
            /* $('#Modal').modal('show')*/
            type = "slide" ;
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
        };
        //slideout_right.toggle();
    });
});