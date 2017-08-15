/**
 * Created by Franky on 2017/8/7.
 */
$(window).load(function(){
    /*车型名图标*/
    var brandid=location.search;
    var str=new Array();

    /**
     * 判断是否为通过搜索框进入此页面
     */
    if((brandid.split("?")[1].split("=")[0]=="dosearch"&brandid.split("?")[1].split("=")[1]!="")){
        var dosearch =brandid.split("?")[1].split("=")[1]

        $.ajax({
            type: "get",
            url: getUrl()+"/product/rest/getlistbydosearch.action?dosearch=" +dosearch,
            async: true,
            success: function (data) {
                data = JSON.parse(data);
                $("#dosearchlist").html(" ")
                if (data == "") {
                    $("#dosearchlist").html("<h2 style='text-align: center'>暂无产品</h2>")
                }
                for (i = 0; i < data.length; i++) {
                    data[i].coverpic = getImgUrl() + data[i].coverpic
                    if (data[i].coverpic == null || data[i].coverpic ==  getImgUrl() + undefined) {
                        data[i].coverpic = "/page/images/nocoverpic.png"
                    }
                    var carlist = '<div style="margin:5vw 5vw;height: 50vw;overflow:hidden;zoom:1;">'
                        + '<img src="' + data[i].coverpic + '" onclick="window.location.href=\'xiangqing.html?productid='+data[i].productid+'\'" style="width: 100%;height: 50vw">'
                        + '<div style="height: 15vw;position:relative; z-index:1;top:-15vw ;background-color: rgba(0,0,0,0.5);color: white;text-align: center">'
                        + '<div class="col-xs-6" style="margin-top: 2vw">'
                        + '<span style="font-size: 8vw;">' + data[i].cartype + '</span></div>'
                        + '<div class="col-xs-6" style="font-size: 4vw;"><div style="margin-top: 2vw">'
                        + '<span>市价：</span><span>¥' + data[i].marketprice + '万</span></div> <div style="color: orangered"> <span>搜融：</span>'
                        + '<span>¥' + data[i].sourongprice + '万</span> </div> </div> </div> </div>'
                    $("#dosearchlist").append(carlist)
                }
            },
            error:function(data){
            }
        })
        /**
         * 无内容搜索直接搜索全部
         */
    }else if(brandid.split("?")[1].split("=")[1]=="") {
        $.ajax({
            type: "get",
            url: getUrl()+"/product/rest/getAlllist.action",
            async: true,
            success: function (data) {
                data = JSON.parse(data);
                $("#dosearchlist").html(" ")
                if (data == "") {
                    $("#dosearchlist").html("<h2 style='text-align: center'>暂无产品</h2>")
                }
                for (i = 0; i < data.length; i++) {
                    data[i].coverpic = getImgUrl() + data[i].coverpic
                    if (data[i].coverpic == null || data[i].coverpic == 'http://localhost:8080/images/' + undefined) {
                        data[i].coverpic = "/page/images/nocoverpic.png"
                    }
                    var carlist = '<div style="margin:5vw 5vw;height: 50vw;overflow:hidden;zoom:1;">'
                        + '<img src="' + data[i].coverpic + '" onclick="window.location.href=\'xiangqing.html?productid='+data[i].productid+'\'" style="width: 100%;height: 50vw">'
                        + '<div style="height: 15vw;position:relative; z-index:1;top:-15vw ;background-color: rgba(0,0,0,0.5);color: white;text-align: center">'
                        + '<div class="col-xs-6" style="margin-top: 2vw">'
                        + '<span style="font-size: 8vw;">' + data[i].cartype + '</span></div>'
                        + '<div class="col-xs-6" style="font-size: 4vw;"><div style="margin-top: 2vw">'
                        + '<span>市价：</span><span>¥' + data[i].marketprice + '万</span></div> <div style="color: orangered"> <span>搜融：</span>'
                        + '<span>¥' + data[i].sourongprice + '万</span> </div> </div> </div> </div>'
                    $("#dosearchlist").append(carlist)
                }
            },
            error:function(data){
            }
        })



    }else {
        str = brandid.split("&&");
        var brandid = str[0];
        var pic = str[1];
        var temp = new Array();
        temp = pic.split("=");
        var picname = temp[1];
        var img = "<img src='"+getImgUrl() + picname + "'width='100%'>";
        $("#carsign").append(img);


        $.ajax({
            type: "get",
            url: getUrl()+"/brand/getList.action" + brandid,
            async: true,
            success: function (data) {
                data = JSON.parse(data);
                $.each(data, function (i, n) {

                    if (i < 10) {
                        var divs = "<div class='col-xs-3' >";
                        divs += "<a id='astyle'class='changecolor' ><p class='pri chebiao' id='test'>" + n["cartypename"] + "</p></a>";
                        divs += "</div>";
                        $("#names").children().eq(0).after(divs);
                    } else {
                        var divs = "<div class='col-xs-3  more'   style='display:none'>";
                        divs += "<a id='astyle' class='changecolor'><p class='pri chebiao' id='test'>" + n["cartypename"] + "</p></a>";
                        divs += "</div>";
                        $("#names").children().eq(10).after(divs);
                    }
                    $(".changecolor").click(function () {
                        $(this).parent().siblings().children().children().css("color", "black");
                        $(this).children().css("color", "red");
                    });
                    $("#getAllcarlist").click(function () {
                        $(".chebiao").css("color", "black");
                    });
                    /**
                     * 通过车型获取列表
                     */
                    $(".chebiao").click(function () {
                        var cartype = $(this).text();
                        $.ajax({
                            url: getUrl()+'/product/rest/getProductByCarType.action',
                            type: 'POST',
                            data: {
                                cartype: cartype
                            },
                            dataType: "json",
                            success: function (data) {
                                $(".carlistArea").html(" ")
                                if (data == "") {
                                    $(".carlistArea").html("<h2 style='text-align: center'>暂无产品</h2>")
                                }
                                for (i = 0; i < data.length; i++) {
                                    data[i].coverpic =getImgUrl() + data[i].coverpic
                                    if (data[i].coverpic == null || data[i].coverpic == getImgUrl() + undefined) {
                                        data[i].coverpic = "/page/images/nocoverpic.png"
                                    }
                                    var carlist = '<div style="margin:5vw 5vw;height: 50vw;overflow:hidden;zoom:1;">'
                                        + '<img src="' + data[i].coverpic + '" onclick="window.location.href=\'xiangqing.html?productid='+data[i].productid+'\'" style="width: 100%;height: 50vw">'
                                        + '<div style="height: 15vw;position:relative; z-index:1;top:-15vw ;background-color: rgba(0,0,0,0.5);color: white;text-align: center">'
                                        + '<div class="col-xs-6" style="margin-top: 2vw">'
                                        + '<span style="font-size: 8vw;">' + data[i].cartype + '</span></div>'
                                        + '<div class="col-xs-6" style="font-size: 4vw;"><div style="margin-top: 2vw">'
                                        + '<span>市价：</span><span>¥' + data[i].marketprice + '万</span></div> <div style="color: orangered"> <span>搜融：</span>'
                                        + '<span>¥' + data[i].sourongprice + '万</span> </div> </div> </div> </div>'
                                    $(".carlistArea").append(carlist)
                                }
                            },
                            error: function () {

                            }
                        })
                    })
                    $("#morebtn").click(function () {
                        $(this).css("display", "none");
                        $(".more").css("display", "");
                        $("#offbtn").css("display", "");
                    });
                    $("#offbtn").click(function () {
                        $(this).css("display", "none");
                        $(".more").css("display", "none");
                        $("#morebtn").css("display", "");
                    });
                });
                var i = data.length;
                if (i < 10) {
                    $("#morebtn").css("display", "none");
                    if (i % 4 == 0 || i == 0) {
                        for (var h = 0; h < 3; h++) {
                            var temp = "<div class='col-xs-3'></div>";
                            $("#names").append(temp);
                        }
                    }
                    if (i == 1 || i == 5 || i == 9) {
                        for (var h = 0; h < 2; h++) {
                            var temp = "<div class='col-xs-3'></div>";
                            $("#names").append(temp);
                        }
                    }
                    if (i == 2 || i == 6) {
                        var temp = "<div class='col-xs-3'></div>";
                        $("#names").append(temp);
                    }
                }

                if ((i + 2) % 4 != 0 && i >= 10) {
                    var j = 4 - (i + 2) % 4;
                    if (j == 1) {
                        var temp = "<div class='col-xs-3 more'style='display:none'></div>";
                        $("#names").append(temp);
                    } else if (j == 2) {
                        for (var k = 0; k < j; k++) {
                            var temp = "<div class='col-xs-3 more ' style='display:none'></div>";
                            $("#names").append(temp);
                        }
                    } else if (j == 3) {
                        for (var k = 0; k < j; k++) {
                            var temp = "<div class='col-xs-3 more ' style='display:none'></div>";
                            $("#names").append(temp);
                        }
                    }

                }
            },
            error: function (error) {
                alert("获取数据失败！" + error.statusText)
            }
        });
        getAllcarlist();

        $("#getAllcarlist").click(function () {
            getAllcarlist();
        })

        function getAllcarlist() {
            id = brandid.split("=")[1]
            $.ajax({
                url: getUrl()+'/product/rest/getProductBybrandname.action',
                type: 'POST',
                data: {
                    id: id
                },
                dataType: "json",
                success: function (data) {
                    $(".carlistArea").html(" ")
                    if (data == "") {
                        $(".carlistArea").html("<h2 style='text-align: center'>暂无产品</h2>")
                    }
                    for (i = 0; i < data.length; i++) {
                        data[i].coverpic = getImgUrl() + data[i].coverpic
                        if (data[i].coverpic == null || data[i].coverpic ==getImgUrl() + undefined) {
                            data[i].coverpic = "/page/images/nocoverpic.png"
                        }
                        var carlist = '<div style="margin:5vw 5vw;height: 50vw;overflow:hidden;zoom:1;">'
                            + '<img src="' + data[i].coverpic + '" onclick="window.location.href=\'xiangqing.html?productid=' + data[i].productid + '\'" style="width: 100%;height: 50vw">'
                            + '<div style="height: 15vw;position:relative; z-index:1;top:-15vw ;background-color: rgba(0,0,0,0.5);color: white;text-align: center">'
                            + '<div class="col-xs-6" style="margin-top: 2vw">'
                            + '<span style="font-size: 8vw;">' + data[i].cartype + '</span></div>'
                            + '<div class="col-xs-6" style="font-size: 4vw;"><div style="margin-top: 2vw">'
                            + '<span>市价：</span><span>¥' + data[i].marketprice + '万</span></div> <div style="color: orangered"> <span>搜融：</span>'
                            + '<span>¥' + data[i].sourongprice + '万</span> </div> </div> </div> </div>'
                        $(".carlistArea").append(carlist)
                    }
                },
            })
        }

        window.animatelo.bounceInLeft('#logoAction');

    }

})
$(function(){
    /**
     * 实现公司信息调用
     */
    $.ajax({
        url:getUrl()+'/company/getCompanyinformation.action',
        type:'POST',
        dataType: "json",
        success:function(data){
            $("#CompanyAddressArea").text(data.companyaddress);
            $("#CompanyPhoneArea").text(data.companyphone);
            $("#ServiceTimeArea").text(data.servicetime);
            $("#CompanyQRArea").attr("src",getImgUrl()+data.companyqr);
        },
        error: function () {

        }
    })

});