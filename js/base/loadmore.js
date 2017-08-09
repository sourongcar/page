/**
 * Created by Administrator on 2017/08/01.
 */
$(function () {
    function createFrom(data) {
        var car_type = data.title;
        var market_price = data.marketprice||'好多';
        var sourong_price = data.sourongprice||'很少';

        var outer_div = $('<div class="popular-car" style="position: relative"></div>');
        var link = "window.location.href='xiangqing.html'";
        var img = $('<img/>').prop('src', data.coverpic&&('images/'+data.coverpic)).attr('onclick', link).css({
            'width': '100%',
            'height': '50vw'
            //'margin-top': '-10vw'
        });


        var inner_div = $('<div></div>').css({
            'height': '15vw',
            'position': 'absolute',
            'bottom': '0',
            'background-color': 'rgba(0,0,0,0.5)',
            'color': 'white',
            'text-align': 'center',
            'width': '100%'
        });
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
        var inner_div_1 = $('<div class="col-xs-6" style="margin-top: 2vw">' +
            '<span style="font-size: 8vw;">' + car_type + '</span></div>');

        var inner_div_2 = $('<div class="col-xs-6" style="font-size: 4vw;">' +
            '<div style="margin-top: 2vw">' +
            '<span>市价：</span>' +
            '<span style="text-decoration: line-through;">¥' + market_price + '万</span>' +
            '</div>' +
            '<div style="color: orangered">' +
            '<span>搜融：</span>' +
            '<span>¥' + sourong_price + '万</span>' +
            '</div>' +
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

        $.getJSON('json/displayProduct.json',null,function(data) {//'product/rest/display.action?offset='+carlist.children().length
            //   $('.get-more').css({'display':'none'});
            console.log('product/rest/display.action?offset='+carlist.children().length);
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