/**
 * Created by Administrator on 2017/08/01.
 */
$(function () {
    function createFrom(data) {
        var car_type = data.title||'暂无数据';
        var market_price = data.marketprice||'好多';
        var sourong_price = data.sourongprice||'很少';

        var outer_div = $('<div class="popular-car"></div>');
        var link = "window.location.href='xiangqing.html?productid="+data.productid+"'";
        var img = $('<img/>').prop('src', data.coverpic&&('http://localhost:8080/images/'+data.coverpic)).attr('onclick', link);


        var inner_div = $('<div/>');
        /*
         var inner_div = $('<div></div>').css({
         'height': '15vw',
         'position': 'relative',
         'z-index': '1',
         'top': '-15vw',
         'background-color': 'rgba(0,0,0,0.5)',
         'color': 'white',
         'text-align': 'center',
         'float': 'left',
         'width': '100%'
         });
        */
        var inner_div_1 = $('<div class="col-xs-6"><span">'+car_type+'</span></div>');

        var inner_div_2 = $('<div class="col-xs-6">' +
            '<div><span>市价：</span>' +
            '<span>¥' + market_price + '万</span></div>' +
            '<div><span>搜融：</span>' +
            '<span>¥' + sourong_price + '万</span></div>' +
            '</div>');

        inner_div.append(inner_div_1);
        inner_div.append(inner_div_2);
        outer_div.append(img);
        outer_div.append(inner_div);

        return outer_div[0];
    }
    function loadmore() {
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

        $.getJSON('http://localhost:8080/sourong_car/product/rest/display.action?offset='+carlist.children().length,null,function(data) {//'product/rest/display.action?offset='+carlist.children().length
            //   $('.get-more').css({'display':'none'});
            if(data.end){
                $('#load-label').remove();
            }
            data=data.list;
            if(!data instanceof Array)
                return;
            var f = document.createDocumentFragment();
            for(var i=0;i<data.length;i++){
                f.appendChild(createFrom(data[i]));
            }
            carlist[0].appendChild(f);
            //       $('#load-label img').css({'display':'none'});
            //        $('.get-more').css({'display':'inline-block'});
            clearInterval(wheel);
        });

    }
    var carlist=$('#car-list');
    $('#loadmore').on('click',loadmore);
    loadmore();

});