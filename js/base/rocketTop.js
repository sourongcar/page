var x=$(window);
var e=$("#shape");

$("html,body").ready(function(){
	var scrollbar=x.scrollTop();
	var isClick=0;
	(scrollbar<=10000)?($("#shape").hide()):($("#shape").show());

	$(window).scroll(function(){
		scrollbar=x.scrollTop();
		(scrollbar<=0)?($("#shape").hide()):($("#shape").show());			
	})

	$("#shape").hover(
		function(){
			$(".shapeColor").show();
		},

		function(){
			$(".shapeColor").hide();
		}
	)

	$(".shapeColor").click(
		function(){
			$(".shapeFly").show();
			$("#shape").css("background-image","url()").addClass('on');
			$("#shape").css("opacity","1.0");
			$("html,body").animate({scrollTop: 0},1000);
			setTimeout(function(){
					//$("#shape").css("margin-top","-125px");
					$(".shapeFly").hide();
					$("#shape").css("background","url('images/car_top.png') no-repeat scroll 0 0  transparent");
					$("#shape").css("background-size","10vw 18vw").removeClass('on');
					$("#shape").css("opacity","0.6");
				},1000);
	})

})