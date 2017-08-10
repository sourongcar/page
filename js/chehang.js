/**
 * Created by Franky on 2017/8/7.
 */
$(function(){

         $.ajax({
                    url:'http://localhost:8080/sourong_car/article/getArticle.action',
                    type:'POST',
                    dataType: "json",
                    data:{
                        'articleid':3
                    },
                    success:function(data){
                        $("#articleArea").html(data.content);
                    },
                    error: function () {

                    }
            })

});
