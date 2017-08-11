/**
 * Created by 01fang on 2017/8/9.
 */


$(document).ready(function(){
	
    $.ajax({
        type:"get",
        url:"http://localhost:8080/sourong_car/brand/weblist.action",
        async:true,
        success:function(data){
          
            data=JSON.parse(data);
            $.each(data, function(i,n) {
                
                if (i<9) {
                var images="<div  class='car-sign carlist'>";
                images+="<a href='searchcarlist.html?brandid="+n["brandid"]+"&&brandpic="+n["brandpic"]+"'><img  src='http://localhost:8080/images/"+n["brandpic"]+"'"+"class='car-sign-img'></a>";
                images+="<div class='car-sign-font'>"+n["brandname"]+"</div>";
                 images+="</div>";
            	$("#odd").append(images); 	        
                }else{
                var images="<div  id='transfto' class='car-sign car' style='display: none'>";
                images+="<a href='searchcarlist.html?brandid="+n["brandid"]+"&&brandpic="+n["brandpic"]+"'><img  src='http://localhost:8080/images/"+n["brandpic"]+"'"+"class='car-sign-img'></a>";
                images+="<div class='car-sign-font' >"+n["brandname"]+"</div>";
                 images+="</div>";
            	$("#freash").append(images);	         	
                }
             
		            });    
        },
        error:function(error){
            alert("获取数据失败！");
        }
    });
    
});
