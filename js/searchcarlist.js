/**
 * Created by Franky on 2017/8/7.
 */
$(window).load(function(){
    /*车型名图标*/
    var brandid=location.search;
    var str=new Array();
    str=brandid.split("&&");
    var brandid=str[0];
    var pic=str[1];
    var temp=new Array();
    temp=pic.split("=");
    var picname=temp[1];
    var img="<img src='http://localhost:8080/images/"+picname+"'width='100%'>";
    $("#carsign").append(img);
    $.ajax({
        type:"get",
        url:"http://localhost:8080/sourong_car/brand/getList.action"+brandid,
        async:true,
        success:function(data){
            data=JSON.parse(data);
            $.each(data, function(i,n) {

                if (i<10) {
                    var divs="<div class='col-xs-3' >";
                    divs+="<a id='astyle'  href=''><p class='pri chebiao' id='test'>"+n["cartypename"]+"</p></a>";
                    divs+="</div>";
                    $("#names").children().eq(0).after(divs);
                } else{
                    var divs="<div class='col-xs-3  more'   style='display:none'>";
                    divs+="<a id='astyle'  href=''><p class='pri chebiao' id='test'>"+n["cartypename"]+"</p></a>";
                    divs+="</div>";
                    $("#names").children().eq(10).after(divs);
                }
                $("#astyle").click(function () {
                    $("#test").css("color","red");
                });
                $("#morebtn").click(function(){
                    $(this).css("display","none");
                    $(".more").css("display","");
                    $("#offbtn").css("display","");
                });
                $("#offbtn").click(function(){
                    $(this).css("display","none");
                    $(".more").css("display","none");
                    $("#morebtn").css("display","");
                });
            });
            var i=data.length;
            console.log(i);
            if(i<10){
                $("#morebtn").css("display","none");
                if(i%4==0||i==0){
                    for(var h=0;h<3;h++){
                        var temp="<div class='col-xs-3'></div>";
                        $("#names").append(temp);
                    }
                }
                if(i==1||i==5||i==9){
                    for(var h=0;h<2;h++){
                        var temp="<div class='col-xs-3'></div>";
                        $("#names").append(temp);
                    }
                }
                if(i==2||i==6){
                    var temp="<div class='col-xs-3'></div>";
                    $("#names").append(temp);
                }
            }

            if((i+2)%4!=0&&i>=10){
                var j=4-(i+2)%4;
                if(j==1){
                    var temp="<div class='col-xs-3'></div>";
                    $("#names").append(temp);
                }else if(j==2){
                    for(var k=0;k<j;k++){
                        var temp="<div class='col-xs-3'></div>";
                        $("#names").append(temp);
                    }
                }else if(j==3){
                    for(var k=0;k<j;k++){
                        var temp="<div class='col-xs-3'></div>";
                        $("#names").append(temp);
                    }
                }

            }
        },
        error:function(error){
            alert("获取数据失败！"+error.statusText)
        }
    });
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