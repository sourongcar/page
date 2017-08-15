/**
 * Created by Franky on 2017/8/7.
 */
$(function(){
    /**
     * 实现公司信息调用
     */
    var userid = window.sessionStorage.getItem("userid");
    var start = 0;
    var offset = 8;
    /**
     * 用户未登录重定向到首页
     */
    if(userid == null){
        window.location.href = "index.html";
        return;
    }
    function doload() {
        $.ajax({
            url: getUrl()+'/collection/getDisplayList.action',
            type: 'GET',
            data: {userid: userid, start: start, offset: offset},
            dataType: 'JSON',
            success: function (data) {
                if(start==0&data.length==0){
                    var html1="<h3 style='margin-top: 10%;margin-bottom:10%;text-align: center;font-size:10vw'>你还没有收藏产品</h3>"
                        +"<a class='btn baguetteBox-button' style='margin-left: 40%;color: #1b6d85' href='/page/index.html'>回到首页</a>"
                    $("#Mycollectionlist").append(html1);
                    $(".load-label").html("")
                }else {
                    if (data.length < offset) {
                        $(".load-label").html("")
                    }
                    if (start > 0 & data.length < offset) {
                        console.log(123)
                        $(".load-label").html("")
                    }
                    for (i = 0; i < data.length; i++) {
                        if (data[i].coverpic == null || data[i].coverpic == undefined) {
                            data[i].coverpic = "/page/images/nocoverpic.png"
                        }
                        var html = ' <li> <a href="xiangqing.html?productid=' + data[i].productid + '"  ><div class="car-img">'
                            + '<img src="'+getImgUrl() + data[i].coverpic + '" style="height:100%">'
                            + '</div><div class="car-txt"><p class="name">' + data[i].title + '</p>'
                            + '<p class="pri" style="display: inline-block;">搜融：<p class="pri"  style="display: inline-block;">￥' + data[i].sourongprice + '万</p></p>'
                            + '<p class="pri" style="display: inline-block;color: grey">市价：<p class="pri" style="display: inline-block;color: grey;text-decoration:line-through">￥' + data[i].marketprice + '万</p></p> </div> </a> </li>'
                        $("#Mycollectionlist").append(html);
                    }
                }
            }
        })
    }

    /**
     * 页面加载数据
     */
    doload();
    /**
     * 加载更多数据
     */
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
        doload();
        /**
         * 取消车轮转动
         *
         */
        clearInterval(wheel);
    })


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
    });

});