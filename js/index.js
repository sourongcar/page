/**
 * Created by Franky on 2017/8/7.
 */
var html= "<div style='font-size: 6vw;margin-top: 5vw'>"+"<span>底价咨询成功</span></div>"+
    "<div style='font-size: 4.8vw;margin-top: 5vw'>"+"<p>稍后会有搜融工作人员与您联系</p><p>请稍后<br/></p>"+
    "</div>";
$(function(){
    $("#pic-consult").on("click",function(){
        layer.open({
            type: 0,
            content:html,
            scrollbar: false,
            skin:'hint',
            btn:[],
            title:false,
            shadeClose:true,
            closeBtn:false,
            anim:2,
            time:2000,
        });
    });

})