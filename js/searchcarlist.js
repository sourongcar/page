/**
 * Created by Franky on 2017/8/7.
 */
$(window).load(function(){

    window.animatelo.bounceInLeft('#logoAction');
})
$(function(){
    $('#confirm-btn').hwLayer({
        tapLayer: true,
        time:3000,
        afterClose: function(){
            console.log('close');
        },
        anim:5,
    });
    $(".hwLayer-ok").on('click',  function() {
        console.log('您已经确定了！');
        $('#hw-layer').hwLayer('close');
    });
});