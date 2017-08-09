/**
 * Created by Administrator on 2017/08/01.
 */
$(function () {
    $('#loadmore').on('click',function () {
       /* $('#load-label img').css({'display':''});
        $('.get-more').css({'display':'none'});*/
        var angle = 0;
        var wheel = setInterval(function() {
                angle += 6;
            $('#loadmore').css({'transform':'rotate('+ angle +'deg)','transform-origin': '50% 50%'});
            if(angle === 360){
                angle = 0;
            }
        },10);

        setTimeout(function() {
             //   $('.get-more').css({'display':'none'});
                var car_type = '奔驰GLC';
                var market_price = '150';
                var sourong_price = '140';

                var outer_div = $('<div class="popular-car"></div>');
                var img_src = 'images/sliders/slider4.jpg';
                var link = "window.location.href='xiangqing.html'";
                var img = $('<img></img>').prop('src',img_src).attr('onclick',link).css({'width': '100%','height': '50vw','margin-top':'-10vw'});


                var inner_div = $('<div></div>').css({'height': '15vw','position':'relative','z-index':'1','top':'-15vw','background-color': 'rgba(0,0,0,0.5)',
                    'color': 'white','text-align':'center','float':'left','width':'100%'});

                var inner_div_1 = $('<div class="col-xs-6" style="margin-top: 2vw">'+
                    '<span style="font-size: 8vw;">' + car_type + '</span></div>');

                var inner_div_2 = $('<div class="col-xs-6" style="font-size: 4vw;">'+
                    '<div style="margin-top: 2vw">'+
                    '<span>市价：</span>'+
                    '<span style="text-decoration: line-through;">¥' + market_price + '万</span>'+
                    '</div>'+
                    '<div style="color: orangered">'+
                    '<span>搜融：</span>'+
                    '<span>¥' + sourong_price + '万</span>'+
                    '</div>'+
                    '</div>');

                inner_div.append(inner_div_1);
                inner_div.append(inner_div_2);
                outer_div.append(img);
                outer_div.append(inner_div);

               $('#car-list').append(outer_div).append(outer_div).append(outer_div).append(outer_div).append(outer_div);


         //       $('#load-label img').css({'display':'none'});
        //        $('.get-more').css({'display':'inline-block'});
                clearInterval(wheel);
        },1000);

    })

});