/**
 * Created by Franky on 2017/8/7.
 */
$(function(){
    /**
     * 实现公司信息调用
     */
    var userid = window.localStorage.getItem("userid");
    var start = 0;
    var offset = 8;
    /**
     * 用户未登录重定向到首页
     */
    /*if(userid == null){
        window.location.href = "index";
        return;
    }*/
    $.ajax({
        url:'http://localhost:8080/sourong_car/collection/getDisplayList.action',
        type:'GET',
        data:{userid:2,start:start,offset:offset},
        dataType:'JSON',
        success:function (data) {
            console.log(data);
        }
    });
    $('#loadmore').on('click',function () {
        /**
         * 车轮转动
         *
         */
        var angle = 0;
        start += offset;
        var wheel = setInterval(function() {
            angle += 6;
            $('#loadmore').css({'transform':'rotate('+ angle +'deg)','transform-origin': '50% 50%'});
            if(angle === 360){
                angle = 0;
            }
        },10);





        /**
         * 取消车轮转动
         *
         */
        clearInterval(wheel);
    })


    $.ajax({
        url:'http://localhost:8080/sourong_car/company/getCompanyinformation.action',
        type:'POST',
        dataType: "json",
        success:function(data){
            $("#CompanyAddressArea").text(data.companyaddress);
            $("#CompanyPhoneArea").text(data.companyphone);
            $("#ServiceTimeArea").text(data.servicetime);
            $("#CompanyQRArea").attr("src",'http://localhost:8080/images/'+data.companyqr);
        },
        error: function () {

        }
    });

});