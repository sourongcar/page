/**
 * Created by Franky on 2017/8/7.
 */
$(function(){
    /**
     * 实现介绍页面数据调用
     */
    $.ajax({
        url:'http://localhost:8080/sourong_car/article/getArticle.action',
        type:'POST',
        dataType: "json",
        data:{
            'articleid':2
        },
        success:function(data){
            $("#articleArea").html(data.content);
        },
        error: function () {

        }
    })
    /**
     * 实现公司信息调用
     */
    $.ajax({
        url:'http://localhost:8080/sourong_car/company/getCompanyinformation.action',
        type:'POST',
        dataType: "json",
        success:function(data){
            $("#CompanyAddressArea").text(data.companyaddress);
            $("#CompanyQRArea").attr("src",'http://localhost:8080/images/'+data.companyqr);
        },
        error: function () {

        }
    })

});