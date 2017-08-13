/**
 * Created by Franky on 2017/8/7.
 */
/**
 * 数据加载区
 */
$(function(){




/**
 * 实现公司信息调用
 */
$.ajax({
    url: getUrl()+'/company/getCompanyinformation.action',
    type:'POST',
    dataType: "json",
    success:function(data){
        $("#CompanyAddressArea").text(data.companyaddress);
        $("#CompanyPhoneArea").text(data.companyphone);
        $("#ServiceTimeArea").text(data.servicetime);
        $("#CompanyQRArea").attr("src",'http://119.29.114.44:8080/images/'+data.companyqr);
    },
    error: function () {

    }
})
})

/**
 * 底价咨询
 */
$(function(){
    $("#pic-consult").on("click",function(){
        if(verify()){
            consult($('.cameracurrent.cameraContent div').data('id'));
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
        };

    });
});
function consult(carId) {
    var car_id = carId;
    var user_id = window.sessionStorage.getItem("userid");
    $.ajax({
        url:  getUrl()+"/consultant/forMoreInformation.action",
        type: 'POST',
        data: {
            carId: car_id,
            userId: user_id
        },
        dataType: "json",
        success: function (result) {
            if (result.status == 0) {
                var result_pop_0 = "<div style='font-size: 6vw;margin-top: 5vw'>" + "</div>" +
                    "<div style='font-size: 4.8vw;margin-top: 5vw'>" + "<p>  " + 您尚未登录 + "  </p>" +
                    "</div>";
                layer.open({
                    type: 0,
                    content: result_pop_0,
                    scrollbar: false,
                    skin: 'hint',
                    btn: [],
                    title: false,
                    shadeClose: true,
                    closeBtn: false,
                    anim: 2,
                    time: 2000,
                });
            } else if (result.status == -1) {
                var result_pop_01 = "<div style='font-size: 6vw;margin-top: 5vw'>" + "</div>" +
                    "<div style='font-size: 4.8vw;margin-top: 5vw'>" + "<p>" + result.msg + "</p>" +
                    "</div>";
                layer.open({
                    type: 0,
                    content: result_pop_01,
                    scrollbar: false,
                    skin: 'hint',
                    btn: [],
                    title: false,
                    shadeClose: true,
                    closeBtn: false,
                    anim: 2,
                    time: 2000,
                });
            } else if (result.status == 1) {
                var result_pop_1 = "<div style='font-size: 6vw;margin-top: 5vw'>" + "<span>底价咨询成功</span></div>" +
                    "<div style='font-size: 4.8vw;margin-top: 5vw'>" + "<p>稍后会有搜融工作人员与您联系</p><p>请稍后<br/></p>" +
                    "</div>";
                layer.open({
                    type: 0,
                    content: result_pop_1,
                    scrollbar: false,
                    skin: 'hint',
                    btn: [],
                    title: false,
                    shadeClose: true,
                    closeBtn: false,
                    anim: 2,
                    time: 2000,
                });
            }
        },
        error: function () {

        }
    })
}
