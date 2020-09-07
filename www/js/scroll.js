// JavaScript Document
$(function() {

    //ページ内スクロール
    $(".scroll").click(function () {
        var i = $(".scroll").index(this)
        var p = $(".content").eq(i).offset().top;
        $('html,body').animate({ scrollTop: p },1000,"easeInOutCubic");
        return false;
    });
 
//    //ページ上部へ戻る
//   $(".scroll_top").click(function () {
//        $('html,body').animate({ scrollTop: 0 }, 'slow');
//       return false;
//    });
		
 
});

$(function() {
	var showFlag = false;
	var topBtn = $('#scrolltop');	
	topBtn.css('bottom', '-100px');
	var showFlag = false;
	//スクロールが300に達したらボタン表示
	$(window).scroll(function () {
		if ($(this).scrollTop() > 300) {
			if (showFlag == false) {
				showFlag = true;
				topBtn.stop().animate({'bottom' : '10px'}, 150); 
			}
		} else {
			if (showFlag) {
				showFlag = false;
				topBtn.stop().animate({'bottom' : '-100px'}, 150); 
			}
		}
	});
	//スクロールしてトップ
      topBtn.click(function () {
		$('body,html').animate({
			scrollTop: 0
		}, 1000,"easeInOutCubic");
		return false;
    });
});