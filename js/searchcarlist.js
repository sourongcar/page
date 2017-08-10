/**
 * Created by Franky on 2017/8/7.
 */
$(window).load(function(){

    window.animatelo.bounceInLeft('#logoAction');
})
$(function(){
    /**
     * 实现公司信息调用
     */
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
    })
});